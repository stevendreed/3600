const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '1h'; // CHANGE THIS VALUE to update length of expiration
// uses VERCEL/MS => https://github.com/vercel/ms
// vercel is a way to convert various times into ms - quite handy!

// auth middleware allows tokens to easily be sent to req.body, req.query,
// or req.headers
const authMiddleware = function( {req} ) {
  let token = req.body.token || req.query.token || req.headers.authorization


  // debugging log
  console.log(`authMiddleware invoked with ${req}`);

  // exception handling: if no token present, return the request
  if (!token)
  {
    return req;
  }

  // if token is sent in headers, we need to pull the token from amongst white
  // space
  // this logic splits the token into an array with partitions set at each ' '
  // => this means each element of the array is any contiguous characters
  // without a white space
  // .pop() returns the last item in the array (the highest index) element
  // .trim() is a useful utility function that removes excess whitespace
  if (req.headers.authorization)
  {
    token = token.split(' ').pop().trim();
  }
  // if there is a valid token, verify the token
  // if this token is valid, return it to the resolver for use as context s.t.
  // context is an authenticated token
  try {
    // verify the token from req.body/query.token || req.headers.authorization
    const { ver } = jwt.verify(
      token, secret, { mageAge: expiration }
      );
    // HINT: if secret is not defined, check your environmental variables 
    // to confirm a secret is defined
  } catch (err) {
    console.log(`Invalid token, error: ${err}`);
    // added ${err} for debugging, verify no security leaks present
  }
}

const signToken = function({ email, name, _id }) {
  return jwt.sign(
    { data: { email, name, _id }}, 
    secret, 
    { expiresIn: expiration }
    );
}

module.exports = {
  authMiddleware,
  signToken
}