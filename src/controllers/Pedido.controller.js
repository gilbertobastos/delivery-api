import Pedido from "../models/Pedido.js";
import PedidoRepository from "../models/PedidoRepository.js";
import path from "path";

const pedidoRepository = new PedidoRepository(
  path.dirname(new URL(import.meta.url).pathname) + "/../db/pedidos.json"
);

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function consultarPedidoPeloId(req, res, next) {
  try {
    const idPedido = parseInt(req.query.id);
    if (isNaN(idPedido)) throw new Error("Id fornecido inválido!");

    const pedido = pedidoRepository.getPedidoPeloId(idPedido);
    res.send(pedido).status(200);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function adicionarPedido(req, res, next) {
  try {
    if (
      !(
        typeof req.body.cliente === "string" &&
        typeof req.body.produto === "string" &&
        typeof req.body.valor === "number"
      )
    ) {
      throw new Error("Parâmetros fornecidos inválidos!");
    }

    const pedido = new Pedido(
      req.body.cliente,
      req.body.produto,
      req.body.valor,
      false
    );

    res.send({ id: pedidoRepository.addPedido(pedido) }).status(201);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function atualizarPedido(req, res, next) {
  try {
    if (
      !(
        typeof req.body.id === "number" &&
        typeof req.body.cliente === "string" &&
        typeof req.body.produto === "string" &&
        typeof req.body.valor === "number"
      )
    ) {
      throw new Error("Parâmetros fornecidos inválidos!");
    }

    const id = req.body.id;
    const pedido = pedidoRepository.getPedidoPeloId(id);

    if (!pedido) {
      throw new Error("Não foi localizado nenhum produto com o id informado.");
    }

    pedido.cliente = req.body.cliente;
    pedido.produto = req.body.produto;
    pedido.valor = req.body.valor;
    pedidoRepository.updatePedido(pedido);
    res.send().status(200);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function atualizarStatusEntregaPedido(req, res, next) {
  try {
    if (
      !(
        typeof req.body.id === "number" &&
        typeof req.body.entregue === "boolean"
      )
    ) {
      throw new Error("Parâmetros fornecidos inválidos!");
    }

    const id = req.body.id;
    const pedido = pedidoRepository.getPedidoPeloId(id);

    if (!pedido) {
      throw new Error("Não foi localizado nenhum produto com o id informado.");
    }

    pedido.entregue = req.body.entregue;
    pedidoRepository.updatePedido(pedido);
    res.send().status(200);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function deletarPedido(req, res, next) {
  try {
    if (!(typeof req.body.id === "number")) {
      throw new Error("Parâmetros fornecidos inválidos!");
    }

    const id = req.body.id;
    const pedidoRemovidoArray = pedidoRepository.deletePedidoPeloId(id);
    console.log(pedidoRemovidoArray);

    if (pedidoRemovidoArray.length === 0) {
      throw new Error("Não foi localizado nenhum produto com o id informado.");
    }
    res.send().status(200);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function consultarProdutosMaisPedidos(req, res, next) {
  try {
    res.send(pedidoRepository.getProdutosMaisVendidos()).status(200);
  } catch (err) {
    next(err);
  }
}

export default {
  consultarPedidoPeloId,
  consultarProdutosMaisPedidos,
  adicionarPedido,
  atualizarPedido,
  atualizarStatusEntregaPedido,
  deletarPedido,
};
