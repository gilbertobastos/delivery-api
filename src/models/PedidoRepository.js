import fs from "fs";
import Pedido from "./Pedido.js";

class PedidoRepository {
  constructor(arquivoBancoJSON) {
    this.arquivoBancoJSON = arquivoBancoJSON;
    this._db = JSON.parse(fs.readFileSync(arquivoBancoJSON));
  }

  async atualizarArquivoDb() {
    try {
      await fs.promises.writeFile(
        this.arquivoBancoJSON,
        JSON.stringify(this._db)
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param {Pedido} pedido
   * @readonly {number} Id do pedido.
   */
  addPedido(pedido) {
    pedido.id = this._db.nextId++;
    this._db.pedidos.push(pedido);
    this.atualizarArquivoDb();
    return pedido.id;
  }

  /**
   *
   * @param {Pedido} pedido
   */
  updatePedido(pedidoAtualizar) {
    const posPedido = this._db.pedidos.findIndex(
      (pedido) => pedido.id === pedidoAtualizar.id
    );

    this._db.pedidos[posPedido] = pedidoAtualizar;
    this.atualizarArquivoDb();
  }

  /**
   *
   * @param {number} id
   * @returns
   */
  getPedidoPeloId(id) {
    return this._db.pedidos.find((pedido) => pedido.id === id);
  }

  /**
   *
   * @param {number} id
   * @returns
   */
  deletePedidoPeloId(id) {
    const indicePedidoArray = this._db.pedidos.findIndex(
      (pedido) => pedido.id === id
    );

    if (indicePedidoArray >= 0) {
      return this._db.pedidos.splice(indicePedidoArray, 1);
    } else {
      return [];
    }
  }

  getProdutosMaisVendidos() {
    let produtosEQuantidade = {};

    this._db.pedidos.forEach((pedido) => {
      if (!pedido.entregue) return;

      produtosEQuantidade[pedido.produto] =
        (produtosEQuantidade[pedido.produto] || 0) + 1;
    });

    return Object.entries(produtosEQuantidade)
      .map(function (value) {
        return { pedido: value[0], qtde: value[1] };
      })
      .sort((a, b) => b.qtde - a.qtde);
  }

  /**
   *
   * @param {string} nomeCliente
   * @returns
   */
  getValorTotalPedidosCliente(nomeCliente) {
    let valorTotal = this._db.pedidos
      .filter(function (pedido) {
        return pedido.cliente === nomeCliente && pedido.entregue;
      })
      .reduce(function (accu, curVal) {
        return accu + curVal.valor;
      }, 0);

    return valorTotal;
  }

  /**
   *
   * @param {string} nomeProduto
   * @returns
   */
  getValorTotalPedidosProduto(nomeProduto) {
    let valorTotal = this._db.pedidos
      .filter(function (pedido) {
        return pedido.produto === nomeProduto && pedido.entregue;
      })
      .reduce(function (accu, curVal) {
        return accu + curVal.valor;
      }, 0);

    return valorTotal;
  }
}

export default PedidoRepository;
