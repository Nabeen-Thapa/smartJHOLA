import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { smartUser } from "../../users/entities/userDetails";
import { smartProduct } from "./produstDetails";


@Entity("Cart")
@Unique(["cartId"])

export class smartCart{
    @PrimaryGeneratedColumn()cartId!:number;
    @ManyToOne(()=>smartUser, (user)=>user.cartItems)
    @JoinColumn({name: "userId"})user!:smartUser;
    @ManyToOne(()=>smartProduct, (products)=>products.cartItems)
   @JoinColumn({name : "productId"})product! :smartProduct;
    @Column({type : "int"})quantity?:number;
    @Column({ type: "decimal", precision: 10, scale: 2 })price!: number;
    @Column({type : "decimal", precision:10, scale:2})total_price!:number;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })added_at!: Date;
    @Column({type : "varchar", default:"unvarified"})status!:string;
}