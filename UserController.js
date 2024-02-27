const httpStatus = require('http-status');
// const dotenv = require('dotenv');
const utils = require('../utils/utils')
const fs = require('fs')
const encryptData = require('../helper/EncryDecryHelper');
const axios = require('axios');
const Busboy = require("busboy")
const sharp = require("sharp");
const express = require("express");
const cors = require("cors");
const path = require("path")
const AuthService = require('../service/AuthService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');
const asyncWrapper = require('../middlewares/async');


class UserController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.authService = new AuthService();
        this.DATAEncryptionKey = '6d090796-ecdf-11ea-adc1-0242ac112345'
    }

    register = asyncWrapper(async (req, res) => {

        const user = await this.userService.createUser(req.body);
        console.log("1234==",user);
        let tokens = {};
        const { status } = user.response;
        if (user.response.status) {
            tokens = await this.tokenService.generateAuthTokens(user.response.data);
        }

// 
        const { message, data } = user.response;
        // const enryptedData=encryptData.encryptData(data, this.DATAEncryptionKey);
        res.status(user.statusCode).send({ status, message, data, tokens });

    });
    checkEmail = asyncWrapper(async (req, res) => {

        const isExists = await this.userService.isEmailExists(req.body.email.toLowerCase());
        res.status(isExists.statusCode).send(isExists.response);

    });

    enableDisableUser=asyncWrapper(async(req,res)=>{
        // console.log("req====",req);
        const response = await this.userService.enableDisableUser(req.body);
        console.log("res===", response)
        const { status } = response?.response || 'success';
        const { message, data } = response?.response || 'User disabled successfully';
        res.status(response?.statusCode).send({ status, message });
    })

    sendMessage=asyncWrapper(async(req,res)=>{
        
        const user = await this.userService.sendMessage();
          
            const { status } = user.response;
            const { message, data } = user.response;

            res.status(user.statusCode).send({ status, message, data });
    });

    viewDetail = asyncWrapper(async (req, res) => {
        const users = await this.userService.getAllUsers(req.body);
        console.log("users===", users);
        const responseData = users.response.data.map((user) => {

            return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                profile: user.profile ? user.profile : '',
                occupation: user.occupation,
                address: user.address,
                phone_number: user.phone_number,
                is_available:user.is_available
            };
        });
        const enryptedData=encryptData.encryptData(responseData, this.DATAEncryptionKey);
        console.log('Sending response:', enryptedData);
        const status='success';
        const message='working fine';

        
        res.status(users.statusCode).send({ status, message, data:enryptedData });
        // res.status(users.statusCode).send(enryptedData);

    });

    deleteUser = asyncWrapper(async (req, res) => {
        
        
            const response = await this.userService.deleteUser(req.body);
            console.log("res===", response)
            const { status } = response?.response || 'success';
            const { message, data } = response?.response || 'User deleted successfully';
            // res.status(response?.statusCode).send({ status, message });
    })
    deleteProfile = asyncWrapper(async (req, res) => {
        
            const response = await this.userService.deleteProfile(req.body.fileToBeRemoved);
            console.log("res===", response)
            const { status } = response?.status || 'success';
            const { message } = response?.message || 'User Profile deleted successfully';
            res.status(response?.statusCode || 200).send({ status, message });
          
    })


    viewUser = asyncWrapper(async (req, res) => {
        
            // const { id=0 } = req.body;
            console.log("req.body==",req.body);
            const user = await this.userService.getUserById(req.body);
            // console.log("hieee===",user);
            // return;
            const { status } = user.response;
            const { message, data } = user.response;
            // console.log("user==",user);
            const temp =encryptData.encryptData(data, this.DATAEncryptionKey);
            // console.log(data);
            // console.log("dataConsole======",temp);
            res.status(user.statusCode).send({ status, message, data:temp });

    })

    updateUser = asyncWrapper(async (req, res) => {
       
            const response = await this.userService.updateUser(req.body);
            const { status } = response.response;
            const { message, data } = response.response;
            res.status(response.statusCode).send({ status, message });

        
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

    uploadImage = asyncWrapper(async (req, res) => {
        console.log("hie==", req.header);
        // return;
        const contentRange = req.headers['content-range'];
        console.log('content-range===', contentRange);
        const fileId = req.headers['x-file-id'];
        console.log('fileId===', fileId);

        if (!contentRange) {
            return res.status(400).json({ message: 'Missing "Content-Range" header' });
        }

        if (!fileId) {
            return res.status(400).json({ message: 'Missing "X-File-Id" header' });
        }

        const match = contentRange.match(/bytes=(\d+)-(\d+)\/(\d+)/);

        if (!match) {
            return res.status(400).json({ message: 'Invalid "Content-Range" Format' });
        }

        const rangeStart = Number(match[1]);
        const rangeEnd = Number(match[2]);
        const fileSize = Number(match[3]);

        if (rangeStart >= fileSize || rangeStart >= rangeEnd || rangeEnd > fileSize) {
            return res.status(400).json({ message: 'Invalid "Content-Range" provided' });
        }

        const busboy = Busboy({ headers: req.headers });

        busboy.on('file', (_, fileStream, fileInfo) => {
            if (!fileId) {
                req.pause();
            }

            const filePath = utils.getFilePath(fileInfo.filename, fileId);

            fs.stat(filePath, (err, fileDetails) => {
                if (err) return res.status(400).json({ message: 'No file with such details', details: { fileName: fileInfo.filename, fileId } });

                if (fileDetails.size !== rangeStart) {
                    return res.status(400).json({ message: 'Bad chunk' });
                }

                const writeStream = fs.createWriteStream(filePath, { flags: 'a' })
                fileStream.pipe(writeStream).on('error', (e) => {
                    return res.status(500).json({ message: 'Internal server error' });
                });
            })
        });

        busboy.on('error', (e) => {
            return res.status(500).json({ message: 'Internal server error' });
        })

        busboy.on('finish', () => {
            return res.status(200).json({ message: 'Success' });
        });

        req.pipe(busboy);


    });

    requestFile = asyncWrapper(async (req, res) => {
        if (!req.body || !req.body.fileName) return res.status(400)?.json({ message: 'Missing "fileName"' });

        const fileId = utils.generateUniqueId();
        fs.createWriteStream(utils.getFilePath(req.body.fileName, fileId), { flags: "w" });

        return res.status(200)?.json({ fileId });
    })

    changePassword = asyncWrapper(async (req, res) => {
       
    });

}

module.exports = UserController;
