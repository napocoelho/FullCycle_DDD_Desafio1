
import EventHandlerInterface from "../../event-handler.interface";
import EventInterface from "../../event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1CreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }

}