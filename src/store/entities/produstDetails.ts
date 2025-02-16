import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { smartCategory } from "./productsCategory";
import { smartCart } from "./AddToCart";
import { number } from "joi";


@Entity("smartProducts")
@Unique(["productId"])

export class smartProduct{
    @PrimaryGeneratedColumn()
    productId!:number;

    @ManyToOne(()=>smartCategory, (category)=>category.products, {onDelete :"CASCADE", onUpdate: "CASCADE", eager: true })
    @JoinColumn({name: "categoryId"})
    category?: smartCategory;

    @Column({type:"varchar"})
    productName!:string;

    @Column({ type: "int", nullable: false, default: "0" })
    price!: number;

    @Column({type:"varchar"})
    brand!:string;

    @Column({type:"int"})
    stockQuanity!:number; 

    @Column({type:"varchar"})
    productDescription!:string;

    @Column({type:"float",  nullable: true, default: 0 })
    discount?:number;
    
    @Column({type:"varchar"})
    image!:string;

    @OneToMany(()=>smartCart, (cartItem)=>cartItem.product)
    @JoinColumn({name :"categoryId"})
    cartItems!:smartCart[];

    // @Column({type : "bigint"})
    // productCopuCode : number;
   
}
