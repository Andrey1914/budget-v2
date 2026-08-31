"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import TransactionFormWrapper from "@/components/Transactions/TransactionFormWrapper";
import { Container } from "@mui/material";

type TransactionType = "income" | "expense";

const TransactionPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const params = useParams();
  const rawType = params?.type as string | undefined;

  const isValidType = rawType === "income" || rawType === "expense";
  const transactionType: TransactionType = isValidType
    ? (rawType as TransactionType)
    : "income";

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
    } else if (!session.user?.isVerified) {
      router.push("/auth/verify-email");
    } else if (!isValidType) {
      router.push("/dashboard/income");
    }
  }, [session, status, router, isValidType]);

  if (!session || !session.user?.isVerified || !isValidType) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <TransactionFormWrapper type={transactionType} />
    </Container>
  );
};

export default TransactionPage;
