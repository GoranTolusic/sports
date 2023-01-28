
import { IsNotEmpty, IsString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Service } from "typedi";

@Service()
class CreateClass {
    @IsNotEmpty()
    @IsString()
    description: string

    @IsNumber()
    @IsNotEmpty()
    sportId: number

    @IsIn(['children', 'youth', 'youngAdults', 'adults'])
    ageLevel?: string

    @IsIn(['oneHour', 'twohours', 'threeHours'])
    duration?: string

    @IsNotEmpty()
    @IsNumber()
    start?: number

    readonly createdAt: number = Date.now()

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['description', 'sportId', 'ageLevel', 'duration', 'start']
    }
}

export default CreateClass