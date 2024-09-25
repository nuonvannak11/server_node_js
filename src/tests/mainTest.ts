import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

describe('Main API Tests', () => {
  it('should get data from the API', async () => {
    const response = await request(app).get('/api');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should create new data via the API', async () => {
    const newData = {
      // provide data for creation
    };

    const response = await request(app)
      .post('/api/create')
      .send(newData);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('createdData');
  });
});
