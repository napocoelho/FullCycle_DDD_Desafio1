"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John");
        }).toThrow("id is required");
    });
    it("should change name", () => {
        // Arrange
        const customer = new customer_1.default("123", "John");
        // Act
        customer.changeName("Jane");
        // Assert
        expect(customer.name).toBe("Jane");
    });
});
