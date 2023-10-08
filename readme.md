# test-boo

**Note: This application was created for a technical test at Boo.**

This is a Node.js application built using the Express framework, following the SOLID principles and Clean Architecture. It includes various components such as models, repositories, use cases, handlers, tests, swagger documentation.

## Table of Contents

- [Project Structure](#project-structure)
- [Driver](#database)
- [Documentation](#documentation)
- [Endpoints](#endpoints)
- [Static Pages](#static-pages)
- [Testing](#testing)
- [How to](#how-to)

---

## Project Structure

The project structure follows the SOLID principles and Clean Architecture, which includes the following components:

- **Model**:
  - Entities: Representing the data structure.
  - DTOs (Data Transfer Objects): For transferring data between layers.
  - Validation: Handling data validation and schemas.
- **Repository**: Responsible for data access and database interactions.
- **Use Case**: Contains business logic and use case-specific operations.
- **Handler**: Handles HTTP requests and responses, bridging the API with the use cases.

## Driver
- **Database**: Use MongoDB database, use library `mongodb-memory-server`.
- **Logging**: Use library `winston`.


## Documentation

The API documentation is available using `swagger` at the route `/docs`.


## Endpoints

The application provides the following endpoints:

- POST `/api/profile`: Create a new profile.
- GET `/api/comment`: Retrieve comments.
- POST `/api/comment`: Create a new comment.
- PATCH `/api/comment/like`: Like a comment.
- PATCH `/api/comment/unlike`: Unlike a comment.

## Static Pages

Static pages are available for profile details:

- `/profile/{id}`: Displays the profile with the specific ID.

## Testing

The application includes comprehensive testing using `jest` and `chai`:

- **Functional Test**: Tests the repository functions.
- **Unit Test**: Tests the usecase functions.
- **Integration Test**: Tests the HTTP handlers.

## How to

- **Run**: To run the application, execute the following command:

```bash
npm run start
```

- **Test**: To test the application, execute the following command:

```bash
npm run test
```
