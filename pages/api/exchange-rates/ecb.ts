import type { NextApiRequest, NextApiResponse } from "next";

const ECB_API_URL =
  "https://data-api.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A?lastNObservations=1&format=csvdata";

interface EcbRatesResponse {
  rates: Record<string, number>;
  base: "EUR";
  updatedAt: string | null;
}

interface EcbErrorResponse {
  error: string;
}

const parseCsvLine = (line: string): string[] => {
  const columns: string[] = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const character = line[i];

    if (character === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        value += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (character === "," && !insideQuotes) {
      columns.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  columns.push(value);

  return columns;
};

const parseEcbCsv = (csv: string): Omit<EcbRatesResponse, "base"> => {
  const lines = csv.trim().split(/\r?\n/);

  if (lines.length < 2) {
    throw new Error("ECB returned an empty response.");
  }

  const headers = parseCsvLine(lines[0]);

  const currencyIndex = headers.indexOf("CURRENCY");
  const valueIndex = headers.indexOf("OBS_VALUE");
  const dateIndex = headers.indexOf("TIME_PERIOD");

  if (currencyIndex === -1 || valueIndex === -1 || dateIndex === -1) {
    throw new Error("Unexpected ECB CSV format.");
  }

  const rates: Record<string, number> = {
    EUR: 1,
  };

  let latestDate: string | null = null;

  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;

    const columns = parseCsvLine(line);

    const currency = columns[currencyIndex]?.trim();
    const value = Number(columns[valueIndex]);
    const date = columns[dateIndex]?.trim();

    if (currency && Number.isFinite(value) && value > 0) {
      rates[currency] = value;
    }

    if (date && (!latestDate || date > latestDate)) {
      latestDate = date;
    }
  }

  if (Object.keys(rates).length === 1) {
    throw new Error("ECB returned no usable exchange rates.");
  }

  return {
    rates,
    updatedAt: latestDate,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EcbRatesResponse | EcbErrorResponse>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const response = await fetch(ECB_API_URL);

    if (!response.ok) {
      return res.status(502).json({
        error: `ECB request failed with status ${response.status}.`,
      });
    }

    const csv = await response.text();
    const parsedData = parseEcbCsv(csv);

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400",
    );

    return res.status(200).json({
      ...parsedData,
      base: "EUR",
    });
  } catch (error) {
    console.error("ECB exchange rates error:", error);

    return res.status(502).json({
      error: "Failed to fetch ECB exchange rates.",
    });
  }
}
