import { smartConnection } from "../../common/db/db-connection-config";
import { smartCart } from "../../products/entities/AddToCart";
import { smartProduct } from "../../products/entities/produstDetails";
import { smartUser } from "../../users/entities/userDetails";

//add to cart
export const AddToCart = async (user: smartUser, product: smartProduct, quantity: number, price: number, total_price: number, added_at: Date) => {

    const getAddToCartRepo = smartConnection.getRepository(smartCart);
    const getuserRepo = smartConnection.getRepository(smartUser);
    //const isUserLoggedIn = getuserRepo.findOne({where : {userId :user}})
    // if(!isUserLoggedIn){
    //     res.status(StatusCodes.NOT_FOUND).json({message: "you are not logged in, login first"});
    //     return;
    // }

    const isProductExistOfSameUser = await getAddToCartRepo.findOne({ where: { user, product }, })
    if (isProductExistOfSameUser) {
       throw new Error("you already have add this item" );
    }

    // add to caddToCart table
    const newCartItem = getAddToCartRepo.create({
        user,
        product,
        quantity,
        price,
        total_price,
        added_at,
    });
    await getAddToCartRepo.save(newCartItem);
    return {message :"product is added to cart successfully"};
}