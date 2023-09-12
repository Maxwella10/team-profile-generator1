// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.// Importing Employee class constructor
const Employee = require("./Employee");
// Manager class extends Employee class and adds officeNumber parameter
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
}
// Export the Manager class
module.exports = Manager;