
import { IsNotEmpty, IsString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Service } from "typedi";

@Service()
class UpdateClass {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string
    
    @IsOptional()
    @IsIn(['children', 'youth', 'youngAdults', 'adults'])
    ageLevel?: string

    @IsOptional()
    @IsIn(['oneHour', 'twohours', 'threeHours'])
    duration?: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    start?: number

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['description', 'ageLevel', 'duration', 'start']
    }
}

export default UpdateClass