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
    var config = {};
    if (!arguments.length) {
        throw new Error("Es requerido un argumento");
    }
    if (arguments.length == 1) {
        if (typeof data !== "object") {
            throw new Error("config debe ser un objeto.");
        }
        config = data;
    }
    if (arguments.length == 2) {
        config = width;
        config.data = data;
    }
    if (arguments.length > 2) {
        if (options && typeof options !== "object") {
            throw new Error("config debe ser un objeto.");
        }
        if (options) {
            config = options;
        }
        if (width) {
            config.width = width;
        }
        if (height) {
            config.height = height;
        }
        config.data = data;
    }
    if (!config.width) {
        throw new Error("Es necesario el ancho de la matriz.");
    }
    if (!config.height) {
        throw new Error("Es necesario el alto de la matriz.");
    }    
    var opt = {
        width: {
            value: config.width,
            writable: false,
            enumerable: true
        },
        height: {
            value: config.height,
            writable: false,
            enumerable: true
        },
        dimension: {
            value: 1,
            writable: false,
            enumerable: true
        }
    };
    if (config.dimension) {
        opt.dimension.value = config.dimension;
    }
    if (config.type) {
        config.type = config.type.toLowerCase();
        if (!(config.type in Matrix.typeArray)) {
            throw new Error("El tipo de objeto no es valido...");
        }
        opt.instance = {
            value: Matrix.typeArray[config.type],
            writable: true,
            enumerable: true
        };
    }
    if (typeof opt.width.value !== "number") {
        throw new Error("El ancho no es un numero");
    }
    if (typeof opt.height.value !== "number") {
        throw new Error("El alto no es un numero");
    }
    if (typeof opt.dimension.value !== "number") {
        throw new Error("La dimension no es un numero");
    }
    Object.defineProperties(this, opt);
    this.__MAX_LIMIT_WIDTH = this.width * this.dimension;
    this.__MAX_LIMIT_HEIGHT = this.height * this.dimension;
    this.length = this.__MAX_LIMIT_WIDTH * this.height;
    if (config.data) {
        this.data = config.data;
    } else {
        this.data = new this.instance(this.length);
    }
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
    if (!arguments.length || arguments.length > 2) {
        throw new Error("El numero de argumentos es invalido...");
    }
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
    if (!arguments.length || arguments.length > 3) {
        throw new Error("El numero de argumentos es invalido...");
    }
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

/**
 * @function get
 * @public
 * @summary Obtiene el valor del punto cardinal.
 * @param {Number} x Punto del plano cartesiano eje-x.
 * @param {Number} y Punto del plano cartesiano eje-y.
 * @returns {*}
 */
Matrix.prototype.get = function (x, y) {
    var index = this.getIndex(x, y);
    if (this.dimension == 1) {
        return this.data[index];
    }
    return this.data.slice(index, index + this.dimension);
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
Matrix.prototype.set = function (x, y, val) {
    var index = this.getIndex(x, y),
        end = 0,
        n = 0,
        n2 = 0;
    if (this.dimension == 1) {
        this.data[index] = val;
        return;
    }
    if (val == undefined || val == null || val.length == undefined) {
        throw new Error("Debe ser un array el retorno.");
    }
    if (val.length != this.dimension) {
        throw new Error("Es necesario un indice de " + this.dimension + " dimensiones");
    }
    n = val.length;
    n2 = this.length;
    end = index + n;
    if (n > n2 || end > n2) {
        throw new Error("El reemplazo es incorrecto!. Repare los indices");
    }
    for (var i = 0; i < n; i++) {
        this.data[index + i] = val[i];
    }
};
/**
 * 
 */
Matrix.prototype.getIndex = function (x, y) {
    var result = (x + y * this.width) * this.dimension;
    return Math.round(result);
};
/**
 * @function getField
 * @public
 * @summary Obtiene el valor del punto cardinal.
 * @param {Number} x Punto del plano cartesiano eje-x.
 * @param {Number} y Punto del plano cartesiano eje-y.
 * @returns {*}
 */
Matrix.prototype.getField = function (x, y) {
    console.warn(
        "El metodo getField será descontinuado para la proxima version."
    );
    return this.get(x, y);
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
Matrix.prototype.setField = function (x, y, val) {
    console.warn(
        "El metodo setField será descontinuado para la proxima version."
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
Matrix.prototype.forEach = function (callback) {
    if (!(callback instanceof Function)) {
        throw new Error("callback debe ser una funcion.");
    }
    for (var index = 0, x = 0, y = 0, n = this.data.length; index < n; index += this.dimension) {
        if (x >= this.width) {
            x = 0;
            y++;
        }
        var data = this.get(x, y);
        callback(data, x, y, index);
        x++;
    }
};
/**
 * @function map
 * @public
 * @summary Reemplaza el valor actual de la matriz.
 * @param {Function} callback Función de reemplazo.
 * @returns {void}
 */
Matrix.prototype.map = function (callback) {
    if (!(callback instanceof Function)) {
        throw new Error("callback debe ser una funcion.");
    }
    var self = this;
    this.forEach(function (rows, x, y, index) {
        var value = callback(rows, x, y, index);
        self.set(x, y, value);
    });
    return this;
};

/**
 * @function toString
 * @public
 * @summary Parsear objeto como String.
 * @returns {String}
 */
Matrix.prototype.toString = function () {
    var str = "", length = 0;
    this.forEach(function (row, x, y) {
        if (this.dimension == 1) {
            str += row + " ";
        } else {
            str += row.toString() + " ";
        }
        if (x == this.width - 1) {
            str += "\n";
        }
    });
    return str;
};

/**
 * @function isNumber
 * @public
 * @summary Valida que la matriz es numerica.
 * @returns {boolean}
 */
Matrix.prototype.isNumber = function () {
    var data = this.data;
    for(var i = 0, n = data.length; i < n; i++) {
        if (isNaN(data[i])) {
            return false;
        }
    }
    return true;
    // return this.data.every(function (row) {
    //     return !isNaN(row);
    // });
};
/**
 * @function isNotNumber
 * @public
 * @summary Valida que la matriz no es numerica.
 * @returns {boolean}
 */
Matrix.prototype.isNotNumber = function () {
    return !this.isNumber();
};
/**
 * @function isEqual
 * @public
 * @summary Compara el nuevo objeto matriz con el actual.
 * @param {Matrix} vector Objeto de comparación.
 * @returns {boolean}
 */
Matrix.prototype.isEqual = function (vector) {
    if (!(vector instanceof Matrix)) {
        throw new Error(
            "El parametro no es un objetos matrix de comparacion...");
    }
    var data = this.data;
    for (var i = 0, n = data.length; i < n; i++) {
        if (data[i] !== vector.data[i]) {
            return false;
        }
    }
    return true;
    // return this.data.every(function (row, index) {
    //     return row === vector.data[index];
    // });
};
/**
 * @function isNotEqual
 * @public
 * @summary Compara si el nuevo objeto matriz es diferente.
 * @param {Matrix} vector Objeto de comparación.
 * @returns {boolean}
 */
Matrix.prototype.isNotEqual = function (vector) {
    return !this.isEqual(vector);
};
/**
 * @function isNull
 * @public
 * @summary Compara si la matriz es nula.     * 
 * @returns {boolean}
 */
Matrix.prototype.isNull = function () {
    return this.data.every(function (row, index) {
        return !row;
    });
};
/**
 * @function isNotNull
 * @public
 * @summary Compara si la matriz es no nula.
 * @returns {boolean}
 */
Matrix.prototype.isNotNull = function () {
    return !this.isNull();
};
/**
 * @function isOverTriangle
 * @public
 * @summary Es una matrix triangular superior.
 * @returns {Boolean}
 */
Matrix.prototype.isOverTriangle = function () {
    var isTriangle = true, self = this;
    this.forEach(function (row, x, y) {
        if (self.dimension == 1) {
            isTriangle = isTriangle && ((x > y && row === 0) || (x <= y && row !== 0));
        } else {
            for (var i = 0, n = row.length; i < n; i++) {
                isTriangle = isTriangle && ((x > y && row[i] === 0) || (x <= y && row[i] !== 0));
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
Matrix.prototype.isUnderTriangle = function () {
    var isTriangle = true, self = this;
    self.forEach(function (row, x, y) {
        if (self.dimension == 1) {
            isTriangle = isTriangle && ((x < y && row === 0) || (x >= y && row !== 0));
        } else {
            for (var i = 0, n = row.length; i < n; i++) {
                isTriangle = isTriangle && ((x < y && row[i] === 0) || (x >= y && row[i] !== 0));
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
Matrix.prototype.isSimetry = function () {
    var isSimetry = true, self = this;
    if (this.width != this.height) {
        return false;
    }
    this.forEach(function (row, x, y) {
        var row2 = self.get(y, x);
        if (self.dimension == 1) {
            isSimetry = isSimetry && (row === row2);
        } else {
            for (var i = 0, n = row.length; i < n; i++) {
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
Matrix.prototype.isAsimetry = function () {
    var isSimetry = true, self = this;
    if (self.width != self.height) {
        return false;
    }
    self.forEach(function (row, x, y) {
        var row2 = self.get(y, x);
        if (self.dimension == 1) {
            isSimetry = isSimetry && (row === -row2);
        } else {
            for (var i = 0, n = row.length; i < n; i++) {
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
Matrix.prototype.isNotSimetry = function () {
    return !this.isSimetry();
};
/**
 * @function sqrt
 * @public
 * @summary Aplica raiz cuadrada de la matriz actual.
 * @returns {Matrix}
 */
Matrix.prototype.sqrt = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.sqrt(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.cbrt = function () {
    var obj = self.clone();
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.cbrt(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.log = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.log(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.exp = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.exp(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.abs = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.abs(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.atan = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.atan(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.cos = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.cos(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.sin = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.sin(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.round = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.round(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.ceil = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.ceil(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.floor = function () {
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.floor(row);
        }
        return row.map(function (row2) {
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
Matrix.prototype.pow = function (n) {
    if (typeof n !== "number") {
        throw new Error("n debe ser un numero");
    }
    var obj = this.clone(), self = this;
    obj.map(function (row) {
        if (obj.dimension == 1) {
            return Math.pow(row, n);
        }
        return row.map(function (row2) {
            return Math.pow(row2, n);
        });
    });
    return obj;
};
/**
 * @function new
 * @summary Genera una nueva instancia Matrix.
 * @param {Object} options 
 * @returns {Matrix}
 */
Matrix.new = function (options) {
    var obj = new Matrix(options);
    return obj;
};
/**
 * @function toObject
 * @private
 * @summary Genera un objeto con las configuraciones relevantes del objeto.
 * @returns {Object}
 */
Matrix.prototype.toObject = function () {
    return {
        width: this.width,
        height: this.height,
        dimension: this.dimension,
        instance: this.instance,
        data: this.data.slice()
    };
};
/**
 * @function clone
 * @public
 * @summary Genera una copia de la instancia actual.
 * @returns {Matrix}
 */
Matrix.prototype.clone = function () {
    var options = this.toObject();
    var newobj = Matrix.new(options);
    return newobj;
};
/**
 * @function size
 * @public
 * @summary Tamaño matricial del objeto.
 * @returns {Array}
 */
Matrix.prototype.size = function () {
    return [this.width, this.height, this.dimension];
};
/**
 * @function max
 * @public
 * @summary Devuelve el valor máximo de la matriz.
 * @return {Number}
 */
Matrix.prototype.max = function () {
    return Math.max.apply(null, this.data);
};
/**
 * @function min
 * @public
 * @summary Devuelve el valor mínimo de la matriz.
 * @return {Number}
 */
Matrix.prototype.min = function () {
    return Math.min.apply(null, this.data);
};
/**
 * @function transposed
 * @public
 * @summary Inversa de la matriz.
 * @returns {Matrix}
 */
Matrix.prototype.transposed = function () {
    var obj = Generate(this.height, this.width, this.dimension),
        self = this;
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
Matrix.prototype.sum = function () {
    var matrixs = arguments;
    var obj = this.clone();
    if (!matrixs.length) {
        throw new Error("Es necesario un objeto");
    }
    for (var i = 0, n = matrixs.length; i < n; i++) {
        var matrix = matrixs[i];
        if (!(matrix instanceof Matrix) && typeof matrix !== "number") {
            throw new Error("Debe pasar un objeto Matrix o un escalar");
        }
        if (!(typeof matrix == "number" || (matrix.width == obj.width && matrix.height == obj.height && matrix.dimension == obj.dimension))) {
            throw new Error("Las matrices no son identicas en tamaño...");
        }
        obj = Utils.sum(obj, matrix, false);
    }
    return obj;
};
/**
 * @function subtract
 * @public
 * @summary Suma la matriz actual al conjunto de matrices.
 * @returns {Matrix}
 */
Matrix.prototype.subtract = function () {
    var matrixs = arguments;
    var obj = this.clone();
    if (!matrixs.length) {
        throw new Error("Es necesario un objeto");
    }
    for (var i = 0, n = matrixs.length; i < n; i++) {
        var matrix = matrixs[i];
        if (!(matrix instanceof Matrix) && typeof matrix !== "number") {
            throw new Error("Debe pasar un objeto Matrix o un escalar");
        }
        if (!(typeof matrix == "number" || (matrix.width == obj.width && matrix.height == obj.height && matrix.dimension == obj.dimension))) {
            throw new Error("Las matrices no son identicas en tamaño...");
        }
        obj = Utils.sum(obj, matrix, true);
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
Matrix.prototype.getRow = function (y) {
    if (typeof y !== "number" || !y || y >= this.height) {
        throw new Error("No es valido el numero de fila");
    }
    var min = this.getIndex(0, y),
        max = this.getIndex(this.width - 1, y);
    var data = this.data.slice(
        min, min + this.__MAX_LIMIT_WIDTH);
    return new Matrix({
        width: this.width,
        height: 1,
        dimension: this.dimension,
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
Matrix.prototype.getCol = function (x) {
    if (typeof x !== "number" || !x || x >= this.width) {
        throw new Error("No es valido el numero de columna");
    }
    var data = new this.instance(this.__MAX_LIMIT_HEIGHT);
    for (var y = 0, i = 0; y < this.height; y++ , i += this.dimension) {
        var index = this.getIndex(x, y);
        if (this.dimension == 1) {
            data[i] = this.data[index];
        } else {
            for (var j = 0; j < this.dimension; j++) {
                data[i + j] = this.data[index + j];
            }
        }
    }
    return new Matrix({
        width: 1,
        height: this.height,
        dimension: this.dimension,
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
Matrix.prototype.slice = function (x1, y1, width, height) {
    if (typeof y1 !== "number" || !y1 || y1 >= this.height) {
        throw new Error("No es valido el numero de fila");
    }
    if (typeof x1 !== "number" || !x1 || x1 >= this.width) {
        throw new Error("No es valido el numero de columna");
    }
    var xend = x1 + (width - 1), yend = y1 + (height - 1);
    if (typeof yend !== "number" || !yend || yend >= this.height) {
        throw new Error("No es valido el alto");
    }
    if (typeof xend !== "number" || !xend || xend >= this.width) {
        throw new Error("No es valido el ancho");
    }
    var data = new this.instance(width * height * this.dimension);
    var i = 0;
    for (var y = y1; y <= yend; y++) {
        for (var x = x1; x <= xend; x++) {
            var index = this.getIndex(x, y);
            if (this.dimension == 1) {
                data[i] = this.data[index];
            } else {
                for (var j = 0; j < this.dimension; j++) {
                    data[i + j] = this.data[index + j];
                }
            }
            i += this.dimension;
        }
    }
    return new Matrix({
        width: width,
        height: height,
        dimension: this.dimension,
        data: data
    });
};
/**
 * @function inmultiply.
 * @public
 * @summary Publica funcion multiplicar.
 * @param {Array} arguments - argumentos de la funcion.
 * @returns {Matrix}
 */
Matrix.prototype.inmultiply = function () {
    var matrixs = arguments;
    var obj = this;
    if (!matrixs.length) {
        throw new Error("Es necesario un objeto");
    }
    for (var i = 0, n = matrixs.length; i < n; i++) {
        var matrix = matrixs[i];
        if (!(matrix instanceof Matrix) && typeof matrix !== "number") {
            throw new Error("Debe pasar un objeto Matrix o un escalar");
        }
        if (!Utils.isMultiply(obj, matrix)) {
            throw new Error("Las matrices no son multiplicables...");
        }
        var temp = Generate(
            (typeof matrix == "number") ? obj.width : matrix.width,
            obj.height,
            obj.dimension
        );
        obj = Utils.inmultiply(temp, obj, matrix);
    }
    if (obj.width == obj.height && obj.width == 1) {
        return obj.data[0];
    }
    return obj;
};
/**
 * @function inverse
 * @public
 * @summary Genera la matriz inversa.
 * @returns {Matrix}
 */
Matrix.prototype.inverse = function () {
    var D = this.det();
    var obj = this.adj().transposed();
    return obj.inmultiply(1 / D);
};
/**
 * @function divide
 * @public
 * @summary Publica funcion dividir.
 * @param {Array} arguments - argumentos de la funcion.
 * @returns {Matrix}
 */
Matrix.prototype.divide = function () {
    var matrixs = arguments;
    var obj = this;
    if (!matrixs.length) {
        throw new Error("Es necesario un objeto");
    }
    for (var i = 0, n = matrixs.length; i < n; i++) {
        var matrix = matrixs[i];
        if (!(matrix instanceof Matrix) && typeof matrix !== "number") {
            throw new Error("Debe pasar un objeto Matrix o un escalar");
        }
        if (typeof matrix == "number") {
            obj = obj.inmultiply(1 / matrix);
            continue;
        }
        try {
            obj = obj.inmultiply(matrix.inverse());
        } catch (error) {
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
Matrix.prototype.not = function () {
    return this.inmultiply(-1);
};
/**
 * @function isSingular
 * @public
 * @summary Es una matriz cuadrada.
 * @returns {Boolean}
 */
Matrix.prototype.isSingular = function () {
    return this.width == this.height;
};

/**
 * @function removeRow
 * @public
 * @summary Elimina una fila del objeto.
 * @param {Number} y1 num. de fila
 * @returns {Matrix}
 */
Matrix.prototype.removeRow = function (y1) {
    var obj = Generate(this.width, this.height - 1, this.dimension);
    obj.map(function (row, x, y) {
        if (y >= y1) {
            return this.get(x, y + 1);
        }
        return this.get(x, y);
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
Matrix.prototype.removeCol = function (x1) {
    var obj = Generate(this.width - 1, this.height, this.dimension);
    obj.map(function (row, x, y) {
        if (x >= x1) {
            return this.get(x + 1, y);
        }
        return this.get(x, y);
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
Matrix.prototype.remove = function (x1, y1) {
    var obj = Generate(
        this.width - 1, this.height - 1, this.dimension),
        self = this;
    obj.map(function (row, x, y) {
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
Matrix.prototype.adj = function () {
    if (!this.isSingular()) {
        throw new Error("Debe ser una matriz cuadrada");
    }
    var matrix = Generate(this.width, this.height, 1),
        self = this;
    var index = 0;
    if (this.__adj__) {
        return this.__adj__;
    }
    self.forEach(function (row, x, y) {
        var obj = self.remove(x, y);
        var cof = Math.pow(-1, x + y + 2) * obj.det();
        matrix.data[index++] = cof;
    });
    this.__adj__ = matrix;
    return this.__adj__;
};
/**
 * @function determinant2
 * @private
 * @summary calcula la determinante de una matriz 2 x 2.
 * @param {Matrix} A - matrix 2 x 2 a calcular.
 * @return {Number}
 */
function determinant2(A) {
    var row1 = 1, row2 = 1, determ = 0;
    if (!A.isSingular()) {
        throw new Error("La matriz no es cuadrada");
    }
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
 * @function det
 * @public
 * @summary calcula el valor determinante de la matriz.
 * @returns {Number}
 */
Matrix.prototype.det = function () {
    if (this.__determinant__) {
        return this.__determinant__;
    }
    if (this.width == 1) {
        this.__determinant__ = this.data[0];
        return this.__determinant__;
    }
    if (this.width == this.height && this.width == 2) {
        this.__determinant__ = determinant2(this);
        return this.__determinant__;
    }
    var det = 0;
    var obj = this.adj();
    for (var index = 0; index < this.width; index++) {
        det += this.data[index] * obj.data[index];
    }
    this.__determinant__ = det;
    return det;
};
/**
 * @function promd.
 * @public
 * @summary Calcula el promedio de la matriz.
 * @returns {Number}
 */
Matrix.prototype.promd = function () {
    var promd = 0;
    for (var i = 0, n = this.data.length; i < n; i++) {
        promd += this.data[i];
    }
    return promd;
};
Object.defineProperty(Matrix.prototype, "instance" , {
    value: Float32Array,
    writable: true,
    enumerable: true
});
Object.defineProperty(Matrix.prototype, "__data__" , {
    value: null,
    writable: true,
    enumerable: false
});
Object.defineProperty(Matrix.prototype, //objeto target
'data', //nombre propiedad
{
    enumerable: true, 
    configurable: true,
    get: function get() { //getter
        return this.__data__;
    },
    set: function set(data) { //getter
        if (!Matrix.isValidArray(data)) {
            throw new Error(
                "El parametro data no es un objeto valido...");
        }
        if (data.length != this.length) {
            throw new Error(
                "No coinciden el numero de elementos de la matriz...");
        }
        if (data instanceof this.instance) {
            this.__data__ = data;
        } else {
            this.__data__ =  this.instance.from(data);
        }
    }
});
Object.defineProperty(Matrix, "typeArray", {
    value: {
        "int8": Int8Array,
        "uint8": Uint8Array,
        "uint16": Uint16Array,
        "uint32": Uint32Array,
        "uint8_clamped": Uint8ClampedArray,
        "int16": Int16Array,
        "int32": Int32Array,
        "float32": Float32Array,
        "float64": Float64Array,
        "buffer": ArrayBuffer
    },
    writable: false,
    enumerable: true
});
/**
 * isValidArray.
 * Valida que sea un array tipeado valido.
 * @param {*} data valor de validación.
 * @returns {Boolean}
 */
Matrix.isValidArray = function (data) {
    var bool = false;
    if (Array.isArray(data)) {
        return true;
    }
    for (var key in Matrix.typeArray) {
        bool = bool || data instanceof Matrix.typeArray[key];
    }
    return bool;
};
module.exports = Matrix;