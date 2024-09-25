import { encryptPassword } from "../../utils/helperFunctions";

interface EncryptedData {
  [key: string]: string | number | undefined;
}

function encryptSensitiveFields(text: any): EncryptedData {
  const sensitiveFields = [
    "id",
    "name",
    "password",
    "tel",
    "email",
    "address",
    "telegram",
    "bankacc",
    "bankno",
    "salary",
    "contact_us",
  ];

  const encryptedData: EncryptedData = {};

  for (const key of Object.keys(text)) {
    const value = text[key];
    if (sensitiveFields.includes(key)) {
      encryptedData[key] = encryptPassword(String(value));
    } else {
      encryptedData[key] = value;
    }
  }

  return encryptedData;
}

export function convertData(data: any): EncryptedData {
  return encryptSensitiveFields(data);
}
