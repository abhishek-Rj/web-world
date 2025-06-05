import express from "express";
import cors from "cors";
import userRouter from "./routes/user/register";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({
    msg: "SUCCESS",
  });
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
