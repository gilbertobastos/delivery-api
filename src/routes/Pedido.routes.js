import express from "express";
import PedidoController from "../controllers/Pedido.controller.js";

const router = express.Router();

router.post("/", PedidoController.adicionarPedido);
router.put("/", PedidoController.atualizarPedido);
router.put("/atualizarStatusEntregaPedido", PedidoController.atualizarStatusEntregaPedido);
router.delete("/", PedidoController.deletarPedido);

router.use((err, req, res, next) => {
  res.status(400).send({ erro: err.message });
});

export default router;