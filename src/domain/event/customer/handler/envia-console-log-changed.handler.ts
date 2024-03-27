import EventHandlerInterface from "../../event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogChangedHandler implements EventHandlerInterface<AddressChangedEvent>{
    handle(event: AddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: 
                    ${event.eventData.street}, ${event.eventData.city}, ${event.eventData.number}, ${event.eventData.state}, 
                    ${event.eventData.city} - ${event.eventData.zip}`);
    }
}