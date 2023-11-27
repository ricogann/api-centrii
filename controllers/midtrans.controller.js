const m$midtrans = require("../modules/midtrans.module");
const response = require("../helpers/response");

const { Router } = require("express");

const midtransController = Router();

midtransController.post("/createTransaction", async (req, res) => {
    const result = await m$midtrans.snap(req.body);

    return response.sendResponse(res, result);
});

module.exports = midtransController;
