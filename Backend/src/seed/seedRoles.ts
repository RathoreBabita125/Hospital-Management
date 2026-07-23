import { AppDataSource } from "../config/db.ts"
import { Role } from "../modals/role.ts";

/**
 * Role seed function.
 * Creates default application roles
 * if they do not already exist.
*/

export const seedRoles = async () => {
    const roleRepo = AppDataSource.getRepository(Role);
    const allRoles = ['Admin', 'Doctor', 'Patient'];

    for(let myRole of allRoles){
        const findRoles = await roleRepo.findOne({ where: { roleName: myRole } });
        
        // Check whether role is already present
        if(!findRoles){
            const newRole=roleRepo.create(
                {
                    roleName:myRole
                }
            ) 
            await roleRepo.save(newRole);
        }
    }
}