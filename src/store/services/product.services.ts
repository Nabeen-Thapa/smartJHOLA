import { create } from "domain";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartProduct } from "../../products/entities/produstDetails";


//add Product
const getProductRepo = smartConnection.getRepository(smartProduct);
export const addProduct = async (
    ProductCategory: string,
    productName: string,
    price: string,
    brand: string,
    stockQuanity: number,
    productDescription: string,
    discount: string, 
    image:string) => {
    if (!productName || !productDescription) {
        throw new Error("Product name and description are required");
    }
    const isProductExist = await getProductRepo.findOne({ where: { productName }, });
    if (isProductExist) {
        throw new Error("Product already exists");
    }
    const newProduct = new create({
        ProductCategory,
        productName,
        price,
        brand,
        stockQuanity,
        productDescription,
        discount
    });
    await getProductRepo.save(newProduct);
    return { message: "Product added successfully", Product: newProduct };
};


