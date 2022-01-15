import express from 'express';
import recordController from '../controllers/recordControllers';

const recordRouter = express.Router();

const { recordIndex, recordCreate } = recordController;

recordRouter.get('/', recordIndex);
recordRouter.post('/', recordCreate);

export default recordRouter;
