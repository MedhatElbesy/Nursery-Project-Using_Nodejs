
Nursery System Backend

Overview

This project aims to create a RESTful API backend for a nursery system. The system will have one administrator,
teachers, and children. The administrator will manage teachers and children. The backend will be built using Node.js and Express,
with MongoDB as the database. JSON responses with correct status codes will be provided for all endpoints.

Installation

1-Clone the repository:
git clone [repository_url](https://github.com/MedhatElbesy/Nursery-Project-Using_Nodejs.git)

2-Navigate to the project directory:
cd nurserySystem

3-Install dependencies:

npm install

4-Create a .env file in the root directory and add the following environment variables:
SECRET_KEY=your_secret_key
DB_URL=your_mongodb_url
PORT=your_port_number

Project Structure
The project follows the MVC (Model-View-Controller) architecture and has the following structure:

* models: Contains data models for teachers, children, and classes.
* controllers: Handles business logic for various operations.
* routes: Defines API routes.
* middlewares: Contains custom middleware functions.
* uploads: Stores uploaded profile pictures.

Running the Server
Start the server by running:
npm run dev

Endpoints
1- Teacher Routes
GET /teachers: Get all teachers.
GET /teachers/:id: Get teacher by ID.
POST /teachers: Add a new teacher.
PUT /teachers/:id: Update teacher data.
DELETE /teachers/:id: Delete specified teacher.
GET /teachers/supervisors: Get all class supervisors.

2- Child Routes
GET /children: Get all children.
GET /children/:id: Get child by ID.
POST /children: Add a new child.
PUT /children/:id: Update child data.
DELETE /children/:id: Delete specified child.

3- Class Routes
GET /classes: Get all classes.
GET /classes/:id: Get class by ID.
POST /classes: Add a new class.
PUT /classes/:id: Update class data.
DELETE /classes/:id: Delete specified class.
GET /classes/child/:id: Get class children info.
GET /classes/teacher/:id: Get class supervisor info.

Additional Features
* All endpoints have server-side validation using express-validator.
* MongoDB is used as the database.
* Swagger documentation is available for all endpoints.
* Passwords are encrypted in the database.
* Profile pictures for teachers and children are uploaded and stored in the uploads directory.
* Change password endpoint is available.
* Project is connected to GitHub for version control.

This project is supervised by [Eman Fathi] Teaching Assistant of the Open Source Department at the Information Technology Institute (ITI),
Ministry of Communications and Information Technology.

  Contributors
Medhat Elbesy
