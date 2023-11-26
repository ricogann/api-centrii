const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");
const status = require("../helpers/status");

class Mitra {
    getMitra = async () => {
        try {
            const mitra = await prisma.mitra.findMany();

            return { status: true, code: 200, data: mitra };
        } catch (error) {
            console.error("mitra module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getMitraById = async (id) => {
        try {
            const mitra = await prisma.mitra.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, data: mitra };
        } catch (error) {
            console.error("mitra module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateMitra = async (id, body, file) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.string().required(),
                address: Joi.string().required(),
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

            const photo = file ? file.filename : null;

            const mitra = await prisma.mitra.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    profile: photo,
                },
            });

            return { status: true, code: 200, message: "Update mitra success" };
        } catch (error) {
            if (file) {
                fs.unlinkSync(`./public/${file.filename}`);
            }
            console.error("mitra module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteMitra = async (id) => {
        try {
            const mitra = await prisma.mitra.delete({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, message: "Delete mitra success" };
        } catch (error) {
            console.error("mitra module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new Mitra();
