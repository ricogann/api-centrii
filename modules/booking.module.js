const Joi = require("joi");
const prisma = require("../helpers/database");
const fs = require("fs");
const status = require("../helpers/status");

class Booking {
    addBooking = async (body) => {
        try {
            const schema = Joi.object({
                userId: Joi.number().required(),
                mitraId: Joi.number().required(),
                serviceId: Joi.string().required(),
                date: Joi.string().required(),
                finish: Joi.string().required(),
                service: Joi.string().required(),
                total_shoes: Joi.string().required(),
                price: Joi.number().required(),
            }).options({ abortEarly: false });

            const validation = schema.validate(body);

            if (validation.error) {
                const errorDetails = validation.error.details.map(
                    (detail) => detail.message
                );

                return { status: false, error: errorDetails.join(", ") };
            }

            const booking = await prisma.booking.create({
                data: {
                    userId: body.userId,
                    mitraId: body.mitraId,
                    serviceId: body.serviceId,
                    date: body.date,
                    finish: body.finish,
                    service: body.service,
                    total_shoes: body.total_shoes,
                    price: body.price,
                    status: status.BOOKING_PENDING,
                },
            });

            return { status: true, code: 200, message: "Booking Success" };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getBookingByUser = async (id) => {
        try {
            const booking = await prisma.booking.findMany({
                where: {
                    userId: id,
                },
                include: {
                    mitra: true,
                },
            });

            return { status: true, code: 200, data: booking };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getBookingByMitra = async (id) => {
        try {
            const booking = await prisma.booking.findMany({
                where: {
                    mitraId: id,
                },
                include: {
                    user: true,
                },
            });

            return { status: true, code: 200, data: booking };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    getBooking = async (body) => {
        try {
            const booking = await prisma.booking.findMany({});

            return { status: true, code: 200, data: booking };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateStatusBookingAccepted = async (id) => {
        try {
            const booking = await prisma.booking.update({
                where: {
                    id,
                },
                data: {
                    status: status.BOOKING_WORKING,
                },
            });

            return {
                status: true,
                code: 200,
                message: "Booking Accepted, Now your booking is on queue",
            };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateStatusBookingDone = async (id) => {
        try {
            const booking = await prisma.booking.update({
                where: {
                    id,
                },
                data: {
                    status: status.BOOKING_DONE,
                },
            });

            return {
                status: true,
                code: 200,
                message: "Booking Done, Thank you for using our service",
            };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    deleteBooking = async (id) => {
        try {
            const booking = await prisma.booking.delete({
                where: {
                    id,
                },
            });

            return { status: true, code: 200, message: "Booking Deleted" };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };
}

module.exports = new Booking();
