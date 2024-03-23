"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    constructor(street, city, zip, number) {
        this._number = 0;
        this._street = street;
        this._city = city;
        this._zip = zip;
        this._number = number;
        this.validate();
    }
    validate() {
        if (this._street.length === 0) {
            throw new Error("street is required");
        }
        if (this._number === 0) {
            throw new Error("number is required");
        }
        if (this._zip.length === 0) {
            throw new Error("zip is required");
        }
        if (this._city.length === 0) {
            throw new Error("city is required");
        }
    }
    toString() {
        return `${this._street} ${this._number} ${this._zip} ${this._city}`;
    }
}
exports.Address = Address;
