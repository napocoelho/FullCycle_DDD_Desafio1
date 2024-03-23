import { Address } from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("name is required");
    });

    it("should change name", () => {

        // Arrange
        const customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane")

        // Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua 1", "São Paulo", "13330-250", 123);
        customer.changeAddress = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);

    });

    it("should deactivate customer", () => {

        const customer = new Customer("1", "Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);

    });


    it("should throw error when address is undefined", () => {

        const customer = new Customer("123", "John");
        const address = new Address("Rua 1", "São Paulo", "13330-250", 123);
        customer.changeAddress = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });


    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("address is mandatory to activate a customer");

    });

    it("should add reward points", () => {

        const customer = new Customer("123", "John");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

    });

});
