// TODO: Write code to define and export the Employee class
// lib/Employee.js
// Define Employee class
class Employee {
    // Define constructor with name, id, email parameters
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    // Define getName method to return name
    getName() {
        return this.name;
    }

    // Define getId method to return id
    getId() {
        return this.id;
    }

    // Define getEmail method to return email
    getEmail() {
        return this.email;
    }

    // Define getRole method to return 'Employee'
    getRole() {
        return "Employee";
    }
}

// Export Employee class
module.exports = Employee;