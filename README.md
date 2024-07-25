![Logo](public/images/infynity-logo.png)

# About - Infinity UI

With a steadfast commitment to aiding companies in their organizational endeavors, Infynity offers a comprehensive platform designed to streamline team management and goal tracking processes. Infynity facilitates this through its innovative features, providing interactive representations of team goals and scorecards, thereby offering a clear and intuitive means for organizations to monitor progress and drive success. With Infynity at their disposal, organizations can navigate the complexities of team management with ease, fostering a culture of collaboration and achievement.

### Technologies

-  Next.JS - 14.2.4
-  React.JS - 18
-  React DOM - 18
-  Redux - 5.0.1
-  TypeScript - 7.12.0
-  Sass - 1.77.4
-  Tailwind CSS - 3.4.1
-  Mantine UI
-  Mantine Forms
-  @mantine Dates

### Third party libraries

-  Axios - (To make HTTP requests)

### Project Setup

1. Clone the repository from BitBucket
2. Install dependencies using `yarn` or `yarn install`

### Run the application

-  Dev mode `yarn run dev`
-  QA mode `yarn run qa`
-  Prod mode `yarn run prod`
-  Finally, open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build the application

To create a production-ready build, run the following command: `yarn run build:dev` or `npm run build:dev`

### Project Structure

`app/` - Pages folder

`src/components` - Common components for entire project

`src/containers` - Components for respective pages

`src/types` - Prop types for components

`src/redux` - Global data for the app

`src/styles` - Global styles

`src/helpers` - Utility functions

`src/services` - APIs or business logic

`src/constants` - Global constants

`src/hooks` - React hooks

### Linting and Code Formatting

This project uses ESLint and Prettier for code styling and formatting.

To check for lint issues: `yarn lint-staged`

### Learn More

To learn more about Next.js, take a look at the following resources:

-  [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-  [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
