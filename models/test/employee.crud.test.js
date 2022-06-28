const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            await testEmpOne.save();
      
            const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Management' });
            await testEmpTwo.save();
          });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        after(async () => {
            await Employee.deleteMany();
        });     

        it('should return proper document by various params with findOne method', async () => {
            const employee = await Employee.findOne({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            const expectedDepartment = 'Marketing';
            expect(employee.department).to.be.equal(expectedDepartment);
        });

        after(async () => {
            await Employee.deleteMany();
        });     
    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            await employee.save();
            const savedEmployee = await Employee.findOne({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            expect(savedEmployee).to.not.be.null;
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            await testEmpOne.save();
          
            const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Management' });
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ lastName: 'Nowak' }, { $set: { lastName: '=Nowak=' }});
            const updatedEmployee = await Employee.findOne({ lastName: '=Nowak=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            employee.firstName = '=Ewelina=';
            employee.lastName = '=Nowak=';
            employee.department = '=Marketing=';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ firstName: '=Ewelina=', lastName: '=Nowak=', department: '=Marketing=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: {firstName: 'Updated!' }});
            const employees = await Employee.find({ firstName: 'Updated!' });
            expect(employees.length).to.be.equal(2);
        });
    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            await testEmpOne.save();
      
            const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Management' });
            await testEmpTwo.save();
        });
      
        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            const removeEmployee = await Employee.findOne({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            expect(removeEmployee).to.be.null;
        });

        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing' });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });  
    });
});