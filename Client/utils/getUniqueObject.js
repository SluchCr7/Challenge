const selectRandomObject = (objects , remainingObjects , setLastSelected , setRemainingObjects) => {
    if (remainingObjects.length === 0) {
      // Reset pool if all objects are used
      setRemainingObjects([...objects]);
      setLastSelected(objects[0]);
      // setLastSelected(null);
      console.log("All objects used. Pool reset.");
      return "Pool reset";
    }

    // Select a random object
    const randomIndex = Math.floor(Math.random() * remainingObjects.length);
    const selectedObject = remainingObjects[randomIndex];

    // Update state
    setRemainingObjects((prev) => prev.filter((_, index) => index !== randomIndex));
    setLastSelected(selectedObject);

    return selectedObject;
};
  
export default selectRandomObject
