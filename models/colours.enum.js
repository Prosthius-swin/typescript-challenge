export var Colours;
(function (Colours) {
    Colours["Red"] = "Red";
    Colours["Blue"] = "Blue";
    Colours["Yellow"] = "Yellow";
    Colours["Green"] = "Green";
})(Colours || (Colours = {}));
// TODO: implement a ColoursHelper class as shown in BodyParts
export class ColoursHelper {
    static colours = [
        Colours.Red,
        Colours.Blue,
        Colours.Yellow,
        Colours.Green
    ];
    constructor() { }
    static get(key) {
        switch (key) {
            case "Red":
                return Colours.Red;
            case "Blue":
                return Colours.Blue;
            case "Yellow":
                return Colours.Yellow;
            case "Green":
                return Colours.Green;
        }
    }
}
