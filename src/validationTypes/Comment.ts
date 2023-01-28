
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Service } from "typedi";

@Service()
class Comment {
    @IsNotEmpty()
    @IsNumber()
    classId: number

    @IsNotEmpty()
    @IsString()
    comment: string

    readonly createdAt: number = Date.now()

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['classId', 'comment']
    }
}

export default Comment