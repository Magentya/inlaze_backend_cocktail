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
import { CocktailService } from './cocktail.service';
import { JoiValidationPipe } from 'src/pipe/joi.pipe';
import {
  CreateCocktailDto,
  UpdateCocktailDto,
  createCocktailSchema,
  updateCocktailSchema,
} from './cocktail.dto.and.joi';
import { GeneralResponse } from '../types';
import to from 'await-to-js';
import { AuthGuard } from 'src/auth/jwt.guard.external';

@Controller('cocktail')
export class CocktailController {
  constructor(private cocktailService: CocktailService) {}

  @Post('/')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new JoiValidationPipe(createCocktailSchema))
  async create(@Body() data: CreateCocktailDto): Promise<GeneralResponse> {
    const [err, response] = await to(this.cocktailService.create(data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cocktail created successfully',
      data: response,
    };
  }

  @Get('/:id?')
  @HttpCode(HttpStatus.OK)
  async read(@Param('id') id: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.cocktailService.read(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Cocktail retrieved successfully',
      statusCode: HttpStatus.OK,
      data: response ?? 'No cocktail found',
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<GeneralResponse> {
    const [err, response] = await to(this.cocktailService.delete(id));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Cocktail deleted successfully',
      statusCode: HttpStatus.OK,
      data: response.affected === 1 ? 'Cocktail deleted' : 'No cocktail found',
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(updateCocktailSchema))
  async update(
    @Param('id') id: number,
    @Body() data: UpdateCocktailDto,
  ): Promise<GeneralResponse> {
    const [err, response] = await to(this.cocktailService.update(id, data));

    if (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: 'Cocktail updated successfully',
      statusCode: HttpStatus.OK,
      data: response.affected === 1 ? 'Cocktail updated' : 'No cocktail found',
    };
  }
}
