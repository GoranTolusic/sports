import { IsNotEmpty, IsEmail, IsString, IsIn, IsOptional } from 'class-validator';
import { Service } from "typedi";
import { uid } from 'uid';

@Service()
class UpdateUser {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firstName?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName?: string

    @IsOptional()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email?: string

    @IsOptional()
    @IsNotEmpty()
    @IsIn(['children', 'youth', 'youngAdults', 'adults'])
    age?: string

    readonly updatedAt: number = Date.now()
    
    static pickedProps(): string[] {
        return ['firstName', 'lastName', 'email', 'password', 'age']
    }
}

export default UpdateUser