import AppDataSource from "../data-source";
import { Request, Response } from 'express';

import { Teams } from "../entities/Teams";


class TeamsController {


    public async getAllTeams (req: Request, res: Response) : Promise<Response> {
        try{
            const teamsRepository = AppDataSource.getRepository(Teams)
            .createQueryBuilder("team")
            .orderBy("team.name", "ASC")
            .getMany()
            return res.json((await teamsRepository))
        }catch(err){
            return res.json({erro: "Não foi possivel pegar os teams"})
        }
    }

    public async getTermoTeams (req: Request, res: Response) : Promise<Response> {
        try{
            const termo:any = req.params.termo
            const teamsRepository = AppDataSource.getRepository(Teams)
                .createQueryBuilder("time")
                .where("time.name like :name", { name:`%${termo}%` })
                //.orderBy("team.name", "ASC")
                .getMany()
            return res.json((await teamsRepository))
        }catch(err){
            return res.json({erro: "Não foi possivel pegar os teams"})
        }
    }

    public async postTeams (req: Request, res: Response) : Promise<Response> {
        try{
            const create = req.body
            const teamsRepository = AppDataSource.getRepository(Teams)
            const insert = new Teams();
            insert.name = create.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
            const all = await teamsRepository.save(insert)
            return res.json(all)
        }catch(err){
            return res.json({error: "O nome já existe"})
        }
    }

    public async putTeams (req: Request, res: Response) : Promise<Response> {
        try{
            const create = req.body
            const teamsRepository = AppDataSource.getRepository(Teams)
            const find = await teamsRepository.findOneBy({id: create.id})
            find.name = create.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
            const all = await teamsRepository.save(find)
            return res.json(all)
        }catch(err){
            return res.json({error: "O nome já existe"})
        }
    }

    public async deleteTeams (req: Request, res: Response) : Promise<Response> {
        try{
            const create = req.body
            const teamsRepository = AppDataSource.getRepository(Teams)
            const find = await teamsRepository.findOneBy({id: create.id})
            
            const all = await teamsRepository.delete(find)
            return res.json(all)
        }catch(err){
            return res.json({raw: [], affected: 0})
        }
    }

}
export default new TeamsController();