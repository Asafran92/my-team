const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

console.log("Please input your teams information");

const createManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the managers name?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the managers email address?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the managers Id?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the managers office number?",
      },
    ])
    .then(({ managerName, managerId, managerEmail, managerOfficeNumber }) => {
      teamMembers.push(
        new Manager(managerName, managerId, managerEmail, managerOfficeNumber)
      );
      console.log(teamMembers);
      doMore();
    });
};
createManager();
function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the Engineers name?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineers email address?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineers Id?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineers github user name?",
      },
    ])
    .then(({ engineerName, engineerId, engineerEmail, engineerGithub }) => {
      teamMembers.push(
        new Engineer(engineerName, engineerId, engineerEmail, engineerGithub)
      );
      console.log(teamMembers);
      doMore();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the Interns name?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the interns email address?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is the interns Id?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "Where did the intern go to school?",
      },
    ])
    .then(({ internName, internEmail, internId, internSchool }) => {
      teamMembers.push(
        new Intern(internName, internId, internEmail, internSchool)
      );
      console.log(teamMembers);
      doMore();
    });
}

function doMore() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "doMore",
        message: "Do you want to add another employee type?",
        choices: ["Engineer", "Intern", "No Thanks"],
      },
    ])
    .then((response) => {
      switch (response.doMore) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        case "No Thanks":
          noThanks();
          break;
      }
    });
}

function noThanks() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
