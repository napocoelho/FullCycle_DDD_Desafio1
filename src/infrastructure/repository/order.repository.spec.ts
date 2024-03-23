import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "../db/sequelize/model/order_item.model";
import { Order } from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.respository";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.respository";
import { Address } from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import { NOMEM } from "sqlite3";

describe("Order repository test", () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequileze.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequileze.sync();

    });

    afterEach(async () => {
        await sequileze.close();
    });



    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", "123123", 123);

        customer.changeAddress = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("Order Item 1", "Order Item 1", product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });


        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total,
            items: [{
                id: order.items[0].id,
                name: order.items[0].name,
                price: order.items[0].price,
                productId: order.items[0].productId,
                quantity: order.items[0].quantity,
                totalOrder: order.items[0].totalOrder,
                // orderItems: "1",
                orderId: order.id
            }]

        });

    });

    it("should update a order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", "123123", 123);

        customer.changeAddress = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("Order Item 1", "Order Item 1", product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel1 = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel1.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total,
            items: [{
                id: order.items[0].id,
                name: order.items[0].name,
                price: order.items[0].price,
                productId: order.items[0].productId,
                quantity: order.items[0].quantity,
                totalOrder: order.items[0].totalOrder,
                // orderItems: "1",
                orderId: order.id
            }]

        });


        // alterando:
        order.items[0].changeQuantity(3);
        await orderRepository.update(order);

        // nova busca:
        const orderModel2 = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel2.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total,
            items: [{
                id: order.items[0].id,
                name: order.items[0].name,
                price: order.items[0].price,
                productId: order.items[0].productId,
                quantity: order.items[0].quantity,
                totalOrder: order.items[0].totalOrder,
                orderId: order.id
            }]

        });

    });


    it("should find a order", async () => {

        // Order 1:
        const customerRepository1 = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Street 1", "City 1", "123123", 123);

        customer1.changeAddress = address1;
        await customerRepository1.create(customer1);

        const productRepository1 = new ProductRepository();
        const product1 = new Product("1", "Produto 1", 100);
        await productRepository1.create(product1);

        const orderRepository1 = new OrderRepository();
        const orderItem1 = new OrderItem("Order Item 1", "Order Item 1", product1.price, product1.id, 2);
        const order1 = new Order("1", customer1.id, [orderItem1]);
        await orderRepository1.create(order1);

        const orderFound1 = await orderRepository1.find(order1.id);

        expect(order1).toEqual(orderFound1);

        //------------------------------------------------------------------------------

        // Order 2:
        const customerRepository2 = new CustomerRepository();
        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 1", "City 1", "123123", 123);

        customer2.changeAddress = address2;
        await customerRepository2.create(customer2);

        const productRepository2 = new ProductRepository();
        const product2 = new Product("2", "Produto 2", 100);
        await productRepository2.create(product2);

        const orderRepository2 = new OrderRepository();
        const orderItem2 = new OrderItem("Order Item 2", "Order Item 2", product2.price, product2.id, 2);
        const order2 = new Order("2", customer2.id, [orderItem2]);
        await orderRepository2.create(order2);

        const orderFound2 = await orderRepository2.find(order2.id);

        expect(order2).toEqual(orderFound2);

    });

    it("should find all order", async () => {

        // Order 1:
        const customerRepository1 = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Street 1", "City 1", "123123", 123);

        customer1.changeAddress = address1;
        await customerRepository1.create(customer1);

        const productRepository1 = new ProductRepository();
        const product1 = new Product("1", "Produto 1", 100);
        await productRepository1.create(product1);

        const orderRepository1 = new OrderRepository();
        const orderItem1 = new OrderItem("Order Item 1", "Order Item 1", product1.price, product1.id, 2);
        const order1 = new Order("1", customer1.id, [orderItem1]);
        await orderRepository1.create(order1);

        //------------------------------------------------------------------------------

        // Order 2:
        const customerRepository2 = new CustomerRepository();
        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 1", "City 1", "123123", 123);

        customer2.changeAddress = address2;
        await customerRepository2.create(customer2);

        const productRepository2 = new ProductRepository();
        const product2 = new Product("2", "Produto 2", 100);
        await productRepository2.create(product2);

        const orderRepository2 = new OrderRepository();
        const orderItem2 = new OrderItem("Order Item 2", "Order Item 2", product2.price, product2.id, 2);
        const order2 = new Order("2", customer2.id, [orderItem2]);
        await orderRepository2.create(order2);

        //------------------------------------------------------------------------------

        // Test:
        const orders = [order1, order2];
        const ordersFound = await new OrderRepository().findAll();

        expect(ordersFound).toEqual(orders);

    });

    it("should throw an error when order is not found", async () => {

        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("código inexistente");
        }).rejects.toThrow("order not found");

    });

});

