import express, {Request, Response} from 'express';
import multer from 'multer';
import fs from 'fs';


import { loginUser, registerUser } from './user.service';
import UserWithToken from './dto/user-with-token.dto';
import path from 'path';

const router = express.Router();
const uploadDir = path.join(__dirname, '../../public/uploads');


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

const upload = multer({ storage }); 

router.post('/signup', upload.single('avatar'), async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password || !req.file) {
        res.status(422).send({error: 'Provide the right data model'});
        return;
    }
    try {
        const avatarPath = `${req.protocol}://${req.get('host')}/public/uploads/${req.file!.filename}`;
        const userData: UserWithToken = await registerUser({...req.body, avatar: avatarPath});
        res.status(200).send(userData);
    } catch (error: any) {
        res.status(500).send({error: error.message});   
    }
});

router.post('/login', async (req: Request, res: Response) => {
    console.log(req.body);
    
    if(!req.body.email || !req.body.password) {
        res.status(422).send({error: 'Provide the right data model'});
        return;
    }
    
    try {
        const userData: UserWithToken = await loginUser(req.body);
        res.status(200).send(userData);
    } catch (error: any) {
        res.status(500).send({error: error.message});   
    }
}); 

export default router;