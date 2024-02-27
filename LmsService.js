const httpStatus = require('http-status');
// const express=require('express')
const cors = require('cors')
const utils = require('../utils/utils')
const fs = require('fs')
const Busboy = require("busboy")
const UserDao = require('../dao/UserDao');
const UserSubjectDao = require('../dao/userSubjectDao');
const UserSemesterDao = require('../dao/userSemesterDao');
const UserCourseDao = require('../dao/userCourseDao');
const responseHandler = require('../helper/responseHandler');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const logger = require('../config/logger');
class LmsService {
    constructor() {
        this.userDao = new UserDao();
        this.userCourseDao = new UserCourseDao();
        this.userSemesterDao = new UserSemesterDao();
        this.userSubjectDao = new UserSubjectDao();
    }

    findValue = async (req) => {
        try {
            // console.log(str);

            const { courseName = '', subjectName = '' } = req.body;
            console.log(courseName);
            console.log(courseName ? courseName : subjectName);
            let data = await this.userCourseDao.getEducationList(courseName ? courseName : subjectName);
            return responseHandler.returnSuccess(httpStatus.OK, 'Users fetched successfully', data);

        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching data');
        }
    }

    getAllCourses = async (req) => {
        try {
            console.log("req====",req);
            // return;
            const courses = await this.userCourseDao.getEducationList(req);
            if (courses) {
                return responseHandler.returnSuccess(httpStatus.OK, 'Courses fetched successfully', courses);
            }


        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching courses');
        }
    };

    getOneCourse = async (req) => {
        try {
            const { courseId = '' } = req;
            const courses = await this.userCourseDao.getParticularEducation(courseId);
            if (courses) {
                return responseHandler.returnSuccess(httpStatus.OK, 'Courses fetched successfully', courses);
            }
            console.log(courses)


        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching courses');
        }
    };

   

    addEducation = async (req) => {
        try {
            let message = "user data updated ";
            const { courseName = '', courseId = '', semester = [], user_Id = 0 } = req;
            let userdata = [];
            if (user_Id == 0 || user_Id == null) {

                message = 'User Not Found!';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
            // user_Id user id empty or 0 check // throw error 
            // if user value exits  then check user record on table 
            userdata = await this.userDao.findById(user_Id);
            if (userdata == null) {
                message = 'User Not Found again!';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            let usercourseId = courseId;
            let courseData = [];
            const uuid = uuidv4();
            let cousreDataResponse = []
            if (courseId == null) {
                courseData = {
                    courseName: courseName,
                    // courseCode: 123,
                    uuid: uuid,
                    user_Id: user_Id,
                }
                cousreDataResponse = await this.userCourseDao.create(courseData);
                usercourseId = cousreDataResponse.id;
            } else {
                courseData = {
                    courseName: courseName,
                    // courseCode: 123,
                    uuid: uuid,
                }
                let cdResponse = await this.userCourseDao.findById(courseId);
                if (cdResponse != null) {
                    cousreDataResponse = await this.userCourseDao.updateById(courseData, courseId);
                } else {
                    courseData.user_Id = user_Id;
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
                message = 'Semester Not Found!';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
            semester.map(async (sem) => {
                if (sem.Id == null) { // Id is wrong

                    semData = {
                        // id: sem.Id,
                        uuid: uuid,
                        semesterNo: sem.sem,
                        course_Id: usercourseId,
                        is_available: sem.show || 0, // set default value 
                    }
                    semesterDataResponse = await this.userSemesterDao.updateOrCreate(semData, { course_Id: usercourseId, semesterNo: sem.sem });
                    // console.log("course_Id :", usercourseId, "semesterNo :", sem.sem);
                    // console.log('semesterDataResponse1===', semesterDataResponse);


                    userSemesterId = semesterDataResponse.id;
                    let request = { subjects: sem.subject, semID: userSemesterId }
                    // console.log("subjects:", sem.subject, "semID:", userSemesterId);

                    // return;
                    let subjectResponse = await this.createSubject(request);


                } else {

                    let semData1 = {
                        uuid: uuid,
                        semesterNo: sem.sem,
                        is_available: sem.show,
                    }

                    let semID = sem.Id;
                    let semResponse = await this.userSemesterDao.findById(semID);

                    if (semResponse != null) {
                        delete semData.uuid; // check this
                        semesterDataResponse = await this.userSemesterDao.updateById(semData1, semID);
                        // console.log('semesterDataResponse2===', semesterDataResponse);
                        // return;


                    } else {
                        semData1.course_Id = courseId;
                        semesterDataResponse = await this.userSemesterDao.updateOrCreate(semData1, { course_Id: usercourseId, semesterNo: sem.sem });
                        // console.log('semesterDataResponse3====', semesterDataResponse);
                        // return;
                        semID = semesterDataResponse.id;

                    }

                    let subjectResponse = await this.createSubject({ subjects: sem.subject, semID: semID });


                }

            })
            return responseHandler.returnSuccess(httpStatus.CREATED, message);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching users');
        }

    }


    createSubject = async (req) => {

        const { subjects = [], semID } = req;
        let subDataResponses = [];
        if (!semID) {
            const message = 'semester not found';
            return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
        }

        const semData = await this.userSemesterDao.findById(semID);
        if (!semData) {
            let message = 'semester not found again';
            return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
        }

        let subjectdata = subjects.map(async (sub) => {
            const uuid = uuidv4();
            let subData;
            let subjectDataResponse = []
            if (sub.id == null) {
                subData = {
                    uuid: uuid,
                    subjectName: sub.subjectName,
                    semester_Id: semID,
                    is_available: sub.status,
                }
                subjectDataResponse = await this.userSubjectDao.create(subData);
                // usersubjectId = cousreDataResponse.id;
            } else {
                subData = {
                    subjectName: sub.subjectName,
                    is_available: sub.status,
                }
                let subResponse = await this.userSubjectDao.findById(sub.id);
                if (subResponse != null) {
                    subjectDataResponse = await this.userSubjectDao.updateById(subData, sub.id);
                } else {
                    courseData.user_Id = user_Id;
                    subjectDataResponse = await this.userSubjectDao.create(subData);

                }
            }


        })
        let data = await Promise.all(subjectdata);

        return;
    }


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
            const { courseId = 0, courseName = '' } = req;
            let usercourseId = courseId;
            let courseData = {
                courseName: courseName,
            }
            let cousreDataResponse;
            console.log("courseName==", courseName, "courseId==", courseId)
            let cdResponse = await this.userCourseDao.findById(courseId);
            if (cdResponse != null) {
                await this.userCourseDao.updateById(courseData, courseId);
                console.log('225')
            } else {
                // courseData.user_Id = user_Id;
                await this.userCourseDao.create(courseData);
                // usercourseId = cousreDataResponse.id;
            }
            return responseHandler.returnSuccess(httpStatus.CREATED, message);
        } catch (error) {
            // logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating courses');

        }

    }

    // update subject // parms : ID , request data
    updateSubject = async (req) => {
        try {
            let message = 'user subject updated';
            const { subjectId = 0, subjectName = '' } = req;

            let subjectdata = {
                subjectName: subjectName,
            }
            console.log('data', subjectdata);
            let subResponse = await this.userSubjectDao.findById(subjectId);
            if (subResponse != null) {
                await this.userSubjectDao.updateById(subjectdata, subjectId);
            }
            else {
                await this.userSubjectDao.create(subjectdata);

            }
            return responseHandler.returnSuccess(httpStatus.CREATED, message);



        } catch (error) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating subjects');
        }
    }


    deleteData = async (req) => {
        try {
            let message = 'data deleted';
            const { courseId = '', semesterId = '', subjectId = '' } = req;
            console.log('courseId==', courseId);
            console.log('semesterId==', semesterId);
            console.log('subjectId==', subjectId);

            if (courseId && semesterId && subjectId) {
                let subResponse = await this.userSubjectDao.findById(subjectId);
                if (subResponse != null) {
                    await this.userSubjectDao.deleteByWhere({ id: subjectId });
                }
            }
            else if (courseId && semesterId) {
                let semResponse = await this.userSemesterDao.findById(semesterId);
                if (semResponse != null) {
                    await this.userSemesterDao.deleteByWhere({ id: semesterId });
                }
            }
            else if (courseId) {
                let cdResponse = await this.userCourseDao.findById(courseId);
                if (cdResponse != null) {
                    await this.userCourseDao.deleteByWhere({ id: courseId });
                }
            } else {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Invalid request');
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, message);

        } catch (error) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error deleting data');
        }
    }


}

module.exports = LmsService;