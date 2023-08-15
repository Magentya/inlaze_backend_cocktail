import { Entity, Column, ManyToOne } from 'typeorm';

import { Common } from './commons';
import { Cocktail } from './cokctail';

@Entity({ name: 'ingredients' })
export class Ingredient extends Common {
  @Column({ type: 'varchar', nullable: false, name: 'name' })
  name: string;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.ingredients)
  cocktail: Cocktail;
}
