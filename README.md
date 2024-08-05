# Employee Data Table Project

This project implements a dynamic and interactive employee data table with advanced filtering, sorting, and searching capabilities using React and Next.js.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Project Overview

This project creates a robust employee data management system with a user-friendly interface. It allows users to view, sort, filter, and search through employee data efficiently.

## Features

- Display employee data in a tabular format
- Sort data by clicking on column headers
- Advanced filtering options for each column
- Date-specific filtering for date fields
- Global search functionality
- Reset filters individually or all at once
- Responsive design

## Technologies Used

- React
- Next.js
- TypeScript
- Material-UI
- Tailwind CSS
- Shadcn/UI


## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/BSxTitaN/Shipmnts
   cd employee-data-table
   ```

2. Install dependencies:
   ```
   npm install
   ```
   I have used bun as my package manager. So you can even use bun install to install the dependencies.
   ```
   bun install
   ```

3. No need to add any enviornment variables.

4. Run the development server:
   ```
   npm run dev
   ```
   I have used bun as my package manager. So you can even use bun run dev to run the development server.
   ```
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Usage

1. **Sorting**: Click on any column header to sort the data. Click again to reverse the sort order.

2. **Filtering**: 
   - Click on the column name to open the filter drawer.
   - Select a filter type and enter the filter value.
   - Click "Apply Filter" to filter the data.

3. **Searching**: Use the search bar at the top to perform a global search across all columns.

4. **Resetting Filters**:
   - Click the "×" button next to a column name to reset that column's filter.
   - Use the "Reset All Filters" button to clear all applied filters.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.