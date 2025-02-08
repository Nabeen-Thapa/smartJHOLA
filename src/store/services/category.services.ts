import { error } from "console";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartCategory } from "../../products/entities/productsCategory";

//add category
const getCategoryRepo = smartConnection.getRepository(smartCategory);
export const addCategory = async (categoryName: string, categoryDescription: string) => {
    if (!categoryName || !categoryDescription) {
        throw new Error("Category name and description are required");
    }
    const isCategoryExist = await getCategoryRepo.findOne({ where: { categoryName }, });
    if (isCategoryExist) {
        throw new Error("Category already exists");
    }
    const newCategory = getCategoryRepo.create({
        categoryName,
        categoryDescription
    });
    await getCategoryRepo.save(newCategory);
    return { message: "Category added successfully", category: newCategory };
};


//view catogory
export const viewCategory = async (categoryId: Number) => {
    const categoryRepositery = smartConnection.getRepository(smartCategory);
    const categories = await categoryRepositery.find();
    if (categories.length === 0) {
        throw new error("No catagories found");
    }
    return {
        success: true,
        data: categories
    };
}


