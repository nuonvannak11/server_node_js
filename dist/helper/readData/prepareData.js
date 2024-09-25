"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepareDataBeforeUpdate = void 0;
function read_data(datafromuser, datafromdatabase) {
    Object.keys(datafromuser).forEach((key) => {
        if (datafromuser[key] === "") {
            datafromuser[key] = datafromdatabase[key];
        }
    });
    return datafromuser;
}
function PrepareDataBeforeUpdate(datafromuser, datafromdatabase) {
    return read_data(datafromuser, datafromdatabase);
}
exports.PrepareDataBeforeUpdate = PrepareDataBeforeUpdate;
