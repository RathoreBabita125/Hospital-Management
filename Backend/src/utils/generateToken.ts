import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY=process.env.SECRET_KEY;

export const generateToken=(userData:any):string=>{ 
    const token=jwt.sign(
        {
            id: userData.id,
            email: userData.email,
            role: userData.role.id
        },
       SECRET_KEY!,
       {
        expiresIn:'7d'
       }
    )
    return token;
}