const httpStatus = require("http-status");
// const express=require('express')
const cors = require("cors");
const utils = require("../utils/utils");
const fs = require("fs");
const Busboy = require("busboy");
const UserDao = require("../dao/UserDao");
const UserSubjectDao = require("../dao/userSubjectDao");
const UserSemesterDao = require("../dao/userSemesterDao");
const UserCourseDao = require("../dao/userCourseDao");
const UserTeacherDetailsDao = require("../dao/UserTeacherDetailsDao");
const UserAssignmentDao = require("../dao/UserAssignmentDao");
const responseHandler = require("../helper/responseHandler");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { response } = require("express");
const logger = require("../config/logger");
class LmsService {
  constructor() {
    this.userDao = new UserDao();
    this.userCourseDao = new UserCourseDao();
    this.userSemesterDao = new UserSemesterDao();
    this.userSubjectDao = new UserSubjectDao();
    this.userTeacherDetailsDao = new UserTeacherDetailsDao();
    this.userAssignmentDao = new UserAssignmentDao();
  }

  findValue = async (req) => {
    try {
      // console.log(str);

      const { courseName = "", subjectName = "" } = req.body;
      console.log(courseName);
      console.log(courseName ? courseName : subjectName);
      let data = await this.userCourseDao.getEducationList(
        courseName ? courseName : subjectName
      );
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Users fetched successfully",
        data
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching data"
      );
    }
  };

  getAllCourses = async (req) => {
    try {
      // return;
      const courses = await this.userCourseDao.getEducationList(req);
      if (courses) {
        return responseHandler.returnSuccess(
          httpStatus.OK,
          "Courses fetched successfully",
          courses
        );
      }
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching courses"
      );
    }
  };

  getSubject = async (course) => {
    try {
      // return;

      const courseId = await this.userCourseDao.findOneByWhere(
        { courseName: course },
        ["id"]
      );

      const semesterIds = await this.userSemesterDao.findByWhere(
        { course_Id: courseId.dataValues.id },
        ["id"]
      );

      console.log("semesterIds=====", semesterIds);
      console.log("courseId====", courseId);

      // let subjects = await Promise.all(semesterIds.map(async (sem) => {
      //     return await this.userSubjectDao.findByWhere({semester_Id: sem.dataValues.id}, ['id', 'subjectName']);
      //   }));

      let subjects = [];
      for (const sem of semesterIds) {
        const sub = await this.userSubjectDao.findByWhere(
          { semester_Id: sem.dataValues.id },
          ["id", "subjectName"]
        );
        subjects.push(sub);
      }

      // const subjects = await this.userCourseDao.findCourseWise(req);
      console.log("subjects", subjects);

      // return;
      if (subjects) {
        return responseHandler.returnSuccess(
          httpStatus.OK,
          "Subjects fetched successfully",
          subjects
        );
      }
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching courses"
      );
    }
  };

  getTeacherSubject = async (req) => {
    try {
      console.log("req", req);
      const data = await this.userTeacherDetailsDao.findByWhere(
        { teacher_Id: req },
        ["subject_Id"],
        ["teacher_Id", "ASC"]
      );

      // console.log('data', data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        const temp = await this.userSubjectDao.findById(
          data[i].dataValues.subject_Id
        );
        // console.log('temp', temp)
        arr.push(temp.dataValues.subjectName);
      }
      // console.log('arr', arr)
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Subject Array fetched successfully",
        arr
      );
    } catch (error) {
      logger.error(error);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching subjects"
      );
    }
  };

  getStudentSubject = async (req) => {
    try {
      // console.log('req', req)
      const data = await this.userSubjectDao.findByWhere({ subjectName: req }, [
        "semester_Id",
      ]);

      console.log("data", data);
      const semester = await this.userSemesterDao.findByWhere(
        { id: data[0].dataValues.semester_Id },
        ["course_Id"]
      );
      console.log("semester", semester);

      const students = await this.userDao.findByWhere({
        course_Id: semester[0].dataValues.course_Id,
        role_Id: 3,
      });
      console.log("students", students);

      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Subject Array fetched successfully",
        students
      );
    } catch (error) {
      logger.error(error);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching subjects"
      );
    }
  };

  getStudentSubjectAssign = async (req) => {
    try {
      // console.log('req', req)
      const data = await this.userSubjectDao.findByWhere({ subjectName: req }, [
        "semester_Id",
      ]);

      console.log("data", data);
      const semester = await this.userSemesterDao.findByWhere(
        { id: data[0].dataValues.semester_Id },
        ["course_Id"]
      );
      console.log("semester", semester);

      const students = await this.userDao.getStudentSubjectAssign({
        course_Id: semester[0].dataValues.course_Id,
        role_Id: 3,
      });
      // const students=await this.userDao.findByWhere({course_Id : semester[0].dataValues.course_Id, role_Id:3});
      console.log("students", students);

      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Subject Array fetched successfully",
        students
      );
    } catch (error) {
      logger.error(error);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching subjects"
      );
    }
  };

  getStudentAssignSubmissionDetails = async (req) => {
    try {
      console.log("req", req);

      const data = await this.userSubjectDao.findOneByWhere(
        { subjectName: req.subject },
        ["id"]
      );
      console.log("data", data.dataValues.id);

      const assigns = await this.userAssignmentDao.findOneByWhere({
        user_Id: req.user_Id,
        userSubject_Id: data.dataValues.id,
        assign_Id: req.assign_Id,
        status: 1,
      });
      // return;
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Subject Array fetched successfully",
        assigns
      );
    } catch (error) {
      logger.error(error);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching subjects"
      );
    }
  };

  getStudentAssignDetails = async (req) => {
    try {
      console.log("req", req);

      const data = await this.userSubjectDao.findOneByWhere(
        { subjectName: req.subject },
        ["id"]
      );
      console.log("data", data.dataValues.id);

      const assigns = await this.userAssignmentDao.findStudentAssignment({
        user_Id: req.user_Id,
        userSubject_Id: data.dataValues.id,
      });
      // console.log('assigns', assigns)

      let deadlines = await Promise.all(
        assigns.map(async (assign) => {
          const temp = await this.userAssignmentDao.findOneByWhere(
            { assign_Id: assign.dataValues.assign_Id, status: 0 },
            ["deadlineDate", "deadlineTime", "assign_Id", "assignment"]
          );
          console.log("temp", temp.dataValues);
          console.log("hie");
          return temp.dataValues;
        })
      );

      console.log("deadlines", deadlines);

      // return;
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Subject Array fetched successfully",
        { assigns, deadlines }
      );
    } catch (error) {
      logger.error(error);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching subjects"
      );
    }
  };

  getAllSubject = async (req) => {
    try {
      // return;
      const data = await this.userCourseDao.findSubject(req);
      if (data) {
        return responseHandler.returnSuccess(
          httpStatus.OK,
          "Data fetched successfully",
          data
        );
      }
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching courses"
      );
    }
  };

  getOneCourse = async (req) => {
    try {
      console.log("courseId", req);
      // return;
      const courses = await this.userCourseDao.getParticularEducation(req);

      if (courses) {
        return responseHandler.returnSuccess(
          httpStatus.OK,
          "Courses fetched successfully",
          courses.dataValues
        );
      }
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching courses"
      );
    }
  };

  getCourseCount = async () => {
    try {
      const count = await this.userCourseDao.getCountByWhere();
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Count of courses fetched successfully",
        count
      );
    } catch (error) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching courses count"
      );
    }
  };

  addEducation = async (req) => {
    try {
      let message = "user data updated ";
      const { courseName = "", courseId = "", semester = [] } = req;

      let usercourseId = courseId;
      let courseData = [];
      const uuid = uuidv4();
      let cousreDataResponse = [];

      const checkCourse = await this.userCourseDao.findOneByWhere({
        courseName: { [Op.regexp]: courseName },
      });
      console.log("checkCourse", checkCourse);
      if (checkCourse) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Course Already Exists"
        );
      }
      if (courseId == null) {
        courseData = {
          courseName: courseName,
          // courseCode: 123,
          uuid: uuid,
        };
        cousreDataResponse = await this.userCourseDao.create(courseData);
        usercourseId = cousreDataResponse.id;
      } else {
        courseData = {
          courseName: courseName,
          // courseCode: 123,
          uuid: uuid,
        };
        let cdResponse = await this.userCourseDao.findById(courseId);
        if (cdResponse != null) {
          cousreDataResponse = await this.userCourseDao.updateById(
            courseData,
            courseId
          );
        } else {
          cousreDataResponse = await this.userCourseDao.create(courseData);
          usercourseId = cousreDataResponse.id;
        }
      }

      let userSemesterId;
      let semesterDataResponse = [];

      let semData = [];
      // semester check is missing (null and lenght)
      // semester = []-->nothing getting added
      if (semester.length == 0) {
        message = "Semester Not Found!";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      semester.map(async (sem) => {
        if (sem.Id == null) {
          // Id is wrong

          semData = {
            // id: sem.Id,
            uuid: uuid,
            semesterNo: sem.sem,
            course_Id: usercourseId,
            is_available: sem.show || 0, // set default value
          };
          semesterDataResponse = await this.userSemesterDao.updateOrCreate(
            semData,
            { course_Id: usercourseId, semesterNo: sem.sem }
          );
          // console.log("course_Id :", usercourseId, "semesterNo :", sem.sem);
          // console.log('semesterDataResponse1===', semesterDataResponse);

          userSemesterId = semesterDataResponse.id;
          let request = { subjects: sem.subject, semID: userSemesterId };
          // console.log("subjects:", sem.subject, "semID:", userSemesterId);

          // return;
          let subjectResponse = await this.createSubject(request);
        } else {
          let semData1 = {
            uuid: uuid,
            semesterNo: sem.sem,
            is_available: sem.show,
          };

          let semID = sem.Id;
          let semResponse = await this.userSemesterDao.findById(semID);

          if (semResponse != null) {
            delete semData.uuid; // check this
            semesterDataResponse = await this.userSemesterDao.updateById(
              semData1,
              semID
            );
            // console.log('semesterDataResponse2===', semesterDataResponse);
            // return;
          } else {
            semData1.course_Id = courseId;
            semesterDataResponse = await this.userSemesterDao.updateOrCreate(
              semData1,
              { course_Id: usercourseId, semesterNo: sem.sem }
            );
            // console.log('semesterDataResponse3====', semesterDataResponse);
            // return;
            semID = semesterDataResponse.id;
          }

          let subjectResponse = await this.createSubject({
            subjects: sem.subject,
            semID: semID,
          });
        }
      });
      return responseHandler.returnSuccess(httpStatus.CREATED, message);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error fetching users"
      );
    }
  };

  createSubject = async (req) => {
    const { subjects = [], semID } = req;
    let subDataResponses = [];
    if (!semID) {
      const message = "semester not found";
      return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
    }

    const semData = await this.userSemesterDao.findById(semID);
    if (!semData) {
      let message = "semester not found again";
      return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
    }

    let subjectdata = subjects.map(async (sub) => {
      const uuid = uuidv4();
      let subData;
      let subjectDataResponse = [];
      if (sub.id == null) {
        subData = {
          uuid: uuid,
          subjectName: sub.subjectName,
          semester_Id: semID,
          is_available: sub.status,
        };
        subjectDataResponse = await this.userSubjectDao.create(subData);
        // usersubjectId = cousreDataResponse.id;
      } else {
        subData = {
          subjectName: sub.subjectName,
          is_available: sub.status,
        };
        let subResponse = await this.userSubjectDao.findById(sub.id);
        if (subResponse != null) {
          subjectDataResponse = await this.userSubjectDao.updateById(
            subData,
            sub.id
          );
        } else {
          subjectDataResponse = await this.userSubjectDao.create(subData);
        }
      }
    });
    let data = await Promise.all(subjectdata);

    return;
  };

  // createSubject = async (req) => {

  //     const { subjects = [], semID } = req;
  //     let subDataResponses = [];
  //     if (!semID) {
  //         const message = 'semester not found';
  //         return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
  //     }

  //     const semData = await this.userSemesterDao.findById(semID);
  //     if (!semData) {
  //         let message = 'semester not found again';
  //         return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
  //     }

  //     let subjectdata = subjects.map(async (sub) => {
  //         const uuid = uuidv4();
  //         const subData = {
  //             uuid: uuid,
  //             subjectName: sub.subjectName,
  //             semester_Id: semID,
  //             is_available: sub.status,
  //         }
  //         console.log('data', subData);
  //         // semesterDataResponse = await this.userSubjectDao.create(semData1);
  //         if (semID) {
  //             // delete subData.uuid;
  //             // let check= await this.userSubjectDao.findOneByWhere({semester_Id: semID, subjectName: sub.subjectName});
  //             // if(check){
  //             await this.userSubjectDao.updateOrCreate(subData, { semester_Id: semID, subjectName: sub.subjectName });
  //             // }
  //         } else {
  //             await this.userSubjectDao.create(subData);
  //         }

  //     })
  //     let data = await Promise.all(subjectdata);

  //     return;
  // }

  // update course // parms : ID , request data

  updateCourse = async (req) => {
    try {
      let message = "user data updated ";
      const { courseId = 0, courseName = "", semester = [] } = req;
      console.log("courseName", courseName);

      //check for courseName and error for semester no
      // return;
      let cdResponse = await this.userCourseDao.findById(courseId);
      if (cdResponse != null) {
        await this.userCourseDao.updateById(
          { courseName: courseName },
          courseId
        );
        let semResponse = await this.userSemesterDao.findByWhere({
          course_Id: courseId,
        });
        if (semResponse != null) {
          semResponse.map(async (sem, index) => {
            const updateSemester = await this.userSemesterDao.updateById(
              { semesterNo: semester[index].sem },
              sem.dataValues.id
            );
            console.log("updateSemester", updateSemester);
            let subResponse = await this.userSubjectDao.findByWhere({
              semester_Id: sem.dataValues.id,
            });
            console.log("subResponse", subResponse);
            if (subResponse != null) {
              subResponse.map(async (sub, index1) => {
                await this.userSubjectDao.updateById(
                  { subjectName: semester[index].subject[index1].subjectName },
                  sub.dataValues.id
                );
              });
            }
          });
        }
      } else {
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Course does not exist"
        );
      }
      return responseHandler.returnSuccess(httpStatus.CREATED, message);
    } catch (error) {
      // logger.error(e);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error updating courses"
      );
    }
  };

  // update subject // parms : ID , request data
  updateSubject = async (req) => {
    try {
      let message = "user subject updated";
      const { subjectId = 0, subjectName = "" } = req;

      let subjectdata = {
        subjectName: subjectName,
      };
      console.log("data", subjectdata);
      let subResponse = await this.userSubjectDao.findById(subjectId);
      if (subResponse != null) {
        await this.userSubjectDao.updateById(subjectdata, subjectId);
      } else {
        await this.userSubjectDao.create(subjectdata);
      }
      return responseHandler.returnSuccess(httpStatus.CREATED, message);
    } catch (error) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error updating subjects"
      );
    }
  };

  deleteData = async (req) => {
    try {
      let message = "data deleted";
      const { courseId = "", semesterId = "", subjectId = "" } = req;
      console.log("courseId==", courseId);
      console.log("semesterId==", semesterId);
      console.log("subjectId==", subjectId);

      if (courseId && semesterId && subjectId) {
        let subResponse = await this.userSubjectDao.findById(subjectId);
        if (subResponse != null) {
          const update = await this.userDao.updateWhere(
            { status: 0 },
            { subject_Id: subjectId }
          );
          // console.log('update', update)
          // return;
          await this.userSubjectDao.deleteByWhere({ id: subjectId });
        }
      } else if (courseId && semesterId) {
        let semResponse = await this.userSemesterDao.findById(semesterId);
        if (semResponse != null) {
          const findSubjectIds = await this.userSubjectDao.findByWhere(
            { semester_Id: semesterId },
            ["id"]
          );
          console.log("findSubjectIds", findSubjectIds);
          findSubjectIds.map(async (subId) => {
            const abc = await this.userDao.updateWhere(
              { status: 0 },
              { subject_Id: subId.id }
            );
          });
          // return;
          await this.userSubjectDao.deleteByWhere({ semester_Id: semesterId });
          await this.userSemesterDao.deleteByWhere({ id: semesterId });
        }
      } else if (courseId) {
        let cdResponse = await this.userCourseDao.findById(courseId);
        if (cdResponse != null) {
          const findSemesterIds = await this.userSemesterDao.findByWhere(
            { course_Id: courseId },
            ["id"]
          );
          findSemesterIds.map(async (semId) => {
            const findIds = await this.userSubjectDao.findByWhere(
              { semester_Id: semId.id },
              ["id"]
            );
            findIds.map(async (subId) => {
              const def = await this.userDao.updateWhere(
                { status: 0 },
                { subject_Id: subId.id }
              );
            });
            await this.userSubjectDao.deleteByWhere({ semester_Id: semId.id });
          });
          await this.userSemesterDao.deleteByWhere({ course_Id: courseId });

          await this.userCourseDao.deleteByWhere({ id: courseId });
        }
      } else {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Invalid request"
        );
      }

      return responseHandler.returnSuccess(httpStatus.CREATED, message);
    } catch (error) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error deleting data"
      );
    }
  };
}

module.exports = LmsService;
