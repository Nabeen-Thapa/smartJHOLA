import exp from "constants";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartToken } from "../../users/entities/smartUserToken";
import { smartUser } from "../../users/entities/userDetails";
import { smartCart } from "../entities/AddToCart";
import { smartProduct } from "../entities/produstDetails";

//add to cart
export const AddToCart = async (user: smartUser, product: smartProduct, quantity: number, price: number, total_price: number, added_at: Date) => {

    const getAddToCartRepo = smartConnection.getRepository(smartCart);
    const getuserRepo = smartConnection.getRepository(smartUser);
    const isUserLoggedIn = getuserRepo.findOne({where : {userId :user.userId}})
    if(!isUserLoggedIn){
       throw new Error("you are not logged in, login first");
        return;
    }

    const isProductExistOfSameUser = await getAddToCartRepo.findOne({ where: { user, product }, })
    if (isProductExistOfSameUser) {
        throw new Error("you already have add this item");
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
    return { message: "product is added to cart successfully" };
}


//view cart
export const viewCart = async (user: smartUser) => {
    const getProductRepo = smartConnection.getRepository(smartProduct);
    const getCartRepo =  smartConnection.getRepository(smartCart);
    const getTokenRepo = smartConnection.getRepository(smartToken);
    const isUserLoggedIn = await getTokenRepo.findOne({ where: { userId:user.userId } });
    if (!isUserLoggedIn) {
        throw new Error("you are not logged in");
    }
    //get cart items
    const cartItems = await getCartRepo.find({where:{user :{userId : user.userId}}});
    if (cartItems.length === 0) {
       throw new Error("No catagories found");
    }
    const totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);
    //view items
    return {
        success: true,
        data: cartItems,
        totalPrice :totalPrice
    };
}

//remove item form cart
export const removeItemFromCart = async (productId: number, user: smartUser) => {
    const getUserRepo = smartConnection.getRepository(smartUser);
    const getCartRepo = smartConnection.getRepository(smartCart);

    const isUserLoggedIn = await getUserRepo.findOne({ where: { userId :user.userId} });
    if (!isUserLoggedIn) {
        throw new Error("You are not logged in. Please log in first.");
    }

    const isProductExist = await getCartRepo.findOne({
        where: { product: { productId } },});

    if (!isProductExist) {
        throw new Error("Product does not exist in the cart.");
    }
    await getCartRepo.delete({ product: { productId } }); 
    return { message: "Product removed from cart successfully." };
};