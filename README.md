# SBA 319
## Project
SBA 319 is a major project showcasing my skills regarding utilizing node.js, express.js, creating a RESTful API and maintaing/managing data with MongoDB/mongoose.

## Requirements
- Use at least three different data collections within the database (such as users, posts, or comments).
- Utilize reasonable data modeling practices.
- Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database.
- Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request.
- Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request.
- Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request.
- Include sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable.
- Include sensible MongoDB data validation rules for at least one data collection. (You must do this in MongoDB Atlas)
Note: this may be accomplished in a number of ways. If you choose to perform this task outside of your application's code, you must include a way to test the validation within the application's routes. This can be as simple as providing a POST route that attempts to create an invalid document and displays the resulting error.
- Populate your application's collections with sample data illustrating the use case of the collections. You must include at least five sample documents per collection.
Note: Double-check this requirement before submission. Testing your delete routes may leave you under the requirement. To be safe, populate your collections with sample data well above the requirement (we recommend 10-20 documents).
Utilize reasonable code organization practices.
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
- Commit frequently to the git repository.
- Include a README file that contains a description of your application.
This README must include a description of your API's available routes and their corresponding CRUD operations for reference.
- Level of effort displayed in creativity and user experience.

## Tools Used
VSCode, node.js, express.js, mongoose, mongoDB

## Coding Languages used
HTML, CSS, Javascript (vanilla) 

## Pet Data
The theme of this project was creating a backend for a shelter that helps cats, dogs and exotic pets. There are seperate databases for each type of animal (cats, dogs, exotics) and APIs availble to view and manage the data.

Pets have the following data associated with them;

*Cats* and *Dogs* must be given a name, breed, age, pen_number and health_notes. Within health notes; supplements, whether the animal is currently sick and their healing progress are required. *Cats* and *Dogs* can only be held in pens 1 - 15. There can be up to 2 cats/dogs per pen.
For *Exotics*, they must be given a name, breed, age, pen_number and health_notes. Within health notes; supplements, whether the animal is currently sick and their healing progress are required. *Exotics* do not have pen mates and can only be placed in pens 16 - 40.