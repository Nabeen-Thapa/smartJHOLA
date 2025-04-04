import { error } from "console";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartCategory } from "../entities/productsCategory";


//add category
export class CategoryServiceClass {
    getCategoryRepo = smartConnection.getRepository(smartCategory);
    addCategory = async (categoryName: string, categoryDescription: string) => {
        if (!categoryName || !categoryDescription) {
            throw new Error("Category name and description are required");
        }
        const isCategoryExist = await this.getCategoryRepo.findOne({ where: { categoryName }, });
        if (isCategoryExist) {
            throw new Error("Category already exists");
        }
        const newCategory = this.getCategoryRepo.create({
            categoryName,
            categoryDescription
        });
        await this.getCategoryRepo.save(newCategory);
        return { message: "Category added successfully", category: newCategory };
    };


    //view catogory
    viewCategory = async (categoryId: Number) => {
        const categories = await this.getCategoryRepo.find();
        if (categories.length === 0) {
            throw new Error("No catagories found");
        }
        return {
            success: true,
            data: categories
        };
    }

    //update category
    updateCategory = async (categoryId: number, categoryName?: string, categoryDescription?: string) => {
        const isCategoryExist = await this.getCategoryRepo.findOne({ where: { categoryId } });
        if (!isCategoryExist) {
            throw new Error("Category does not exist");
        }

        // Prepare the update object
        const updateData: Partial<smartCategory> = {};
        if (categoryName) updateData.categoryName = categoryName;
        if (categoryDescription) updateData.categoryDescription = categoryDescription;

        await this.getCategoryRepo.update({ categoryId }, updateData);

        // Fetch the updated category
        const updatedCategory = await this.getCategoryRepo.findOne({ where: { categoryId } });
        return { message: "Category updated successfully", category: updatedCategory };
    };

    deleteCategory = async (categoryId: number) => {
        const isCategoryExist = await this.getCategoryRepo.findOne({ where: { categoryId } });
        if (!isCategoryExist) {
            throw new Error("Category does not exist");
        }
        await this.getCategoryRepo.delete({ categoryId });

        return { message: "Category updated successfully" };
    }

}