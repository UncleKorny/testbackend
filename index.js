import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

import { registerValidator, loginValidator, postCreateValidation } from './validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';

const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb)=>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb)=>{
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.jjsq6kl.mongodb.net/blog?retryWrites=true&w=majority').then(()=>{
    console.log('MongoDB connected...');
}).catch(err=>console.log(err));


app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload',checkAuth, upload.single('image'), (req,res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
} )

app.get('/posts', PostController.getAll);
app.post('/posts',checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth,postCreateValidation, handleValidationErrors, PostController.update);
app.get('/posts/:id', PostController.getOne);

app.listen(3000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server has been started...');
});