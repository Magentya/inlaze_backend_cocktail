import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../database/models/ingredient';

@Module({
  providers: [IngredientService],
  controllers: [IngredientController],
  imports: [TypeOrmModule.forFeature([Ingredient])],
})
export class IngredientModule {}
