let usedIndices = new Set();

/**
 * Validates that a category document contains all required fields and difficulty tiers.
 */
export function isValidCategory(cat) {
  if (!cat || typeof cat !== "object") return false;
  if (!cat.name || typeof cat.name !== "string" || cat.name.trim() === "") return false;

  const difficulties = ["Easy", "Medium", "Hard", "Expert"];
  return difficulties.every((d) => {
    const diff = cat[d];
    return (
      diff &&
      typeof diff === "object" &&
      typeof diff.question === "string" &&
      diff.question.trim().length > 0 &&
      diff.answer !== undefined &&
      diff.answer !== null &&
      String(diff.answer).trim().length > 0 &&
      typeof diff.value === "number"
    );
  });
}

function getRandomObjects(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  // Filter only strictly valid categories
  const validCategories = arr.filter((item, idx) => {
    const isValid = isValidCategory(item);
    if (!isValid) {
      console.warn(`[getRandomObjects] Malformed category at index ${idx}:`, item);
    }
    return isValid;
  });

  if (validCategories.length < 4) {
    console.warn(`[getRandomObjects] Not enough valid categories (${validCategories.length}/4 needed).`);
    return [];
  }

  // Reset used indices when remaining unused categories are fewer than 4
  if (usedIndices.size + 4 > validCategories.length) {
    usedIndices.clear();
  }

  const result = [];
  const candidateIndices = [];
  for (let i = 0; i < validCategories.length; i++) {
    if (!usedIndices.has(i)) {
      candidateIndices.push(i);
    }
  }

  while (result.length < 4 && candidateIndices.length > 0) {
    const randomPick = Math.floor(Math.random() * candidateIndices.length);
    const chosenIndex = candidateIndices.splice(randomPick, 1)[0];
    usedIndices.add(chosenIndex);
    result.push(validCategories[chosenIndex]);
  }

  // Fallback if candidate pool ran out before filling 4 slots
  if (result.length < 4) {
    usedIndices.clear();
    const remainingPool = validCategories
      .map((cat, idx) => ({ cat, idx }))
      .filter((item) => !result.includes(item.cat));

    while (result.length < 4 && remainingPool.length > 0) {
      const pick = Math.floor(Math.random() * remainingPool.length);
      const chosen = remainingPool.splice(pick, 1)[0];
      usedIndices.add(chosen.idx);
      result.push(chosen.cat);
    }
  }

  return result;
}

export default getRandomObjects;
