import EventHandlerInterface from "../../event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogChangedHandler implements EventHandlerInterface<AddressChangedEvent>{
    handle(event: AddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: 
                    ${event.eventData.address.street}, ${event.eventData.address.city}, ${event.eventData.address.number},  
                    ${event.eventData.address.city} - ${event.eventData.address.zip}`);
    }
}