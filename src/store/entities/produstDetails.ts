import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { smartCategory } from "./productsCategory";
import { smartCart } from "./AddToCart";


@Entity("smartProducts")
@Unique(["productId"])

export class smartProduct{
    @PrimaryGeneratedColumn()
    productId!:number;

    @ManyToMany(()=>smartCategory, (category)=>category.products, {onDelete :"CASCADE", onUpdate: "CASCADE", eager: true })
    category?: smartCategory;

    @Column({type:"varchar"})
    productName!:string;

    @Column({type:"int"})
    price!:number;

    @Column({type:"varchar"})
    brand!:string;

    @Column({type:"int"})
    stockQuanity!:number;
    
    @Column({type:"varchar"})
    productDescription!:string;

    @Column({type:"float", nullable:true, default:})
    discount?:number;

    @Column({type:"varchar"})
    image!:string;

    @OneToMany(()=>smartCart, (cartItem)=>cartItem.product)
    cartItems!:smartCart;
   
}
