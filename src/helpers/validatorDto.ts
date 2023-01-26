import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction } from 'express';
import { BadRequest } from "@tsed/exceptions";
import * as _ from 'lodash'


export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object,
  next: NextFunction,
  pickedProps?: any[]
) => {
  // tranform the literal object to class object
  const objInstance = plainToClass(dto, _.pick(obj, pickedProps));
  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);
  // errors is an array of validation errors
  if (errors.length > 0) {
    let mapped = errors.map(({ property }) => property).join(', ')
    throw new BadRequest('Invalid or missing Fields: ' + mapped)
  }
  //assign validated and formated values to request params
  Object.assign(obj, { _validated: objInstance })
  return objInstance
};