import { AppDataSource } from "../config/db.ts"
import { Role } from "../modals/role.ts";
import { User } from "../modals/user.ts";
import bcrypt from 'bcrypt'

/**
 * Admin seed function.
 * Creates a default admin user account
 * if it does not already exist.
*/
export const seedAdmin=async()=>{

    const roleRepo=AppDataSource.getRepository(Role);
    const adminRole=await roleRepo.findOne({where:{roleName:'Admin'}});

    if(!adminRole){
        throw new Error("Admin role not found");
    }

    // gets user repository
    const userRepo=AppDataSource.getRepository(User);
    const admin=await userRepo.findOne({
        where:{
            email:"babita@gmail.com"
        }
    })

    // Hash admin password before storing in database
    const hashedPassword=await bcrypt.hash("Babita@12345", 10);

    // Create admin user if not already registered
    if(!admin){
        await userRepo.save({
            userName:"Babita Rathore",
            email:"babita@gmail.com",
            password:hashedPassword,
            phone:"9876543210",
            role:adminRole 
        })
    }
}