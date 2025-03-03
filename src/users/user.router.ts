import express, {Request, Response} from 'express';

import * as userService from './user.service';
import UserWithToken from './dto/user-with-token.dto';
import upload from '../shared/middlewares/upload.middleware';

const router = express.Router();

router.post('/signup', upload.single('avatar'), async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password || !req.file) {
        res.status(422).send({error: 'Provide the right data model'});
        return;
    }
    try {
        const avatarPath = `${req.protocol}://${req.get('host')}/public/uploads/${req.file!.filename}`;
        const userData: UserWithToken = await userService.registerUser({...req.body, avatar: avatarPath});
        res.status(200).send(userData);
    } catch (error: any) {
        res.status(500).send({error: error.message});   
    }
});

router.post('/login', async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        res.status(422).send({error: 'Provide the right data model'});
        return;
    }
    
    try {
        const userData: UserWithToken = await userService.loginUser(req.body);
        res.status(200).send(userData);
    } catch (error: any) {
        res.status(500).send({error: error.message});   
    }
}); 

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await userService.getUser(Number(id));
        res.status(200).send(user);
    } catch(e: any) {
        console.log(e.message);
        res.send(500).send({error: "Error trying to get a user by his ID"});
    }

})
export default router;