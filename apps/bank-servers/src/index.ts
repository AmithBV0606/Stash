import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello from Bank server!! It's working!!!",
  });
});

app.listen(PORT, () => {
  console.log(`Bank servers app running on PORT ${PORT}`);
});
