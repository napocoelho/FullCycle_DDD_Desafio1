"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, customerId, items) {
        this._items = [];
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
    }
    total() {
        return this._items.reduce((acc, item) => acc + item._price, 0);
    }
}
exports.Order = Order;
