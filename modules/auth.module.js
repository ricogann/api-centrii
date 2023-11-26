const Joi = require("joi");
const prisma = require("../helpers/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const dotenv = require("dotenv");
const status = require("../helpers/status");
dotenv.config();

class Auth {
    login = async (body) => {
        try {
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkEmail = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (!checkEmail) {
                return { status: false, error: "Email not found" };
            }

            if (checkEmail.status === status.PENDING) {
                return {
                    status: false,
                    error: "Your account is not active, please contact admin",
                };
            }

            const checkPassword = bcrypt.compareSync(
                body.password,
                checkEmail.password
            );

            if (!checkPassword) {
                return { status: false, error: "Wrong password" };
            }

            const payload = {
                id: checkEmail.id,
                email: checkEmail.email,
                name: checkEmail.name,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "1d",
            });

            return {
                status: true,
                message: "Login success, take your token",
                token: token,
            };
        } catch (error) {
            console.error("login auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    loginMitra = async (body) => {
        try {
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkEmail = await prisma.mitra.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (!checkEmail) {
                return { status: false, error: "Email not found" };
            }

            const checkPassword = bcrypt.compareSync(
                body.password,
                checkEmail.password
            );

            if (!checkPassword) {
                return { status: false, error: "Wrong password" };
            }

            const payload = {
                id: checkEmail.id,
                email: checkEmail.email,
                name: checkEmail.name,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "1d",
            });

            return {
                status: true,
                message: "Login success, take your token",
                token: token,
            };
        } catch (error) {
            console.error("login auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    loginAdmin = async (body) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkUsername = await prisma.admin.findUnique({
                where: {
                    username: body.username,
                },
            });

            if (!checkUsername) {
                return { status: false, error: "Username not found" };
            }

            const checkPassword = bcrypt.compareSync(
                body.password,
                checkUsername.password
            );

            if (!checkPassword) {
                return { status: false, error: "Wrong password" };
            }

            const payload = {
                id: checkUsername.id,
                email: checkUsername.username,
                name: checkUsername.name,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "1d",
            });

            return {
                status: true,
                message: "Login success, take your token",
                token: token,
            };
        } catch (error) {
            console.error("login auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    register = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkEmail = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (checkEmail) {
                return { status: false, error: "Email already exist" };
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(body.password, salt);

            const createUser = await prisma.user.create({
                data: {
                    email: body.email,
                    password: hashPassword,
                    name: body.name,
                    status: status.PENDING,
                },
            });

            if (!createUser) {
                return { status: false, error: "Failed to create user" };
            }

            return {
                status: true,
                message: "Success create user",
            };
        } catch (error) {
            console.error("register auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    registerMitra = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkEmail = await prisma.mitra.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (checkEmail) {
                return { status: false, error: "Email already exist" };
            }

            const salt = bcrypt.genSaltSync(10);

            const hashPassword = bcrypt.hashSync(body.password, salt);

            const createMitra = await prisma.mitra.create({
                data: {
                    email: body.email,
                    password: hashPassword,
                    name: body.name,
                    status: status.PENDING,
                },
            });

            if (!createMitra) {
                return { status: false, error: "Failed to create user" };
            }

            return {
                status: true,
                code: 200,
                message: "Success create mitra",
            };
        } catch (error) {
            console.error("register auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    registerAdmin = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const checkUsername = await prisma.admin.findUnique({
                where: {
                    username: body.username,
                },
            });

            if (checkUsername) {
                return { status: false, error: "Email already exist" };
            }

            const salt = bcrypt.genSaltSync(10);

            const hashPassword = bcrypt.hashSync(body.password, salt);

            const createAdmin = await prisma.admin.create({
                data: {
                    username: body.username,
                    password: hashPassword,
                    name: body.name,
                },
            });

            if (!createAdmin) {
                return { status: false, error: "Failed to create admin" };
            }

            return {
                status: true,
                code: 200,
                message: "Success create admin",
            };
        } catch (error) {
            console.error("register auth module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new Auth();
