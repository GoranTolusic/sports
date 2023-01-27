import { Request, Response } from 'express';
import { Service } from "typedi";
import CustomService from '../services/CustomService';

@Service()
class CustomController {
    constructor(private readonly customService: CustomService) { }

    public async enroll(req: any, res: Response) {
        try {
            let results = await this.customService.enroll(req)
            res.json(results)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async unenroll(req: any, res: Response) {
        try {
            let result = await this.customService.unenroll(req)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async rate(req: any, res: Response) {
        try {
            let result = await this.customService.rate(req)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async comment(req: any, res: Response) {
        try {
            let result = await this.customService.comment(req)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export default CustomController