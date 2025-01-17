
# FrituursnackAPI

## Introduction
FrituursnackAPI is a project that involves HTML and JavaScript. This repository contains the implementation and related files for the FrituursnackAPI.

## Setup
To set up the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/WoutDepeuter/FrituursnackAPI.git
   ```
2. Navigate to the project directory:
   ```sh
   cd FrituursnackAPI
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Configure the environment variables:
   - Create a `.env` file in the root directory and add your database configuration.
5. Set up the database:
   ```sql
   CREATE TABLE snack (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL
   );

   CREATE TABLE saus (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT
   );
   ```
6. Start the application:
   ```sh
   cd backend/Routes
   node server.js
   ```

## Usage
Provide examples or instructions on how to use the project. If there are specific commands or scripts, include them here.

### Routes
- **GET /saus**: Fetches all saus.
- **POST /saus**: Adds a new saus. Requires `name` and `description` in the request body.
- **PUT /saus/:id**: Updates an existing saus by ID. Requires `name` and `description` in the request body.
- **DELETE /saus/:id**: Deletes a saus by ID.
- **GET /saus/add**: Serves the form to add a new saus.
- **GET /saus/listall**: Serves the list of all saus.

- **GET /snack**: Fetches all snacks.
- **POST /snack**: Adds a new snack. Requires `name`, `description`, and `price` in the request body.
- **PUT /snack/:id**: Updates an existing snack by ID. Requires `name`, `description`, and `price` in the request body.
- **DELETE /snack/:id**: Deletes a snack by ID.
- **GET /snack/add**: Serves the form to add a new snack.

## License
This project does not currently have a license specified.

You can edit and expand this README.md file by visiting [this link](https://github.com/WoutDepeuter/FrituursnackAPI/edit/main/README.md).
