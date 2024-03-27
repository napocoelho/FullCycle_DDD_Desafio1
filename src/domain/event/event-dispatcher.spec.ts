import AddressChangedEvent from "./customer/address-changed.event";
import CustomerCreatedEvent from "./customer/customer-created.event";
import EnviaConsoleLog1CreatedHandler from "./customer/handler/envia-console-log-1-created.handler";
import EnviaConsoleLog2CreatedHandler from "./customer/handler/envia-console-log-2-created.handler";
import EnviaConsoleLogChangedHandler from "./customer/handler/envia-console-log-changed.handler";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain events tests", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });


    it("should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        // Quando o notify for executado, o SendEmailWhenProductIsCreated será chamado:
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();

    });

    it("should notify when customer is created", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1CreatedHandler();
        const eventHandler2 = new EnviaConsoleLog2CreatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler1);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler2);

        const customerCreatedEvent1 = new CustomerCreatedEvent({
            id: "ID 1",
            name: "Customer 1 description",
            active: false,
            rewardPoints: 0,
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zip 123",
                city: "City 1",
            },
        });

        const customerCreatedEvent2 = new CustomerCreatedEvent({
            id: "ID 2",
            name: "Customer 2 description",
            active: false,
            rewardPoints: 0,
            address: {
                street: "Street 2",
                number: 321,
                zip: "Zip 123",
                city: "City 2",
            },
        });

        eventDispatcher.notify(customerCreatedEvent1);
        eventDispatcher.notify(customerCreatedEvent2);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

    });

    it("should notify when address is changed", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
        ).toMatchObject(eventHandler);

        const addressChanged = new AddressChangedEvent({
            id: "ID 2",
            name: "Customer 2 description",
            active: false,
            rewardPoints: 0,
            address: {
                street: "Street 2",
                number: 321,
                zip: "Zip 123",
                city: "City 2",
            },
        });

        eventDispatcher.notify(addressChanged);
        expect(spyEventHandler).toHaveBeenCalled();

    });

});