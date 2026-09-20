const fs = require("fs");

const rawData = fs.readFileSync("C:/Users/Andrei/figma_styles.json");
const figmaData = JSON.parse(rawData);

const spacings = new Set();

function traverse(node) {
  if (!node) return;

  // 1. Извлекаем отступы из Auto Layout (если они есть)
  if (node.paddingLeft !== undefined)
    spacings.add(Math.round(node.paddingLeft));
  if (node.paddingRight !== undefined)
    spacings.add(Math.round(node.paddingRight));
  if (node.paddingTop !== undefined) spacings.add(Math.round(node.paddingTop));
  if (node.paddingBottom !== undefined)
    spacings.add(Math.round(node.paddingBottom));
  if (node.itemSpacing !== undefined && node.itemSpacing > 0) {
    spacings.add(Math.round(node.itemSpacing));
  }

  // 2. Вычисляем расстояния между соседними элементами по их координатам
  if (
    node.children &&
    Array.isArray(node.children) &&
    node.children.length > 1
  ) {
    for (let i = 0; i < node.children.length - 1; i++) {
      const boxA = node.children[i].absoluteBoundingBox;
      const boxB = node.children[i + 1].absoluteBoundingBox;

      if (boxA && boxB) {
        // Расстояние по горизонтали
        const dx = Math.round(Math.abs(boxB.x - (boxA.x + boxA.width)));
        // Расстояние по вертикали
        const dy = Math.round(Math.abs(boxB.y - (boxA.y + boxA.height)));

        if (dx > 0 && dx < 200) spacings.add(dx);
        if (dy > 0 && dy < 200) spacings.add(dy);
      }
    }
  }

  if (node.children) {
    node.children.forEach(traverse);
  }
}

traverse(figmaData.document);

const sortedSpacings = Array.from(spacings).sort((a, b) => a - b);

console.log("=== ВСЕ НАЙДЕННЫЕ ОТСТУПЫ (включая координаты) ===");
console.log(sortedSpacings);

// const fs = require("fs");

// // Загружаем JSON с макетом Figma
// const rawData = fs.readFileSync("C:/Users/Andrei/figma_styles.json");
// const figmaData = JSON.parse(rawData);

// const colors = new Set();
// const fonts = new Set();

// // Функция преобразования каналов Figma (0..1) в HEX
// function rgbaToHex(r, g, b, a) {
//   const toHex = (v) =>
//     Math.round(v * 255)
//       .toString(16)
//       .padStart(2, "0");
//   return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
// }

// // Рекурсивный обход всех узлов Figma
// function traverse(node) {
//   if (!node) return;

//   // Извлекаем цвета заливки
//   if (node.fills && Array.isArray(node.fills)) {
//     node.fills.forEach((fill) => {
//       if (fill.type === "SOLID" && fill.color) {
//         const { r, g, b, a } = fill.color;
//         colors.add(rgbaToHex(r, g, b, a));
//       }
//     });
//   }

//   // Извлекаем параметры шрифтов
//   if (node.style && node.style.fontFamily) {
//     fonts.add(`${node.style.fontFamily} (${node.style.fontWeight || 400})`);
//   }

//   // Рекурсивно перебираем детей
//   if (node.children) {
//     node.children.forEach(traverse);
//   }
// }

// traverse(figmaData.document);

// console.log("=== НАЙДЕННЫЕ ШРИФТЫ ===");
// console.log(Array.from(fonts));

// console.log("\n=== НАЙДЕННЫЕ ЦВЕТА (HEX) ===");
// console.log(Array.from(colors));
