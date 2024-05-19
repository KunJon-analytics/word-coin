export const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const getWordColor = (guess: string, solution: string) => {
  // "green,yellow,grey,green,yellow"
  let color = "";
  const solutionArray = solution.split("");
  const guessArray = guess.split("");
  for (let index = 0; index < solutionArray.length; index++) {
    if (solutionArray[index] === guessArray[index]) {
      //  find green letters
      color = `${color},green`;
    } else if (
      solutionArray.includes(guessArray[index]) &&
      solutionArray[index] !== guessArray[index]
    ) {
      //  find any yellow letters
      color = `${color},yellow`;
    } else {
      //  find any grey letters
      color = `${color},grey`;
    }
  }
  return color.slice(1);
};
