import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../database/models/ingredient';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [IngredientService],
  controllers: [IngredientController],
  imports: [
    TypeOrmModule.forFeature([Ingredient]),
    ClientsModule.register([
      {
        name: 'MICROSERVICE_TRANSFER',
        transport: Transport.REDIS,
      },
    ]),
  ],
})
export class IngredientModule {}
