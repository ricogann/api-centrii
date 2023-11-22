const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "CENTRII API IS RUNNING...",
    });
});

routes(app);

app.use("/assets", express(`./public`));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
