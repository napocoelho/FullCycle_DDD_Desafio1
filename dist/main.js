"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./entity/customer"));
const address_1 = require("./entity/address");
const order_item_1 = __importDefault(require("./entity/order_item"));
let customer = new customer_1.default("123", "Junio Coelho");
const address = new address_1.Address("Rua Barcelona", "Governador Valadares", "35057-790", 74);
customer.Address = address; //--> relação entre Customer e Address, como Referência (mesmo contexto, mesmo aggregate).
customer.activate();
// const customerId = customer._id;
const item1 = new order_item_1.default("1", "Item 1", 10);
const item2 = new order_item_1.default("2", "Item 2", 15);
// const order = new Order("1", customerId, [item1, item2]);   // --> relação entre Customer e Order, como ID (diferentes contextos). Relação Order e OrderItem, como Referência (mesmo contexto).
