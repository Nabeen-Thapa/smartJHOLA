import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity("smartCoupon")
@Unique(['couponId', "couponCode"]);

export class Coupon {
    @PrimaryGeneratedColumn()
    couponId!:number;

    @Column({type: "bigint"})
    couponCode!:number;

    @Column({type : "int"})
    discountPrecentage: number;

    @Column({type : "date"})
    ExpireDate : Date;

    @CreateDateColumn({type : "timestamp"})
    addedAt : Date;
}