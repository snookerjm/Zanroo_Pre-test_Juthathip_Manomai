# React User CRUD

Single-page React application for managing users with local storage persistence.

## Features

- Add new user with `Name`, `Age`, and `Nickname`
- Inline edit existing user rows
- Delete users
- Single page application
- No backend required
- Data stored in browser `localStorage`

## Requirements implemented

1. User form with fields: `Name`, `Age`, `Nickname`
2. Add new user
3. Inline edit user
4. Delete user
5. Single page web app
6. No backend; data stored in `localStorage`
7. Uses ReactJS for frontend

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Required versions

- Node.js: `>= 18.0.0`
- npm: `>= 9.0.0`
- React: `18.3.1`
- Vite: `5.4.1`

## Build

```bash
npm run build
```

## Notes

- Initial users are preloaded as `Mr A` and `Mr B`
- Changes persist after refresh using `localStorage`
