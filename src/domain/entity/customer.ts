import { Address } from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address: Address | undefined;
    private _active: boolean = false;
    private _rewardPoints: number = 0;


    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get address(): Address | undefined { return this._address; }
    get active(): boolean { return this._active; }
    get rewardPoints(): number { return this._rewardPoints; }

    constructor(id: string, name: string, active: boolean = false) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("name is required");
        }
        if (this._id.length === 0) {
            throw new Error("id is required");
        }
        if (this._active === true && this._address === undefined) {
            throw new Error("address is mandatory to activate a customer");
        }
    }

    set changeAddress(address: Address) {
        this._address = address;
        this.validate();
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    isActive(): boolean { return this._active; }

    activate() {
        this._active = true;
        this.validate();
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    deactivate() {
        this._active = false;
        this.validate();
    }

}