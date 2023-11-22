const m$service = require("../modules/service.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const serviceController = Router();

serviceController.post("/add", upload.single("photo"), async (req, res) => {
    const result = await m$service.addService(req.body, req.file);

    return response.sendResponse(res, result);
});

serviceController.get("/", async (req, res) => {
    const result = await m$service.getService();

    return response.sendResponse(res, result);
});

serviceController.get("/:id", async (req, res) => {
    const result = await m$service.getServiceById(req.params.id);

    return response.sendResponse(res, result);
});

serviceController.put(
    "/update/:id",
    upload.single("photo"),
    async (req, res) => {
        const result = await m$service.updateService(
            req.params.id,
            req.body,
            req.file
        );

        return response.sendResponse(res, result);
    }
);

serviceController.delete("/delete/:id", async (req, res) => {
    const result = await m$service.deleteService(req.params.id);

    return response.sendResponse(res, result);
});

serviceController.put("/update/rating/:id", async (req, res) => {
    const result = await m$service.updateRating(req.params.id, req.body);

    return response.sendResponse(res, result);
});

module.exports = serviceController;
