import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Hashing function using bcrypt
export async function Encryption(password) {
  const saltRounds = 5; 
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
    console.error('Error comparing passwords:', err.message);
    throw new Error('Error comparing passwords: ' + err.message);
  }
};



// Create JWT token with a 8hours expiry
const JWT_SECRET = 'helloyeaaah';
export const TokenGenerate = (userId, email, userType) => {
  try {
    return jwt.sign(
      { userId, email, userType }, // Payload containing userId and email
      JWT_SECRET,        
      { expiresIn: '72h' }
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
    console.error('Token verification failed:', err.message);
    throw new Error('Invalid or expired token');
  }
};

