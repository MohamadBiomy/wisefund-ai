const addCommas = (num: number): string => {
  const amount: string = num.toString();

  // Split into integer and decimal parts
  const parts = amount.split(".");
  const intPart = parts[0];
  const float = parts[1];
  
  // Extract sign and filter out non-numeric characters from integer part
  const isNegative = intPart.startsWith("-");
  const int = intPart.replace(/[^0-9]/g, ""); // Remove all non-digit characters

  // Reverse digits to add commas from right to left
  const reversedDigits = int.split("").reverse()
  
  // Add commas every 3 digits (at positions 3, 6, 9, etc.)
  const hold: string[] = []
  reversedDigits.forEach((digit, index) => {
    // Add comma before every 3rd digit (except the first)
    if (index > 0 && index % 3 === 0) {
      hold.push(",")
    }
    hold.push(digit)
  })

  // Sanitize float part to only contain digits
  const sanitizedFloat = float ? float.replace(/[^0-9]/g, "") : "";
  const normalizedFloat = sanitizedFloat ? sanitizedFloat.slice(0, 2).padEnd(2, "0") : "";
  
  // Reconstruct with negative sign if needed
  const sign = isNegative ? "-" : "";
  return sign + hold.reverse().join("") + (normalizedFloat ? "." + normalizedFloat : "")
}

export default addCommas