/**
 * Carga las variables en el ambito global.
 */
var Matrix = require("./matrix");


if (typeof global.window === "object") {
    global.Matrix = Matrix;
}