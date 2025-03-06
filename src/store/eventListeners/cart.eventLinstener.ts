import { smartConnection } from "../../common/db/db-connection-config";
import { cartEvent } from "../../common/utils/event.emmiter";
import { smartProduct } from "../entities/produstDetails";

cartEvent.on("decreaseItemQuantity", async ({productId, quantity}: { productId: number; quantity: number })=>{
    const getProdutRepo = smartConnection.getRepository(smartProduct);
    const product = await getProdutRepo.findOne({where: {productId}});
    let productQuantity =  product?.stockQuanity ?? 0;
     productQuantity -=  quantity;
     await getProdutRepo.update({productId}, {stockQuanity:productQuantity })
})