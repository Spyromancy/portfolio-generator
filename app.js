const inquirer = require("inquirer");

const fs = require('fs');

const generatePage = require('./src/page-template.js');

const { writeFile, copyFile } = require('./utils/generate-site');


/*const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name,github] = profileDataArgs;



fs.writeFile('index.html',generatePage(name,github), err=>{
    if(err) throw new Error(err);
    console.log('Portfolio complete! Check out index.html to see the output!');
});
*/

const promptUser = () => {
    return inquirer.prompt([
        // Name
        {
            type:'input',
            name:'name',
            message:'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        // Github
        {
            type:'input',
            name:'github',
            message:'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        // About Confirm
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        // About
        {
            type:'input',
            name:'about',
            message:'Provide some information about yourself:',
            /*
            when: ({confirmAbout}) => {
                if(confirmAbout) {
                    return true;
                }
                else{
                    return false;
                }
                // shouldn't this just be [ when: ({confirmAbout}) => confirmAbout ]
                // Answer yes.
            }
            */
            when: ({confirmAbout}) => confirmAbout
        }
        ]);
};

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);
    if(!portfolioData.projects){
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        // Project Name
        {
            type:'input',
            name:'name',
            message:'What is the name of your project? (Required)',
            validate: projectInput => {
                if (projectInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        // Project Description
        {
            type:'input',
            name:'description',
            message:'Provide a description of the project (Required)',
            validate: descInput => {
                if (descInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        // Languages Used
        {
            type:'checkbox',
            name:'languages',
            message:'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        // GitHub Link
        {
            type:'input',
            name:'link',
            message:'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        // Feature?
        {
            type:'confirm',
            name:'feature',
            message:'Would you like to feature this project?',
            default: false
        },
        // Add another?
        {
            type:'confirm',
            name:'confirmAddProject',
            message:'Would you like to enter another project?',
            default:false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            }
            else {
                return portfolioData;
            }
        });
};

promptUser()
    .then(promptProject)
        .then(portfolioData => {
            return generatePage(portfolioData);
        })
        .then(pageHTML => {
            return writeFile(pageHTML);
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);
            return copyFile();
        })
        .then(copyFileResponse => {
            console.log(copyFileResponse);
        })
        .catch(err => {
            console.log(err)
        })