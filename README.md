# Node CRUD Challenge

## Overview
A simple Node.js CRUD API for managing person records using an in-memory database.

## Installation
1. Clone the repository:
   git clone https://github.com/your-username/node-crud-challenge.git

2. Navigate to the project directory:
   cd node-crud-challenge
   
3. Install dependencies:
   npm install
   
## API Endpoints

### Get All Persons
- **GET** `/person`
- Returns all persons.

### Get Person by ID
- **GET** `/person/${personId}`
- Returns a person by ID.

### Create a New Person
- **POST** `/person`
- **Body**:
  {
      "name": "Alemi",
      "age": 17,
      "hobbies": ["reading"]
  }

### Update an Existing Person
- **PUT** `/person/${personId}`
- **Body**:
  {
      "name": "Alemitu",
      "age": 18,
      "hobbies": ["cooking"]
  }

### Delete a Person
- **DELETE** `/person/${personId}` 
- Deletes a person by ID.

## Error Handling
- Returns `404 Not Found` for non-existing endpoints.
- Handles internal server errors.

## CORS Support
API is accessible from frontend applications on different domains.

## Running the Application
Run the server:
node app.js

Available at `http://localhost:3000`.
