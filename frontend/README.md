# VEMS Frontend

React dashboard frontend with:
- Styled Components
- Material UI
- Formik + Yup
- Day.js
- Redux + Redux Saga
- Optional Socket.IO client

## Run

```bash
npm install
npm run dev
```

## Build checks

```bash
npm run lint
npm run build
```

## Backend integration

Set `.env` values if you want to connect this client to a NestJS API:

- `VITE_API_URL`
- `VITE_SOCKET_URL`
- `VITE_LOGIN_ENDPOINT`
- `VITE_REFRESH_ENDPOINT`
- `VITE_ME_ENDPOINT`
- `VITE_REQUESTS_ENDPOINT`
- `VITE_NOTIFICATIONS_ENDPOINT`

If those are not set, the app runs in local demo mode with browser storage.
