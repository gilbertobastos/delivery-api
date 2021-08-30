class Pedido {
  /**
   * @param {string} cliente
   * @param {string} produto
   * @param {number} valor
   * @param {number} id
   */
  constructor(cliente, produto, valor, id) {
    this.id = id;
    this.cliente = cliente;
    this.produto = produto;
    this.valor = valor;
    this.entregue = false;
    this.timestamp = new Date();
  }
}

export default Pedido;
