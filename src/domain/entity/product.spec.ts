
import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrow("id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("123", "", 100);
        }).toThrow("name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("123", "Name", -1);
        }).toThrow("price must be greater than zero");
    });

    it("should change name", () => {

        const product = new Product("1", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");

    });

    it("should change price", () => {

        const product = new Product("1", "Product 1", 100);
        product.changePrice(150);

        expect(product.price).toBe(150);

    });

});
