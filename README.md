# ObApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Overview

ObApp is a modern Angular application that features a sophisticated data table component with advanced filtering capabilities. The application demonstrates best practices in Angular development and showcases the following key features:

- **Advanced Data Table**: A flexible and reusable table component built with Angular Material
- **Dynamic Column Filtering**: Support for filtering across multiple data types:
  - Text-based filtering for string columns
  - Numeric comparisons (>, >=, <, <=, =) for number columns
  - Date filtering with comparison operators
  - Status dropdown filtering
- **Material Design**: Utilizes Angular Material components for a polished, professional UI
- **Type Safety**: Fully typed components and interfaces for better development experience
- **Responsive Design**: Modern, responsive layout that works across different screen sizes

The table component supports different column types (string, number, boolean, date, status) and provides an intuitive filtering interface for each type. Users can filter data using:
- Text input for string columns
- Numeric comparisons for number columns
- Dropdown selection for status columns
- Clear filters functionality (per column and global)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
