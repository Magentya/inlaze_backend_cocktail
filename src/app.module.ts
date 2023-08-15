import { Module } from '@nestjs/common';
import { CocktailModule } from './cocktail/cocktail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from './database/database.provider';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOptions),
    CocktailModule,
    IngredientModule,
  ],
})
export class AppModule {}
