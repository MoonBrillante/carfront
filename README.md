# Car Shop Application

This project is a Full Stack Web Application for managing cars. The frontend is built with React and TypeScript, using Material-UI for the UI, and includes functionality for Create, Read, Update, Delete (CRUD) operations. The backend is built with Spring Boot and Maven.

## Frontend (React + TypeScript)

### Features:
- **CRUD Operations**: Add, view, edit, and delete cars from the list.
- **DataGrid**: Data table displaying car information with built-in sorting, filtering, pagination, and export functionalities.
- **Filtering**: Filter data based on car attributes (e.g., brand, model, color, etc.).
- **Column Management**: Enable/disable columns in the data grid.
- **Export**: Export the list of cars in a downloadable format.

### Technologies Used:
- React
- TypeScript
- Vite
- Material-UI (including DataGrid)
- Axios
- React Query for data fetching

### Installation:

  ### Create a new Vite React project with TypeScript:

- npm create vite@latest

  ### Name the project carfront, select React and TypeScript when prompted:

- cd carfront

### Install the necessary dependencies:

- npm install
- npm run dev

### Install Material-UI and Emotion for styling

- npm install @mui/material @emotion/react @emotion/styled

### Install React Query for data fetching

- npm install @tanstack/react-query@4

### Install Axios for making API requests

- npm install axios

### Install MUI's DataGrid for displaying the table

- npm install @mui/x-data-grid

### Set up React Query's useQuery for data fetching.

### Create a new .env file in the root folder of your app and add the following environment variable:

- VITE_API_URL=http://localhost:8080 

### This sets the API base URL that the frontend will use to communicate with the backend.

### How to Use:

- **Add a Car**: Click the "NEW CAR" button to add a new car to the list. Fill in the form with the car details and submit it.

- **View/Edit/Delete Cars**: Use the pencil icon to edit a car, and the trash icon to delete a car.

- **Filtering and Sorting**: Use the filters provided at the top of the grid to filter cars based on brand, model, color, etc. 
  
- You can also sort the columns by clicking on the column headers.
  
- **Export**: Export the table data by clicking the "EXPORT" button in the top right of the table.

### Notes:
- Data Fetching: The app uses useQuery from React Query to fetch data from the backend. Make sure the backend is running on http://localhost:8080 or update the API URL in the .env file as needed.
  
- Customization: The table allows you to customize visible columns, apply filters, and sort the data. Use the toolbar at the top of the DataGrid for column management and export options.
