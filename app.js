import PedidoRoutes from "./src/routes/Pedido.routes.js";
import express from "express";

const app = express();

app.use(express.json());
app.use("/pedido", PedidoRoutes);
app.listen(3000);
