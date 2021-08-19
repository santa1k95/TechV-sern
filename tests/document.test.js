const request = require('supertest');
const app = require('../src/app');
const Document = require('../src/models/Document');

const doc={
    fileName:"Santa.pdf",
    type:"application/pdf"
}

beforeEach(()=>{
    Document.destroy({
        where: {},
        truncate: true
      })
    new Document(doc).save()
})

afterEach(()=>{
    
})

test('It should return json data with list of documents', async () => {
    await request(app).get('/document/getall').send().expect(200)
})

test('It should redirect to / on /', async () => {
    await request(app).get('/').send().expect(200)
})

test('It should redirect to /document on /document', async () => {
    await request(app).get('/document').send().expect(302)
})