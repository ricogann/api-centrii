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

    getBooking = async (body) => {};

    getBookingById = async (body) => {};

    deleteBooking = async (body) => {};
}

module.exports = new Booking();
