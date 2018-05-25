(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
/**
 * Carga las variables en el ambito global.
 */
var Matrix = require("./matrix");


if (typeof global.window === "object") {
    global.Matrix = Matrix;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./matrix":2}],2:[function(require,module,exports){
"use stric";
var Utils = require("./utils");
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
     * loadData.
     * Carga el arreglo de datos matricial.
     * 
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
        self.config = config;
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
            case "uint8":
                self.typeInstance = Uint8Array;
                break;
            case "uint16":
                self.typeInstance = Uint16Array;
                break;
            case "uint32":
                self.typeInstance = Uint32Array;
                break;
            case "uint8clamped":
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
            default:
                throw new Error("El tipo de objeto no es valido...");
        }
    }
    /**
     * getField.
     * Obtiene el valor del punto cardinal.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @returns {*}
     */
    this.getField = function(x, y) {
        var index = Utils.getIndex(
            x, y, self.width, self.height, self.dimension
        );
        if (self.dimension == 1) {
            return self.data[index];
        }
        return Utils.slice(self.data, index, self.dimension);
    };
    /**
     * setField.
     * Reemplaza el valor del punto cardinal.
     * @param {Number} x Punto del plano cartesiano eje-x.
     * @param {Number} y Punto del plano cartesiano eje-y.
     * @param {Number} val Punto del plano cartesiano eje-y.
     * @returns {*}
     */
    this.setField = function(x, y, val) {
        var index = Utils.getIndex(
            x, y, self.width, self.height, self.dimension
        );
        if (self.dimension == 1) {
            self.data[index] = val;
        }
        if (val == undefined || val == null || val.length == undefined) {
            throw new Error("Debe ser un array el retorno.");
        }
        if (val.length != self.dimension) {
            throw new Error("Es necesario un indice de " + self.dimension + " dimensiones");
        }
        return Utils.replace(
            self.data, val, index, self.typeInstance
        );
    };
    /**
     * forEach.
     * Blucle para recorrer la matriz muldimensional.
     * 
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
     * map.
     * Reemplaza el valor actual de la matriz.
     * 
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
     * isNumber.
     * Valida que la matriz es numerica.
     * 
     * @returns {boolean}
     */
    this.isNumber = function() {
        return self.data.every(function (row) {
            return !isNaN(row);            
        });
    };
    /**
     * isNotNumber.
     * Valida que la matriz no es numerica.
     * 
     * @returns {boolean}
     */
    this.isNotNumber = function() {
        return !self.isNumber();
    };
    /**
     * isEqual
     * Compara el nuevo objeto matriz con el actual.
     * 
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
     * isNotEqual
     * Compara si el nuevo objeto matriz es diferente.
     * 
     * @param {Matrix} vector Objeto de comparación.
     * @returns {boolean}
     */
    this.isNotEqual = function(vector) {
        return !self.isEqual(vector);
    };
    /**
     * isNull
     * Compara si la matriz es nula.
     * 
     * @returns {boolean}
     */
    this.isNull = function () {
        return self.data.every(function (row, index) {
            return !row;
        });
    };
    /**
     * isNotNull
     * Compara si la matriz es no nula.
     * 
     * @returns {boolean}
     */
    this.isNotNull = function() {
        return !self.isNull();
    };
    /**
     * isOverTriangle.
     * Es una matrix triangular superior.
     * 
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
     * isUnderTriangle.
     * Es una matrix triangular inferior.
     * 
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
     * isSimetry.
     * Es una matrix simetrica.
     * 
     * @returns {Boolean}
     */
    this.isSimetry = function() {
        var isSimetry = true;
        if (self.width != self.height) {
            return false;
        }
        self.forEach(function (row, x, y) {
            var row2 = self.getField(y, x);
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
     * isAsimetry.
     * Es una matrix asimetrica.
     * 
     * @returns {Boolean}
     */
    this.isAsimetry = function() {
        var isSimetry = true;
        if (self.width != self.height) {
            return false;
        }
        self.forEach(function (row, x, y) {
            var row2 = self.getField(y, x);
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
     * isNotSimetry.
     * Valida si su inversa no es identica.
     * 
     * @returns {boolean}
     */
    this.isNotSimetry = function() {
        return !self.isSimetry();
    };
    /**
     * sqrt.
     * Aplica raiz cuadrada de la matriz actual.
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
     * log.
     * Aplica Logaritmo natural de la matriz actual.
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
     * exp.
     * Aplica exponencial de la matriz actual.
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
     * abs.
     * Aplica valor absoluto de la matriz actual.
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
     * atan.
     * Aplica tangente de la matriz actual.
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
     * cos.
     * Aplica coseno de la matriz actual.
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
     * sin.
     * Aplica seno de la matriz actual.
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
     * round.
     * Aplica redondea la matriz actual.
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
     * ceil.
     * Aplica redondea al valor maximo despues del decimal la matriz actual.
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
     * floor.
     * Aplica redondea al valor minimo del decimal en la matriz actual.
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
     * pow.
     * Aplica potencia enesima de la matriz actual.
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
     * clone.
     * Genera una copia de la instancia actual.
     * 
     * @returns {Matrix}
     */
    this.clone = function() {
        return Utils.clone(self, Matrix);
    };
    /**
     * size.
     * Tamaño matricial del objeto.
     * 
     * @returns {Array}
     */
    this.size = function () {
        return [self.width, self.height, self.dimension];
    };
    /**
     * max.
     * Devuelve el valor máximo de la matriz.
     * 
     * @return {Number}
     */
    this.max = function () {
        return Math.max.apply(null, self.data);
    };
    /**
     * min.
     * Devuelve el valor mínimo de la matriz.
     * 
     * @return {Number}
     */
    this.min = function () {
        return Math.min.apply(null, self.data);
    };
    /**
     * transposed.
     * Inversa de la matriz.
     * 
     * @returns {Matrix}
     */
    this.transposed = function () {
        var obj = Generate(self.height, self.width, self.dimension);
        obj.map(function (row, x, y) {
            return self.getField(y, x);
        });
        return obj;
    };
    /**
     * sum.
     * Suma la matriz actual al conjunto de matrices.
     *
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
     * subtract.
     * Suma la matriz actual al conjunto de matrices.
     *
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
     * getRow.
     * Obtiene la fila seleccionada.
     * 
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
     * getCol.
     * Obtiene la columna seleccionada.
     * 
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
     * slice.
     * Retorna un nuevo objeto matrix
     * con el tamaño seleccionado.
     * 
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
     * isMultiply.
     * Es multiplicable dos matrices.
     * 
     * @param {Matrix} A Objeto matriz 1.
     * @param {Matrix} B Objeto matriz 2.
     * @returns {Boolean}
     */
    function isMultiply(A, B) {
        return typeof B == "number" || (A.width == B.height && B.dimension == A.dimension);
    }
    /**
     * inmultiply.
     * Publica funcion multiplicar.
     * 
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
     * inverse.
     * Genera la matriz inversa.
     * 
     * @returns {Matrix}
     */
    this.inverse = function() {
        var D = self.det();
        var obj = self.adj()
                    .transposed();
        return obj.inmultiply(1 / D);
    };
    /**
     * divide.
     * Publica funcion dividir.
     * 
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
     * not.
     * Genera una matriz negativa de la actual.
     * 
     * @return {Matrix}
     */
    this.not = function () {
        return self.inmultiply(-1);
    };
    /**
     * isSingular.
     * 
     * @returns {Boolean}
     */
    this.isSingular = function () {
        return self.width == self.height;
    };
    /**
     * sumRow.
     * 
     * @returns {Integer}
     */
    function sumRow(rows) {
        var sum = 0;
        for (var i = 0, n = rows.length; i < n; i++) {
            sum += rows[i];
        }
        return sum;
    }
    /**
     * determinant2.
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
     * removeRow.
     * Elimina una fila del objeto.
     * 
     * @param {Number} y1 num. de fila
     * @returns {Matrix}
     */
    this.removeRow = function (y1) {
        var obj = Generate(self.width, self.height -1, self.dimension);
        obj.map(function(row, x, y){
            if (y >= y1) {
                return self.getField(x, y + 1);
            }
            return self.getField(x, y);
        });
        return obj;
    };
    /**
     * removeCol.
     * Elimina una columna del objeto.
     * 
     * @param {Number} x1 num. de columna
     * @returns {Matrix}
     */
    this.removeCol = function (x1) {
        var obj = Generate(self.width - 1, self.height, self.dimension);
        obj.map(function(row, x, y){
            if (x >= x1) {
                return self.getField(x + 1, y);
            }
            return self.getField(x, y);
        });
        return obj;
    };
    /**
     * removeRow.
     * Elimina la fila y columna
     * que intersecta el par (x, y).
     * 
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
            return self.getField(x + inx, y + iny);
        });
        return obj;
    };
    /**
     * adj.
     * Genera la matriz cofactor
     * transpuesta.
     * 
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
     * det.
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
     * promd.
     * Calcula el promedio de la matriz.
     * 
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
     * toString.
     * Parsear objeto como String.
     * 
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
 * random.
 * Genera una matriz pseudo-aleatoria
 * 
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
 * PI.
 * Genera una matriz rellena de constance PI
 * 
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
 * zeros.
 * Genera una matriz rellena de ceros.
 * 
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
 * ones.
 * Genera una matriz rellena de unos.
 * 
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
 * eyes.
 * Genera una matriz identidad.
 * 
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
 * Generate.
 * Generate Matrix Options.
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
},{"./utils":3}],3:[function(require,module,exports){
(function (global){
(function() {
    "use stric";
    /**
     * Modulo de utilidades asm.js
     */
    function Utils(stdlib, foreign, heap) {
        "use asm";
        /**
         * getIndex.
         * Obtiene el indice del un arreglo unidimencional de la matriz.
         * 
         * @param {Array} arguments lista de argumentos del indice.
         * @param {Number} x primer elemento del par.
         * @param {Number} y segundo elemento del par.
         * @param {Number} width ancho.
         * @param {Number} height alto.
         * @param {Number} dimension dimension.
         * @return {Number}
         */
        function getIndex(x, y, width, height, dimension) {
            x = x | 0;
            y = y | 0;
            width = width | 0;
            height = height | 0;
            dimension = dimension | 0;
            return stdlib.Math.round(stdlib.Math.fround(x + y * width)) * dimension | 0;
        }
        /**
         * forEach.
         * Recorre un vector como una matriz.
         * @param {Array} data Arreglo.
         * @param {Number} width ancho.
         * @param {Number} height alto.
         * @param {Number} dimension dimension.
         * @param {Function} callback funcion de llamada.
         * @param {Function} type Tipo de arreglo.
         * @returns {Void}
         */
        function forEach (data, width, height, dimension, callback, type) {
            var index = 0, x = 0, y = 0, n = data.length | 0;
            x = x | 0;
            y = y | 0;
            width = width | 0;
            height = height | 0;
            dimension = dimension | 0;
            for (index = 0; (index | 0) < n; index = (index + dimension) | 0) {
                var elements;
                if (dimension == 1) {
                    elements = +data[index];
                } else {
                    elements = type.from(data.slice(index, index + dimension));
                }
                if (x >= width) {
                    x = 0;
                    y++;
                }
                callback(elements, x | 0, y | 0, index | 0);
                x++;
            }
        }
        /**
         * replace.
         * Reemplaza un fragmento de dos areglos.
         * 
         * @param {Array} A primer arreglo donde se reemplaza.
         * @param {Array} B segundo arreglo que reemplaza.
         * @returns {Array}
         */
        function replace(A, B, index, type) {
            index = index | 0;
            var i = 0, n = B.length | 0,
                end = (index + B) | 0,
                n2 = A.length | 0;
            if (n >= n2 ||  end >= n2) {
                throw new Error("El reemplazo es incorrecto!. Repare los indices");
            }
            for (i = 0; (i | 0) < n; i = (i + 1) | 0) {
                    A[index + i | 0] = B[i];
            }
            return A;
        }
        /**
         * map.
         * Recorre un vector como una matriz.
         * @param {Array} data Arreglo.
         * @param {Number} width ancho.
         * @param {Number} height alto.
         * @param {Number} dimension dimension.
         * @param {Function} callback funcion de llamada.
         * @param {Function} type Tipo de arreglo.
         * @returns {Void}
         */
        function map(data, width, height, dimension, callback, type) {
            forEach(
                data,
                width,
                height,
                dimension,
                function (row, x, y, index) {
                    var value = callback(row, x | 0, y | 0, index | 0);
                    if (dimension == 1) {
                        data[index | 0] = value;
                    } else {
                        if (value == undefined || value == null || value.length == undefined) {
                            throw new Error("Debe ser un array el retorno.");
                        }
                        if (value.length != dimension) {
                            throw new Error("Es necesario un indice de " + dimension + " dimensiones");
                        }
                        data = replace(
                            data, value, index, type
                        );
                    }
                },
                type
            );
            return data;
        }
        /**
     * sum.
     * funcion de suma de dos vectores.
     * 
     * @param {Matrix} A objeto 1 de la matriz.
     * @param {Matrix} B objeto 2 de la matriz.
     * @returns {Matrix}
     */
        function sum(A, B, sum) {
            var obj = A.clone(), col2;
            if (sum == undefined || sum == null) {
                sum = true;
            }
            if (!(typeof B == "number" || (B.width == obj.width && B.height == obj.height && B.dimension == obj.dimension))) {
                throw new Error("Las matrices no son identicas en tamaño...");
            }
            if (typeof B == "number") {
                col2 = B;
            }
            obj.map(function (row, x, y) {
                if (typeof B === "object") {
                    col2 = B.getField(x, y);
                }
                if (obj.dimension == 1) {
                    if (!sum) {
                        return stdlib.Math.fround(row - col2);
                    }
                    return stdlib.Math.fround(row + col2);
                }
                return row.map(function (row2, index) {
                    if (typeof col2 == "number") {
                        if (!sum) {
                            return stdlib.Math.fround(row2 - col2);
                        }
                        return stdlib.Math.fround(row2 + col2);
                    }
                    if (!sum) {
                        return stdlib.Math.fround(row2 - col2[index]);
                    }
                    return stdlib.Math.fround(row2 + col2[index]);
                });
            });
            return obj;
        }
        /**
         * slice.
         * Retorna un array de los elementos seleccionados
         * 
         * @param {Array} data Origen.
         * @param {Number} index inicio de la seleccion
         * @param {Number} length numero de elementos
         * @returns {Array}
         */
        function slice(data, index, length) {
            index = index | 0;
            return data.slice(index, index + length);
        }
        /**
         * isMultiply.
         * Es multiplicable dos matrices.
         * 
         * @param {Matrix} A Objeto matriz 1.
         * @param {Matrix} B Objeto matriz 2.
         * @returns {Boolean}
         */
        function isMultiply(A, B) {
            return typeof B == "number" || (A.width == B.height && B.dimension == A.dimension);
        }
        /**
         * inmultiply.
         * 
         * @param {Matrix} obj Matrix donde se almacena la operacion.
         * @param {Matrix} A Matrix primera.
         * @param {Matrix | Number} B Matrix o numero multiplo.
         * @returns {Matrix}
         */
        function inmultiply(obj, A, B) {
            var col2, y2 = 0 | 0, rows;
            if (!isMultiply(A, B)) {
                throw new Error("Las matrices no son multiplicables...");
            }
            //Multiplicacion de una matrix por un escalar.
            if (typeof B === "number") {
                obj.map(function (row, x1, y1) {
                    x1 = x1 | 0;
                    y1 = y1 | 0;
                    var element = A.getField(x1, y1);
                    if (obj.dimension == 1) {
                        return stdlib.Math.fround(element * B);
                    }
                    var i = 0, n = element.length;
                    for (i = 0; (i | 0) < n; i = (i + 1) | 0) {
                        element[i] = stdlib.Math.fround(element[i] * B);
                    }
                    return element;
                });
                return obj;
            }
            //Multiplicacion de dos matrices MxN
            obj.map(function (row1, x1, y1) {
                var y = 0, z = 0, x = 0,
                    val = (obj.dimension == 1) ? 0 : new obj.typeInstance(obj.dimension),
                    min = getIndex(
                        0, y1, B.width, B.height, B.dimension
                    ) | 0,
                    max = getIndex(
                        B.width - 1, y1, B.width, B.height, B.dimension
                    ) | 0;
                for (x = 0; (x | 0) < A.width; x = (x + 1) | 0) {
                    var row = A.getField(x, y1), col = B.getField(x1, x);
                    if (obj.dimension == 1) {
                        val += stdlib.Math.fround(col * row);
                    } else {
                        for (k = 0; (k | 0) < obj.dimension; k = (k + 1) | 0) {
                            val[k] += stdlib.Math.fround(row[k] * col[k]);
                        }
                    }
                }
                return val;
            });
            if (obj.width == obj.height && obj.width == 1) {
                return obj.data[0];
            }
            return obj;
        }
        /**
         * clone.
         * 
         * @param {object} obj Objeto a clonar.
         * @param {Function} instance Clase del objeto.
         * @returns {Matrix}
         */
        function clone(obj, instance) {
            obj.config.data = obj.data.slice();
            var obj1 = new instance(obj.config);
            return obj1;
        }

        return {
            getIndex: getIndex,
            forEach: forEach,
            replace: replace,
            map: map,
            slice: slice,
            sum: sum,
            clone: clone,
            inmultiply: inmultiply
        };
    }
    module.exports = Utils(global);
})();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
