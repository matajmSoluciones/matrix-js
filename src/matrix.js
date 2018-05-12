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
            (data instanceof Int8Array
            || data instanceof Int16Array
            || data instanceof Int32Array
            || data instanceof Float32Array
            || data instanceof Float64Array
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
        console.assert(
            typeof x == "number" && x >= 0 && x < self.width,
            "el par x no es numero valido..."
        );
        console.assert(
            typeof y == "number" && y >= 0 && y < self.height,
            "el par y no es numero valido..."
        );
        return Math.round(x + y * self.width) * self.dimension;
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
     * 
     * @param {Function} callback Función de reemplazo.
     * @returns {void}
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
            callback(element, x, y, index);
            x++;
        }
    };
    /**
     * map.
     * Reemplaza el valor actual de la matriz.
     * 
     * @param {Function} callback Función de reemplazo.
     * @returns {void}
     */
    this.map = function (callback) {
        self.forEach(function (row, x, y, index) {
            var value = callback(row, x, y, index);
            if (self.dimension == 1) {
                self.data[index] = value;
            } else {
                console.assert(value.length != undefined, "Debe ser un array el retorno.");
                if (value.length != self.dimension) {
                    throw new Error("Es necesario un indice de " + self.dimension + " dimensiones");
                }
                for (var i = 0; i < self.dimension; i++) {
                    self.data[index + i] = value[i];
                }
            }
        });
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
        var obj = new Matrix(self.data.slice(), self.config);
        return obj;
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
     * Transposed.
     * Inversa de la matriz.
     * 
     * @returns {Matrix}
     */
    this.Transposed = function () {
        var obj = Generate(self.height, self.width, self.dimension);
        obj.map(function (row, x, y) {
            return self.getRow(y, x);
        });
        return obj;
    };
    /**
     * isSimetry.
     * Valida si su inversa es identica.
     * 
     * @returns {boolean}
     */
    this.isSimetry = function() {
        var obj = self.Transposed();
        return self.isEqual(obj);
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
     * sum.
     * Privada funcion de suma.
     * 
     * @param {Matrix} A objeto 1 de la matriz.
     * @param {Matrix} B objeto 2 de la matriz.
     * @returns {Matrix}
     */
    function sum(A, B) {
        var obj = A.clone();
        console.assert(
            typeof B == "number" || (B.width == obj.width && B.height == obj.height && B.dimension == obj.dimension),
            "Las matrices no son identicas en tamaño..."
        );
        var col2;
        if (typeof B == "number") {
            col2 = B;
        }
        obj.map(function (row, x, y) {
            if (B instanceof Matrix) {
                col2 = B.getRow(x, y);
            }
            if (obj.dimension == 1) {
                return row + col2;
            }
            return row.map(function (row2, index) {
                if (typeof col2 == "number") {
                    return row2 + col2;
                }
                return row2 + col2[index];
            });
        });
        return obj;
    }
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
            obj = sum(obj, matrix);
        }
        return obj;
    };
    /**
     * inmultiply.
     * Privada función multiplicar.
     * 
     * @param {Matrix} A Objeto matriz 1.
     * @param {Matrix} B Objeto matriz 2.
     * @returns {Matrix}
     */
    function inmultiply (A, B) {
        var obj = Generate(A.width, B.height, A.dimension);
        console.assert(
            typeof B == "number" || (A.width == B.height && B.dimension == obj.dimension),
            "Las matrices no son multiplicables..."
        );
        var col2, index = 0;
        if (typeof B == "number") {
            col2 = B;
        }
        A.forEach(function (row, x, y) {
            if (B instanceof Matrix) {
                col2 = B.getRow(y, x);
            }
            if (obj.dimension == 1) {
                obj.data[index] += row * col2;
            } else {
                for(var i = 0, n = row.length; i < n; i++) {
                    if (typeof col2 == "number") {
                        obj.data[index + i] += row[i] + col2;
                    } else {
                        obj.data[index + i] += row[i] + col2[i];
                    }
                }
            }
            index+= A.dimension;
        });
        return obj;
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
            obj = inmultiply(obj, matrix);
        }
        return obj;
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