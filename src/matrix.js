/**
 * Matrix
 * 
 * Clase para el manejo de arreglos multidimenciones.
 * new Matrix ([1,2,3,4,5,6], 3, 2, 2, {});
 * new Matrix ([1,2,3,4,5,6], 3, 2, 2);
 * new Matrix ([1,2,3,4,5,6], 3, 2);
 * new Matrix ([1,2,3,4,5,6], {width: 3, height: 2});
 * new Matrix ({width: 3, height: 2, data: [1,2,3,4,5,6]}); 
 *
 * @param {Array|Int8Array|Int16Array|Int32Array|Float32Array|Float64Array|ArrayBuffer} data Arreglo de datos.
 * @param {Number} width Ancho de la matriz.
 * @param {Number} height Alto de la matriz.
 * @param {Number} dimension Dimensión de la matriz.
 * @param {object} options Opciones de la matriz.
 */
function Matrix(data, width, height, dimension, options) {
    var self = this;
    self.typeInstance = Array;
    self.length = 0; // tamaño del arreglo.
    self.dimension = 2;
    assert(arguments.length > 0, "Es requerido un argumento");
    if (arguments.length == 1) {
        assert(typeof data == "object", "config debe ser un objeto.");
        setOptions(data);
        if (data.data) {
            loadData(data.data);
        }
    }
    if (arguments.length == 2) {
        setOptions(width);
        loadData(data);
    }
    if (arguments.length > 2) {
        if (!options) {
            options = {};
        }
        assert(typeof options == "object", "config debe ser un objeto.");
        options.width = width;
        options.height = height;
        if (dimension) {
            options.dimension = dimension;
        }
        setOptions(options);
        loadData(data);
    }
    self.length = self.width * self.height * (self.dimension - 1);
    if (!self.data) {
        self.data = new self.typeInstance(self.length);
    }
    assert(
        self.data.length == self.length,
        "No coinciden el numero de elementos de la matriz..."
    );
    /**
     * loadData.
     * Carga el arreglo de datos matricial.
     * 
     */
    function loadData(data) {
        assert(
            data instanceof self.typeInstance,
            `El parametro data debe ser un ${self.typeInstance}...`
        );
        self.data = data;
    }
    /**
     * setOptions.
     * Establece las opciones de la clase.
     * 
     * @param {object} config Objetos.
     * @returns {void}
     */
    function setOptions(config) {
        assert(config.width, "Es necesario el ancho de la matriz.");
        assert(config.height, "Es necesario el alto de la matriz.");
        self.width = config.width;
        self.height = config.height;
        if (config.dimension) {
            self.dimension = config.dimension;
        }
        if (config.type) {
            isTypeInstance(config.type);
        }
    }
    /**
     * isTypeInstance.
     * 
     * Obtiene la clase Arreglo para generar datos. 
     * @param {string} type Tipo de arreglo.
     * @returns {void}
     */
    function isTypeInstance(type) {
        switch (type.toLowerCase()) {
            case "int8":
                self.typeInstance = Int8Array;
                break;
            case "int16":
                self.typeInstance = Int16Array;
                break;
            case "int32":
                self.typeInstance = Int32Array;
                break;
            case "float32":
                self.typeInstance = Float32Array;
                break;
            case "float64":
                self.typeInstance = Float64Array;
                break;
            case "buffer":
                self.typeInstance = ArrayBuffer;
                break;
            default:
                throw new Error("El tipo de objeto no es valido...");
        }
    }
    /**
     * getIndex.
     * Obtiene el indice del un arreglo unidimencional de la matriz.
     * 
     * @param {Array} arguments lista de argumentos del indice.
     * @return {Number}
     */
    function getIndex(x, y, d) {
        if (!d) {
            d = (!isNaN(y)) ? 2 : 1;
        }
        if (isNaN(y)) {
            y = 0;
        }
        assert(
            typeof x == "number" && x >= 0 && x < self.width,
            "el par x no es numero valido..."
        );
        assert(
            typeof y == "number" && y >= 0 && y < self.height,
            "el par y no es numero valido..."
        );
        assert(typeof d == "number" && d >= 0, "La dimension no es numero valido...");
        assert(d <= self.dimension, "La dimensión excede el de la matriz...");
        return Math.round(x + y * self.width) * (d - 1);
    }    
    /**
     * getElement.
     * Obtiene el valor del elemento actual.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @param {Number} d Punto de la dimensión.
     */
    this.getElement = function(x, y, d) {
        var index = getIndex(x, y, d);
        return this.data[index];
    };
    /**
     * forEach.
     * Blucle para recorrer la matriz muldimensional.
     */
    this.forEach = function(callback) {
        assert(callback instanceof Function, "callback debe ser una funcion.");
        var width = self.width * (self.dimension - 1);
        for(var index = 0, x = 0, y = 0, d = 0; index < this.length; index++) {
            var element = this.data[index];
            d++;
            callback(element, x, y, d);
            if (x >= width) {
                x = 0;
                y++;
            }
            if (d >= self.dimension) {
                d = 0;
            }
            x++;
        }
    };
}
module.exports = Matrix;