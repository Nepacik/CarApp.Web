import {CarDto} from "./car-dto";

export interface UserCarsDto {
  id: number;
  nick:string;
  email:string;
  cars:Array<CarDto>;
}
