const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");
const status = require("../helpers/status");

class User {
    getUser = async () => {
        try {
            const user = await prisma.user.findMany();

            return { status: true, code: 200, data: user };
        } catch (error) {
            console.error("user module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getUserById = async (id) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, data: user };
        } catch (error) {
            console.error("user module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateUser = async (id, body, file) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.string().required(),
                address: Joi.string().required(),
                photo: Joi.string().required(),
            });

            const { error } = schema.validate(body);

            if (error) {
                if (file) {
                    fs.unlinkSync(`./public/${file.filename}`);
                }
                return {
                    status: false,
                    code: 400,
                    message: error.details[0].message,
                };
            }

            const user = await prisma.user.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    photo: file ? file.filename : body.photo,
                },
            });

            return { status: true, code: 200, message: "Update user success" };
        } catch (error) {
            if (file) {
                fs.unlinkSync(`./public/${file.filename}`);
            }
            console.error("user module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteUser = async (id) => {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, message: "Delete user success" };
        } catch (error) {
            console.error("user module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new User();
