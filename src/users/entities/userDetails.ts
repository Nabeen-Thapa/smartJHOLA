
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { smartCart } from "../../store/entities/AddToCart";


@Entity("smartUsers")
@Unique(["email", "username", "phone"])

export class smartUser {
    @PrimaryGeneratedColumn() userId!: number;
    @Column({ type: "varchar" }) name!: string;
    @Column({ type: "varchar" }) username!: string;
    @Column({ type: "varchar" }) password!: string;
    @Column({ type: "varchar" }) email!: string;
    @Column({ type: "bigint" }) phone!: string;
    @Column({ type: "varchar" }) gender?: string;
    @Column({ type: "varchar" }) age?: number;
    @Column({ nullable: true }) image?: string;
    @Column({ type: "varchar", default: "Deactive" }) status?: string;
    @OneToMany(() => smartCart, (cartItems) => cartItems.user) cartItems!: smartCart;
}