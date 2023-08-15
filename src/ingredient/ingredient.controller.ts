import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
  BadRequestException,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { JoiValidationPipe } from 'src/pipe/joi.pipe';
import {
  CreateIngredientDto,
  CreateIngredientSchema,
  UpdateIngredientDto,
  UpdateIngredientSchema,
} from './ingredient.dto.and.joi';
import { GeneralResponse } from 'src/types';
import to from 'await-to-js';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new JoiValidationPipe(CreateIngredientSchema))
  async create(@Body() data: CreateIngredientDto): Promise<GeneralResponse> {
    const [err, response] = await to(this.ingredientService.create(data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ingredient created successfully',
      data: response,
    };
  }

  @Get('/:id?')
  @HttpCode(HttpStatus.OK)
  async read(@Param('id') id?: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.ingredientService.read(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Ingredient retrieved successfully',
      data: response,
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.ingredientService.delete(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Ingredient deleted successfully',
      data: response.affected === 1 ? 'Cocktail deleted' : 'No cocktail found',
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(UpdateIngredientSchema))
  async update(
    @Param('id') id: number,
    @Body() data: UpdateIngredientDto,
  ): Promise<GeneralResponse> {
    const [err, response] = await to(this.ingredientService.update(id, data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Ingredient updated successfully',
      data: response.affected === 1 ? 'Cocktail updated' : 'No cocktail found',
    };
  }
}
