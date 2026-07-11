import { AppDataSource } from "../config/db.ts"
import { Role } from "../modals/role.ts";

export const seedRoles = async () => {
    const roleRepo = AppDataSource.getRepository(Role);
    const allRoles = ['Admin', 'Doctor', 'Patient'];

    for(let myRole of allRoles){
        const findRoles = await roleRepo.findOne({ where: { roleName: myRole } });
        
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