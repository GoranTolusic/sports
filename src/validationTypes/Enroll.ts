
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Service } from "typedi";

@Service()
class Enroll {
    @IsNotEmpty()
    @IsNumber()
    classId: number

    readonly createdAt: number = Date.now()

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['classId']
    }
}

export default Enroll