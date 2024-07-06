import { Logger } from '@nestjs/common';

export function Log(): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const logger = new Logger(target.constructor.name);
      const methodName = `${target.constructor.name}.${propertyKey}`;

      try {
        const result = await originalMethod.apply(this, args);
        logger.log(`${methodName} successfully executed`);
        return result;
      } catch (error) {
        logger.error(`${methodName} failed with error: ${error.message}`);
        throw error;
      }
    };

    return descriptor;
  };
}
