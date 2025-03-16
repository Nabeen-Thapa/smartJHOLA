
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { smartCart } from "../../store/entities/AddToCart";
import { userStatus } from "../../types/userStatus.enum";


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
    @Column({ type: "int" , nullable: true}) age?: number;
    @Column({ type: "varchar", default: userStatus.Active }) status?: userStatus;
    @OneToMany(() => smartCart, (cartItems) => cartItems.user) cartItems!: smartCart;
}