import {
  check_length,
  empty,
  isNumberOnly,
  isTextOnly,
} from "../../utils/helperFunctions";

export function validateCardDetails(
  cardName: any,
  cardNumber: any,
  cardEXP: any,
  cardCVV: any,
  res: any
) {
  // Validate card name
  if (empty(cardName)) {
    return res.status(200).json({
      code: -9,
      message: "Invalid card name, can't be empty!",
    });
  }

  if (!isTextOnly(cardName)) {
    return res.status(200).json({
      code: -12,
      message: "Invalid card name, only text is allowed!",
    });
  }

  // Validate card number
  if (empty(cardNumber)) {
    return res.status(200).json({
      code: -8,
      message: "Invalid card number, can't be empty!",
    });
  }

  if (!isNumberOnly(cardNumber) || !check_length(cardNumber, 16)) {
    return res.status(200).json({
      code: -13,
      message: "Invalid card number, must be 16 digits and numeric!",
    });
  }

  // Validate card expiration date
  if (empty(cardEXP)) {
    return res.status(200).json({
      code: -10,
      message: "Invalid card expiration date, can't be empty!",
    });
  }

  // Validate card CVV
  if (empty(cardCVV)) {
    return res.status(200).json({
      code: -11,
      message: "Invalid card CVV, can't be empty!",
    });
  }

  if (!isNumberOnly(cardCVV) || !check_length(cardCVV, 3)) {
    return res.status(200).json({
      code: -15,
      message: "Invalid card CVV, must be 3 digits and numeric!",
    });
  }
}
