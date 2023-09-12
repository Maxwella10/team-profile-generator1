// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// Importing Employee class constructor
const Employee = require("./Employee");
// Intern class extends Employee class and adds school parameter
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
}
// Export the Intern class
module.exports = Intern;