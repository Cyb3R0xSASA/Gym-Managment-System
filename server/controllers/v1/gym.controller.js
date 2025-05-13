import Gym from '../../models/gym.models.js';   
import { methodError } from '../../middlewares/error/method.error.js';

const getGyms = methodError(
    async (req, res, next) => {
        const gyms = await Gym.find();
        res.status(200).json({ gyms });
    }
);

const addGym = methodError(
    async (req, res, next) => {
        const gym = await Gym.create(req.body);
        res.status(201).json({ gym });
    }
);

const getGym = methodError()
const updateGym = methodError()
const deleteGym = methodError()

const Gyms = {
    getGyms,
    addGym,
    getGym,
    updateGym,
    deleteGym,
};

export default Gyms;



