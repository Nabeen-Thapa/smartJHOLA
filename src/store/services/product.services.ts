import { create } from "domain";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartProduct } from "../../products/entities/produstDetails";
import { StatusCodes } from "http-status-codes";


//add Product

export const addProduct = async (ProductCategory: string, productName: string,
    price: string, brand: string, stockQuanity: number, productDescription: string,
    discount: string, image: string) => {

    if (!ProductCategory || !productName || !productDescription || !price || !brand) {
        throw new Error("ProductCategory, Product name, price, brand description are required");
    }
    const getProductRepo = smartConnection.getRepository(smartProduct);
    const isProductExist = await getProductRepo.findOne({ where: { productName }, });
    if (isProductExist) {
        throw new Error("Product with this name already exists");
    }
    const newProduct = getProductRepo.create({
        category: ProductCategory,
        productName,
        price,
        brand,
        stockQuanity,
        productDescription,
        discount: discount ? Number(discount) : undefined,
        image
    });
    await getProductRepo.save(newProduct);
    return { message: "Product added successfully", Product: newProduct };
};

//view product

export const viewProduct = async () => {
    const getProductRepo = smartConnection.getRepository(smartProduct);
    const products = await getProductRepo.find();
    if (products.length === 0) {
        throw new Error("No porducts found");
    }

    return {
        success: true,
        data: products
    };
}
