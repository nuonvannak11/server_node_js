import axios from "axios";
export async function GetAddressTimeZone(ip: string) {
  try {
    const response = await axios.get(
      `https://ipinfo.io/${ip}?token=2be0fa40cccc3c`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
  }
}
