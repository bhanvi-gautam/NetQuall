const logger = require('../config/logger');
const customApi = require('../middlewares/customApi');
const asyncWrapper = require('../middlewares/async');
const { customError } = require('../error/custom-error');
const httpStatus = require('http-status');
const encryptData = require('../helper/EncryDecryHelper');


const LmsService = require('../service/LmsService');
class LmsController {
    constructor() {
        this.lmsService = new LmsService();
        this.DATAEncryptionKey = '6d090796-ecdf-11ea-adc1-0242ac112345'
    }

    register = asyncWrapper(async (req, res) => {

        const response = await this.lmsService.addEducation(req.body);

        const { status } = response.response;
        const { message, data } = response.response;
        res.status(response.statusCode).send({ status, message });

    })


    updateCourse = asyncWrapper(async (req, res) => {

        const response = await this.lmsService.updateCourse(req.body);
        const { status } = response.response;
        const { message, data } = response.response;
        res.status(response.statusCode).send({ status, message });

    })

    updateSubject = asyncWrapper(async (req, res) => {
        const response = await this.lmsService.updateSubject(req.body);
        const { status, message, data } = response.response;
        res.status(response.statusCode).send({ status, message });
    });
    deleteData = asyncWrapper(async (req, res) => {
        const response = await this.lmsService.deleteData(req.body);
        const { status, message, data } = response.response;
        res.status(response.statusCode).send({ status, message });
    });

    viewSpecificData = asyncWrapper(async (req, res) => {
        console.log(req.body);
        const response = await this.lmsService.findValue(req);
        const { status, message, data } = response?.response;
        const enryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
        res.status(response.statusCode).send({ status, message, enryptedData });
    });

    viewOneData = asyncWrapper(async (req, res) => {
        const response = await this.lmsService.getOneCourse(req.body);
        const { status, message, data } = response.response;
        const enryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
        console.log("abc===",encryptData);
        res.status(response.statusCode).send({ status, message, data:enryptedData });
    });
    viewDetailfromCourse = asyncWrapper(async (req, res) => {

        const response = await this.lmsService.getAllCourses(req.body);
        const { status } = response?.response;
        const { message, data } = response?.response;
        const enryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
        console.log("encrypted===",enryptedData);
        res.status(response.statusCode).send({ status, message, data:enryptedData});

    });

}

module.exports = LmsController;