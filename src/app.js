import express from "express";
import routes from "./router/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./router/views.routes.js";
import productManager from "./productManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use("/api", routes);

app.use("/", viewsRoutes)

const httpServer = app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

export const io = new Server(httpServer);

io.on("connection", async socket => {
  console.log("Nuevo usuario Conectado");
  const products = await productManager.getProducts();
  io.emit('products', products);
});
