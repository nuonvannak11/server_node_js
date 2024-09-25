"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDateTime = void 0;
const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    };
    const str = now.toLocaleString('en-US', options);
    const [month, day, year, time] = str.split(/[\s,\/]+/);
    return `${year}-${month}-${day} ${time}`;
};
exports.getCurrentDateTime = getCurrentDateTime;
