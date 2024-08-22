# Backend API

This repository contains the solution to a backend assessment challenge that involves creating an API to manage a business workflow. The API is built using Node.js, Express, and TypeScript. The goal of the solution is to efficiently move a business entity through several workflow stages, ensuring proper validation and state management.

## Solution Structure

- **src/constants/business.constants.ts**: Contains constants such as valid industries and industry lists.
- **src/db/business.table.ts**: Simulates a database using an in-memory store (Map) for businesses.
- **src/routes/business.router.ts**: Defines the API routes for managing business workflow.
- **src/services/business.services.ts**: Contains the business logic for handling workflow progression.
- **src/type/business.types.ts**: Type definitions for `Business`, `Industry`, `State`, and `Contact`.
- **src/error.ts**: Custom error handling class.
- **src/index.ts**: The main entry point that sets up and runs the Express server.

## API Endpoints

### 1. Update Workflow Progress
- **PUT /api/v1/business/:fein/workflow-progress**
- **Description**: Progresses the business through the workflow stages.

#### Request #1 (Creating a New Business)
- **Required Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response**:
  - **Status Code**: 201 Created
  - **Body**: 
    ```json
    {
      "nextSteps": "Please provide the 'industry' to move forward"
    }
    ```
- **Possible Errors**:
  - **400 Bad Request**: `Business fein and name are required`

#### Request #2 (Providing Industry)
- **Required Request Body**:
  ```json
  {
    "industry": "string"
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: 
    ```json
    {
      "nextSteps": "Please provide the 'contact' to move forward"
    }
    ```
  - **OR**:
  - **Status Code**: 200 OK
  - **Body**: 
    ```json
    {
      "nextSteps": "Sorry! Currently we are not supporting your industry. No more steps are required"
    }
    ```
- **Possible Errors**:
  - **400 Bad Request**: `Business "industry" is required for this step`
  - **400 Bad Request**: `Supported industries are: [list of industries]`

#### Request #3 (Providing Contact Information)
- **Required Request Body**:
  ```json
  {
    "contactName": "string",
    "contactPhone": "string"
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: 
    ```json
    {
      "nextSteps": "Sales team is processing your request"
    }
    ```
- **Possible Errors**:
  - **400 Bad Request**: `Please provide the contactName and contactPhone for the next steps`

#### Request #4 (Final Stage - Sales Team Review)
- **Request Body**: No additional data required.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
    ```json
    {
      "nextSteps": "Congratulations! Your business has been approved. No more steps are required"
    }
    ```
  - **OR**:
  - **Status Code**: 200 OK
  - **Body**:
    ```json
    {
      "nextSteps": "Sorry! Your business has been declined. No more steps are required"
    }
    ```

### 2. Get All Businesses
- **GET /api/v1/business/**
- **Description**: Retrieves a list of all businesses in the system.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
    ```json
    [
      {
        "fein": "string",
        "name": "string",
        "industry": "string",
        "contact": {
          "name": "string",
          "phone": "string"
        },
        "state": "number"
      }
    ]
    ```

## Running the Application

### Prerequisites
- Node.js
- npm

### Installation
```bash
npm install
```

### Running the Server
```bash
npm run dev
```

### Testing the API
Use Postman, Curl, or any API client to interact with the Worfklow API at `http://localhost:3000/api/v1/business/:fein/workflow-progress`.

Use `http://localhost:3000/api/v1/business` to debug the changes i.e. to show a JSON of all the businesses currently in the system.

## Assumptions

- The application uses an in-memory data store (Map) for simplicity, as no external database is required.
- Error handling is done via custom exceptions to maintain a clean and consistent API response structure.

## Future Enhancements

- Add the authentication and authorization middleware before the request.
- Implementing persistence with a database like MongoDB or PostgreSQL.
- Adding unit tests for the services and routes.
- Introducing input validation middleware for better request validation.

## Author

Muhammad Ahmad
