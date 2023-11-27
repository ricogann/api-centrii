const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");
const status = require("../helpers/status");

class Service {
    addService = async (body, file) => {
        try {
            const schema = Joi.object({
                mitraId: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                if (file) {
                    fs.unlinkSync(`./public/${file.filename}`);
                }
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const photo = file ? file.filename : null;

            const service = await prisma.service.create({
                data: {
                    mitraId: Number(body.mitraId),
                    name: body.name,
                    price: Number(body.price),
                    description: body.description,
                    photo: photo,
                    rating: 0,
                },
            });

            return { status: true, code: 200, message: "Add service success" };
        } catch (error) {
            if (file) {
                fs.unlinkSync(`./public/${file.filename}`);
            }
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getService = async () => {
        try {
            const service = await prisma.service.findMany();

            return { status: true, code: 200, data: service };
        } catch (error) {
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getServiceById = async (id) => {
        try {
            const service = await prisma.service.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            return { status: true, code: 200, data: service };
        } catch (error) {
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateService = async (id, body, file) => {
        try {
            const schema = Joi.object({
                mitraId: Joi.string().required(),
                name: Joi.string().required(),
                price: Joi.number().required(),
                description: Joi.string().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                if (file) {
                    fs.unlinkSync(`./public/${file.filename}`);
                }
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const photo = file ? file.filename : null;

            const get = await prisma.service.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            if (photo !== null) {
                if (get.photo !== null) {
                    fs.unlinkSync(`./public/${get.photo}`);
                }
            }

            const service = await prisma.service.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    name: body.name,
                    price: Number(body.price),
                    description: body.description,
                    photo: photo ? photo : get.photo,
                },
            });

            return {
                status: true,
                code: 200,
                message: "Update service success",
            };
        } catch (error) {
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteService = async (id) => {
        try {
            const service = await prisma.service.delete({
                where: {
                    id: parseInt(id),
                },
            });

            return {
                status: true,
                code: 200,
                message: "Delete service success",
            };
        } catch (error) {
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateRating = async (id, body) => {
        try {
            const schema = Joi.object({
                rating: Joi.number().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const get = await prisma.service.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            if (get.rating === 0) {
                const rating = body.rating;

                const service = await prisma.service.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        rating: body.rating,
                    },
                });

                return {
                    status: true,
                    code: 200,
                    message: "Update rating success",
                };
            } else {
                const rating = (get.rating + body.rating) / 2;

                const service = await prisma.service.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        rating: rating,
                    },
                });

                return {
                    status: true,
                    code: 200,
                    message: "Update rating success",
                };
            }
        } catch (error) {
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getFilteredService = async () => {
        try {
            const service = await prisma.service.findMany();

            const filteredService = service.reduce((acc, curr) => {
                const existingService = acc.find((s) => s.name === curr.name);
                if (existingService) {
                    existingService.id.push(curr.mitraId);
                } else {
                    acc.push({ id: [curr.mitraId], name: curr.name });
                }
                return acc;
            }, []);

            return { status: true, code: 200, data: filteredService };
        } catch (error) {
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getServiceByMitraId = async (id) => {
        try {
            const service = await prisma.service.findMany({
                where: {
                    mitraId: parseInt(id),
                },
            });

            return { status: true, code: 200, data: service };
        } catch (error) {
            console.error("service module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new Service();
