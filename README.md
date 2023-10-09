
# Kylezhao101-api

An API backend service that provides access to my resume and other related information stored on mongoDB.

This project uses:

- Node
- Express
- Mongoose



## API Reference

**Base URL:** `/api`

### Endpoints without `apikey` Header

| Endpoint            | Method | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| `/all`              | GET    | Get all education, experience, and project records. |
| `/education`        | GET    | Get a list of all education records.           |
| `/experience`       | GET    | Get a list of all experience records.          |
| `/project`          | GET    | Get a list of all projects.                    |

### Endpoints Requiring `apikey` Header

#### Authentication

| Endpoint            | Method | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| `/authenticateApiKey` | Middleware | Check the validity of the API key provided in the `apikey` header. |

#### Education Endpoints

| Endpoint            | Method | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| `/education`        | POST   | Create a new education record.                 |
| `/education/:id`    | PATCH  | Update an education record by its ID.          |
| `/education/:id`    | DELETE | Delete an education record by its ID.          |

#### Experience Endpoints

| Endpoint            | Method | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| `/experience`       | POST   | Create a new experience record.                |
| `/experience/:id`   | PATCH  | Update an experience record by its ID.         |
| `/experience/:id`   | DELETE | Delete an experience record by its ID.         |

#### Project Endpoints

| Endpoint            | Method | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| `/project`          | POST   | Create a new project.                          |
| `/project/:id`      | PATCH  | Update a project by its ID.                   |
| `/project/:id`      | DELETE | Delete a project by its ID.  
