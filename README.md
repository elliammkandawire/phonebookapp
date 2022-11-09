# phonebookapp app

## 1. PHONE BOOK API
* Open the folder called `phonebook-api` in the repository
* Create an empty mysql database called `phonebook`
* File `phonebook/application.properties` has properties for the app. Change where necessary.
* Open folder `phonebook-api/deploy`
* Open command promp and run with command `java -jar phonebook-0.0.1.jar`
* This console should be up and running.
* If everything is in order, the api will be up and running and will create a table called `contact` in the database where contacts will bbeb saved


## 1. PHONE BOOK CLIENT
* Open the folder called `phonebook-client` in the repository
* Open a file called `.env` and edit the base url port if you have changed the port in api application.properties. Leave the rest unchanged. 
* Install the packages with command `yarn install`
* Run the app with command `yarn start`. This will run the app on default port 3000 or ask you to change if port 3000 is taken.
* Open browser and type `http://127.0.0.1:3000` to access the app
* If the API is up and running, you should get a page where you can add contacta




