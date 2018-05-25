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