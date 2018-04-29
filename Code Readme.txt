For the backend, there are two parts: the python backend and the database. I made a folder with all the executables needed so you don't have to download them all 
1) Install Python 3, which is the "python-3.6.5-amd64.exe" file
	a) Make sure at click the "Add to Path" checkbox at the beginning of the installation
2) Next you may need to install Visual C++ if you don't have it on your machine already. That is the vc_redist.x64.exe
3) Next is the MySQL, this file is called mysql-installer-web-community-8.0.11.0.exe
	a) There are 5 things you need to install through this install
		1. MySQL Server
		2. MySQL Workbench
		3. MySQL Shell
		4. MySQL Router
		5. Connector/Python (3.6) 8.0.11
	b) When installing, choose the Custom option and find these 5 programs
		1. MySQL Server is under the MySQL Servers folder
		2. MySQL Workbench, Shell, Router are under the Applications folder 
		3. Python connector is in the MySQL Connectors folder. Make sure to get the Python 3.6 x64 connector
  
	c) Then just go through the configuration leaving everything as default except for the root password.
		1. When you hit the password part, make it "password" (without the quotation marks
		2. When you hit the Authentication Method, check the Legacy Authentication Method
		IF YOU DONT DO THIS YOU WON'T BE ABLE TO GET INTO THE DATABASE
	d) Open the program MySQL Workbench and double click on "Local instance MySQL Router" 
		a) Itll ask for the root password, just type in "password" and click connect
		b) Finally, click on the button in the toolbar that looks like two cylinders stacked on top of each other (If you hover over it it should say something like create new schema), and call the new schema "project"

4) To get backend up and running, you first have to change Powershells execution policy
	a) Open Powershell as Administrator and run the command "Set-ExecutionPolicy RemoteSigned"
5) Next You have to set up the virtual environment so python can run
	a) In Powershell run "pip install virtualenv"
	b) Then in the Group2Project folder, run "virtualenv venv/"
	c) Then run "venv/Scripts/activate"
	d) then run "pip install -r Code/requirements/base.txt"
	e) then run "python Code/manage.py migrate"
6) Now you should be able to run the backend by using the command "python Code/manage.py runserver"



To run the frontend on windows, first you have to go to this link: https://nodejs.org/dist/v8.11.1/node-v8.11.1-x64.msi and install node js 8.1.1 with all the default options

After Nodejs is installed, open Powershell inside the frontend folder (shift + right click and click powershell) and run the command "npm install".
This command will install all the dependencies needed for the project. 

Now to run the site, run the command "npm start"

The frontend will compile everything and when its done, you should see "webpack: Compiled successfully".
Then go to localhost:4200 to see the site

The Front end has two parts, components and services. Components are used to break up the certain parts of the site like the map, login page, etc. Services are used for background tasks like talking to the backend

