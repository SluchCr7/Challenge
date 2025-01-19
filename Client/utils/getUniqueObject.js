const selectRandomObject = (objects , remainingObjects , setLastSelected , setRemainingObjects ,NameOfGame) => {
    if (remainingObjects.length === 0) {
      // Reset pool if all objects are used
      setRemainingObjects([...objects]);
      // setLastSelected(null);
      localStorage.setItem(`remainingObjects${NameOfGame}`, JSON.stringify([...objects]));
      setLastSelected(objects[0]);
      console.log("All objects used. Pool reset.");
      return "Pool reset";
    }

    // Select a random object
    const randomIndex = Math.floor(Math.random() * remainingObjects.length);
    const selectedObject = remainingObjects[randomIndex];
    // Update state
    const updateReminingObjects = remainingObjects.filter((_, index) => index !== randomIndex)
    setRemainingObjects(updateReminingObjects);
    localStorage.setItem(`remainingObjects${NameOfGame}` , JSON.stringify(updateReminingObjects));
    setLastSelected(selectedObject);
    return selectedObject;
};
  
export default selectRandomObject
