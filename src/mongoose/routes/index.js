import { 
    addNewUser
} from '../controllers/userController';

const Routes = (app) => {
    app.route('/')
        .get((req, res) => {
            res.send(`Node and express server is running`)
        })
        .post(addNewUser);
}

export default Routes;
