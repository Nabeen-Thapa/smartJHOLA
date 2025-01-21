import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { smartUser } from "../../users/entities/userDetails";
import { smartProduct } from "./produstDetails";


@Entity("addToCart")
@Unique(["cartId"])

export class addToCart{
    @PrimaryGeneratedColumn()
    cartId!:number;

    @ManyToOne(()=>smartUser, (user)=>user.cartItems)
    @JoinColumn({name: "userId"})
    user!:smartUser;

    @ManyToOne(()=>smartProduct, (products)=>products.cartItems)
   @JoinColumn({name : "productId"})
   product! :smartProduct;

    @Column({type : "integer"})
    quantity!:number;

    @Column({type : "decimal", precision:10, scale:2})
    price!:number;

    @Column({type : "decimal", precision:10, scale:2})
    total_price!:number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    added_at!: Date;
   

    @Column({type : "varchar", default:"unvarified"})
    status!:string;
}