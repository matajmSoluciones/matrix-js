"use stric";
/**
 * Funciones de utilidad
 */
var Utils = {
    /**
     * isMultiply.
     * Es multiplicable dos matrices.
     * 
     * @param {Matrix} A Objeto matriz 1.
     * @param {Matrix} B Objeto matriz 2.
     * @returns {Boolean}
     */
    isMultiply: function (A, B) {
        return typeof B == "number" || (A.width == B.height && B.dimension == A.dimension);
    },
    inmultiply: function (A, B) {
        if (typeof B === "number") {
            var opt = {
                width: A.width,
                height: A.height,
                dimension: A.dimension,
                data: new A.instance(A.length)
            };
            for(var i = 0, n = A.length; i<n; i++) {
                opt.data[i] = A.data[i] * B;
            }
            return opt;
        }
        return Utils.__inmultiplyMatrix(A, B);
    },
    __inmultiplyMatrix : function (A, B) {
        var opt = {
            width: B.width,
            height: A.height,
            dimension: A.dimension,
            data: new A.instance(B.width * A.height * A.dimension)
        };
        for (var index = 0, x = 0, y = 0, n = opt.data.length; index < n; index+= opt.dimension , x++) {
            if (x >= opt.width) {
                x = 0;
                y++;
            }
            for(var i = 0; i < A.width; i++) {
                var row = A.get(i, y), col = B.get(x, i);
                if (opt.dimension == 1) {
                    opt.data[index] += col * row;
                    continue;
                }
                for (var k = 0; k < opt.dimension; k++) {
                    opt.data[index + k] += row[k] * col[k];
                }
            }
        }
        return opt;
    },
    sum: function (A, B, negative) {
        if (typeof B === "number") {            
            return Utils.__sumConstant(A, B, negative);
        }
        return Utils.__sumMatrix(A, B, negative);
    },
    __sumConstant: function (A, K, negative) {
        if (negative) {
            K = -K;
        }
        var obj = A.map(function (src, x, y, index) {
            if (typeof src === "number") {
                return src + K;
            }
            for (var i = 0, n = src.length; i < n; i++) {
                src[i] += K;
            }
            return src;
        });
        return obj;
    },
    __sumMatrix: function (A, B, negative) {
        var obj = A.map(function (src, x, y, index) {
            var col2 = B.get(x, y);
            if (typeof src === "number" && typeof col2 == "number") {
                if (negative) {
                    col2 = -col2;
                }
                return src + col2;
            }
            for (var i = 0, n = col2.length; i < n; i++) {
                if (negative) {
                    col2[i] = -col2[i];
                }
                src[i] += col2[i];
            }
            return src;
        });
        return obj;
    },
};

module.exports = Utils;