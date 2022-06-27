const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    it('should throw an error if no "firstName", "lastName" and "department" args', () => {

        const cases = [
            {},
            {firstName: 'Ewelina'},
            {department: 'Marketing'},
            {firstName: 'Ewelina', lastName: 'Nowak'},
            {lastName: 'Nowak', department: 'Marketing'}
        ];

        for (let arg of cases) {
            const emp = new Employee(arg);
        
            emp.validate(err => {
              expect(err.errors).to.exist;
            });
          }
    });

    it('should throw an error if "firstName", "lastName" or "department" are not a string', () => {

        const cases = [{}, []];
        
        for(let firstName of cases) {
          const emp = new Employee({ firstName });
      
          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
          });
        }

        for(let lastName of cases) {
            const emp = new Employee({ lastName });
        
            emp.validate(err => {
              expect(err.errors.lastName).to.exist;
            });
        }

        for(let department of cases) {
            const emp = new Employee({ department });
        
            emp.validate(err => {
              expect(err.errors.department).to.exist;
            });
        }
    });

    it('should return good data if proper args', () => {
        
        const cases = [
            {firstName: 'Ewelina', lastName: 'Nowak', department: 'Marketing'},
            {firstName: 'John', lastName: 'Doe', department: 'Management'},
        ];
        
        for(let arg of cases) {
            const emp = new Employee(arg);

            emp.validate(err => {
                expect(err).to.not.exist;    
            });
        }
    });

    after(() => {
        mongoose.models = {};
    });
});
