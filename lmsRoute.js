const express = require('express');
const router = express.Router();
const LmsController = require('../controllers/LmsController');
const auth = require('../middlewares/auth');

const lmsController = new LmsController();
router.post('/create-course', lmsController.register);
router.post('/get-course', lmsController.viewDetailfromCourse);
router.post('/get-data', lmsController.viewSpecificData);
router.post('/update-course',auth(), lmsController.updateCourse);
router.post('/update-subject',auth(), lmsController.updateSubject);
router.post('/delete', lmsController.deleteData);
router.post('/getonepost', lmsController.viewOneData);
module.exports = router;
