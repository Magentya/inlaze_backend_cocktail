import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/database/models/ingredient';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  CreateIngredientDto,
  UpdateIngredientDto,
} from './ingredient.dto.and.joi';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(ingredients: CreateIngredientDto): Promise<Ingredient> {
    return await this.ingredientRepository.save({
      name: ingredients.name,
      cocktail: {
        id: ingredients.cocktailId,
      },
    });
  }

  async read(id: number) {
    if (!id) {
      return await this.ingredientRepository.find({
        relations: ['cocktail'],
      });
    }
    return await this.ingredientRepository.findOne({
      where: { id },
      relations: ['cocktail'],
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.ingredientRepository.softDelete(id);
  }

  async update(
    id: number,
    ingredient: UpdateIngredientDto,
  ): Promise<UpdateResult> {
    return await this.ingredientRepository.update(id, {
      name: ingredient.name,
      cocktail: {
        id: ingredient.cocktailId,
      },
    });
  }
}
