
function Utils(stdlib, foreign, heap) {
    "use asm";
    var floor = stdlib.Math.floor;
    var fround = stdlib.Math.fround;
    
    /**
 * sum.
 * funcion de suma de dos vectores.
 * 
 * @param {Matrix} A objeto 1 de la matriz.
 * @param {Matrix} B objeto 2 de la matriz.
 * @returns {Matrix}
 */
    function sum(obj, B, sum) {
        var col2;
        if (typeof B == "number") {
            col2 = B;
        }
        obj.map(function (row, x, y) {
            if (typeof B === "object") {
                col2 = B.get(x, y);
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
     * inmultiply.
     * 
     * @param {Matrix} obj Matrix donde se almacena la operacion.
     * @param {Matrix} A Matrix primera.
     * @param {Matrix | Number} B Matrix o numero multiplo.
     * @returns {Matrix}
     */
    function inmultiply(obj, A, B) {
        var col2, y2 = 0 | 0, rows;        
        //Multiplicacion de una matrix por un escalar.
        if (typeof B === "number") {
            obj.map(function (row, x1, y1) {
                x1 = x1 | 0;
                y1 = y1 | 0;
                var element = A.get(x1, y1);
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
                val = (obj.dimension == 1) ? 0 : new obj.instance(obj.dimension),
                min = getIndex(
                    0, y1, B.width, B.height, B.dimension
                ) | 0,
                max = getIndex(
                    B.width - 1, y1, B.width, B.height, B.dimension
                ) | 0;
            for (x = 0; (x | 0) < A.width; x = (x + 1) | 0) {
                var row = A.get(x, y1), col = B.get(x1, x), k = 0;
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

    function convolution(A, B, ESCALAR, BIAS) {
        ESCALAR = stdlib.Math.fround(ESCALAR);
        BIAS = stdlib.Math.fround(BIAS);
        if (!ESCALAR) {
            ESCALAR = 1;
        }
        if (!BIAS) {
            BIAS = 1;
        }
        obj = A.clone();
        obj.map(function (row, x, y, index) {

        });
    }

    return {
        getIndex: getIndex,
        forEach: forEach,
        replace: replace,
        map: map,
        slice: slice,
        sum: sum,
        inmultiply: inmultiply
    };
}
module.exports = Utils(global);