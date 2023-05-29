import { Router } from "express";

import { TeamsController } from "../controllers";
const routes = Router();

// routes.get('/especifico/:uuid', CommitteeControllers.getCommittee);

// routes.post('/createCommittee', CommitteeControllers.postCommittee);

// routes.put('/modify/:uuid', CommitteeControllers.putCommittee);

routes.get("/", TeamsController.getAllTeams)
routes.get("/:termo", TeamsController.getTermoTeams)
routes.post("/", TeamsController.postTeams)
routes.put("/", TeamsController.putTeams)
routes.delete("/", TeamsController.deleteTeams)

export default routes;