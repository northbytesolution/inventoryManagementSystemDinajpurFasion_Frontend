# Bicycle Store Frontend

This is the frontend of the Bicycle Store e-commerce application, built using **React**, **TypeScript**, and **Vite**. The project is designed to provide a fast and modern user experience for browsing and purchasing bicycles.

## Features

- **React + TypeScript**: Ensures type safety and a robust development experience.
- **Vite**: Provides fast builds and hot module replacement (HMR) for a seamless development workflow.
- **Tailwind CSS**: Enables rapid UI development with utility-first CSS.
- **Redux**: Manages application state efficiently.
- **ESLint**: Enforces code quality and consistency.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

```
src/
├── assets/          # Static assets like images and SVGs
├── components/      # Reusable UI components
├── constants/       # Application-wide constants
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── pages/           # Page-level components
├── redux/           # Redux store and slices
├── routes/          # Application routing
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bicycle-store-frontend.git
   cd bicycle-store-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build

To build the project for production:

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Configuration

### ESLint

The project uses a custom ESLint configuration for TypeScript and React. To enable type-aware linting, update the `eslint.config.js` file as follows:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### Tailwind CSS

Tailwind CSS is configured in the `tailwind.config.js` file. You can customize the theme and plugins as needed.

## Deployment

The project is configured for deployment on **Vercel**. Update the `vercel.json` file as needed for your deployment settings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [ESLint](https://eslint.org/)# inventoryManagementSystemDinajpurFasion_Frontend
# inventoryManagementSystemDinajpurFasion_Frontend
