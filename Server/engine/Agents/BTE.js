import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

 
// Hashing function using bcrypt with const
export async function Encryption(password) {
  const saltRounds = 5; // Set salt rounds (work factor)
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    return hashedPassword;
  } catch (err) {
    throw new Error('Error hashing password: ' + err.message); 
  }
};

// compare the password with the hashed password using bcrypt.compare
export async function comparePWD(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    throw new Error('Error comparing passwords: ' + err.message);
  }
};



// Create JWT token with a 8hours expiry
const JWT_SECRET = 'WORKITOWNIT';
export const TokenGenerate = (userId, email, userType) => {
  try {
    return jwt.sign(
      { userId, email, userType }, // Payload containing userId and email
      JWT_SECRET,        // Secret key for signing
      { expiresIn: '08h' }
    );
  } catch (err) {
    throw new Error("Error generating JWT for seller: " + err.message);
  }
};

// verify tkn
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

