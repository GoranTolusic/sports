import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Class } from "./Class";

@Entity('sports')
export class Sport {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    codeName: string;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

    @OneToMany(type => Class, clas => clas.sport)
    classes: Class[];
}
