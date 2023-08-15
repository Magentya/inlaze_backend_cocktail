import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Logger,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

const logger = new Logger();

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    const { error } = this.schema.validate(value);

    if (error) {
      logger.error(error);
      throw new BadRequestException('Validation failed', {
        description: error.message,
      });
    }

    return value;
  }
}
