const m$booking = require("../modules/booking.module");
const response = require("../helpers/response");

const { Router } = require("express");

const bookingController = Router();

bookingController.post("/add", async (req, res) => {
    const result = await m$booking.addBooking(req.body);

    return response.sendResponse(res, result);
});

bookingController.get("/user/:id", async (req, res) => {
    const result = await m$booking.getBookingByUser(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.get("/mitra/:id", async (req, res) => {
    const result = await m$booking.getBookingByMitra(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.get("/", async (req, res) => {
    const result = await m$booking.getBooking();

    return response.sendResponse(res, result);
});

bookingController.put("/update/accepted/:id", async (req, res) => {
    const result = await m$booking.updateStatusBookingAccepted(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.put("/update/done/:id", async (req, res) => {
    const result = await m$booking.updateStatusBookingDone(req.params.id);

    return response.sendResponse(res, result);
});

bookingController.delete("/delete/:id", async (req, res) => {
    const result = await m$booking.deleteBooking(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = bookingController;
