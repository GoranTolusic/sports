import { Response } from 'express';
import { Service } from "typedi";
import CustomService from '../services/CustomService';

@Service()
class CustomController {
    constructor(private readonly customService: CustomService) { }

    public async enroll(req: any, res: Response) {
        try {
            await this.customService.enroll(req)
            res.json({ message: 'You have been successfully enrolled in class' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async unenroll(req: any, res: Response) {
        try {
            await this.customService.unenroll(req)
            res.json({ message: 'You have been successfully unenrolled from class' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async rate(req: any, res: Response) {
        try {
            await this.customService.rate(req)
            res.json({ message: 'You have been successfully rated class' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async comment(req: any, res: Response) {
        try {
            await this.customService.comment(req)
            res.json({ message: 'You have been successfully commented class' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async getSports(req: any, res: Response) {
        try {
            let results = await this.customService.getSports()
            res.json(results)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export default CustomController