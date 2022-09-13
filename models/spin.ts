import { BodyParts } from "./bodyParts.enum.js";
import { Colours } from "./colours.enum.js";

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
  colour: Colours;
  bodyPart: BodyParts;
  num: number;

  constructor(colour: Colours, bodyPart: BodyParts, num: number) {
    this.colour = colour;
    this.bodyPart = bodyPart;
    this.num = num;
  }
}