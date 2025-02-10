import { create } from "domain";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartProduct } from "../../products/entities/produstDetails";
import { smartAdmin } from "../../admin/entities/adminDetails";
import { error } from "console";
import { smartCategory } from "../../products/entities/productsCategory";


//add Product
export const addProduct = async (category:smartCategory, productName: string,
    price: string, brand: string, stockQuanity: number, productDescription: string,discount: string, image: string) => {

    if (!category || !productName || !productDescription || !price || !brand) {
        throw new Error("Product category, Product name, price, brand description are required");
    }
    const getCategoryRepo = smartConnection.getRepository(smartCategory);
    const getProductRepo = smartConnection.getRepository(smartProduct);
    const categoryRepo = smartConnection.getRepository(smartCategory);

    const isCategoryExist = await getCategoryRepo.findOne({where : {categoryId :category.categoryId}});
    if (!isCategoryExist) {
        throw new Error("catregory is not exist");
    }
    const isProductExist = await getProductRepo.findOne({ where: { productName }, });
    if (isProductExist) {
        throw new Error("Product with this name already exists");
    }

    const newProduct = getProductRepo.create({
        category,
        productName,
        price,
        brand,
        stockQuanity,
        productDescription,
        discount,
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

//update product
export const updateProduct = async (adminId: number, productId: number, productName?: string, price?: number, brand?: string, stockQuanity?: number, productDescription?: string, discount?: number) => {

    const getAdminRepo = smartConnection.getRepository(smartAdmin);
    const isAdminLoggedIn = await getAdminRepo.findOne({ where: { adminId }, });

    if (!isAdminLoggedIn) {
        throw new Error("you are not logged in, login first");
        return;
    }
    const getProductRepo = smartConnection.getRepository(smartProduct);
    const isProductExist = await getProductRepo.findOne({ where: { productId, productName } });

    if (!isProductExist) {
        throw new error("product is not exist");
        return;
    }

    //update product on db
    const updateFields: Partial<smartProduct> = {};
    if (productName) updateFields.productName = productName;
    if (price) updateFields.price = price;
    if (brand) updateFields.brand = brand;
    if (stockQuanity) updateFields.stockQuanity = stockQuanity;
    if (productDescription) updateFields.productDescription = productDescription;
    if (discount) updateFields.discount = discount;

    // Update product in the database
    await getProductRepo.update({ productId }, updateFields);

    return { message: "Product updated successfully", updatedData: updateFields };
}


//delete product
export const deleteProduct =async (adminId: number, productId: number) => {
    const getAdminRepo = smartConnection.getRepository(smartAdmin);
    const getProductRepo = smartConnection.getRepository(smartProduct);

    const isAdminLoggedIn = await getAdminRepo.findOne({ where: { adminId } });

    if (!isAdminLoggedIn) {
        throw new error("you are not logged in, login first" );
        return;
    }
    const isproductExist = await getProductRepo.findOne({ where: { productId} });

    if (!isproductExist) {
        throw new error("product is not exist");
    }
    await getProductRepo.delete({ productId });
    return { message: "product delete successfully" };
}