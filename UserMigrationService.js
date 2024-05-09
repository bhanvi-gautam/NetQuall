const UserDao = require("../dao/UserDao");
const UserMigrationDao = require("../dao/UserMigrationDao.js");
const responseHandler = require('../helper/responseHandler');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const logger = require('../config/logger');
const httpStatus = require('http-status');

class UserMigrationService {
    constructor() {
        this.userDao = new UserDao();
        this.userMigrationDao = new UserMigrationDao();
    }

    updateMigration = async (req) => {
        //add in migration table-->student id , new course name and old course name ,(student name too-->change in table as this field does not exists)
        const where = {
            student_first_name: req.first_name,
            student_last_name: req.last_name,
            old_course_name: req.oldCourse,
            new_course_name: req.newCourse
        };
        const check = await this.userMigrationDao.checkExist(where);

        if (!check) {
            // const data={uuid:uuidv4, student_first_name: req.first_name, student_last_name: req.last_name,old_course_name:req.oldCourse,new_course_name:req.newCourse };
            const addData = await this.userMigrationDao.addMigration(req);
            let migrationId;
            if (addData) {
                migrationId = await this.userMigrationDao.findByWhere(where, ['id']);
                if (migrationId) {
                    return responseHandler.returnSuccess(httpStatus.OK, 'migration added successfully', migrationId[0].dataValues.id);
                }
            }
            else {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'migration not added!');
            }

        }
        else {
            return responseHandler.returnSuccess(httpStatus.OK, 'migration already exists!', []);
        }


    }
}



module.exports = UserMigrationService;