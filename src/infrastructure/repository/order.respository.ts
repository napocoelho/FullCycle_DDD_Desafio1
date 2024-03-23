import { Optional, Sequelize } from "sequelize";
import { Address } from "../../domain/entity/address";
import { Order } from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItem from "../../domain/entity/order_item";
import OrderItemModel from "../db/sequelize/model/order_item.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total,
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
                totalOrder: item.totalOrder,
            }))
        },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {

        await OrderModel.sequelize.transaction(async () => {

            await OrderModel.update({
                //id: entity.id,
                customerId: entity.customerId,
                total: entity.total,
                // items: entity.items.map(item => ({
                //     //id: item.id,
                //     name: item.name,
                //     price: item.price,
                //     productId: item.productId,
                //     quantity: item.quantity,
                //     totalOrder: item.totalOrder,
                // }))
            }, {
                where: { id: entity.id },
            });

            OrderItemModel.destroy({
                where: {
                    orderId: entity.id
                }
            });

            entity.items.forEach((item) => {

                OrderItemModel.create({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    productId: item.productId,
                    quantity: item.quantity,
                    totalOrder: item.totalOrder,
                    orderId: entity.id
                });
            });
        });
    }

    async find(id: string): Promise<Order> {
        let model;
        try {
            model = await OrderModel.findOne({
                where: { id },
                rejectOnEmpty: true,
                include: ["items"],
            });
        }
        catch (error) {
            throw new Error("order not found");
        }

        return this.mapModelToEntity(model);
    }

    async findAll(): Promise<Order[]> {
        const models = await OrderModel.findAll({
            include: ["items"],
        });
        return models.map(model => this.mapModelToEntity(model));
    }

    private mapModelToEntity(model: OrderModel): Order {
        const order = new Order(
            model.id, model.customerId,
            model.items.map(item => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.productId,
                item.quantity
            )));

        return order;
    }

}