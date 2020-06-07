const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function initialQuestion() {
    return inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Are you an Intern, Engineer or Manager",
            choices: ["Intern", "Engineer", "Manager", "None"]
        }
    ]);
}

const addManager = [
    {
        type: "input",
        message: "Please enter your name",
        name: "name",
    },
    {
        type: "input",
        message: "Please provide your employee ID",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter your email address",
        name: "email",
    },
    {
        type: "input",
        message: "Please enter your office number",
        name: "officeNumber"

    }
];

const addEngineer = [{
    type: "input",
    message: "Please enter your name",
    name: "name",
},
{
    type: "input",
    message: "Please provide your employee ID",
    name: "id"
},
{
    type: "input",
    message: "Please enter your email address",
    name: "email",
},
{
    type: "input",
    message: "Please enter your Github Profile",
    name: "githubProfile"

}

]
const addIntern = [{
    type: "input",
    message: "Please enter your name",
    name: "name",
},
{
    type: "input",
    message: "Please provide your employee ID",
    name: "id"
},
{
    type: "input",
    message: "Please enter your email address",
    name: "email",
},
{
    type: "input",
    message: "Please enter your School",
    name: "school"

}

]

const employeeArr = [];

function buildTeam() {

    initialQuestion().then(function (answer) {
        if (answer.type === "Manager") {
            inquirer.prompt(addManager).then(function (data) {
                let manager = new Manager(
                    data.name,
                    data.id,
                    data.email,
                    data.officeNumber
                );
                employeeArr.push(manager);
                buildTeam();

            })
        }
        else if (answer.type === "None") {
            var newHTML = render(employeeArr);
            fs.writeFile("./output/team.html", newHTML, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        else if (answer.type === "Engineer") {
            inquirer.prompt(addEngineer).then(function (data) {
                let engineer = new Engineer(
                    data.name,
                    data.id,
                    data.email,
                    data.githubProfile
                );
                employeeArr.push(engineer);
                buildTeam();
            })
        }
        else if (answer.type === "Intern") {
            inquirer.prompt(addIntern).then(function (data) {
                let intern = new Intern(
                    data.name,
                    data.id,
                    data.email,
                    data.school
                );
                employeeArr.push(intern);
                buildTeam();
            })
        }

    });
}
buildTeam();


