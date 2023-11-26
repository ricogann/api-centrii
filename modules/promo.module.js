const Joi = require("joi");
const prisma = require("../helpers/database");

class Promo {
    addPromo = async (body, file) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                code: Joi.string().required(),
                percent: Joi.string().required(),
                expired: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                return {
                    status: false,
                    error: validation.error.details[0].message,
                };
            }

            const photo = file ? file.filename : null;

            const promo = await prisma.promo.create({
                data: {
                    name: body.name,
                    code: body.code,
                    percent: Number(body.percent),
                    expired: new Date(body.expired),
                    photo: photo,
                },
            });

            return { status: true, code: 200, message: "Add promo success" };
        } catch (error) {
            console.error("promo module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getPromo = async () => {
        try {
            const promo = await prisma.promo.findMany();

            return { status: true, code: 200, data: promo };
        } catch (error) {
            console.error("promo module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getPromoById = async (id) => {
        try {
            const promo = await prisma.promo.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, data: promo };
        } catch (error) {
            console.error("promo module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deletePromo = async (id) => {
        try {
            const promo = await prisma.promo.delete({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, message: "Delete promo success" };
        } catch (error) {
            console.error("promo module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new Promo();
