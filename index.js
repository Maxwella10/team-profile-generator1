// Import the required packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Import require classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Import require functions
const render = require("../starter/src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// TODO: Write Code to gather information about the development team members, and render the HTML file.// Using util.promisify to promisify fs.writeFile
const writeFileAsync = util.promisify(fs.writeFile);
// Create an empty array to store the team members
const team = [];
// Create a function to validate the input
function validateInput(input) {
    if (input.trim() === "") {
        return "This cannot be empty. Please enter a valid input.";
    } else {
        return true;
    }
}
// Create a function to validate the email format
function validateEmailFormat(input) {
    // Regex for email format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.trim() === "") {
        return "The email cannot be empty. Please enter a valid email address.";
    } else if (!emailRegex.test(input)) {
        return "Please enter a valid email address.";
    } else {
        return true;
    }
}
// Create a function to validate the ID
const validateId = (input) => {
    if (input.trim() === "") {
        return "This cannot be empty. Please enter a number more than 0!";
    } else if (input) {
        return (
            (!isNaN(input) && input > 0) ||
            "Please enter a valid number greater than 0!"
        );
    } else {
        return "Please enter a number!";
    }
};
// Create a function to validate the number
const validateNumber = (input) => {
    if (input.trim() === "") {
        return "This cannot be empty. Please enter a number more than 0!";
    } else if (input) {
        return (
            (!isNaN(input) && input >= 0) ||
            "Please enter a valid number greater than or equal to 0!"
        );
    } else {
        return "Please enter a number!";
    }
};
// Create an array of questions for user input for the manager
const managerQuestions = [{
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
        validate: validateInput,
    },
    {
        type: "input",
        name: "id",
        message: "What is the team manager's ID?",
        validate: validateId,
    },
    {
        type: "input",
        name: "email",
        message: "What is the team manager's email?",
        validate: validateEmailFormat,
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?",
        validate: validateNumber,
    },
];
// Create an array of questions for user input for the engineer
const engineerQuestions = [{
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
        validate: validateInput,
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?",
        validate: validateId,
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email?",
        validate: validateEmailFormat,
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?",
        validate: validateInput,
    },
];
// Create an array of questions for user input for the intern
const internQuestions = [{
        type: "input",
        name: "name",
        message: "What is the intern's name?",
        validate: validateInput,
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's ID?",
        validate: validateId,
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?",
        validate: validateEmailFormat,
    },
    {
        type: "input",
        name: "school",
        message: "What is the intern's school?",
        validate: validateInput,
    },
];
// Create a function to add an employee
const addEmployee = () => {
    inquirer
        .prompt([{
            type: "list",
            name: "role",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members",
            ],
        }, ])
        .then((managerChoice) => {
            // Switch statement to add an engineer, intern, or finish building the team
            if (managerChoice.role === "Engineer") {
                console.log("Let's add an engineer!");
                addEngineer();
            } else if (managerChoice.role === "Intern") {
                console.log("Let's add an intern!");
                addIntern();
            } else {
                console.log("Let's finish building your team!");
                buildTeam();
            }
        });
};
// Create a function to add a manager to the team
const addManager = () => {
    inquirer.prompt(managerQuestions).then((answers) => {
        const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );
        team.push(manager);
        addEmployee();
    });
};
// Create a function to add an engineer to the team
const addEngineer = () => {
    inquirer.prompt(engineerQuestions).then((answers) => {
        const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );
        team.push(engineer);
        addEmployee();
    });
};
// Create a function to add an intern to the team
const addIntern = () => {
    inquirer.prompt(internQuestions).then((answers) => {
        const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        );
        team.push(intern);
        addEmployee();
    });
};
// This function builds the team html file. Using try...catch to handle errors.
async function buildTeam() {
    try {
        const htmlContent = render(team);
        await writeFileAsync(outputPath, htmlContent);
        console.log("Successfully wrote to team.html");
    } catch (error) {
        console.error(error);
    }
}
// Function call to initialize the app
addManager();