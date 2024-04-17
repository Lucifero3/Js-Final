
# Student Information Management System

## Overview

This system is designed to manage student information through web-based forms. It allows users to input student details, including ID, name, note sections, and documents, and performs CRUD operations to manage this data effectively.

## Files Description

- `index.html`: The main entry point of the application, containing the form for inputting student information and a table to display the stored data. It includes styles for layout and interactivity, as well as scripts for form handling and CRUD operations.

- `home.hbs`, `item.hbs`, `login.hbs`, `signup.hbs`: Handlebars templates for various parts of the application, including the homepage, individual item views, login, and signup pages. These templates ensure dynamic data rendering and user interaction support across the application.

## Functionality

- **Create**: Users can add new student records by filling out the form on the `index.html` page. Each record requires a student ID, name, note section, and document file.

- **Read**: The application displays all added records in a table format, allowing users to view the list of student information.

- **Update**: Users can edit existing records through the interface provided in the table. This functionality allows updating any part of the student's information.

- **Delete**: Records can be removed from the system through a delete button associated with each record in the table view.

## Technical Details

- The application uses HTML for structure, CSS for styling, and JavaScript for functionality. Handlebars templates (`*.hbs` files) are used to render dynamic content on the web pages.

- CRUD operations are handled through JavaScript, with form submissions and table updates occurring without the need for page reloads.

## Setup and Usage

To set up the application, host all files on a web server, ensuring that Handlebars is configured to process `.hbs` files. Access `index.html` through a web browser to start using the application.

For detailed instructions on hosting and configuration, refer to the hosting provider's documentation or the Handlebars templating engine guide.
