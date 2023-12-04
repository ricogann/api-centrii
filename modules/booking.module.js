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
                    date: new Date(body.date),
                    finish: new Date(body.finish),
                    service: body.service,
                    total_shoes: body.total_shoes,
                    price: Number(body.price),
                    status: status.BELUM_BAYAR,
                },
            });

            return {
                status: true,
                code: 200,
                message: "Booking Success",
                data: booking,
            };
        } catch (error) {
            console.error("booking module Error: ", error);
            return {
                status: false,
                error,
            };
        }
    };

    updateStatusBayar = async (id) => {
        try {
            const booking = await prisma.booking.update({
                where: {
                    id: Number(id),
                },
                data: {
                    status: status.BOOKING_PENDING,
                },
            });
            console.log(booking);
            return { status: true, code: 200, message: "Success" };
        } catch (error) {
            console.error("update module Error:", error);
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
                    userId: Number(id),
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
                    mitraId: Number(id),
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

    getRecentBookingUser = async (id) => {
        try {
            const booking = await prisma.booking.findMany({
                where: {
                    userId: Number(id),
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
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
                    id: Number(id),
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
                    id: Number(id),
                },
                data: {
                    status: status.BOOKING_DONE,
                },
            });

            const balance = await prisma.balance.update({
                where: {
                    id: Number(booking.mitraId),
                },
                data: {
                    balance: {
                        increment: Number(booking.price),
                    },
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
                    id: Number(id),
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

    deleteBookingBelumBayar = async () => {
        try {
            const booking = await prisma.booking.deleteMany({
                where: {
                    status: status.BELUM_BAYAR,
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

    countBookingWorking = async (id, body) => {
        try {
            const booking = await prisma.booking.findMany({
                where: {
                    mitraId: Number(id),
                    status: status.BOOKING_WORKING,
                },
            });
            console.log(booking);
            for (let i = 0; i < booking.length; i++) {
                const element = booking[i];
                if (element.id == body.id) {
                    return {
                        status: true,
                        code: 200,
                        message: "Success",
                        data: i + 1,
                    };
                }
            }
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
