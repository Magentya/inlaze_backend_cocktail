import * as Joi from 'joi';

export class CreateIngredientDto {
  name: string;
  cocktailId: number;
}

export const CreateIngredientSchema = Joi.object({
  name: Joi.string().required(),
  cocktailId: Joi.number().required(),
});

export class UpdateIngredientDto {
  name?: string;
  cocktailId?: number;
}

export const UpdateIngredientSchema = Joi.object({
  name: Joi.string().optional(),
  cocktailId: Joi.number().optional(),
});
