const logger = require("../config/logger");
const customApi = require("../middlewares/customApi");
const asyncWrapper = require("../middlewares/async");
const { customError } = require("../error/custom-error");
const httpStatus = require("http-status");
const encryptData = require("../helper/EncryDecryHelper");
const decryptData = require("../helper/EncryDecryHelper");

const LmsService = require("../service/LmsService");
class LmsController {
  constructor() {
    this.lmsService = new LmsService();
    this.DATAEncryptionKey = "6d090796-ecdf-11ea-adc1-0242ac112345";
  }

  register = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.updatedFormData,
      this.DATAEncryptionKey
    );
    const response = await this.lmsService.addEducation(decryptedData);
    const { status } = response.response;
    const { message, data } = response.response;
    res.status(response.statusCode).send({ status, message });
  });

  getCourseCount = asyncWrapper(async (req, res) => {
    const count = await this.lmsService.getCourseCount();

    const { status, message, data } = count?.response;
    // const encryptedData = encryptData.encryptData(count, this.DATAEncryptionKey);
    res.status(count.statusCode).send({ status, message, count });
  });

  getTeacherSubject = asyncWrapper(async (req, res) => {
    //userId encrypted
    const decryptedId = decryptData.decryptData(
      req.body.userId,
      this.DATAEncryptionKey
    );
    // console.log('encryptedId', encryptedId)
    const subjects = await this.lmsService.getTeacherSubject(decryptedId);
    const { status, message, data } = subjects?.response;
    const encryptedData = encryptData.encryptData(
      subjects,
      this.DATAEncryptionKey
    );
    res.status(subjects.statusCode).send({ status, message, encryptedData });
  });

  getStudentSubject = asyncWrapper(async (req, res) => {
    const subjects = await this.lmsService.getStudentSubject(
      req.body.subject.subject
    );
    const { status, message, data } = subjects?.response;
    const encryptedData = encryptData.encryptData(
      subjects,
      this.DATAEncryptionKey
    );
    res.status(subjects.statusCode).send({ status, message, encryptedData });
  });

  getStudentSubjectAssign = asyncWrapper(async (req, res) => {
    const subjects = await this.lmsService.getStudentSubjectAssign(
      req.body.subject.subject
    );
    const { status, message, data } = subjects?.response;
    const encryptedData = encryptData.encryptData(
      subjects,
      this.DATAEncryptionKey
    );
    res.status(subjects.statusCode).send({ status, message, encryptedData });
  });

  getStudentAssignDetails = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.encryptedData,
      this.DATAEncryptionKey
    );
    console.log("decryptedData", decryptedData);
    const assigns = await this.lmsService.getStudentAssignDetails(
      decryptedData
    );
    const { status, message, data } = assigns?.response;
    const encryptedData = encryptData.encryptData(
      assigns,
      this.DATAEncryptionKey
    );
    res.status(assigns.statusCode).send({ status, message, encryptedData });
  });

  getStudentAssignSubmissionDetails = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.encryptedData,
      this.DATAEncryptionKey
    );
    console.log("decryptedData", decryptedData);
    const assigns = await this.lmsService.getStudentAssignSubmissionDetails(
      decryptedData
    );
    const { status, message, data } = assigns?.response;
    const encryptedData = encryptData.encryptData(
      assigns,
      this.DATAEncryptionKey
    );
    res.status(assigns.statusCode).send({ status, message, encryptedData });
  });

  updateCourse = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.updatedFormData,
      this.DATAEncryptionKey
    );
    console.log("decryptedData", decryptedData);
    const response = await this.lmsService.updateCourse(decryptedData);
    const { status } = response.response;
    const { message, data } = response.response;
    res.status(response.statusCode).send({ status, message });
  });

  updateSubject = asyncWrapper(async (req, res) => {
    const response = await this.lmsService.updateSubject(req.body);
    const { status, message, data } = response.response;
    res.status(response.statusCode).send({ status, message });
  });
  deleteData = asyncWrapper(async (req, res) => {
    console.log("hiee===", req.body.encryptedData);
    const decryptedData = decryptData.decryptData(
      req.body.encryptedData,
      this.DATAEncryptionKey
    );
    const response = await this.lmsService.deleteData(decryptedData);
    const { status, message, data } = response.response;
    res.status(response.statusCode).send({ status, message });
  });

  viewSpecificData = asyncWrapper(async (req, res) => {
    console.log(req.body);
    const response = await this.lmsService.findValue(req);
    const { status, message, data } = response?.response;
    const encryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    res.status(response.statusCode).send({ status, message, encryptedData });
  });

  viewOneData = asyncWrapper(async (req, res) => {
    // console.log("abc222==",req.body.courseId)
    const decryptedData = decryptData.decryptData(
      req.body.courseId,
      this.DATAEncryptionKey
    );
    console.log("abc==", decryptedData);
    const response = await this.lmsService.getOneCourse(decryptedData);
    console.log("response", response);
    // return;
    const { status, message, data } = response?.response;
    console.log("abc===", data);
    res.status(response.statusCode).send({ status, message, data });
  });

  viewDetailfromCourse = asyncWrapper(async (req, res) => {
    const response = await this.lmsService.getAllCourses(req.body);
    const { status } = response?.response;
    const { message, data } = response?.response;
    const enryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    // console.log("encrypted===",enryptedData);
    res
      .status(response.statusCode)
      .send({ status, message, data: enryptedData });
  });

  getSubject = asyncWrapper(async (req, res) => {
    const response = await this.lmsService.getSubject(req.body.course);
    const { status } = response?.response;
    const { message, data } = response?.response;
    const enryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    // console.log("encrypted===",enryptedData);
    res
      .status(response.statusCode)
      .send({ status, message, data: enryptedData });
  });
  viewSubjectCourse = asyncWrapper(async (req, res) => {
    // console.log("req",req.body.encryptedData);
    // const decryptedData=decryptData.decryptData(req.body.encryptedData,this.DATAEncryptionKey);
    // console.log("decryptes===",decryptedData)
    const response = await this.lmsService.getAllSubject(req.body);
    const { status } = response?.response;
    const { message, data } = response?.response;
    console.log("data", data);
    // const enryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    // console.log("encrypted===",enryptedData);
    // res.status(response.statusCode).send({ status, message, data:enryptedData});
    res.status(response.statusCode).send({ status, message, data });
  });
}

module.exports = LmsController;
