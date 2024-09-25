import CryptoJS from "crypto-js";

export function cv_str(data: any) {
  if (typeof data === "number") {
    return JSON.stringify(data);
  } else {
    return data;
  }
}

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
