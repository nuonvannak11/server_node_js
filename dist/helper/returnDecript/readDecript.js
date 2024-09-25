"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDecript = void 0;
function read_data(decryptedData, field) {
    if (typeof decryptedData === "object") {
        if (decryptedData.codemsg === "-500") {
            return {
                data: "",
                error: decryptedData.ermsg,
                code: "-1",
            };
        }
        else if (decryptedData.codemsg === "-10") {
            return {
                data: "",
                code: "-2",
                error: decryptedData.ermsg,
            };
        }
        else if (decryptedData.codemsg === "200") {
            return {
                data: decryptedData.ermsg,
                code: "1",
                error: "No errors",
            };
        }
        else {
            return {
                data: "",
                error: `Unexpected error in ${field} decryption`,
                code: "-1",
            };
        }
    }
    return {
        error: `${field} decryption failed`,
        code: "-1",
    };
}
function convertDecript(data, field) {
    return read_data(data, field);
}
exports.convertDecript = convertDecript;
