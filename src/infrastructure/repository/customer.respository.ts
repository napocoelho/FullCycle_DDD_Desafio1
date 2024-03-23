import { Address } from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address?.street,
            zip: entity.address?.zip,
            number: entity.address?.number,
            city: entity.address?.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address?.street,
            zip: entity.address?.zip,
            number: entity.address?.number,
            city: entity.address?.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id,
            },
        });
    }

    async find(id: string): Promise<Customer> {
        let model;
        try {
            model = await CustomerModel.findOne({
                where: { id },
                rejectOnEmpty: true,
            });
        }
        catch (error) {
            throw new Error("customer not found");
        }

        return this.mapModelToCustomer(model);
    }

    async findAll(): Promise<Customer[]> {
        const models = await CustomerModel.findAll();
        return models.map(model => this.mapModelToCustomer(model));
    }

    private mapModelToCustomer(model: CustomerModel): Customer {
        const customer = new Customer(model.id, model.name, model.active);
        customer.changeAddress = new Address(model.street, model.city, model.zip, model.number);
        customer.addRewardPoints(model.rewardPoints);

        return customer;
    }
}