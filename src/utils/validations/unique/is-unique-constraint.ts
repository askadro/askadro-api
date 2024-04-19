import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsUniqueConstraintOptions } from "./is-unique";
import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: "IsUniqueConstraint", async: true })
@Injectable()
export class _IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: EntityManager) {
  }
  async validate(value: any, args: ValidationArguments) {

  const {column,tablaName}:IsUniqueConstraintOptions = args.constraints[0];

  const exists = await this.dataSource
    .getRepository(tablaName)
    .createQueryBuilder(tablaName)
    .where({
      [column]: value
    }).getExists();

    return !exists;
  }
  defaultMessage() {
    return "Kayıt zaten var";
  }
}
