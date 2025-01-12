import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity("smartUsers")
@Unique(["email", "username", "phone"])

export class smartUser {
    @PrimaryGeneratedColumn()
    userId!:number;

    @Column({type:"varchar"})
    name!:string;

    @Column({type: "varchar"})
    username!:string;

    @Column({type: "varchar"})
    password!:string;

    @Column({type: "varchar"})
    email!:string;

    @Column({type: "number"})
    phone!:string;

    @Column({type: "varchar"})
    gender?:string;

    @Column({type: "varchar"})
    age?:string;
    
    @Column({type: "varchar"})
    image?:string;
}