# Company Profile Website

A simple React website starter created with Vite. It is ready to run locally and build for publishing.

## Start the website

Create your local environment file, update its public configuration values, and then start the app:

```powershell
Copy-Item .env.example .env
npm.cmd run dev
```

Only variables beginning with `VITE_` are available to browser code. Never place passwords, private API keys, database credentials, or other secrets in these variables.

The terminal will show a local address, usually `http://localhost:5173`. Open that address in your browser. Leave the terminal running while you work.

## The files you will edit most

- `src/pages/`: Route-level website pages and their content.
- `src/components/`: Reusable layout, section, and interface components.
- `src/constants/environment.js`: Central access to public environment configuration.
- `.env`: Local email, social, and hosted-animation configuration.
- `src/App.css`: The visual design for the page, including colors, spacing, and responsive layout.
- `src/index.css`: Site-wide defaults such as fonts and page width.
- `index.html`: Browser tab title and description. Update these before publishing.

React updates the page automatically whenever you save a file.

## Useful commands

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
npm.cmd run lint
```

## Before publishing

1. Replace `NORTHSTAR`, the sample wording, email address, and service descriptions in `src/App.jsx`.
2. Update the page title and description in `index.html`.
3. Run `npm.cmd run build`. The publishable files will be created in the `dist` folder.

## Adding images later

Put images in `src/assets`, then import them at the top of `src/App.jsx`:

```jsx
import officeImage from './assets/office.jpg'
```

Use it in the page like this:

```jsx
<img src={officeImage} alt="Our team in the office" />
```
