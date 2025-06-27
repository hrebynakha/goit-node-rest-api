# goit-node-rest-api


# Contacts API Description


## Authentication API

### POST /api/users/register

- **Description**: Register a new user.
- **Request Body**:
  - `email` (string): The email address of the user.
  - `password` (string): The password of the user.
- **Response**:
  - `201 Created`: User registered successfully. Return a new user email and subscription.
  - `400 Bad Request`: Invalid request data.
  - `500 Internal Server Error`: An error occurred while registering the user.

### POST /api/users/login

- **Description**: Log in a user.
- **Request Body**:
  - `email` (string): The email address of the user.
  - `password` (string): The password of the user.
- **Response**:
  - `200 OK`: User logged in successfully. Returns a token.
  - `401 Unauthorized`: Invalid credentials.
  - `500 Internal Server Error`: An error occurred while logging in the user.

### POST /api/users/logout

- **Description**: Log out a user.
- **Response**:
  - `204 No Content`: User logged out successfully.
  - `401 Unauthorized`: User is not authenticated.
  - `500 Internal Server Error`: An error occurred while logging out the user.

### GET /api/users/current

- **Description**: Get the current user.
- **Response**:
  - `200 OK`: Returns the current user email and subscription.
  - `401 Unauthorized`: User is not authenticated.
  - `500 Internal Server Error`: An error occurred while fetching the current user.

### PATCH /api/users/subscription

- **Description**: Update a user subscription.
- **Request Body**:
  - `subscription` (string): The new subscription level of the user.
- **Response**:
  - `200 OK`: User updated successfully.
  - `401 Unauthorized`: User is not authenticated.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: An error occurred while updating the user.

### PATCH /api/users/avatar

- **Description**: Update a user avatar.
- **Request Body**:
  - `avatar` (file): The new avatar of the user.
- **Response**:
  - `200 OK`: User updated successfully.
  - `401 Unauthorized`: User is not authenticated.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: An error occurred while updating the user.

## Contacts

### GET /api/contacts

- **Description**: Returns a list of contacts.
- **Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of contacts per page (default: 20)
  - `favorite` (optional): Filter by favorite status (true or false)
- **Response**:
  - `200 OK`: Returns a list of contacts.
  - `401 Unauthorized`: User is not authenticated.
  - `500 Internal Server Error`: An error occurred while fetching contacts.
- **Request Headers**:
  - `Authorization` (required): Bearer token for authentication.

### GET /api/contacts/:id

- **Description**: Returns a specific contact by ID.
- **Parameters**:
  - `id` (required): The ID of the contact to retrieve.
- **Response**:
  - `200 OK`: Returns the specified contact.
  - `401 Unauthorized`: User is not authenticated.
  - `404 Not Found`: Contact not found.
  - `500 Internal Server Error`: An error occurred while fetching the contact.
- **Request Headers**:
  - `Authorization` (required): Bearer token for authentication.

### POST /api/contacts 

- **Description**: Creates a new contact.
- **Request Body**:
  - `name` (string): The name of the contact.
  - `email` (string): The email address of the contact.
  - `phone` (string): The phone number of the contact.
  - `favorite` (optional): Whether the contact is a favorite (default: false)
- **Response**:
  - `201 Created`: Contact created successfully.
  - `400 Bad Request`: Invalid request data.
  - `401 Unauthorized`: User is not authenticated.
  - `500 Internal Server Error`: An error occurred while creating the contact.
- **Request Headers**:
  - `Authorization` (required): Bearer token for authentication.

### PUT /api/contacts/:id

- **Description**: Updates a specific contact by ID.
- **Parameters**:
  - `id` (required): The ID of the contact to update.
- **Request Body**:
  - `name` (string): The name of the contact.
  - `email` (string): The email address of the contact.
  - `phone` (string): The phone number of the contact.
  - `favorite` (optional): Whether the contact is a favorite (default: false)
- **Response**:
  - `200 OK`: Contact updated successfully.
  - `401 Unauthorized`: User is not authenticated.
  - `404 Not Found`: Contact not found.
  - `500 Internal Server Error`: An error occurred while updating the contact.
- **Request Headers**:
  - `Authorization` (required): Bearer token for authentication.

### DELETE /api/contacts/:id

- **Description**: Deletes a specific contact by ID.
- **Parameters**:
  - `id` (required): The ID of the contact to delete.
- **Response**:
  - `200 OK`: Contact deleted successfully.
  - `401 Unauthorized`: User is not authenticated.
  - `404 Not Found`: Contact not found.
  - `500 Internal Server Error`: An error occurred while deleting the contact.
- **Request Headers**:
  - `Authorization` (required): Bearer token for authentication.

### PATCH /api/contacts/:id/favorite

- **Description**: Updates the favorite status of a specific contact by ID.
- **Parameters**:
  - `id` (required): The ID of the contact to update.
- **Request Body**:
  - `favorite` (boolean): The new favorite status of the contact.
- **Response**:
  - `200 OK`: Contact updated successfully.
  - `401 Unauthorized`: User is not authenticated.
  - `404 Not Found`: Contact not found.
  - `500 Internal Server Error`: An error occurred while updating the contact.
- **Request Headers**:
  - `Authorization` (required): Bearer token for authentication.


