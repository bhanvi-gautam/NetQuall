const UserDao = require("../dao/UserDao");
const UserCourseDao = require("../dao/userCourseDao");
const responseHandler = require("../helper/responseHandler");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");
const logger = require("../config/logger");
const httpStatus = require("http-status");

class UserCourseService {
  constructor() {
    this.userDao = new UserDao();
    this.userCourseDao = new UserCourseDao();
  }

  getCourse = async (req) => {
    try {
      const where = { id: req };
      console.log("req", req);

      const temp = await this.userCourseDao.findOneByWhere(where);
      console.log("temp", temp.dataValues.courseName);
      if (temp.dataValues.courseName) {
        return responseHandler.returnSuccess(
          httpStatus.OK,
          "Course fetched successfully",
          temp.dataValues.courseName
        );
      }
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching Course"
      );
    }
  };

  findCourseIdAndUpdate = async (course, id) => {
    try {
      console.log("req", course, " ", id);

      const temp = await this.userCourseDao.findOneByWhere({
        courseName: course,
      });
      console.log("temp", temp.dataValues.id);
      const temp2 = await this.userDao.updateWhere(
        { course_Id: temp.dataValues.id },
        { migration_Id: id }
      );

      if (temp2) {
        return responseHandler.returnSuccess(
          httpStatus.OK,
          "course update done successfully"
        );
      }
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching Course"
      );
    }
  };
}

module.exports = UserCourseService;
