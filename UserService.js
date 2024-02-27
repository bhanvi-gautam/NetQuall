const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const UserDao = require('../dao/UserDao');
const path = require('path');
const { Op } = require('sequelize');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const { messg,smtp } = require('../config/config');


class UserService {
    constructor() {
        this.userDao = new UserDao();
    }

    /**
     * Create a user
     * @param {Object} userBody
     * @returns {Object}
     */
    createUser = async (req, userBody) => {
        try {

            let message = 'Successfully Registered the account! Please Verify your email.';
            if (await this.userDao.isEmailExists(userBody.email)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email already taken');
            }
            console.log("123455==",userBody);
            const uuid = uuidv4();
            // let profile = fs.readFileSync(req.file.path);
            userBody.profile = userBody.profile ? userBody.profile : '';
            userBody.first_name = userBody.first_name.toLowerCase();
            userBody.last_name = userBody.last_name.toLowerCase();
            userBody.address = userBody.address.toLowerCase();
            userBody.phone_number = userBody.phone_number;
            userBody.email = userBody.email.toLowerCase();
            userBody.password = bcrypt.hashSync(userBody.password, 8);
            userBody.uuid = uuid;
            userBody.status = userConstant.STATUS_ACTIVE;
            userBody.email_verified = userConstant.EMAIL_VERIFIED_FALSE;
            userBody.user_Id = userBody.user_Id;
            userBody.occupation = userBody.occupation;

            let userData = await this.userDao.create(userBody);
            
            console.log("hie1====",userData);
            if (!userData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            userData = userData.toJSON();
            // return;
            
            console.log("hie2====",userData);
            delete userData.password;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, userData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };
    // /**
    //  * get all users
    //  */

    getAllUsers = async (req) => {
        try {
            console.log("hie=====", req);
            // console.log("name=====", req.search);
            // console.log("filters Teacher====", req.filters[0].Teacher);
            // return;
            let users;
            
            // if (req.search==='' && !req.filters.Student && !req.filters.Teacher) {
            //     users = await this.userDao.findAll();
            // }
            // else if(req.search!=='' ) {

            let where = {};
            if (req.search !== '') {
                where = {
                    [Op.or]: [
                        {
                            first_name: {

                                [Op.regexp]: escapeRegExp(req.search)
                            }
                        },
                        {
                            last_name: {
                                [Op.regexp]: escapeRegExp(req.search)
                            }
                        }
                    ],

                }
            }
            if (req.filters[0].Teacher) {
                where.occupation = 1;
            }
            if (req.filters[0].Student) {
                where.occupation = 0;
            }
            if (req.filters[0].Student && req.filters[0].Teacher) {
                where.occupation = {
                    [Op.or]: [0, 1]
                };
            }
            
            console.log("where==", where);

            // if(req.sortBy.length===2){

            //     const orderArr=[req.sortBy[0],req.sortBy[1]];
            //     users = await this.userDao.findByWhere(where,undefined,orderArr);
            // }
            // console.log('sortBy===',orderArr);
            // return;

            // if(!orderArr){
            //     console.log('no order arr');
               
            // }
            const arr=req.sortBy[0]===undefined? ['id', 'asc']: req.sortBy;
            console.log('arr===',arr);
            // ['id', 'asc']
            users = await this.userDao.findByWhere(where,undefined,arr);
            return responseHandler.returnSuccess(httpStatus.OK, 'Users fetched successfully', users);


        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching users');
        }
    };



    sendEMail = async (email) => {

        try {
            // Generate SMTP service account from ethereal.email
            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    console.error("Failed to create a testing account. " + err.message);
                    return process.exit(1);
                }

                console.log("Credentials obtained, sending message...");

                // Create a SMTP transporter object
                const transporter = nodemailer.createTransport({
                    host: smtp.smtpHost,
                    port: smtp.smtpPort,
                    auth: {
                        user: smtp.smtpUser,
                        pass: smtp.smtpPass,
                    },
                });

                // Message object
                let message = {
                    from: messg.emailFrom,
                    to: email,
                    subject: "Nodemailer is unicode friendly ✔",
                    text: "Hello " + `${otp}`,
                    html: "<p><b>Hello</b> to myself! saldaskdasjda sdjasdkjasjdasjdajsld</p>",
                };

                transporter.sendMail(message, (err, info) => {
                    if (err) {
                        console.log("Error occurred. " + err.message);
                        return process.exit(1);
                    }

                    console.log("Message sent: %s", info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                });
            });

            // const now = new Date();
            // const expiration_time = AddMinutesToDate(now, 10);

            // const otp_instance=await 

            let otp_db = await this.userDao.updateWhere({ otp_generated: otp }, { email: email });
            // console.log(updated!"")
            console.log("heyloo");
            return responseHandler.returnSuccess(httpStatus.OK, message);

        } catch (error) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Sent!!');
        }

    }

    /**
     * Get user
     * @param {String} email
     * @returns {Object}
     */

    isEmailExists = async (email) => {
        const message = 'Email found!';
        if (!(await this.userDao.isEmailExists(email))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    sendMessage = async () => {
        try {
            const message = 'Message sent!';
            
                // const companyDao = new CompanyDao();
                // console.log(data);
                const accountSid = messg.accountSid;
                const authToken = messg.authToken;
                const client = require('twilio')(accountSid, authToken);
                // let companyId = data?.company_Id;
            
                // const companyResponse = await companyDao?.findById(companyId);
                // const jsoncmpdata = companyResponse?.toJSON();
                const cmpMsgId = messg.companyMsgId;
            console.log("check1==",client);
            
                // if(cmpMsgId !== '') {
                //  client.messages
                //     .create({
                //         body: "s445cs",
                //         messagingServiceSid: cmpMsgId,
                //         to: '+15752287091',
                //         // mediaUrl: data.mediaUrl
                //     })
                //     .then((result) => {
                //         return responseHandler.returnSuccess(httpStatus.OK, message);
                //     })
                //     .catch((e) => {
                //         console.log(e);
                //     }); 
                // }
             
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Message not send!!'); 
            
        } catch (error) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Message not send!!');
        }
    }

    isOTPSame = async (req) => {
        console.log(req);
        // return;
        const inputOTP = req.otp;
        const inputEmail = req.email?.toLowerCase().toString().trim();
        const orignalOTP = await this.userDao.findOneByWhere({ email: inputEmail }, ['otp_generated']);

        console.log("orignalOTP===", orignalOTP.dataValues.otp_generated);
        const orgOTP = orignalOTP.dataValues.otp_generated;
        // return;
        if (inputOTP !== orgOTP) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Incorrect OTP!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, 'Verified');

    }

    clearOTP = async (req) => {
        try {
            console.log("userService===", req);
            const deleteOTP = await this.userDao.updateWhere({ otp_generated: '0' }, { email: req.email });

            if (deleteOTP) {
                return responseHandler.returnSuccess(httpStatus.OK, 'otp Deleted');
            }
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'OTP not deleted!!');
        } catch (error) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'OTP not deleted again!!');
        }
    }

    getUserByUuid = async (uuid) => {
        return this.userDao.findOneByWhere({ uuid });
    };


    deleteUser = async (data) => {
        try {
            // const { userId = 0 } = req.body;
            let userResponse = await this.userDao.findById(data.userId);
            console.log("id===", data.userId)

            if (userResponse != null) {
                // console.log('hie!')
                await this.userDao.deleteByWhere({ id: data.userId });
            }
        } catch (error) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error deleting data');
        }
    }

    enableDisableUser=async(data)=>{
        try {
            console.log("data====",data);
            const user=await this.userDao.findById(data.id);
           
            if (!user) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
            }
            console.log(user.dataValues.is_available);
         

            const disableUser=await this.userDao.updateById({is_available: !user.dataValues.is_available},data.id);
            console.log("disableUser===",disableUser);
            if(disableUser){
                return responseHandler.returnSuccess(httpStatus.OK,'User Disabled Successfully!')
            }
        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'User Disable Failed!');


        } catch (error) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error disabling data');
        }
    }


    deleteProfile = async (fileName) => {
        try {
            const directoryPath = path.join(__dirname, '../utils/images/');
            const fullPath = directoryPath + fileName;
            console.log("Full path to delete: ", fullPath);

            // Check if the file exists before attempting to delete
            if (!fs.existsSync(fullPath)) {
                console.log("File not found: ", fullPath);
                return { status: httpStatus.NOT_FOUND, message: "File not found" };
            }

            // Delete the file
            fs.unlinkSync(fullPath);

            console.log("Deleted file successfully.");

            return { status: httpStatus.OK, message: "User profile deleted successfully" };
        } catch (error) {
            console.error("Error deleting profile photo: ", error);
            return { status: httpStatus.INTERNAL_SERVER_ERROR, message: "Error deleting profile photo" };
        }
    }

    changePasswordFromForgotPassword = async (data, password) => {
        let user;
        if(data.includes('@')){
             user = await this.userDao.findOneByWhere({ email: data });
        }
        else{
            user = await this.userDao.findOneByWhere({ id: data });
        }
       
        if (!user) {
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
        }

        user = user.toJSON();
        delete user.password;

        let updateUser;
        if(data.includes('@')){
            updateUser = await this.userDao.updateWhere(
                { password: bcrypt.hashSync(password, 8) },
                { email: data },
            );
       }
       else{
        updateUser = await this.userDao.updateWhere(
            { password: bcrypt.hashSync(password, 8) },
            { id: data },
        );
       }
     

        if (updateUser) {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Password updated Successfully!',
                {},
            );
        }

        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
    };

    checkPassword=async(id,data)=>{
        let message="user verified";
        let statusCode = httpStatus.OK;

        let user = await this.userDao.findOneByWhere({ id:id });

        if(!user){
            return responseHandler.returnError(httpStatus.NOT_FOUND,'User Not Found!');
        }
        console.log(user.password);
        const isPasswordValid = await bcrypt.compare(data, user.password);
        if (!isPasswordValid) {
            statusCode = httpStatus.BAD_REQUEST;
            message = 'Wrong old Password!';
            return responseHandler.returnError(statusCode, message);
        }
        else{
            return responseHandler.returnSuccess(httpStatus.OK,'Old Password exists!')
        }

    }



    changePassword = async (data, uuid) => {
        let message = 'Login Successful';
        let statusCode = httpStatus.OK;
        let user = await this.userDao.findOneByWhere({ uuid });

        if (!user) {
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
        }

        if (data.password !== data.confirm_password) {
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Confirm password not matched',
            );
        }

        const isPasswordValid = await bcrypt.compare(data.old_password, user.password);
        user = user.toJSON();
        delete user.password;
        if (!isPasswordValid) {
            statusCode = httpStatus.BAD_REQUEST;
            message = 'Wrong old Password!';
            return responseHandler.returnError(statusCode, message);
        }
        const updateUser = await this.userDao.updateWhere(
            { password: bcrypt.hashSync(data.password, 8) },
            { uuid },
        );

        if (updateUser) {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Password updated Successfully!',
                {},
            );
        }

        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
    };

    getUserById = async (req) => {

        try {
            let userData = await this.userDao.findOneByWhere({ id: req.userId });
            // console.log("id==",req.id)
            // console.log('userData', userData);

            return responseHandler.returnSuccess(httpStatus.OK, 'Users fetched successfully', userData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching users');
        }
    };

    updateUser = async (req) => {
        try {
            let message = "user data updated ";
            console.log("req===", req);

            const { id = 0, first_name = '', last_name = '', email = '', address = '', phone_number = 0, profile = '' } = req;

            let userData = {
                profile: profile,
                first_name: first_name,
                last_name: last_name,
                email: email,
                address: address,
                phone_number: phone_number,
            }
            let userResponse = await this.userDao.findById(id);
            if (userResponse != null) {
                await this.userDao.updateById(userData, id);
                // console.log('225')
            } else {
                // courseData.user_Id = user_Id;
                await this.userDao.create(userData);
                // usercourseId = cousreDataResponse.id;
            }
            return responseHandler.returnSuccess(httpStatus.CREATED, message);
        } catch (error) {
            // logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating courses');

        }

    }



}

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

// // To add minutes to the current time
// function AddMinutesToDate(date, minutes) {
//     return new Date(date.getTime() + minutes * 60000);
// }

module.exports = UserService;
