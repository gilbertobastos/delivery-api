import express from "express";
import PedidoController from "../controllers/Pedido.controller.js";

const router = express.Router();

router.get("/ProdutosMaisPedidos/", PedidoController.consultarProdutosMaisPedidos);
router.get("/ValorTotalDosPedidosDoCliente/", PedidoController.consultarValorTotalPedidosCliente);
router.get("/ValorTotalDosPedidosDoProduto/", PedidoController.consultarValorTotalPedidosProduto);
router.get("/", PedidoController.consultarPedidoPeloId);
router.put("/", PedidoController.atualizarPedido);
router.put("/atualizarStatusEntregaPedido", PedidoController.atualizarStatusEntregaPedido);
router.delete("/", PedidoController.deletarPedido);

router.use((err, req, res, next) => {
  res.status(400).send({ erro: err.message });
});

export default router;