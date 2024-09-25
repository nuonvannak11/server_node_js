"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slideData = void 0;
function read_data(data) {
    console.log("data====", data);
    return;
    const address = data.address;
    const age = data.age;
    const bankName = data.bankName;
    const bankNumber = data.bankNumber;
    const contactUs = data.contactUs;
    const gender = data.gender;
    const image = data.image;
    const mobileNumber = data.mobileNumber;
    const salary = data.salary;
    const telegram = data.telegram;
    const userid = data.userid;
    return {
        userid,
        telegram,
        salary,
        mobileNumber,
        image,
        address,
        age,
        bankName,
        bankNumber,
        contactUs,
        gender,
    };
}
function slideData(data) {
    return read_data(data);
}
exports.slideData = slideData;
