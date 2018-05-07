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
    self.dimension = 1;
    console.assert(arguments.length > 0, "Es requerido un argumento");
    if (arguments.length == 1) {
        console.assert(typeof data == "object", "config debe ser un objeto.");
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
        console.assert(typeof options == "object", "config debe ser un objeto.");
        options.width = width;
        options.height = height;
        if (dimension) {
            options.dimension = dimension;
        }
        setOptions(options);
        loadData(data);
    }
    self.length = self.width * self.height * self.dimension;
    if (!self.data) {
        self.data = new self.typeInstance(self.length);
    }
    console.assert(typeof self.width == "number", "El ancho no es un numero");
    console.assert(typeof self.height == "number", "El alto no es un numero");
    console.assert(typeof self.dimension == "number", "La dimension no es un numero");
    console.assert(
        self.data.length == self.length,
        "No coinciden el numero de elementos de la matriz..."
    );
    /**
     * loadData.
     * Carga el arreglo de datos matricial.
     * 
     */
    function loadData(data) {
        console.assert(
            (data instanceof Int8Array
            || data instanceof Int16Array
            || data instanceof Int32Array
            || data instanceof Float32Array
            || data instanceof Float64Array
            || data instanceof ArrayBuffer
            || Array.isArray(data)),
            "El parametro data no es un objeto valido..."
        );
        if (data instanceof self.typeInstance) {
            self.data = data;
        } else {
            self.data = self.typeInstance.from(data);            
        }
    }
    /**
     * setOptions.
     * Establece las opciones de la clase.
     * 
     * @param {object} config Objetos.
     * @returns {void}
     */
    function setOptions(config) {
        console.assert(config.width, "Es necesario el ancho de la matriz.");
        console.assert(config.height, "Es necesario el alto de la matriz.");
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
            case "array":
                self.typeInstance = Array;
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
    function getIndex(x, y) {
        if (y == undefined || y == null) {
            y = 0;
        }
        console.assert(
            typeof x == "number" && x >= 0 && x < self.width,
            "el par x no es numero valido..."
        );
        console.assert(
            typeof y == "number" && y >= 0 && y < self.height,
            "el par y no es numero valido..."
        );
        return Math.round(x + y * self.width);
    }    
    /**
     * getRow.
     * Obtiene el valor del punto cardinal.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @returns {*}
     */
    this.getRow = function(x, y) {
        var index = getIndex(x, y);
        if (self.dimension == 1) {
            return self.data[index];
        }
        return self.data.slice(index, index + self.dimension);
    };
    /**
     * forEach.
     * Blucle para recorrer la matriz muldimensional.
     */
    this.forEach = function(callback) {
        console.assert(callback instanceof Function, "callback debe ser una funcion.");
        //var width = self.width * (self.dimension - 1);
        for (var index = 0, x = 0, y = 0; index < this.length; index += self.dimension) {
            var element;
            if (self.dimension == 1) {
                element = this.data[index];
            }else{
                element = this.data.slice(index, index + self.dimension);                
            }
            if (x >= self.width) {
                x = 0;
                y++;
            }
            callback(element, x, y);
            x++;
        }
    };
}

module.exports = Matrix;