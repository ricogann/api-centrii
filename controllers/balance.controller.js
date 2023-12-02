const m$balance = require("../modules/balance.module");
const response = require("../helpers/response");

const { Router } = require("express");

const balanceController = Router();

balanceController.get("/:id", async (req, res) => {
    const result = await m$balance.getBalance(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = balanceController;
