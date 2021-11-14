import express from "express";
import peopleRouter from "./routes/people.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(peopleRouter);

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
