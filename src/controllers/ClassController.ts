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

            //Assign average rating and comments if you are permitted
            Object.assign(result, await this.classService.calculateAvg(result.id))
            Object.assign(result, { comments: await this.classService.getFeedbackComments(result.id, req.loggedUser.role) })

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