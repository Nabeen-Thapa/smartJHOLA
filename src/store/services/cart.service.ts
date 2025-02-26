import exp from "constants";
import { smartConnection } from "../../common/db/db-connection-config";
import { smartToken } from "../../users/entities/smartUserToken";
import { smartUser } from "../../users/entities/userDetails";
import { smartCart } from "../entities/AddToCart";
import { smartProduct } from "../entities/produstDetails";

//add to cart
export const AddToCart = async (user: smartUser, product: smartProduct, quantity: number, discountCoupon: number) => {

    const getAddToCartRepo = smartConnection.getRepository(smartCart);
    const getuserRepo = smartConnection.getRepository(smartUser);
    const getProductRepo = smartConnection.getRepository(smartProduct);

    const userId = Number(user);
    const productId = Number(product);
    if (isNaN(userId) || isNaN(productId)) {
        throw new Error("Invalid user or product ID.");
    }

    // Check if user exists
    const isUserLoggedIn = await getuserRepo.findOne({ where: { userId } });
    if (!isUserLoggedIn) {
        throw new Error("You are not logged in, login first");
    }

    // Check if product is already in the cart for the same user
    const isProductExistOfSameUser = await getAddToCartRepo.findOne({ where: { user: {userId}, product: {productId} } });
    if (isProductExistOfSameUser) {
        throw new Error("You already have added this item.");
    }

    // Fetch product data
    const productData = await getProductRepo.findOne({ where: { productId } });
    if (!productData) {
        throw new Error("Product is not found");
    }

    // Calculate final price with discount
    let final_price = productData?.sellingPrice;
    if (discountCoupon) {
        final_price = Math.round(final_price * (1 - 5 / 100)); 
    }

    // Add to cart
    const added_at = new Date();
    const newCartItem = getAddToCartRepo.create({
        user: {userId},
        product: {productId},
        quantity,
        price: productData?.sellingPrice,
        total_price: final_price,
        added_at,
    });

    await getAddToCartRepo.save(newCartItem);
    return {
        message: "Product is added to cart successfully",
        addedItem: newCartItem
    };
};

//view cart
export const viewCart = async (user: smartUser) => {
    const getProductRepo = smartConnection.getRepository(smartProduct);
    const getCartRepo =  smartConnection.getRepository(smartCart);
    const getTokenRepo = smartConnection.getRepository(smartToken);
    const isUserLoggedIn = await getTokenRepo.findOne({ where: { userId:user.userId } });
    if (!isUserLoggedIn) {
        throw new Error("you are not logged in");
    }
 
    const cartItems = await getCartRepo.find({where:{user :{userId : user.userId}}});
    if (cartItems.length === 0) {
       throw new Error("No catagories found");
    }
    const totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);
    
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