import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { smartProduct } from "./produstDetails";


@Entity("smartCategoy")
@Unique(["categoryId", "categoryName"])

export class smartCategory{
    @PrimaryGeneratedColumn()
    categoryId!:number;

    @Column({type:"varchar"})
    categoryName!:string;

    @Column({type:"varchar"})
    categoryDescription!:string;

    @OneToMany(() => smartProduct, (product) => product.category)
    products!: smartProduct[];

}
