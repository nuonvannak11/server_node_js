import { decryptPassword } from "../../utils/helperFunctions";

function read_data(data: any) {
  const decryptedData: { [key: string]: any } = {};
  for (let key in data) {
    if (data[key]) {
      decryptedData[key] = decryptPassword(data[key]);
    } else {
      decryptedData[key] = data[key];
    }
  }
  return decryptedData;
}

function prepare_data(convertData: any) {
  const prepareData = [];
  const errorData = [];

  for (let key in convertData) {
    if (typeof convertData[key] === "object" && convertData[key] !== null) {
      const [code, dataitem] = Object.values(convertData[key].data.split("#"));
      const code_data = parseInt(code as string);
      const data = dataitem;
      if (code_data === 200) {
        let obj: { [key: string]: any } = {};
        obj[key] = data;
        prepareData.push(obj);
      }
      if (code_data === -500) {
        let obj: { [key: string]: any } = {};
        obj[key] = data;
        errorData.push(obj);
      }
      if (code_data === -10) {
        let obj: { [key: string]: any } = {};
        obj[key] = data;
        errorData.push(obj);
      }
    } else if (convertData[key] === "") {
      let obj: { [key: string]: any } = {};
      obj[key] = convertData[key];
      prepareData.push(obj);
    }
  }
  return { prepareData, errorData };
}

export function ConvertDataDecripts(data: any) {
  const convert_data = read_data(data);
  return prepare_data(convert_data);
}
