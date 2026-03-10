import express, { Request, Response } from "express";
// 呪文

const app = express();
const port = 3000;
// 呪文

// JSONを受け取れるようにする（POST/PUTで必要）
app.use(express.json());

import usersRouter from "./routes/users";

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running: http://localhost:3000`);
});

