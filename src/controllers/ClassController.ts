import { Request, Response } from 'express';
import { Service } from "typedi";
import ClassService from '../services/ClassService';

@Service()
class ClassController {
    constructor(private readonly classService: ClassService) { }

    public async filter(req: Request, res: Response) {
        try {
            let results = await this.classService.filter(req.body)
            res.json(results)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async getOne(req: any, res: Response) {
        try {
            let result = await this.classService.getOne(Number(req.params.id))
            Object.assign(result, await this.classService.calculateAvg(result.id))
            Object.assign(result, { comments: await this.classService.getFeedbackComments(result.id, req.loggedUser.role) })
            //ovdje napraviti još jedan call na neki servis koji će mi vratiti avg
            //i još jedan servis koji će mi vratiti komentare , ako sam obican user ne vidim usera jer mora biti anoniman
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async create(req: Request, res: Response) {
        try {
            let result = await this.classService.create(req.body._validated)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            await this.classService.delete(Number(req.params.id))
            res.json({ message: "deleted" })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async update(req: Request, res: Response) {
        try {
            let result = await this.classService.update(Number(req.params.id), req.body._validated)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default ClassController