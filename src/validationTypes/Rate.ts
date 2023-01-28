
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Service } from "typedi";

@Service()
class Rate {
    @IsNotEmpty()
    @IsNumber()
    classId: number

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['classId', 'rating']
    }
}

export default Rate