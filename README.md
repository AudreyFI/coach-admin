# Coach Admin

This is a React/Vite project.

It's styled with Tailwind.

! All labels are in French !

## Project Description

Coach Admin is a subscription management system designed to streamline the process of handling member subscriptions.

## Features ----- WORK IN PROGRESS -----

- <i>User authentication and authorization</i> ----- WORK IN PROGRESS -----
- Subscription plan management
- Admin dashboard for managing members
- <i>Admin dashboard for managing subscriptions</i> ----- WORK IN PROGRESS -----

## Installation

1. Clone the repository and navigate to the project directory:

```bash
cd coach-admin
```

3. Install dependencies:

```bash
npm install
```

## Usage

1. Add your own members in the MEMBERS array in the .env file
   This project contains an implementation of mock repositories but you can switch to an api implementation with the help of the repositories/dependencies.ts file. This file is injected when calling the services so you can easily switch between mocks and api.
   You can use the ([customers-subscriptions api](https://github.com/AudreyFI/customers-subscriptions)) as a backend.

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
