import { Entity, Column, OneToMany } from 'typeorm';

import { Common } from './commons';
import { Ingredient } from './ingredient';

@Entity({ name: 'cocktails' })
export class Cocktail extends Common {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  instruction: string;

  @Column({ type: 'varchar', nullable: true, name: 'aditional_notes' })
  aditionalNotes: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.cocktail)
  ingredients: Ingredient[];
}
