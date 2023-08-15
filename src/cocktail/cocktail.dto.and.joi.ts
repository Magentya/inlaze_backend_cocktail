import * as Joi from 'joi';

export class CreateCocktailDto {
  name: string;
  instruction: string;
  aditionalNotes?: string;
}

export const createCocktailSchema = Joi.object({
  name: Joi.string().required(),
  instruction: Joi.string().required(),
  aditionalNotes: Joi.string().optional().allow(null),
});

export class UpdateCocktailDto {
  name?: string;
  instruction?: string;
  aditionalNotes?: string;
}

export const updateCocktailSchema = Joi.object({
  name: Joi.string().optional(),
  instruction: Joi.string().optional(),
  aditionalNotes: Joi.string().optional().allow(null),
});
