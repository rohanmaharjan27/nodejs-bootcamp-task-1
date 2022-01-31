import { RequestHandler } from 'express';
import chalk from 'chalk';
import RecordModel from '../models/record';
import moment from 'moment';

const recordIndex: RequestHandler = (req, res) => {
  RecordModel.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render('records/index', { title: 'Books', records: result });
    })
    .catch((err) => console.log(err));
};

const recordCreate: RequestHandler = (req, res) => {
  const phone = req.body.phone;
  const currentDate = moment();
  const dateStringFormat = 'YYYY/MM/DD';

  const body = req.body;

  const finalObj = {
    ...body,
    rent_date: currentDate.format(dateStringFormat),
    return_date: null,
    return_date_max: moment(currentDate, dateStringFormat).add(14, 'days'),
  };

  RecordModel.find({ phone })
    .exec()
    .then((result) => {
      if (result.length >= 1) {
        res.status(409).json({
          error_message: 'You already have a book rented',
        });
      } else {
        const record = new RecordModel(finalObj);
        record
          .save()
          .then((result) => {
            res.status(201).json({
              message: 'Record added successfully!',
            });
            console.log(chalk.green('Record added successfully!'));
          })
          .catch((err: any) => {
            console.log(err);
            console.log(chalk.green('Failed to add record!'));
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
const recordController = {
  recordIndex,
  recordCreate,
};

export default recordController;
