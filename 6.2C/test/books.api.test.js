const chai = require('chai');
const chaiHttp = require('chai-http');
const serverApp = require('../server');

chai.use(chaiHttp);
const { expect } = chai;

describe('Book creation API tests', function () {

  it('creates a book record when all provided fields meet validation rules', function (done) {
    const generatedId = `book-${Date.now()}`;

    const validPayload = {
      id: generatedId,
      title: 'Sample Publication',
      author: 'Li Wa',
      year: 2024,
      genre: 'Other',
      summary:
        'This description is intentionally long enough to satisfy the minimum word requirement defined by the API validation logic.',
      price: 50
    };

    chai.request(serverApp)
      .post('/api/books')
      .send(validPayload)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.include({ id: generatedId });
        done();
      });
  });

  it('rejects a request if at least one field violates validation constraints', function (done) {
    const invalidPayload = {
      id: `invalid-${Date.now()}`,
      title: 'Rejected Entry',
      author: 'Li Wang',
      year: 2024,
      genre: 'Other',
      summary:
        'This summary is valid in length but the price value should trigger a validation failure.',
      price: -10
    };

    chai.request(serverApp)
      .post('/api/books')
      .send(invalidPayload)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
  });

  it('accepts borderline valid input values without failing validation', function (done) {
    const boundaryId = `boundary-${Date.now()}`;

    const edgePayload = {
      id: boundaryId,
      title: 'A',
      author: 'Li Wa',
      year: new Date().getFullYear(),
      genre: 'Other',
      summary:
        'this is the summary including exactly sixteen words which is the edge case for this input',
      price: 0.01
    };

    chai.request(serverApp)
      .post('/api/books')
      .send(edgePayload)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.id).to.equal(boundaryId);
        done();
      });
  });

});
