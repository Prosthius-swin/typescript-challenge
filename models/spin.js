// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord {
    colour;
    bodyPart;
    num;
    constructor(colour, bodyPart, num) {
        this.colour = colour;
        this.bodyPart = bodyPart;
        this.num = num;
    }
}
