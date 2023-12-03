# articulat3 React

#### [Development](#development-1)

##### [Project Structure](#project-structure-1)

##### [Components](#components-1)

##### [Usage](#usage-1)

##### [Testing](#testing-1)

#### [Learning Resources](#learning-resources-1)

#### [Contributing](#contributing-1)

## Development

### Project Structure

#### Tech Stack

The client uses the following architecture and technologies to develop the web application:

- [React TypeScript](https://react.dev/learn/typescript) as the development library and language
- [Vite](https://vitejs.dev/) for development bundling
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for static error prevention (outside of types)
- [Jest](https://jestjs.io/) for unit testing our components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for components

#### Folder Structure

```bash
├── .eslintignore
├── .eslintrc.js
├── .prettierrc.json
├── components.json
├── index.html                # Entry point of appllication
├── package.json
├── postcss.config.js
├── tailwind.config.js        # Tailwind CSS config file
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vite.setup.ts
├── public                    # Public assets
├── node_modules
├── README.md
└── src
    ├── @types
    ├── assets                # Static assets
    ├── components            # UI components
      ├── ...
      ├── Component           # Composite components
      ├── ...
      └── ui                  # shadcn/ui components
    ├── data                  # API
    ├── lib
    ├── locales
      └── en.json             # String constants in English
    ├── pages
      ├── Create              # Create Page
      ├── Gallery             # Gallery Page
      ├── App.tsx             # App component
      └── index.tsx           # React starting point
    ├── styles                # Global CSS
    ├── types
      └── api.ts              # Interfaces for API responses
    └── types.ts              # Interfaces for custom types
```

### Components

We use the [shadcn/ui](https://ui.shadcn.com/) collection to build our UI. Shadcn is a collection of re-usable components where you can install whatever component you need, and customize them to fit your theme. There's no need for any dependency installation. See the [documentation](https://ui.shadcn.com/docs) to learn more about shadcn and how to use their components.

To learn more about our UI components and pages, see the docstrings in the component `.tsx` files.

### Usage

Ensure that you have followed the [Development Requirements](https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/blob/main/README.md#development-requirements) to set up your local environment before running the client. To start the client:

```bash
cd client
pnpm install
pnpm run dev
```

### Testing

We have basic unit tests for most of the composite components. You can find them in the `/components/{Component}/tests` folder under the specific components. The tests check for component existence, correct variable labels, and strings matching the expected constants. In the future, we hope to expand on these unit tests and add integration tests to test for more complex behaviours.

Ensure that you have followed the [Development Requirements](https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/blob/main/README.md#development-requirements) to set up your local environment before testing. To run the unit tests:

```bash
cd client

# Running pnpm run test will ask you to install jsdom. Install and re-run the tests
pnpm run test
```

## Learning Resources

- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui Docs](https://ui.shadcn.com/docs)
- [React Typescript](https://www.typescriptlang.org/docs/handbook/react.html)

## Contributing

We will track our progress on issues and feature stories through [Github Projects](https://github.com/orgs/csc301-2023-fall/projects/3). Please make sure to read the [Contributing Guide](https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m/blob/main/.github/CONTRIBUTING.md) before making a pull request!
