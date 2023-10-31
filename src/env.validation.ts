import { validateSync, Matches, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @Matches(
    /^postgresql:\/\/[A-Za-z0-9]+:[A-Za-z0-9]+@(localhost|[A-Za-z0-9.-]+):[0-9]+\/[A-Za-z0-9]+\?schema=[A-Za-z0-9]+$/,
  )
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  // `plainToClass` converts plain object into Class
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  // `validateSync` method validates the class and returns errors
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
