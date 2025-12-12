# Thrift Mock Server

This is a simple Express server used to simulate register/login/OTP/BVN endpoints for the thrift-vite frontend.

Install and run:

```powershell
cd server
npm install
npm start
```

The server listens on `http://localhost:4000` by default and exposes:
- `POST /api/register` -> {name,email,phone,password,type,groupName}
- `POST /api/login` -> {identifier, password}
- `POST /api/send-otp` -> {phone}
- `POST /api/verify-otp` -> {phone, code}
- `POST /api/verify-bvn` -> {phone, bvn}

Notes: OTP codes are logged to the server console and returned in the response for easy testing. This is a mock only — do not use in production.
