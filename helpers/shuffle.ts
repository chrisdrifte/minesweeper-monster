export function shuffle<T>(
  inputArray: T[],
  generateRandomNumber = () => Math.random()
) {
  const array = [...inputArray];

  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomNumber = generateRandomNumber();
    let randomIndex = Math.floor(randomNumber * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return {
    draw: (numToDraw: number) => array.slice(0, numToDraw),
  };
}
