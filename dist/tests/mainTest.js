"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Main API Tests', () => {
    it('should get data from the API', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api');
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.body).to.be.an('array');
    });
    it('should create new data via the API', async () => {
        const newData = {
        // provide data for creation
        };
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/create')
            .send(newData);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.body).to.have.property('createdData');
    });
});
