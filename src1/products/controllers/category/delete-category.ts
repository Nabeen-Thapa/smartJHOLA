import express, { Request, Response, Router } from "express";
import { smartConnection } from "../../../common/db/db-connection-config";
import { smartAdmin } from "../../../admin/entities/adminDetails";
import { smartCategory } from "../../entities/productsCategory";
import { StatusCodes } from "http-status-codes";
import logger from "../../../common/utils/logger";


const deleteCategory: Router = express.Router();

deleteCategory.delete("/delete-category", async (req: Request, res: Response): Promise<void> => {
    const { adminId, categoryId, categoryName } = req.body;

    try {
        const getAdminRepo = smartConnection.getRepository(smartAdmin);
        const getCategoryRepo = smartConnection.getRepository(smartCategory);

        const isAdminLoggedIn = await getAdminRepo.findOne({ where: { adminId } });

        if (!isAdminLoggedIn) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "you are not logged in, login first" });
            return;
        }
        const isCategoryExist = await getCategoryRepo.findOne({where : {categoryId, categoryName}});

       if(!isCategoryExist){
        res.status(StatusCodes.NOT_FOUND).json({message : "category is not exist"});
        return;         
       }
       await getCategoryRepo.delete({categoryId});
       res.status(StatusCodes.OK).json({message : "category delete successfully"});
       
    } catch (error) {
        logger.error("update category error :", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "update category error :", error });
    }
})

export default deleteCategory;