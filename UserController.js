const httpStatus = require("http-status");
// const dotenv = require('dotenv');
const utils = require("../utils/utils");
const fs = require("fs");
const encryptData = require("../helper/EncryDecryHelper");
const decryptData = require("../helper/EncryDecryHelper");
const Busboy = require("busboy");
const responseHandler = require("../helper/responseHandler");
const AuthService = require("../service/AuthService");
const TokenService = require("../service/TokenService");
const UserService = require("../service/UserService");
const UserRoleService = require("../service/UserRoleService.js");
const UserMigrationService = require("../service/UserMigrationService.js");
const logger = require("../config/logger");
const asyncWrapper = require("../middlewares/async");
const UserAssignmentService = require("../service/UseAssignmentService.js");
const UserCourseService = require("../service/UserCourseService.js");
const LmsService = require("../service/LmsService.js");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
    this.lmsService = new LmsService();
    this.authService = new AuthService();
    this.userRoleService = new UserRoleService();
    this.userMigrationService = new UserMigrationService();
    this.userAssignmentService = new UserAssignmentService();
    this.userCourseService = new UserCourseService();

    this.DATAEncryptionKey = "6d090796-ecdf-11ea-adc1-0242ac112345";
  }

  register = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.data,
      this.DATAEncryptionKey
    );
    const user = await this.userService.addUser(decryptedData);
    let tokens = {};
    const { status } = user.response;
    if (user.response.status) {
      tokens = await this.tokenService.generateAuthTokens(user.response.data);
    }

    const { message, data } = user.response;
    // const enryptedData=encryptData.encryptData(data, this.DATAEncryptionKey);
    res.status(user.statusCode).send({ status, message, data, tokens });
  });

  addAssignment = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.data,
      this.DATAEncryptionKey
    );
    console.log("decryptedData", decryptedData);
    // return;
    const assignment = await this.userService.addAssignment(decryptedData);

    const { status } = assignment?.response;
    const { message, data } = assignment?.response;
    // const encryptedData=encryptData.encryptData(data, this.DATAEncryptionKey);
    res.status(assignment?.statusCode).send({ status, message, assignment });
  });

  getAssignment = asyncWrapper(async (req, res) => {
    const assignment = await this.userAssignmentService.getAssignment(req.body);

    const { status } = assignment.response;
    const { message, data } = assignment.response;
    const encryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    res.status(assignment.statusCode).send({ status, message, encryptedData });
  });

  allData = asyncWrapper(async (req, res) => {
    const assignment = await this.userAssignmentService.allData();

    const { status } = assignment.response;
    const { message, data } = assignment.response;
    // const encryptedData=encryptData.encryptData(data, this.DATAEncryptionKey);
    res.status(assignment.statusCode).send({ status, message, data });
  });

  checkSubmission = asyncWrapper(async (req, res) => {
    console.log("req.body", req.body);
    // return;
    const decryptedData = decryptData.decryptData(
      req.body.encryptedData,
      this.DATAEncryptionKey
    );
    console.log("decryptedData", decryptedData);
    const check = await this.userAssignmentService.checkSubmission(
      decryptedData
    );

    const { status } = check.response;
    const { message, data } = check.response;
    const encryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    res.status(check.statusCode).send({ status, message, encryptedData });
  });

  getMarks = asyncWrapper(async (req, res) => {
    console.log("req.body", req.body);
    // return;
    const decryptedData = decryptData.decryptData(
      req.body.encryptedData,
      this.DATAEncryptionKey
    );
    console.log("decryptedData", decryptedData);
    const check = await this.userAssignmentService.getMarks(decryptedData);

    const { status } = check.response;
    const { message, data } = check.response;
    const encryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    res.status(check.statusCode).send({ status, message, encryptedData });
  });

  getCourseId = asyncWrapper(async (req, res) => {
    const decryptId = decryptData.decryptData(
      req.body.userId,
      this.DATAEncryptionKey
    );
    const courseId = await this.userService.getCourseId(decryptId);

    const { status, message, data } = courseId.response;
    const encryptedData = encryptData.encryptData(data, this.DATAEncryptionKey);
    res
      .status(courseId.statusCode)
      .send({ status, message, data: encryptedData });
  });

  checkEmail = asyncWrapper(async (req, res) => {
    const isExists = await this.userService.isEmailExists(
      req.body.email.toLowerCase()
    );
    res.status(isExists.statusCode).send(isExists.response);
  });

  enableDisableUser = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.id,
      this.DATAEncryptionKey
    );
    const response = await this.userService.enableDisableUser(decryptedData);
    const { status } = response?.response || "success";
    const { message, data } =
      response?.response || "User disabled successfully";
    res.status(response?.statusCode).send({ status, message });
  });

  submission = asyncWrapper(async (req, res) => {
    const decryptedData = decryptData.decryptData(
      req.body.id,
      this.DATAEncryptionKey
    );
    console.log("decryptedData", decryptedData);
    const response = await this.userService.submission(decryptedData);
    const { status } = response?.response || "success";
    const { message, data } = response?.response || "Submission successful";
    res.status(response?.statusCode).send({ status, message });
  });

  sendMessage = asyncWrapper(async (req, res) => {
    // const user = await this.userService.sendEMail();
    const user = await this.userService.sendMessage();

    const { status } = user.response;
    const { message, data } = user.response;

    res.status(user.statusCode).send({ status, message, data });
  });

  viewDetail = asyncWrapper(async (req, res) => {
    // const decryptedData=decryptData.decryptData(req.body.encryptedData,this.DATAEncryptionKey);
    const users = await this.userService.getAllUsers(req.body);

    // const responseData = users.response.data.map((user) => {
    //     return {
    //         id: user.id,
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //         email: user.email,
    //         profile: user.profile ? user.profile : '',
    //         role_Id: user.role_Id,
    //         address: user.address,
    //         phone_number: user.phone_number,
    //         is_available: user.is_available,
    //     };
    // });
    // console.log('responseData===', responseData);

    // return;

    // const enryptedData = encryptData.encryptData(users, this.DATAEncryptionKey);
    // console.log('Sending response:', enryptedData);
    const status = "success";
    const message = "working fine";

    res.status(users.statusCode).send({ status, message, data: users });
    // res.status(users.statusCode).send(enryptedData);
  });

  deleteUser = asyncWrapper(async (req, res) => {
    const temp = decryptData.decryptData(
      req.body.encryptedUserId,
      this.DATAEncryptionKey
    );

    const response = await this.userService.deleteUser(temp);
    const { status } = response?.response || "success";
    const { message, data } = response?.response || "User deleted successfully";
    res.status(response?.statusCode).send({ status, message });
  });

  deleteProfile = asyncWrapper(async (req, res) => {
    console.log("req.body", req.body);
    // const fileId = utils.generateUniqueId();
    // if()

    // const newFile='file-'+fileId+'.'+req.body.newFileName;
    // console.log('newFile', newFile);
    // return;
    const response = await this.userService.deleteProfile(
      req.body.fileToBeRemoved
    );
    // console.log("res===", response)
    const { status } = response?.status || "success";
    const { message } =
      response?.message || "User Profile deleted successfully";
    res.status(response?.statusCode || 200).send({ status, message });
  });

  viewUser = asyncWrapper(async (req, res) => {
    // const { id=0 } = req.body;
    console.log("req.body==", req.body.requestData);
    let decryptedData;
    if (typeof req.body.requestData !== "number") {
      decryptedData = decryptData.decryptData(
        req.body.requestData,
        this.DATAEncryptionKey
      );
      console.log("decryptedData", decryptedData);
      const user = await this.userService.getUserById(decryptedData);

      const userRole = user.response.data.role_Id;

      const role = await this.userRoleService.getRole(userRole);

      const userCourse = user.response.data.course_Id;
      const course = await this.userCourseService.getCourse(userCourse);

      console.log("course", course.response.data);
      const courseName = { key: course.response.data };

      const rolename = { key: role.response.data };
      const roleName = { ...user, rolename, courseName };

      const { status } = user.response;
      const { message, data } = user.response;
      // console.log("user==",user);
      const temp = encryptData.encryptData(roleName, this.DATAEncryptionKey);
      // console.log(data);
      // console.log("dataConsole======",temp);
      res.status(user.statusCode).send({ status, message, data: temp });
    }
  });

  studentVerify = asyncWrapper(async (req, res) => {
    const student = await this.userService.studentVerify(req.body);

    if (student.response.message === "Student found!") {
      const data = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        oldCourse: req.body.oldCourse,
        newCourse: req.body.newCourse,
      };
      const updateMigration = this.userMigrationService
        .updateMigration(data)
        .then(async (data1) => {
          console.log("data :>> ", data1);
          if (data1.response.data) {
            await this.userService.update_migrationKey({
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              migration_Id: data1.response.data,
            });
            await this.userCourseService.findCourseIdAndUpdate(
              data.newCourse,
              data1.response.data
            );
          }
        })
        .catch((error) => {
          return responseHandler.returnError(
            httpStatus.BAD_REQUEST,
            "migration already exists!!"
          );
        });
    }
    res.status(student.statusCode).send(student.response);
  });

  getUserCount = asyncWrapper(async (req, res) => {
    const count = await this.userService.getCount(req.body);
    const { status, message, data } = count?.response;
    // const encryptedData = encryptData.encryptData(count, this.DATAEncryptionKey);
    res.status(count.statusCode).send({ status, message, count });
  });

  updateUser = asyncWrapper(async (req, res) => {
    console.log("temp===", req.body.updatedFormData);
    // return;
    const temp = decryptData.decryptData(
      req.body.updatedFormData,
      this.DATAEncryptionKey
    );
    const response = await this.userService.updateUser(temp);
    const { status } = response.response;
    const { message, data } = response.response;
    res.status(response.statusCode).send({ status, message });
  });
  login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    const user = await this.authService.loginWithEmailPassword(
      email.toLowerCase(),
      password
    );

    const { message } = user.response;
    const { data } = user.response;
    const { status } = user.response;
    const code = user.statusCode;
    let tokens = {};
    if (user.response.status) {
      tokens = await this.tokenService.generateAuthTokens(data);
    }
    res.status(user.statusCode).send({ status, code, message, data, tokens });
  });

  uploadPdf = asyncWrapper(async (req, res) => {
    const contentRange = req.headers["content-range"];
    const fileId = req.headers["x-file-id"];

    if (!contentRange) {
      return res
        .status(400)
        .json({ message: 'Missing "Content-Range" header' });
    }

    if (!fileId) {
      return res.status(400).json({ message: 'Missing "X-File-Id" header' });
    }

    const match = contentRange.match(/bytes=(\d+)-(\d+)\/(\d+)/);

    if (!match) {
      return res
        .status(400)
        .json({ message: 'Invalid "Content-Range" Format' });
    }

    const rangeStart = Number(match[1]);
    const rangeEnd = Number(match[2]);
    const fileSize = Number(match[3]);

    if (
      rangeStart >= fileSize ||
      rangeStart >= rangeEnd ||
      rangeEnd > fileSize
    ) {
      return res
        .status(400)
        .json({ message: 'Invalid "Content-Range" provided' });
    }

    const busboy = Busboy({ headers: req.headers });

    busboy.on("file", (_, fileStream, fileInfo) => {
      if (!fileId) {
        req.pause();
      }

      const filePath = utils.getPdfPath(fileInfo.filename, fileId);

      fs.stat(filePath, (err, fileDetails) => {
        console.log("err", err);
        if (err)
          return res.status(400).json({
            message: "No file with such details",
            details: { fileName: fileInfo.filename, fileId },
          });

        if (fileDetails.size !== rangeStart) {
          return res.status(400).json({ message: "Bad chunk" });
        }

        const writeStream = fs.createWriteStream(filePath, { flags: "a" });
        fileStream.pipe(writeStream).on("error", (e) => {
          return res.status(500).json({ message: "Internal server error" });
        });
      });
    });

    busboy.on("error", (e) => {
      return res.status(500).json({ message: "Internal server error" });
    });
    busboy.on("finish", () => {
      return res.status(200).json({ message: "Success" });
    });
    req.pipe(busboy);
  });

  uploadImage = asyncWrapper(async (req, res) => {
    const contentRange = req.headers["content-range"];
    const fileId = utils.generateUniqueId();
    const extension = req.headers["extension"];
    console.log("extension", extension);
    //    return;
    if (!contentRange) {
      return res
        .status(400)
        .json({ message: 'Missing "Content-Range" header' });
    }
    if (!fileId) {
      return res.status(400).json({ message: 'Missing "X-File-Id" header' });
    }
    const match = contentRange.match(/bytes=(\d+)-(\d+)\/(\d+)/);

    if (!match) {
      return res
        .status(400)
        .json({ message: 'Invalid "Content-Range" Format' });
    }
    const rangeStart = Number(match[1]);
    const rangeEnd = Number(match[2]);
    const fileSize = Number(match[3]);

    if (
      rangeStart >= fileSize ||
      rangeStart >= rangeEnd ||
      rangeEnd > fileSize
    ) {
      return res
        .status(400)
        .json({ message: 'Invalid "Content-Range" provided' });
    }

    const busboy = Busboy({ headers: req.headers });

    busboy.on("file", (_, fileStream, fileInfo) => {
      if (!fileId) {
        req.pause();
      }

      const filePath = utils.getFilePath(extension, fileId);
      console.log("filePath", filePath);
      const writeStream = fs.createWriteStream(filePath, { flags: "a" });
      fileStream.pipe(writeStream).on("error", (e) => {
        return res.status(500).json({ message: "Internal server error" });
      });
      // fs.stat(filePath, (err, fileDetails) => {
      //     console.log('err', err)
      //     if (err) return res.status(400).json({ message: 'No file with such details', details: { fileName: fileInfo.filename, fileId } });

      //     if (fileDetails.size !== rangeStart) {
      //         return res.status(400).json({ message: 'Bad chunk' });
      //     }
      // })
    });

    busboy.on("error", (e) => {
      return res.status(500).json({ message: "Internal server error" });
    });
    busboy.on("finish", () => {
      const message = "Success";
      const data = `file-${fileId}.${extension}`;
      console.log("fileId", fileId);
      res.status(200).send({ message, data });
    });
    req.pipe(busboy);
  });

  // requestFile = asyncWrapper(async (req, res) => {
  //     if (!req.body || !req.body.fileName) return res.status(400)?.json({ message: 'Missing "fileName"' });

  //     const fileId = utils.generateUniqueId();
  //     fs.createWriteStream(utils.getFilePath(req.body.fileName, fileId), { flags: "w" });

  //     return res.status(200)?.json({ fileId });
  // })

  changePassword = asyncWrapper(async (req, res) => {});
}

module.exports = UserController;
