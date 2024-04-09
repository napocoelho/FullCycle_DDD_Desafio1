export class Address {

    _street: string;
    _city: string;
    _zip: string;
    _number: number = 0;

    get street(): string { return this._street; }
    get city(): string { return this._city; }
    get zip(): string { return this._zip; }
    get number(): number { return this._number; }

    constructor(street: string, city: string, zip: string, number: number) {
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