import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cocktail } from '../database/models/cokctail';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCocktailDto, UpdateCocktailDto } from './cocktail.dto.and.joi';

@Injectable()
export class CocktailService {
  constructor(
    @InjectRepository(Cocktail)
    private readonly cocktailRepository: Repository<Cocktail>,
  ) {}

  async create(cocktail: CreateCocktailDto): Promise<Cocktail> {
    return await this.cocktailRepository.save(cocktail);
  }

  async read(id: number) {
    if (!id) {
      return await this.cocktailRepository.find({
        relations: ['ingredients'],
      });
    }
    return await this.cocktailRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
  }

  async update(id: number, cocktail: UpdateCocktailDto): Promise<UpdateResult> {
    return await this.cocktailRepository.update({ id }, cocktail);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.cocktailRepository.softDelete({ id });
  }
}
