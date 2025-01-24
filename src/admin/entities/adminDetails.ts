import { Column, Entity, PrimaryGeneratedColumn, TableUnique, Unique } from "typeorm";


@Entity("smartAdmin")
@Unique(["email", "username", "phone"])

export class smartAdmin {
    @PrimaryGeneratedColumn()
    adminId!:number;

    @Column({type:"varchar"})
    name!:string;

    @Column({type: "varchar"})
    username!:string;

    @Column({type: "varchar"})
    password!:string;

    @Column({type: "varchar"})
    email!:string;

    @Column({type: "bigint"})
    phone!:string;

    @Column ({type: "varchar", default: "active"})
    status?:string;
}