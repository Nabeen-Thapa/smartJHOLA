import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { smartCategory } from "./productsCategory";
import { smartCart } from "./AddToCart";

@Entity("smartProducts")
@Unique(["productId"])

export class smartProduct{
    @PrimaryGeneratedColumn()
    productId!:number;

    @ManyToOne(()=>smartCategory, (category)=>category.products, {onDelete :"CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({name: "categoryId"})
    category?: smartCategory;

    @Column()
    productName!:string;

    @Column({nullable: false, default: 0 })
    price!: number;

    @Column({nullable: true, default: 0 })
    discount?:number;


    @Column({nullable: true })
    discountCoupon?:number;
    
    @Column({nullable: false, default: 0 })
    sellingPrice!: number;

    @Column()
    brand!:string;

    @Column()
    stockQuanity!:number; 

    @Column()
    productDescription!:string;

    @Column()
    image!:string;

    @OneToMany(()=>smartCart, (cartItem)=>cartItem.product)
    @JoinColumn({name :"categoryId"})
    cartItems!:smartCart[];

   
}
