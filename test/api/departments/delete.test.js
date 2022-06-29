const chai = require('chai');
const chaiHttp = require('chai-http');
const Department = require('../../../models/department.model');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/departments', () => {
    
    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
    });
    
    after(async () => {
        await Department.deleteMany();
    });

    it('/ should delete one document by id from db and return success', async () => {
        const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
        const newDepartment = await Department.findOne({ _id: '5d9f1140f10a81216cfd4408' });
        expect(res.status).to.be.equal(200);
        expect(newDepartment).to.be.null;
    });
});