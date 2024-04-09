import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "./customer.respository";
import { Address } from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequileze.addModels([CustomerModel]);
        await sequileze.sync();

    });

    afterEach(async () => {
        await sequileze.close();
    });



    it("should create a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1", false);
        const address = new Address("Street 1", "City 1", "Zip 123", 123);
        customer.changeAddress = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });

    });

    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1", false);
        const address = new Address("Street 1", "City 1", "Zip 123", 123);
        customer.changeAddress = address;

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel2.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });

    });

    it("should find a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1", false);
        const address = new Address("Street 1", "City 1", "Zip 123", 123);
        customer.changeAddress = address;

        await customerRepository.create(customer);
        const foundCustomer = await CustomerModel.findOne({ where: { id: "1" } });

        expect(foundCustomer.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
        });

    });

    it("should find all customer", async () => {

        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("1", "Customer 1", false);
        const address1 = new Address("Street 1", "City 1", "Zip 123", 123);
        customer1.changeAddress = address1;
        await customerRepository.create(customer1);

        const customer2 = new Customer("2", "Customer 2", false);
        const address2 = new Address("Street 1", "City 1", "Zip 123", 123);
        customer2.changeAddress = address2;
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [customer1, customer2];

        expect(customers).toEqual(foundCustomers);

    });

    it("should throw an error when customer is not found", async () => {

        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("código inexistente");
        }).rejects.toThrow("customer not found");

    });

});

