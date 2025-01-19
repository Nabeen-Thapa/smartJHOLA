import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { smartCategoy } from "./productsCategory";


@Entity("smartProducts")
@Unique(["productId"])

export class smartProduct{
    @PrimaryGeneratedColumn()
    productId!:number;

    @ManyToMany(()=>smartCategoy, (category)=>category.products, {onDelete :"CASCADE", onUpdate: "CASCADE"})
    category!:string;

    @Column({type:"varchar"})
    productName!:string;

    @Column({type:"varchar"})
    price!:string;

    @Column({type:"varchar"})
    brand!:string;

    @Column({type:"number"})
    stickQuanity!:number;
    
    @Column({type:"varchar"})
    productDescription!:string;

    @Column({type:"varchar"})
    discount!:string;



   
}
