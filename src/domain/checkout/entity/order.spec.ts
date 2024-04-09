import { Address } from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import { Order } from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("Order 1", "", []);
        }).toThrowError("customerId is required");
    });

    it("should throw error if items is not set", () => {
        expect(() => {
            let order = new Order("Order 1", "123", []);
        }).toThrowError("items is required");
    });

    it("should calculate total", () => {

        const item1 = new OrderItem("item 1", "Item 1", 100, "prod1", 1);
        const item2 = new OrderItem("item 2", "Item 2", 200, "prod2", 5);
        const order = new Order("Order 1", "123", [item1, item2]);

        let total = order.total;

        expect(total).toBe(1100);

    });

    it("should throw error if the item qtd is less or equal than 0", () => {
        expect(() => {

            const item1 = new OrderItem("item 1", "Item 1", 100, "prod1", 0);
            const order = new Order("Order 1", "123", [item1]);

        }).toThrowError("quantity must be greater than 0");

    });


});
