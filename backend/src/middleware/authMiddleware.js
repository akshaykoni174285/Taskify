import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()


const authMiddleware = (req,res,next) => {
    
    // from the header get the Authorization
    // get the token
    // veryfy it 
    // if verified go the next else error
}