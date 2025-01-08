import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
