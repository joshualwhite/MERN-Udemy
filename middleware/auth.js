// Alternative to passport

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
  //Get the token from the header
  const token = req.header('x-auth-token');

  // check if no token exists
  if(!token){
    return res.status(401).json({ msg: 'No token, Authorization denied.' });
  }
  //verify the token
  try {
    await jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if(error) {
        res.status(401).json({ msg: 'Token is not valid.' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log('Error in Auth Middleware')
    res.status(500).json({ msg: 'Server Error' });
  }
};
