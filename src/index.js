import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import studentroute from './routes/studentroute';
import usersroute from "./routes/usersroute";
import logger from './middlewares/logger';
import response from './helpers/response';

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/api/v1", studentroute);
app.use("/api/v1", usersroute);
app.use(logger);
app.use("*", (req, res) => {
  response.response(res, 404, "error", "resource not found", true);
});
app.get('/',(req,res) => res.status(200).send({status:200,message:'Welcome to this web app home page'}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
