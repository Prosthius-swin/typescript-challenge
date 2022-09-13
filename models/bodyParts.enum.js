export var BodyParts;
(function (BodyParts) {
    BodyParts["LeftHand"] = "LeftHand";
    BodyParts["RightHand"] = "RightHand";
    BodyParts["LeftFoot"] = "LeftFoot";
    BodyParts["RightFoot"] = "RightFoot";
})(BodyParts || (BodyParts = {}));
// helper class used to access the above enum
// usage can be either via the array or
// use the get method eg.  BodyPartsHelper.get("LeftHand")
export class BodyPartsHelper {
    static bodyParts = [
        BodyParts.LeftFoot,
        BodyParts.LeftHand,
        BodyParts.RightFoot,
        BodyParts.RightHand
    ];
    constructor() { }
    static get(key) {
        switch (key) {
            case "LeftHand":
                return BodyParts.LeftHand;
            case "RightHand":
                return BodyParts.RightHand;
            case "LeftFoot":
                return BodyParts.LeftFoot;
            case "RightFoot":
                return BodyParts.RightFoot;
        }
    }
}
