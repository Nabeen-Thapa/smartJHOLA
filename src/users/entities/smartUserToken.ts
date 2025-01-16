import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity("smartTokens")
@Unique(["tokenId", "userId"])

export class smartToken{
    @PrimaryGeneratedColumn()
    tokenId!:number;

    @Column({type:"integer"})
    userId!:number;

    @Column({type:"varchar"})
    username!:string;

    @Column({type:"varchar"})
    password!:string;

    @Column({type:"varchar"})
    userEmail!:string;

    @Column({type:"varchar"})
    accessToken!:string;

    @Column({type:"varchar"})
    refreshToken!:string;
}