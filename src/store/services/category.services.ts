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
    const categories = await getCategoryRepo.find();
    if (categories.length === 0) {
        throw new error("No catagories found");
    }
    return {
        success: true,
        data: categories
    };
}

//update category
export const updateCategory = async (categoryId: number,categoryName?: string,categoryDescription?: string) => {
    const isCategoryExist = await getCategoryRepo.findOne({ where: { categoryId } });
    if (!isCategoryExist) {
        throw new Error("Category does not exist");
    }

    // Prepare the update object
    const updateData: Partial<smartCategory> = {};
    if (categoryName) updateData.categoryName = categoryName;
    if (categoryDescription) updateData.categoryDescription = categoryDescription;

    // Update the category
    await getCategoryRepo.update({ categoryId }, updateData);

    // Fetch the updated category
    const updatedCategory = await getCategoryRepo.findOne({ where: { categoryId } });
    return { message: "Category updated successfully", category: updatedCategory };
};


