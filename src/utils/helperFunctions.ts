import CryptoJS from "crypto-js";

function encrypt(data: any) {
  const SECRET_KEY = "1245763dhewdgvkjh@$%$(+:/^&*!@'-_";
  const KEY_SCRIPT = "345gvkjh@$%$(+:/^&*!@'hjtesz";
  const IV_SCRIPT = "35g@$%$(+:/^&*!@'hjt64sz";

  const combinedKey = CryptoJS.SHA256(SECRET_KEY + KEY_SCRIPT)
    .toString(CryptoJS.enc.Hex)
    .slice(0, 52);

  const cipher = CryptoJS.AES.encrypt(
    cv_str(data),
    CryptoJS.enc.Utf8.parse(combinedKey),
    {
      iv: CryptoJS.enc.Utf8.parse(IV_SCRIPT),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return cipher.toString();
}

function decrypt(data: string) {
  const SECRET_KEY = "1245763dhewdgvkjh@$%$(+:/^&*!@'-_";
  const KEY_SCRIPT = "345gvkjh@$%$(+:/^&*!@'hjtesz";
  const IV_SCRIPT = "35g@$%$(+:/^&*!@'hjt64sz";
  const combinedKey = CryptoJS.SHA256(SECRET_KEY + KEY_SCRIPT)
    .toString(CryptoJS.enc.Hex)
    .slice(0, 52);

  const bytes = CryptoJS.AES.decrypt(
    cv_str(data),
    CryptoJS.enc.Utf8.parse(combinedKey),
    {
      iv: CryptoJS.enc.Utf8.parse(IV_SCRIPT),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

export function encryptPassword(data: string) {
  const encryptedPassword = encrypt(data);
  return encryptedPassword;
}

export function decryptPassword(passwordData: any) {
  try {
    const data = decrypt(passwordData);
    return { data: `${200}#${data}` };
  } catch (error) {
    if (
      error instanceof Error &&
      (error as any).code === "ERR_OSSL_BAD_DECRYPT"
    ) {
      return { data: `${-500}#ERR_OSSL_BAD_DECRYPT` };
    } else {
      return { data: `${-10}#Try again, bruh!` };
    }
  }
}

export function empty(data: any): boolean {
  if (data === null || data === undefined) {
    return true;
  }
  if (typeof data === "string" || Array.isArray(data)) {
    return data.length === 0;
  }
  if (typeof data === "object") {
    return Object.keys(data).length === 0;
  }
  if (typeof data === "number" || typeof data === "boolean") {
    return !data;
  }
  return false;
}

export function lower_text(text: any) {
  if (!empty(text)) {
    if (typeof text === "number") {
      text = cv_str(text);
    }
    return text.toLowerCase();
  }
  return text;
}

export function cv_str(data: any) {
  if (typeof data === "number") {
    return JSON.stringify(data);
  }
  return data;
}

export function cv_num(data: any) {
  if (typeof data === "string") {
    return Number(data);
  }
  return data;
}

export function trim_value(data: any) {
  if (typeof data === "string") {
    return data.trim();
  } else if (typeof data === "number") {
    return data.toString().trim();
  }
  return data;
}

export function isNumberOnly(data: any): boolean {
  const str = data.toString();
  const numberOnlyRegex = /^\d+$/;
  return numberOnlyRegex.test(str);
}

export function isTextOnly(data: any): boolean {
  const str = data.toString();
  const textOnlyRegex = /^[A-Za-z]+$/;
  return textOnlyRegex.test(str);
}

export function check_length(data: any, length: any) {
  data = trim_value(data).length;
  return Number(data) === Number(length);
}
