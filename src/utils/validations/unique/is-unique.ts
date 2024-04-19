import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from "../index";

export type IsUniqueConstraintOptions = {
  tablaName: string;
  column: string;
}

export function _IsUnique(options: IsUniqueConstraintOptions, validationOptions?: ValidationOptions) {

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'is-unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });

  };
}
