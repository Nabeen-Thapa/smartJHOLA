import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { smartCategory } from "./productsCategory";
import { addToCart } from "./AddToCart";


@Entity("smartProducts")
@Unique(["productId"])

export class smartProduct{
    @PrimaryGeneratedColumn()
    productId!:number;

    @ManyToMany(()=>smartCategory, (category)=>category.products, {onDelete :"CASCADE", onUpdate: "CASCADE", eager: true })
    category!:string;

    @Column({type:"varchar"})
    productName!:string;

    @Column({type:"varchar"})
    price!:string;

    @Column({type:"varchar"})
    brand!:string;

    @Column({type:"integer"})
    stockQuanity!:number;
    
    @Column({type:"varchar"})
    productDescription!:string;

    @Column({type:"varchar"})
    discount!:string;

    @Column({type:"varchar"})
    image!:string;

    @OneToMany(()=>addToCart, (cartItem)=>cartItem.product)
    cartItems!:addToCart;
   
}
