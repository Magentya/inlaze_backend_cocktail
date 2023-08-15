import { Module } from '@nestjs/common';
import { CocktailController } from './cocktail.controller';
import { CocktailService } from './cocktail.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktail } from 'src/database/models/cokctail';

@Module({
  controllers: [CocktailController],
  providers: [CocktailService],
  imports: [
    TypeOrmModule.forFeature([Cocktail]),
    ClientsModule.register([
      {
        name: 'MICROSERVICE_TRANSFER',
        transport: Transport.REDIS,
      },
    ]),
  ],
})
export class CocktailModule {}
