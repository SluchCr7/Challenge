let usedIndices = new Set();

function getRandomObjects(arr) {
  if (arr.length < 4) {
    throw new Error("The array must contain at least 4 objects.");
  }

  // Reset used indices when all objects have been used
  if (usedIndices.size + 4 > arr.length) {
    usedIndices.clear();
  }

  const result = [];
  while (result.length < 4) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      result.push(arr[randomIndex]);
    }
  }

  return result;
}


export default getRandomObjects;
