import { smartConnection } from "../../common/db/db-connection-config";
import { smartCategory } from "../../products/entities/productsCategory";




export const addCategory = async (categoryName: string, categoryDescription: string) => {
    if (!categoryName || !categoryDescription) {
        throw new Error("Category name and description are required");
    }
    const getCategoryRepo = smartConnection.getRepository(smartCategory);
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