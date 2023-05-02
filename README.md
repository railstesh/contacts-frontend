# Contacts Frontend

Contacts Frontend is a web application built with React that allows users to manage a list of contacts. This repository contains the code for the frontend of the application, which includes the user interface and the logic for interacting with the backend API.

## Installation

To use Contacts Frontend, you'll need to have Node.js and npm (or yarn) installed on your machine. You can download them from the [official Node.js website](https://nodejs.org/).

Once you have Node.js and npm (or yarn) installed, you can clone this repository to your machine using Git:

```
git clone https://github.com/railstesh/contacts-frontend.git
```

Then, navigate to the project directory and install the required packages:

```
cd contacts-frontend
npm install
```

or

```
cd contacts-frontend
yarn install
```

## Usage

Before using the Contacts Frontend application, make sure you have the Contacts Backend API running on your machine on `3001` port (because the backend endpoint is set to be as `localhost:3001/{endpoints}`).

You can follow the installation and usage instructions for the backend in its [repository](https://github.com/railstesh/contacts-backend).

Once you have the backend API running, you can start the frontend application by running the following command:

```
npm start
```

or

```
yarn start
```

This will start the application and open it in your default web browser at `http://localhost:3000`.

## Functionality

Contacts Frontend allows you to:

- View a list of all contacts in the database
- Add a new contact
- Edit an existing contact
- See edit history of edited contacts.

The application has a simple and user-friendly interface that allows you to easily manage your contacts.
