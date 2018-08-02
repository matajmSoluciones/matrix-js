"use stric";
var Utils = require("./utils");
/**
 * Matrix.
 * 
 * Clase para el manejo de arreglos multidimenciones.
 * new Matrix ([1,2,3,4,5,6], 3, 2, 2, {});
 * new Matrix ([1,2,3,4,5,6], 3, 2, 2);
 * new Matrix ([1,2,3,4,5,6], 3, 2);
 * new Matrix ([1,2,3,4,5,6], {width: 3, height: 2});
 * new Matrix ({width: 3, height: 2, data: [1,2,3,4,5,6]}); 
 *
 * @constructor
 * @param {Array|Int8Array|Int16Array|Int32Array|Float32Array|Float64Array|ArrayBuffer} data Arreglo de datos.
 * @param {Number} width  - Ancho de la matriz.
 * @param {Number} height - Alto de la matriz.
 * @param {Number} dimension - Dimensión de la matriz.
 * @param {object} options - Opciones de la matriz.
 * @author Jhonny Mata <solucionesmatajm@gmai.com>
 * @exports Matrix
 * @version 0.0.1
 */
function Matrix(data, width, height, dimension, options) {
    var self = this,
        determinant = null,
        adj = null;
    self.typeInstance = Float32Array;
    self.length = 0; // tamaño del arreglo.
    self.dimension = 1;
    self.config = {};
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
     * @function loadData
     * @private
     * @summary Carga el arreglo de datos matricial.
     * @param {Array} data - Arreglo de datos.
     * @returns {void}
     */
    function loadData(data) {
        console.assert(
            (
                data instanceof Int8Array
                || data instanceof Int16Array
                || data instanceof Int32Array
                || data instanceof Float32Array
                || data instanceof Float64Array
                || data instanceof Uint8ClampedArray
                || data instanceof Buffer
                || Array.isArray(data)
            ),
            "El parametro data no es un objeto valido..."
        );
        if (data instanceof self.typeInstance) {
            self.data = data;
        } else {
            self.data = self.typeInstance.from(data);            
        }
    }
    /**
     * @function setOptions
     * @private
     * @summary Establece las opciones de la clase.     * 
     * @param {object} config - Objetos.
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
        self.config = config;
    }
    /**
     * @function isTypeInstance
     * @private
     * @summary Obtiene la clase Arreglo para generar datos. 
     * @param {string} type Tipo de arreglo.
     * @returns {void}
     */
    function isTypeInstance(type) {
        switch (type.toLowerCase()) {
            case "int8":
                self.typeInstance = Int8Array;
                break;
            case "uint8":
                self.typeInstance = Uint8Array;
                break;
            case "uint16":
                self.typeInstance = Uint16Array;
                break;
            case "uint32":
                self.typeInstance = Uint32Array;
                break;
            case "uint8_clamped":
                self.typeInstance = Uint8ClampedArray;
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
                self.typeInstance = Buffer;
                break;
            default:
                throw new Error("El tipo de objeto no es valido...");
        }
    }
    /**
     * @function get
     * @public
     * @summary Obtiene el valor del punto cardinal.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @returns {*}
     */
    this.get = function(x, y) {
        var index = Utils.getIndex(
            x, y, self.width, self.height, self.dimension
        );
        if (self.dimension == 1) {
            return self.data[index];
        }
        return Utils.slice(self.data, index, self.dimension);
    };
    /**
     * @function getField
     * @public
     * @summary Obtiene el valor del punto cardinal.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @returns {*}
     */
    this.getField = function(x, y) {
        console.warn(
            "El metodo getField será descontinuado para la proxima version."
        );
        return this.get(x, y);
    };
    /**
     * @function set
     * @public
     * @summary Reemplaza el valor del punto cardinal.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @param {Number} val Punto del plano cartesiano eje-y.
     * @returns {*}
     */
    this.set = function(x, y, val) {
        var index = Utils.getIndex(
            x, y, self.width, self.height, self.dimension
        );
        if (self.dimension == 1) {
            self.data[index] = val;
            return;
        }
        if (val == undefined || val == null || val.length == undefined) {
            throw new Error("Debe ser un array el retorno.");
        }
        if (val.length != self.dimension) {
            throw new Error("Es necesario un indice de " + self.dimension + " dimensiones");
        }
        self.data = Utils.replace(
            self.data, val, index, self.typeInstance
        );
        return;
    };
    /**
     * @function setField
     * @public
     * @summary Reemplaza el valor del punto cardinal.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @param {Number} val Punto del plano cartesiano eje-y.
     * @returns {*}
     */
    this.setField = function(x, y, val) {
        console.warn(
            "El metodo getField será descontinuado para la proxima version."
        );
        return this.set(x, y, val);
    };
    /**
     * @function forEach
     * @public
     * @summary Blucle para recorrer la matriz muldimensional.     * 
     * @param {Function} callback Función de reemplazo.
     * @returns {void}
     */
    this.forEach = function(callback) {
        console.assert(callback instanceof Function, "callback debe ser una funcion.");
        Utils.forEach(
            self.data,
            self.width,
            self.height,
            self.dimension,
            callback,
            self.typeInstance
        );
    };
    /**
     * @function map
     * @public
     * @summary Reemplaza el valor actual de la matriz.     * 
     * @param {Function} callback Función de reemplazo.
     * @returns {void}
     */
    this.map = function (callback) {
        console.assert(callback instanceof Function, "callback debe ser una funcion.");
        var obj = Utils.map(
            self.data,
            self.width,
            self.height,
            self.dimension,
            callback,
            self.typeInstance
        );
        return obj;
    };
    /**
     * @function isNumber
     * @public
     * @summary Valida que la matriz es numerica.
     * @returns {boolean}
     */
    this.isNumber = function() {
        return self.data.every(function (row) {
            return !isNaN(row);            
        });
    };
    /**
     * @function isNotNumber
     * @public
     * @summary Valida que la matriz no es numerica.
     * @returns {boolean}
     */
    this.isNotNumber = function() {
        return !self.isNumber();
    };
    /**
     * @function isEqual
     * @public
     * @summary Compara el nuevo objeto matriz con el actual.
     * @param {Matrix} vector Objeto de comparación.
     * @returns {boolean}
     */
    this.isEqual = function(vector) {
        console.assert(
            vector instanceof Matrix,
            "El parametro no es un objetos matrix de comparacion..."
        );
        return self.data.every(function(row, index) {
            return row === vector.data[index];
        });
    };
    /**
     * @function isNotEqual
     * @public
     * @summary Compara si el nuevo objeto matriz es diferente.
     * @param {Matrix} vector Objeto de comparación.
     * @returns {boolean}
     */
    this.isNotEqual = function(vector) {
        return !self.isEqual(vector);
    };
    /**
     * @function isNull
     * @public
     * @summary Compara si la matriz es nula.     * 
     * @returns {boolean}
     */
    this.isNull = function () {
        return self.data.every(function (row, index) {
            return !row;
        });
    };
    /**
     * @function isNotNull
     * @public
     * @summary Compara si la matriz es no nula.
     * @returns {boolean}
     */
    this.isNotNull = function() {
        return !self.isNull();
    };
    /**
     * @function isOverTriangle
     * @public
     * @summary Es una matrix triangular superior.
     * @returns {Boolean}
     */
    this.isOverTriangle = function() {
        var isTriangle = true;
        self.forEach(function (row, x, y) {
            if (self.dimension == 1) {
                isTriangle = isTriangle && ((x > y && row === 0) || (x <= y && row !== 0));
            } else {
                for(var i = 0, n = row.length; i<n; i++) {
                    isTriangle = isTriangle && ((x > y && row[i] === 0 ) || (x <= y && row[i] !== 0));
                }
            }
        });
        return isTriangle;
    };
    /**
     * @function isUnderTriangle
     * @public
     * @summary Es una matrix triangular inferior.
     * @returns {Boolean}
     */
    this.isUnderTriangle = function() {
        var isTriangle = true;
        self.forEach(function (row, x, y) {
            if (self.dimension == 1) {
                isTriangle = isTriangle && ((x < y && row === 0) || (x >= y && row !== 0));
            } else {
                for(var i = 0, n = row.length; i<n; i++) {
                    isTriangle = isTriangle && ((x < y && row[i] === 0 ) || (x >= y && row[i] !== 0));
                }
            }
        });
        return isTriangle;
    };
    /**
     * @function isSimetry
     * @public
     * @summary Es una matrix simetrica.
     * @returns {Boolean}
     */
    this.isSimetry = function() {
        var isSimetry = true;
        if (self.width != self.height) {
            return false;
        }
        self.forEach(function (row, x, y) {
            var row2 = self.get(y, x);
            if (self.dimension == 1) {
                isSimetry = isSimetry && (row === row2);
            } else {
                for(var i = 0, n = row.length; i<n; i++) {
                    isSimetry = isSimetry && (row[i] === row2[i]);
                }
            }
        });
        return isSimetry;
    };
    /**
     * @function isAsimetry
     * @public
     * @summary Es una matrix asimetrica.
     * @returns {Boolean}
     */
    this.isAsimetry = function() {
        var isSimetry = true;
        if (self.width != self.height) {
            return false;
        }
        self.forEach(function (row, x, y) {
            var row2 = self.get(y, x);
            if (self.dimension == 1) {
                isSimetry = isSimetry && (row === -row2);
            } else {
                for(var i = 0, n = row.length; i<n; i++) {
                    isSimetry = isSimetry && (row[i] === -row2[i]);
                }
            }
        });
        return isSimetry;
    };
    /**
     * @function isNotSimetry
     * @public
     * @summary Valida si su inversa no es identica.
     * @returns {boolean}
     */
    this.isNotSimetry = function() {
        return !self.isSimetry();
    };
    /**
     * @function sqrt
     * @public
     * @summary Aplica raiz cuadrada de la matriz actual.
     * @returns {Matrix}
     */
    this.sqrt = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.sqrt(row);
            }
            return row.map(function(row2) {
                return Math.sqrt(row2);
            });
        });
        return obj;
    };
    /**
     * @function cbrt
     * @public
     * @summary Aplica raiz cubica de la matriz actual.
     * @returns {Matrix}
     */
    this.cbrt = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.cbrt(row);
            }
            return row.map(function(row2) {
                return Math.cbrt(row2);
            });
        });
        return obj;
    };
    /**
     * @function log
     * @public
     * @summary Aplica Logaritmo natural de la matriz actual.
     * @returns {Matrix}
     */
    this.log = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.log(row);
            }
            return row.map(function(row2) {
                return Math.log(row2);
            });
        });
        return obj;
    };
    /**
     * @function exp
     * @public
     * @summary Aplica exponencial de la matriz actual.
     * @returns {Matrix}
     */
    this.exp = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.exp(row);
            }
            return row.map(function(row2) {
                return Math.exp(row2);
            });
        });
        return obj;
    };
    /**
     * @function abs
     * @public
     * @summary Aplica valor absoluto de la matriz actual.
     * @returns {Matrix}
     */
    this.abs = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.abs(row);
            }
            return row.map(function(row2) {
                return Math.abs(row2);
            });
        });
        return obj;
    };
    /**
     * @function atan
     * @public
     * @summary Aplica tangente de la matriz actual.
     * @returns {Matrix}
     */
    this.atan = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.atan(row);
            }
            return row.map(function(row2) {
                return Math.atan(row2);
            });
        });
        return obj;
    };
    /**
     * @function cos
     * @public
     * @summary Aplica coseno de la matriz actual.
     * @returns {Matrix}
     */
    this.cos = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.cos(row);
            }
            return row.map(function(row2) {
                return Math.cos(row2);
            });
        });
        return obj;
    };
    /**
     * @function sin
     * @public
     * @summary Aplica seno de la matriz actual.
     * @returns {Matrix}
     */
    this.sin = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.sin(row);
            }
            return row.map(function(row2) {
                return Math.sin(row2);
            });
        });
        return obj;
    };
    /**
     * @function round
     * @summary Aplica redondeo de la matriz actual.
     * @returns {Matrix}
     */
    this.round = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.round(row);
            }
            return row.map(function(row2) {
                return Math.round(row2);
            });
        });
        return obj;
    };
    /**
     * @function ceil
     * @public
     * @summary Aplica redondea al valor maximo despues del decimal la matriz actual.
     * @returns {Matrix}
     */
    this.ceil = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.ceil(row);
            }
            return row.map(function(row2) {
                return Math.ceil(row2);
            });
        });
        return obj;
    };
    /**
     * @function floor
     * @public
     * @summary Aplica redondea al valor minimo del decimal en la matriz actual.
     * @returns {Matrix}
     */
    this.floor = function() {
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.floor(row);
            }
            return row.map(function(row2) {
                return Math.floor(row2);
            });
        });
        return obj;
    };
    /**
     * @function pow
     * @public
     * @summary Aplica potencia enesima de la matriz actual.
     * @param {Number} n Numero de veces que se eleva la potencia.
     * @returns {Matrix}
     */
    this.pow = function(n) {
        console.assert(typeof n == "number", "n debe ser un numero");
        var obj = self.clone();
        obj.map(function(row) {
            if (obj.dimension == 1) {
                return Math.pow(row, n);
            }
            return row.map(function(row2) {
                return Math.pow(row2, n);
            });
        });
        return obj;
    };
    /**
     * @function clone
     * @public
     * @summary Genera una copia de la instancia actual.
     * @returns {Matrix}
     */
    this.clone = function() {
        return Utils.clone(self, Matrix);
    };
    /**
     * @function size
     * @public
     * @summary Tamaño matricial del objeto.
     * @returns {Array}
     */
    this.size = function () {
        return [self.width, self.height, self.dimension];
    };
    /**
     * @function max
     * @public
     * @summary Devuelve el valor máximo de la matriz.
     * @return {Number}
     */
    this.max = function () {
        return Math.max.apply(null, self.data);
    };
    /**
     * @function min
     * @public
     * @summary Devuelve el valor mínimo de la matriz.
     * @return {Number}
     */
    this.min = function () {
        return Math.min.apply(null, self.data);
    };
    /**
     * @function transposed
     * @public
     * @summary Inversa de la matriz.
     * @returns {Matrix}
     */
    this.transposed = function () {
        var obj = Generate(self.height, self.width, self.dimension);
        obj.map(function (row, x, y) {
            return self.get(y, x);
        });
        return obj;
    };
    /**
     * @function sum
     * @public
     * @summary Suma la matriz actual al conjunto de matrices.
     * @returns {Matrix}
     */
    this.sum = function () {
        var matrixs = arguments;
        var obj = self;
        console.assert(matrixs.length, "Es necesario un objeto");
        for (var i = 0, n = matrixs.length; i < n; i++) {
            var matrix = matrixs[i];
            console.assert(
                matrix instanceof Matrix || typeof matrix == "number" ,
                "Debe pasar un objeto Matrix o un escalar"
            );
            obj = Utils.sum(obj, matrix, true);
        }
        return obj;
    };
    /**
     * @function subtract
     * @public
     * @summary Suma la matriz actual al conjunto de matrices.
     * @returns {Matrix}
     */
    this.subtract = function () {
        var matrixs = arguments;
        var obj = self;
        console.assert(matrixs.length, "Es necesario un objeto");
        for (var i = 0, n = matrixs.length; i < n; i++) {
            var matrix = matrixs[i];
            console.assert(
                matrix instanceof Matrix || typeof matrix == "number" ,
                "Debe pasar un objeto Matrix o un escalar"
            );
            obj = Utils.sum(obj, matrix, false);
        }
        return obj;
    };
    /**
     * @function getRow
     * @public
     * @summary Obtiene la fila seleccionada.
     * @param {Number} y numero de fila.
     * @return {Matrix}
     */
    this.getRow = function(y) {
        console.assert(
            typeof y == "number" && y >= 0 && y < self.height,
            "No es valido el numero de fila"
        );
        var min = Utils.getIndex(
                0, y, self.width, self.height, self.dimension
            ),
            max = Utils.getIndex(
                self.width - 1, y, self.width, self.height, self.dimension
            );
        var data = self.data.slice(
            min, min + (self.width * self.dimension));
        return new Matrix({
            width: self.width,
            height: 1,
            dimension: self.dimension,
            data: data
        });
    };
    /**
     * @function getCol.
     * @public
     * @summary Obtiene la columna seleccionada.
     * @param {Number} x numero de la columna.
     * @returns {Matrix}
     */
    this.getCol = function (x) {
        console.assert(
            typeof x == "number" && x >= 0 && x < self.width,
            "No es valido el numero de columna"
        );
        var data = new self.typeInstance(self.height * self.dimension);
        for (var y = 0, i = 0; y < self.height; y++, i += self.dimension) {
            var index = Utils.getIndex(
                x, y, self.width, self.height, self.dimension
            );
            if (self.dimension == 1) {
                data[i] = self.data[index];
            } else {
                for(var j = 0; j < self.dimension; j++) {
                    data[i + j] = self.data[index + j];
                }
            }
        }
        return new Matrix({
            width: 1,
            height: self.height,
            dimension: self.dimension,
            data: data
        });
    };
    /**
     * @function slice
     * @public
     * @summary Retorna un nuevo objeto matrix con el tamaño seleccionado.
     * @param {Number} x coordenada de inicio.
     * @param {Number} Y coordenada de inicio.
     * @param {Number} width Ancho.
     * @param {Number} height Alto.
     * @returns {Matrix}
     */
    this.slice = function (x1, y1, width, height) {
        console.assert(
            typeof x1 == "number" && x1 >= 0 && x1 < self.width,
            "No es valido el numero de columna"
        );
        console.assert(
            typeof y1 == "number" && y1 >= 0 && y1 < self.height,
            "No es valido el numero de filas"
        );
        var xend = x1 + (width - 1), yend = y1 + (height - 1);
        console.assert(
            typeof xend == "number" && xend >= 0 && xend < self.width,
            "No es valido el ancho"
        );
        console.assert(
            typeof yend == "number" && yend >= 0 && yend < self.height,
            "No es valido el alto"
        );
        var data = new self.typeInstance(width * height * self.dimension);
        var i = 0;
        for (var y = y1; y <= yend; y++) {
            for( var x = x1; x <= xend; x++) {
                var index = Utils.getIndex(
                    x, y, self.width, self.height, self.dimension
                );
                if (self.dimension == 1) {
                    data[i] = self.data[index];
                } else {
                    for (var j = 0; j < self.dimension; j++) {
                        data[i + j] = self.data[index + j];
                    }
                }
                i += self.dimension;
            }
        }
        return new Matrix({
            width: width,
            height: height,
            dimension: self.dimension,
            data: data
        });
    };
    /**
     * @function isMultiply
     * @private
     * @summary Es multiplicable dos matrices.
     * @param {Matrix} A Objeto matriz 1.
     * @param {Matrix} B Objeto matriz 2.
     * @returns {Boolean}
     */
    function isMultiply(A, B) {
        return typeof B == "number" || (A.width == B.height && B.dimension == A.dimension);
    }
    /**
     * @function inmultiply.
     * @public
     * @summary Publica funcion multiplicar.
     * @param {Array} arguments - argumentos de la funcion.
     * @returns {Matrix}
     */
    this.inmultiply = function () {
        var matrixs = arguments;
        var obj = self;
        console.assert(matrixs.length, "Es necesario un objeto");
        for (var i = 0, n = matrixs.length; i < n; i++) {
            var matrix = matrixs[i];
            console.assert(
                matrix instanceof Matrix || typeof matrix == "number",
                "Debe pasar un objeto Matrix o un escalar"
            );
            var temp = Generate(
                (typeof matrix == "number") ? obj.width : matrix.width,
                obj.height,
                obj.dimension
            );
            obj = Utils.inmultiply(temp, obj, matrix);
        }
        return obj;
    };
    /**
     * @function inverse
     * @public
     * @summary Genera la matriz inversa.
     * @returns {Matrix}
     */
    this.inverse = function() {
        var D = self.det();
        var obj = self.adj()
                    .transposed();
        return obj.inmultiply(1 / D);
    };
    /**
     * @function divide
     * @public
     * @summary Publica funcion dividir.
     * @param {Array} arguments - argumentos de la funcion.
     * @returns {Matrix}
     */
    this.divide = function () {
        var matrixs = arguments;
        var obj = self;
        console.assert(matrixs.length, "Es necesario un objeto");
        for (var i = 0, n = matrixs.length; i < n; i++) {
            var matrix = matrixs[i];
            console.assert(
                matrix instanceof Matrix || typeof matrix == "number",
                "Debe pasar un objeto Matrix o un escalar"
            );
            if (typeof matrix == "number") {
                obj = obj.inmultiply(1 / matrix);
                continue;
            }
            try {
                obj = obj.inmultiply(matrix.inverse());
            }catch(error) {
                obj = matrix.inmultiply(obj.inverse());
            }
        }
        return obj;
    };
    /**
     * @function not
     * @public
     * @summary Genera una matriz negativa de la actual.
     * @return {Matrix}
     */
    this.not = function () {
        return self.inmultiply(-1);
    };
    /**
     * @function isSingular
     * @public
     * @summary Es una matriz cuadrada.
     * @returns {Boolean}
     */
    this.isSingular = function () {
        return self.width == self.height;
    };
    /**
     * @function sumRow
     * @private
     * @summary Suma todos los elementos del arreglo.
     * @param {Array} rows - elementos a sumar.
     * @returns {Number}
     */
    function sumRow(rows) {
        var sum = 0;
        for (var i = 0, n = rows.length; i < n; i++) {
            sum += rows[i];
        }
        return sum;
    }
    /**
     * @function determinant2
     * @private
     * @summary calcula la determinante de una matriz 2 x 2.
     * @param {Matrix} A - matrix 2 x 2 a calcular.
     * @return {Number}
     */
    function determinant2 (A) {
        var row1 = 1, row2 = 1, determ = 0;
        console.assert(A.isSingular(), "La matriz no es cuadrada");
        A.forEach(function (row, x, y) {
            if (x == y) {
                if (A.dimension == 1) {
                    row1 *= row;
                } else {
                    row1 *= sumRow(row);
                }
            }
            if (x == A.width - 1 - y) {
                if (A.dimension == 1) {
                    row2 *= row;
                } else {
                    row2 *= sumRow(row);
                }
            }
        });
        return row1 - row2;
    }
    /**
     * @function removeRow
     * @public
     * @summary Elimina una fila del objeto.
     * @param {Number} y1 num. de fila
     * @returns {Matrix}
     */
    this.removeRow = function (y1) {
        var obj = Generate(self.width, self.height -1, self.dimension);
        obj.map(function(row, x, y){
            if (y >= y1) {
                return self.get(x, y + 1);
            }
            return self.get(x, y);
        });
        return obj;
    };
    /**
     * @function removeCol
     * @public
     * @summary Elimina una columna del objeto.
     * @param {Number} x1 num. de columna
     * @returns {Matrix}
     */
    this.removeCol = function (x1) {
        var obj = Generate(self.width - 1, self.height, self.dimension);
        obj.map(function(row, x, y){
            if (x >= x1) {
                return self.get(x + 1, y);
            }
            return self.get(x, y);
        });
        return obj;
    };
    /**
     * @function remove
     * @public
     * @summary Elimina la fila y columna que intersecta el par (x, y).
     * @param {Number} x1 num. de columna
     * @param {Number} y1 num. de fila
     * @returns {Matrix}
     */
    this.remove = function (x1, y1) {
        var obj = Generate(
            self.width - 1, self.height -1, self.dimension);
        obj.map(function(row, x, y){
            var inx = 0, iny = 0;
            if (y >= y1) {
                iny = 1;
            }
            if (x >= x1) {
                inx = 1;
            }
            return self.get(x + inx, y + iny);
        });
        return obj;
    };
    /**
     * @function adj
     * @public
     * @summary Genera la matriz cofactor.
     * @returns {Matrix}
     */
    this.adj = function () {
        console.assert(self.isSingular(), "Debe ser una matriz cuadrada");
        var matrix = Generate(self.width, self.height, 1);
        var index = 0;
        if (adj) {
            return adj;
        }
        self.forEach(function (row, x, y) {
            var obj = self.remove(x, y);
            var cof = Math.pow(-1, x + y + 2) * obj.det();
            matrix.data[index++] = cof;
        });
        adj = matrix;
        return adj;
    };
    /**
     * @function det
     * @public
     * @summary calcula el valor determinante de la matriz.
     * @returns {Number}
     */
    this.det = function() {
        if (determinant) {
            return determinant;
        }
        if (self.width == 1) {
            determinant = self.data[0];
            return determinant;
        }
        if (self.width == self.height && self.width == 2) {
            determinant = determinant2(self);
            return determinant;
        }
        var det = 0;
        var obj = self.adj();
        for( var index = 0; index < self.width; index++) {
            det += self.data[index] * obj.data[index];
        }
        determinant = det;
        return det;
    };
    /**
     * @function promd.
     * @public
     * @summary Calcula el promedio de la matriz.
     * @returns {Number}
     */
    this.promd = function () {
        var promd = 0;
        for(var i = 0, n = self.data.length; i < n; i++) {
            promd += self.data[i];
        }
        return promd;
    };
    /**
     * @function toString
     * @public
     * @summary Parsear objeto como String.
     * @returns {String}
     */
    this.toString = function() {
        var str = "", length = 0;
        self.forEach(function (row, x, y) {
            if (self.dimension == 1) {
                str += row + " ";
            } else {
                str += row.toString() + " ";
            }
            if (x == self.width - 1) {
                str += "\n";
            }
        });
        return str;
    };
}
/**
 * @function random
 * @static
 * @public
 * @summary Genera una matriz pseudo-aleatoria. * 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Number} dimension 
 * @returns {Matrix}
 */
Matrix.random = function (width, height, dimension) {
    var obj = Generate.apply(this, arguments);
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.random();
        }
        return row.map(function (row2) {
            return Math.random();
        });
    });
    return obj;
};
/**
 * @function PI
 * @static
 * @public
 * @summary Genera una matriz rellena de constance PI.
 * @param {Number} width 
 * @param {Number} height 
 * @param {Number} dimension 
 * @returns {Matrix}
 */
Matrix.PI = function (width, height, dimension) {
    var obj = Generate.apply(this, arguments);
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.PI;
        }
        return row.map(function (row2) {
            return Math.PI;
        });
    });
    return obj;
};
/**
 * @function zeros
 * @static
 * @public
 * @summary Genera una matriz rellena de ceros.
 * @param {Number} width 
 * @param {Number} height 
 * @param {Number} dimension 
 * @returns {Matrix}
 */
Matrix.zeros = function (width, height, dimension) {
    var obj = Generate.apply(this, arguments);
    return obj;
};

/**
 * @function ones
 * @static
 * @public
 * @summary Genera una matriz rellena de unos.
 * @param {Number} width 
 * @param {Number} height 
 * @param {Number} dimension 
 * @returns {Matrix}
 */
Matrix.ones = function (width, height, dimension) {
    var obj = Generate.apply(this, arguments);
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return 1;
        }
        return row.map(function (row2) {
            return 1;
        });
    });
    return obj;
};

/**
 * @function eyes
 * @static
 * @public
 * @summary Genera una matriz identidad.
 * @param {Number} width
 * @param {Number} height
 * @param {Number} dimension
 * @returns {Matrix}
 */
Matrix.eyes = function (n, dimension) {
    var options = {
        type: "float32"
    };
    console.assert(arguments.length > 0 && arguments.length <= 2,
        "El numero de argumentos es invalido...");
    if (arguments.length == 1) {
        options.width = options.height = n;
        options.dimension = 1;
    }
    if (arguments.length == 2) {
        options.width = options.height = n;
        options.dimension = dimension;
    }    
    var obj = new Matrix(options);
    obj.map(function (row, x, y) {
        if (obj.dimension == 1) {
            return (x == y) ? 1 : 0;
        }
        return row.map(function (row2) {
            return (x == y) ? 1 : 0;
        });
    });
    return obj;
};

/**
 * @function Generate
 * @private
 * @summary Generate Matrix Options.
 * @param {Number} width
 * @param {Number} height
 * @param {Number} dimension
 * @returns {Matrix}
 */
function Generate(width, height, dimension) {
    var options = {
        type: "float32"
    };
    console.assert(arguments.length > 0 && arguments.length <= 3,
        "El numero de argumentos es invalido...");
    if (arguments.length == 1) {
        options.width = options.height = width;
        options.dimension = 1;
    }
    if (arguments.length == 2) {
        options.width = width;
        options.height = height;
        options.dimension = 1;
    }
    if (arguments.length == 3) {
        options.width = width;
        options.height = height;
        options.dimension = dimension;
    }
    var obj = new Matrix(options);
    return obj;
}

module.exports = Matrix;