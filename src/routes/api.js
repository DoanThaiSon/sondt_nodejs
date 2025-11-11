import express from 'express';
import { getAllUsers, createNewUser, updateUser, deleteUser } from "../controllers/APIController.js";

const router = express.Router();
const initAPIRoute = (app) => {
    router.get('/users', getAllUsers); // method GET -> READ data
    router.post('/create-user', createNewUser); // method POST -> CREATE data
    router.put('/update-user', updateUser); //method PUT -> UPDATE data
    router.delete('/delete-user/:id', deleteUser); //method DELETE -> DELETE data

    return app.use('/api/v1/', router)
}



export default initAPIRoute;