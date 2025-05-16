import Gym from '../../models/gym.models.js';
import { methodError } from '../../middlewares/error/method.error.js';
import User from '../../models/user.models.js';
import Plan from '../../models/plan.models.js';
import { HTTP_STATUS } from '../../config/constants.js';

const getGyms = methodError(
    async (req, res, next) => {
        const gyms = await Gym.find();
        res.status(200).json({ status: HTTP_STATUS.SUCCESS, code: 1, gyms });
    }
);

const addGym = methodError(
    async (req, res, next) => {
        // const gym = await Gym.create(req.body);
        const { id } = req.user;
        const user = await User.findById(id).populate({ path: 'plan', select: 'name description monthlyPrice semiAnnualPrice annualPrice semiAnnualDiscount annualDiscount features' });
        console.log(user);
        res.status(201).json({ status: HTTP_STATUS.SUCCESS, code: 1, user });
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



