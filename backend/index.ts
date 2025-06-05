import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    res.json({
        msg: "SUCCESS",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
