import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { smartProduct } from "./produstDetails";


@Entity("smartCategory")
@Unique(["categoryId", "categoryName"])
export class smartCategory {
    @PrimaryGeneratedColumn()categoryId: number;
    @Column({ type: "varchar", unique: true })categoryName: string;
    @Column({ type: "varchar"})categoryDescription: string;
    @OneToMany(() => smartProduct, (product) => product.category)
    products: smartProduct[];
}