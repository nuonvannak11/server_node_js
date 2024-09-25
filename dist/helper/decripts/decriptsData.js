"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertDataDecripts = void 0;
const helperFunctions_1 = require("../../utils/helperFunctions");
function read_data(data) {
    const decryptedData = {};
    for (let key in data) {
        if (data[key]) {
            decryptedData[key] = (0, helperFunctions_1.decryptPassword)(data[key]);
        }
        else {
            decryptedData[key] = data[key];
        }
    }
    return decryptedData;
}
function prepare_data(convertData) {
    const prepareData = [];
    const errorData = [];
    for (let key in convertData) {
        if (typeof convertData[key] === "object" && convertData[key] !== null) {
            const [code, dataitem] = Object.values(convertData[key].data.split("#"));
            const code_data = parseInt(code);
            const data = dataitem;
            if (code_data === 200) {
                let obj = {};
                obj[key] = data;
                prepareData.push(obj);
            }
            if (code_data === -500) {
                let obj = {};
                obj[key] = data;
                errorData.push(obj);
            }
            if (code_data === -10) {
                let obj = {};
                obj[key] = data;
                errorData.push(obj);
            }
        }
        else if (convertData[key] === "") {
            let obj = {};
            obj[key] = convertData[key];
            prepareData.push(obj);
        }
    }
    return { prepareData, errorData };
}
function ConvertDataDecripts(data) {
    const convert_data = read_data(data);
    return prepare_data(convert_data);
}
exports.ConvertDataDecripts = ConvertDataDecripts;
