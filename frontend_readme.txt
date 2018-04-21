To run the frontend on windows, first you have to go to this link: https://nodejs.org/dist/v8.11.1/node-v8.11.1-x64.msi and install node js 8.1.1 with all the default options

After Nodejs is installed, open Powershell inside the frontend folder (shift + right click and click powershell) and run the command "npm install".
This command will install all the dependencies needed for the project. 

Now to run the site, run the command "ng serve --open"

The Front end has two parts, components and services. Components are used to break up the certain parts of the site like the map, login page, etc. Services are used for background tasks like talking to the backend