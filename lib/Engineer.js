// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// Importing Employee constructor
const Employee = require("./Employee");
// Engineer class extends Employee class and adds github parameter
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}
// Export the Engineer class
module.exports = Engineer;