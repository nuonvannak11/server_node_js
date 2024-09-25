function generateRandomCode(numDigits: number): string {
  if (numDigits <= 0) {
    throw new Error("Number of digits must be a positive integer.");
  }

  let randomCode = "";
  for (let i = 0; i < numDigits; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    randomCode += randomDigit.toString();
  }

  return randomCode;
}

export function RandomNumber(data: number): string {
  return generateRandomCode(data);
}
