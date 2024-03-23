"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name, active = false) {
        this._active = false;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get name() { return this._name; }
    validate() {
        if (this._name.length === 0) {
            throw new Error("name is required");
        }
        if (this._id.length === 0) {
            throw new Error("id is required");
        }
    }
    set Address(address) {
        this._address = address;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
}
exports.default = Customer;
