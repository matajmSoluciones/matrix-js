"use stric";
var Utils = require("./utils");

class Matrix {
    constructor(data, width, height, dimension, config) {
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
            config = (config || {});
            if (config && typeof config !== "object") {
                throw new Error("config debe ser un objeto.");
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
        this.dimension = 1;
        if (config.dimension) {
            this.dimension = config.dimension;
        }
        if (config.type) {
            config.type = config.type.toLowerCase();
            if (!(config.type in Matrix.typeArray())) {
                throw new Error("El tipo de objeto no es valido...");
            }
        }
        this.width = Number(config.width);
        this.height = Number(config.height);
        this.instance = Matrix.typeArray()[config.type || 'float32'];
        if (isNaN(this.width)) {
            throw new Error("El ancho no es un numero");
        }
        if (isNaN(this.height)) {
            throw new Error("El alto no es un numero");
        }
        if (isNaN(this.dimension)) {
            throw new Error("La dimension no es un numero");
        }
        if (config.data) {
            this.data = config.data;
        } else {
            this.data = new this.instance(this.length);
        }
    }

    /**
     * getter data
     * 
     * Obtiene la data de la matriz en formato array
     * 
     * @returns {Array}
     */
    get data() {
        return this.__data__;
    }

    /**
     * Asigna el valor de data de la matriz en formato array
     */
    set data(data) {
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

    get width() {
        return this.__width;
    }

    set width(size) {
        this.__width = size;
        this.__update_max_limit_with();
    }

    get height() {
        return this.__height;
    }

    set height(size) {
        this.__height = size;
        this.__update_max_limit_height();
    }

    /**
     * getIndex
     * 
     * Obtener el numero del indice del arreglo
     * 
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
    getIndex(x, y) {
        var result = (x + y * this.width) * this.dimension;
        return Math.round(result);
    }

    /**
     * get
     * 
     * Obtener el valor del indice matriz
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
    get(x, y) {
        var index = this.getIndex(x, y);
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }
        if (this.dimension == 1) {
            return this.data[index];
        }
        return this.data.slice(index, index + this.dimension);
    }

    /**
     * set
     * 
     * Assignar valor a un indice de la matriz
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} val 
     * @returns 
     */
    set(x, y, val) {
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
    }

    /**
     * forEach
     * 
     * Recorre cada elemento de la matriz
     * 
     * @param {Function} callback 
     */
    forEach(callback) {
        if (!(callback instanceof Function)) {
            throw new Error("callback debe ser una funcion.");
        }
        for (var index = 0, x = 0, y = 0; index < this.size; index++, x++) {
            if (x >= this.width) {
                x = 0;
                y++;
            }
            var data = this.get(x, y);
            callback(data, x, y, index);
        }
    }

    /**
     * map
     * 
     * Reemplaza el valor actual de la matriz.
     * 
     * @param {Function} callback 
     * @returns {*}
     */
    map(callback) {
        if (!(callback instanceof Function)) {
            throw new Error("callback debe ser una funcion.");
        }
        var newobj = this.clone();
        this.forEach(function (rows, x, y, index) {
            var value = callback(rows, x, y, index);
            newobj.set(x, y, value);
        });
        return newobj;
    }

    /**
     * isNumber
     * 
     * Valida que la matriz es numerica.
     * 
     * @returns {Boolean}
     */
    isNumber() {
        var data = this.data;
        for(var i = 0, n = data.length; i < n; i++) {
            if (isNaN(data[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * isNotNumber
     * 
     * Valida que la matriz no es numerica.
     * 
     * @returns {Boolean}
     */
    isNotNumber() {
        return !this.isNumber();
    }

    /**
     * 
     * Compara el nuevo objeto matriz con el actual.
     * 
     * @param {Matrix} vector
     * @returns {Boolean}
     */
    isEqual(vector) {
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
    }

    /**
     * isNotEqual
     * 
     * Compara si el nuevo objeto matriz es diferente.
     * 
     * @param {Matrix} vector 
     * @returns {Boolean}
     */
    isNotEqual(vector) {
        return !this.isEqual(vector);
    }

    /**
     * isNull
     * 
     * Compara si la matriz es nula.
     * 
     * @returns {Boolean}
     */
    isNull() {
        return this.data.every(function (row) {
            return !row;
        });
    }

    /**
     * isVoid
     * 
     * Compara si la matriz es vacia.
     * 
     * @returns {Boolean}
     */
    isVoid() {
        return this.data.every(function (row) {
            return typeof row === 'undefined' || row === null || (typeof row === 'string' && row.length == 0);
        });
    }

    /**
     * isNotNull
     * 
     * Compara si la matriz es no nula.
     * 
     * @returns {Boolean}
     */
    isNotNull() {
        return !this.isNull();
    }

    /**
     * isOverTriangle
     * 
     * Es una matrix triangular superior
     * 
     * @returns {Boolean}
     */
    isOverTriangle() {
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
    }

    /**
     * isUnderTriangle
     * 
     * Es una matrix triangular inferior.
     * 
     * @returns {Boolean}
     */
    isUnderTriangle() {
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
    }

    /**
     * isSimetry
     * 
     * Es una matrix simetrica.
     * 
     * @returns {Boolean}
     */
    isSimetry() {
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
    }

    /**
     * isAsimetry
     * 
     * Es una matrix asimetrica.
     * 
     * @returns {Boolean}
     */
    isAsimetry() {
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
    }

    /**
     * isNotSimetry
     * 
     * Valida si su inversa no es identica.
     * 
     * @returns {Boolean}
     */
    isNotSimetry() {
        return !this.isSimetry();
    }

    /**
     * sqrt
     * 
     * Aplica raiz cuadrada de la matriz actual.
     * 
     * @returns {Matrix}
     */
    sqrt() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.sqrt(row);
            }
            return row.map(function (row2) {
                return Math.sqrt(row2);
            });
        });
        return obj;
    }

    /**
     * cbrt
     * 
     * Aplica raiz cubica de la matriz actual.
     * 
     * @returns {Matrix}
     */
    cbrt() {
        var obj = self.clone();
        obj.map(function (row) {
            if (self.dimension == 1) {
                return Math.cbrt(row);
            }
            return row.map(function (row2) {
                return Math.cbrt(row2);
            });
        });
        return obj;
    }

    /**
     * log
     * 
     * Aplica Logaritmo natural de la matriz actual.
     * 
     * @returns {Matrix}
     */
    log() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.log(row);
            }
            return row.map(function (row2) {
                return Math.log(row2);
            });
        });
        return obj;
    }

    /**
     * exp
     * 
     * Aplica exponencial de la matriz actual.
     * 
     * @returns {Matrix}
     */
    exp() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.exp(row);
            }
            return row.map(function (row2) {
                return Math.exp(row2);
            });
        });
        return obj;
    }

    /**
     * abs
     * 
     * Aplica valor absoluto de la matriz actual.
     * 
     * @returns {Matrix}
     */
    abs() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.abs(row);
            }
            return row.map(function (row2) {
                return Math.abs(row2);
            });
        });
        return obj;
    }

    /**
     * atan
     * 
     * Aplica tangente de la matriz actual.
     * 
     * @returns {Matrix}
     */
    atan() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.atan(row);
            }
            return row.map(function (row2) {
                return Math.atan(row2);
            });
        });
        return obj;
    }

    /**
     * cos
     * 
     * Aplica coseno de la matriz actual.
     * 
     * @returns {Matrix}
     */
    cos() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.cos(row);
            }
            return row.map(function (row2) {
                return Math.cos(row2);
            });
        });
        return obj;
    }

    /**
     * sin
     * 
     * Aplica seno de la matriz actual.
     * 
     * @returns {Matrix}
     */
    sin() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.sin(row);
            }
            return row.map(function (row2) {
                return Math.sin(row2);
            });
        });
        return obj;
    }

    /**
     * round
     * 
     * Aplica redondeo de la matriz actual.
     * 
     * @returns {Matrix}
     */
    round() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.round(row);
            }
            return row.map(function (row2) {
                return Math.round(row2);
            });
        });
        return obj;
    }

    /**
     * ceil
     * 
     * Aplica redondea al valor maximo despues del decimal la matriz actual.
     * 
     * @returns {Matrix}
     */
    ceil() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.ceil(row);
            }
            return row.map(function (row2) {
                return Math.ceil(row2);
            });
        });
        return obj;
    }

    /**
     * floor
     * 
     * Aplica redondea al valor minimo del decimal en la matriz actual.
     * 
     * @returns {Matrix}
     */
    floor() {
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.floor(row);
            }
            return row.map(function (row2) {
                return Math.floor(row2);
            });
        });
        return obj;
    }

    /**
     * pow
     * 
     * Aplica potencia enesima de la matriz actual.
     * 
     * @param {Number} n
     * @returns {Matrix}
     */
    pow(n) {
        if (typeof n !== "number") {
            throw new Error("n debe ser un numero");
        }
        var obj, self = this;
        obj = this.map(function (row) {
            if (self.dimension == 1) {
                return Math.pow(row, n);
            }
            return row.map(function (row2) {
                return Math.pow(row2, n);
            });
        });
        return obj;
    }

    /**
     * toString
     * 
     * Formatear objeto como un string
     * 
     * @returns {String}
     */
    toString() {
        var str = "", self = this;
        this.forEach(function (row, x, y) {
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
    }

    /**
     * toObject
     * 
     * Genera un objeto de configuracion
     * 
     * @returns {Object}
     */
    toObject() {
        var type = "float32";
        for (var key in Matrix.typeArray()) {
            if (Matrix.typeArray()[key] instanceof this.instance) {
                type = key;
                break;
            }
        }
        return {
            width: this.width,
            height: this.height,
            dimension: this.dimension,
            type: type,
            data: this.data.slice()
        };
    }

    /**
     * clone
     * 
     * Genera una copia de la instancia actual.
     * 
     * @returns {Matrix}
     */
    clone() {
        var options = this.toObject();
        var newobj = Matrix.new(options);
        return newobj;
    }

    /**
     * max
     * 
     * Devuelve el valor máximo de la matriz.
     * 
     * @returns {Number}
     */
    max() {
        return Math.max.apply(null, this.data);
    }

    /**
     * min
     * 
     * Devuelve el valor mínimo de la matriz.
     * 
     * @returns {Number}
     */
    min() {
        return Math.min.apply(null, this.data);
    }

    /**
     * transposed
     * 
     * Inversa de la matriz.
     * 
     * @returns {Matrix}
     */
    transposed() {
        var self = this,
        obj = this.map(function (row, x, y) {
            return self.get(y, x);
        });
        return obj;
    }

    /**
     * sum
     * 
     * Suma la matriz actual al conjunto de matrices.
     * 
     * @returns {Matrix}
     */
    sum() {
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
            if (!(typeof matrix == "number" || (matrix.width == obj.width && matrix.height == obj.height && matrix.dimension == obj.dimension))) {
                throw new Error("Las matrices no son identicas en tamaño...");
            }
            obj = Utils.sum(obj, matrix, false);
        }
        return obj;
    }

    /**
     * subtract
     * 
     * Suma la matriz actual al conjunto de matrices.
     * 
     * @returns {Matrix}
     */
    subtract() {
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
    }

    /**
     * getRow
     * 
     * @param {Number} y
     * 
     * @returns {Matrix}
     */
    getRow(y) {
        if (typeof y !== "number" || typeof y === "undefined" || y >= this.height) {
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
    }

    /**
     * getCol
     * 
     * @param {Number} x
     * 
     * @returns {Matrix}
     */
    getCol(x) {
        if (typeof x !== "number" || typeof x === "undefined" || x >= this.width) {
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
    }

    /**
     * slice
     * 
     * @param {*} x1 
     * @param {*} y1 
     * @param {*} width 
     * @param {*} height 
     * @param {*} silen 
     */
    slice(x1, y1, width, height, silen) {
       silen = silen || false;
        if (typeof x1 !== "number" || typeof y1 !== "number" || typeof width !== "number" || typeof height !== "number") {
            throw new Error("Argumentos invalidos");
        }
        /*if (typeof y1 !== "number" || !y1 || y1 >= this.height) {
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
        }*/
        var xend = x1 + (width - 1), yend = y1 + (height - 1);
        var data = new this.instance(width * height * this.dimension);
        var obj = new Matrix({
            width: width,
            height: height,
            dimension: this.dimension,
            data: data
        });
        for (var y2 = 0, y = y1; y <= yend; y++, y2++) {
            for (var x = x1, x2 = 0; x <= xend; x++, x2++) {
                var row = this.get(x, y);
                if (!row) {
                    continue;
                }
                obj.set(x2, y2, row);
            }
        }
        return obj; 
    }

    /**
     * inmultiply
     * 
     * Publica funcion multiplicar.
     * 
     * @returns {Matrix}
     */
    inmultiply() {
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
            obj = Matrix.new(
                Utils.inmultiply(obj, matrix)
            );
        }
        if (obj.width == obj.height && obj.width == 1) {
            return obj.data[0];
        }
        return obj;
    }

    /**
     * inverse
     * 
     * Genera la matriz inversa.
     * 
     * @returns {Matrix}
     */
    inverse() {
        var D = this.det();
        var obj = this.adj().transposed();
        return obj.inmultiply(1 / D);
    }

    /**
     * divide
     * 
     * Genera la matriz inversa.
     * 
     * @returns {Matrix}
     */
    divide() {
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
    }

    /**
     * not
     * 
     * Genera una matriz negativa de la actual.
     * 
     * @returns {Matrix}
     */
    not() {
        return this.inmultiply(-1);
    }

    /**
     * isSingular
     * 
     * Es una matriz cuadrada.
     * 
     * @returns {Matrix}
     */
    isSingular() {
        return this.width == this.height;
    }

    /**
     * moveRow
     * 
     * @param {Number} row 
     * @param {Number} newRow 
     * 
     * @returns {Matrix}
     */
    moveRow(row, newRow) {
        var content1 = this.getRow(row), content2 = this.getRow(newRow);
        for(var x = 0; x < this.width; x++) {
            this.set(x, row, content2.get(x, 0));
            this.set(x, newRow, content1.get(x, 0));
        }
        return this;
    }

    /**
     * moveCol
     * 
     * @param {Number} col
     * @param {Number} newCol
     * 
     * @returns {Matrix}
     */
    moveCol(col, newCol) {
        var content1 = this.getCol(col), content2 = this.getCol(newCol);
        for(var y = 0; y < this.height; y++) {
            this.set(col, y, content2.get(0, y));
            this.set(newCol, y, content1.get(0, y));
        }
        return this;
    }

    /**
     * removeRow
     * 
     * Es una matriz cuadrada.
     * 
     * @returns {Matrix}
     */
    removeRow(y1) {
        var obj = Generate(this.width, this.height - 1, this.dimension);
        obj.map(function (row, x, y) {
            if (y >= y1) {
                return this.get(x, y + 1);
            }
            return this.get(x, y);
        });
        return obj;
    }

    /**
     * removeCol
     * 
     * @param {Number} x1 
     * @returns {Matrix}
     */
    removeCol(x1) {
        var obj = Generate(this.width - 1, this.height, this.dimension);
        obj.map(function (row, x, y) {
            if (x >= x1) {
                return this.get(x + 1, y);
            }
            return this.get(x, y);
        });
        return obj;
    }

    /**
     * remove
     * 
     * Elimina la fila y columna que intersecta el par (x, y).
     * 
     * @returns {Matrix}
     */
    remove(x1, y1) {
        var obj = Matrix.new({
            width: this.width - 1,
            height: this.height - 1,
            dimension: this.dimension
        }), self = this;
        for(var x = 0; x < obj.width; x++) {
            for(var y = 0; y < obj.height; y++) {
                var inx = 0, iny = 0;
                if (y >= y1) {
                    iny = 1;
                }
                if (x >= x1) {
                    inx = 1;
                }
                var row = self.get(x + inx, y + iny);
                obj.set(x, y, row);
            }
        }
        return obj;
    }

    /**
     * adj
     * 
     * Genera la matriz cofactor.
     * 
     * @returns {Matrix}
     */
    adj() {
        if (!this.isSingular()) {
            throw new Error("Debe ser una matriz cuadrada");
        }
        var matrix = Matrix.new({
            width: this.width,
            height: this.height,
            dimension: 1
        }),
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
    }

    /**
     * det
     * 
     * calcula el valor determinante de la matriz.
     * 
     * @returns {Matrix}
     */
    det() {
        if (this.__determinant__) {
            return this.__determinant__;
        }
        if (this.width == 1) {
            this.__determinant__ = this.data[0];
            return this.__determinant__;
        }
        if (this.width == this.height && this.width == 2) {
            this.__determinant__ = Utils.determinant2(this);
            return this.__determinant__;
        }
        var det = 0;
        var obj = this.adj();
        for (var index = 0; index < this.width; index++) {
            det += this.data[index] * obj.data[index];
        }
        this.__determinant__ = det;
        return det;
    }

    /**
     * promd
     * 
     * Calcula el promedio de la matriz.
     * 
     * @returns {Matrix}
     */
    promd() {
        var promd = 0;
        for (var i = 0, n = this.data.length; i < n; i++) {
            promd += this.data[i];
        }
        return promd;
    }

    /**
     * convolution
     * 
     * transforma dos matrices en una tercera superponiendo
     * 
     * @returns {Matrix}
     */
    convolution(filter) {
        var obj, self = this,
            x_prim = -Math.floor(filter.width / 2),
            y_prim = -Math.floor(filter.height / 2);
        obj = this.map(function (row, x, y) {
            var new_x = x + x_prim, new_y = y + y_prim,
                xend = new_x + (filter.width - 1),
                yend = new_y + (filter.height - 1),
                promd = 0;
            if (self.dimension > 1) {
                promd = new self.instance(screen.dimension);
            }
            for (var y2 = 0, y1 = new_y; y1 <= yend; y1++, y2++) {
                for (var x2 = 0, x1 = new_x; x1 <= xend; x1++, x2++) {
                    var f = self.get(x1, y1), g = filter.get(x2, y2);
                    if (!f) {
                        continue;
                    }
                    if (self.dimension == 1) {
                        promd += f * g;
                    } else {
                        for (var j = 0, m = promd.length; j < m; j++) {
                            promd += f[j] * g[j];
                        }
                    }
                }
            }
            return promd;
        });
        return obj;
    }

    __update_max_limit_with() {
        this.__MAX_LIMIT_WIDTH = this.width * this.dimension;
        this.__update_length();
    }

    __update_max_limit_height() {
        this.__MAX_LIMIT_HEIGHT = this.height * this.dimension;
        this.__update_length();
    }

    __update_length() {
        this.size = this.width * this.height;
        this.length = this.__MAX_LIMIT_WIDTH * this.height;
    }

    /**
     * random
     * 
     * Genera una matriz de numeros aleatorios
     *
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} dimension 
     * @returns {Float32Array}
     */
    static random(width, height, dimension) {
        dimension = dimension || 1;
        height = height || width;
        var data = new Float32Array(width * height * dimension);
        for (var i = 0, n = data.length; i < n; i++) {
            data[i] = Math.random();
        }
        return Matrix.new({
            width: width,
            height: height,
            dimension: dimension,
            type: "float32",
            data: data
        });
    }

    /**
     * PI
     * 
     * Genera una matriz con el valor de PI
     * 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} dimension 
     * @returns {Float32Array}
     */
    static PI(width, height, dimension) {
        dimension = dimension || 1;
        height = height || width;
        var data = new Float32Array(width * height * dimension);
        for (var i = 0, n = data.length; i < n; i++) {
            data[i] = Math.PI;
        }
        return Matrix.new({
            width: width,
            height: height,
            dimension: dimension,
            type: "float32",
            data: data
        });
    }

    /**
     * zeros
     * 
     * Genera una matriz con valor cero
     * 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} dimension 
     * @returns {Int8Array}
     */
    static zeros(width, height, dimension) {
        height = height || width;
        return Matrix.new({
            width: width,
            height: height,
            dimension: dimension,
            type: "int8",
        });
    }

    /**
     * ones
     * 
     * Genera una matriz con el valor uno
     * 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} dimension
     * @returns {Int8Array}
     */
    static ones(width, height, dimension) {
        dimension = dimension || 1;
        height = height || width;
        var data = new Int8Array(width * height * dimension);
        for(var i = 0, n = data.length; i < n; i++) {
            data[i] = 1;
        }
        return Matrix.new({
            width: width,
            height: height,
            dimension: dimension,
            type: "int8",
            data: data
        });
    }

    /**
     * eyes
     * 
     * Genera una matriz de identidad
     * 
     * @param {Number} n 
     * @param {Number} dimension 
     * @returns {Int8Array}
     */
    static eyes(n, dimension) {
        var opt = {
            type: "int8",
            data: data
        }, data, obj;
        if (!arguments.length || arguments.length > 2) {
            throw new Error("El numero de argumentos es invalido...");
        }
        if (arguments.length == 1) {
            opt.width = opt.height = n;
            opt.dimension = 1;
        }
        if (arguments.length == 2) {
            opt.width = opt.height = n;
            opt.dimension = dimension || 1;
        }
        data = new Int8Array(opt.width * opt.height * opt.dimension);
        obj = Matrix.new(opt);
        obj.forEach(function (row, x, y) {
            var replace;
            if (obj.dimension == 1) {
                replace = (x == y) ? 1 : 0;
            } else {
                replace = row.map(function (row2) {
                    return (x == y) ? 1 : 0;
                });
            }
            obj.set(x, y, replace);
        });
        return obj;
    }

    static new(options) {
        var obj = new Matrix(options);
        return obj;
    }

    static isValidArray(data) {
        var bool = false;
        if (Array.isArray(data)) {
            return true;
        }
        for (var key in Matrix.typeArray()) {
            bool = bool || data instanceof Matrix.typeArray()[key];
        }
        return bool;
    }

    static typeArray() {
        return  {
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
        };
    };
}

module.exports = Matrix;

//Desenfoque Blur
module.exports.BLUR = Matrix.new({
    width: 5,
    height: 5,
    dimension: 1,
    data: [
        0.0030, 0.0133, 0.0219, 0.0133, 0.0030,
        0.0133, 0.0596, 0.0983, 0.0596, 0.0133,
        0.0219, 0.0983, 0.1621, 0.0983, 0.0219,
        0.0133, 0.0596, 0.0983, 0.0596, 0.0133,
        0.0030, 0.0133, 0.0219, 0.0133, 0.0030
    ]
});

//Gausiano
module.exports.GAUSSIAN = Matrix.new({
    width: 5,
    height: 5,
    dimension: 1,
    data: [
        0.003663003663003663, 0.014652014652014652, 0.02564102564102564, 0.014652014652014652, 0.003663003663003663,
        0.014652014652014652, 0.05860805860805861, 0.09523809523809523, 0.05860805860805861, 0.014652014652014652,
        0.02564102564102564, 0.09523809523809523, 0.15018315018315018, 0.09523809523809523, 0.02564102564102564,
        0.014652014652014652, 0.05860805860805861, 0.09523809523809523, 0.05860805860805861, 0.014652014652014652,
        0.003663003663003663, 0.014652014652014652, 0.02564102564102564, 0.014652014652014652, 0.003663003663003663
    ]
});

//Media
module.exports.MEDIA = Matrix.new({
    width: 3,
    height: 3,
    data: [
        0.1111111111111111, 0.1111111111111111, 0.1111111111111111,
        0.1111111111111111, 0.1111111111111111, 0.1111111111111111,
        0.1111111111111111, 0.1111111111111111, 0.1111111111111111
    ]
});
//Prewitt línea Vertical
module.exports.PREWITTV = Matrix.new({
    width: 3,
    height: 3,
    data: [
        -1, -1, -1,
        0, 0, 0,
        1, 1, 1
    ]
});

// Prewitt Línea horizontal
module.exports.PREWITTH = Matrix.new({
    width: 3,
    height: 3,
    data: [
        -1, 0, -1,
        -1, 0, 1,
        -1, 0, 1
    ]
});

//Sobel Vertical
module.exports.SOBELV = Matrix.new({
    width: 3,
    height: 3,
    data: [
        -1, -2, -1,
        0, 0, 0,
        1, 2, 1
    ]
});

//Sobel Horizontal
module.exports.SOBELH = Matrix.new({
    width: 3,
    height: 3,
    data: [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    ]
});

module.exports.LAPLACIANO = Matrix.new({
    width: 3,
    height: 3,
    data: [
        0, -1, 0,
        -1, 4, -1,
        0, -1, 0
    ]
});

module.exports.LAGAUSSIANO = Matrix.new({
    width: 5,
    height: 5,
    data: [
        0, 0, -1, 0, 0,
        0, -1, -2, -1, 0,
        -1, -2, 16, -2, -1,
        0, -1, -2, -1, 0,
        0, 0, -1, 0, 0
    ]
}),

module.exports.SHARPEN = Matrix.new({
    width: 5,
    height: 5,
    data: [
        0, 0, 0, 0, 0,
        0, 0, -1, 0, 0,
        0, -1, 5, -1, 0,
        0, 0, -1, 0, 0,
        0, 0, 0, 0, 0
    ]
}),

module.exports.EMBOSS = Matrix.new({
    width: 3,
    height: 3,
    data: [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
});
