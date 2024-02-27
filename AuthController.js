const httpStatus = require('http-status');
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');
const fs = require('fs')
const asyncWrapper = require('../middlewares/async');


class AuthController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();
    }

    register = async (req, res) => {
        console.log("register==",req.body);
        return;
        const user = await this.userService.createUser(req, req.body);
        let tokens = {};
        const { status } = user.response;
        if (user.response.status) {
            tokens = await this.tokenService.generateAuthTokens(user.response.data);
        }

        const { message, data } = user.response;
        res.status(user.statusCode).send({ status, message, data, tokens });

    };

    checkEmail = asyncWrapper(async (req, res) => {
        // console.log("isExists==",isExists);

        console.log("isExists1==", req.body);

        const isExists = await this.userService.isEmailExists(req.body.email.toLowerCase());
        console.log("isExists==", isExists);
        if (isExists.statusCode === 200) {
            const verifying = await this.userService.sendEMail(req.body.email.toLowerCase());
            // console.log("otp===",verifying);

        }
        // console.log("isExists====",isExists);
        res.status(isExists.statusCode).send(isExists.response);

    });

    verifyOTP = asyncWrapper(async (req, res) => {

        const isSameOTP = await this.userService.isOTPSame(req.body);
        console.log("isSame===", isSameOTP);
        res.status(isSameOTP.statusCode).send(isSameOTP.response);

    })

    clearOTP = asyncWrapper(async (req, res) => {

        const clearOTP = await this.userService.clearOTP(req.body);
        console.log("isclear===", clearOTP);
        res.status(clearOTP.statusCode).send(clearOTP.response);

    })

    login = asyncWrapper(async (req, res) => {

        const { email, password } = req.body;
        const user = await this.authService.loginWithEmailPassword(
            email.toLowerCase(),
            password,
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

    logout = asyncWrapper(async (req, res) => {
        await this.authService.logout(req, res);
        res.status(httpStatus.NO_CONTENT).send();
    });

    changePasswordFromForgotPassword = asyncWrapper(async (req, res) => {

        console.log(req.body);

        const responseData = await this.userService.changePasswordFromForgotPassword(req.body.email ? req.body.email : req.body.userId, req.body.password);

        res.status(responseData.statusCode).send(responseData.response);

    })

    checkPassword = asyncWrapper(async (req, res) => {
        console.log(req.body);
        // return;
        const responseData = await this.userService.checkPassword(req.body.userId, req.body.oldPassword);
        res.status(responseData.statusCode).send(responseData.response);

    })

    refreshTokens = asyncWrapper(async (req, res) => {

        const refreshTokenDoc = await this.tokenService.verifyToken(
            req.body.refresh_token,
            tokenTypes.REFRESH,
        );
        const user = await this.userService.getUserByUuid(refreshTokenDoc.user_uuid);
        if (user == null) {
            res.status(httpStatus.BAD_GATEWAY).send('User Not Found!');
        }
        await this.tokenService.removeTokenById(refreshTokenDoc.id);
        const tokens = await this.tokenService.generateAuthTokens(user);
        res.send(tokens);

    });

    changePassword = asyncWrapper(async (req, res) => {

        const responseData = await this.userService.changePassword(req.body, req.user.uuid);
        res.status(responseData.statusCode).send(responseData.response);

    });
}



module.exports = AuthController;
