const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '1h'; // CHANGE THIS VALUE to update length of expiration
// uses VERCEL/MS => https://github.com/vercel/ms
// vercel is a way to convert various times into ms - quite handy!

