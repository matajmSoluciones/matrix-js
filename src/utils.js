"use stric";
var asm = require("./asm");

/**
 * Load de utilidades asm
 */
var Utils = {
    getIndex: function (obj, x, y) {
        var module = asm.getIndex(global, null, null);
        return module(x, y, obj.width, obj.dimension);
    },
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
    inmultiply: function (C, A, B) {
        if (typeof B === "number") {
            return Utils.__inmultiplyConstant(C, A, B);
        }
        return Utils.__inmultiplyMatrix(C, A, B);
    },
    __inmultiplyConstant: function (C, A, K) {
        C.map(function (rows, x, y, index) {
            var src = A.get(x, y);
            if (typeof src === "number") {
                return src * K;
            }
            for (var i = 0, n = src.length; i<n; i++) {
                src[i] *= K;
            }
            return src;
        });
        return C;
    },
    __inmultiplyMatrix : function (C, A, B) {
        C.map(function (row1, x1, y1) {
            var y = 0, z = 0, x = 0,
                val = 0,
                min = B.getIndex(0, y1),
                max = B.getIndex(B.width - 1, y1);
            if (C.dimension > 1) {
                val = new C.instance(C.dimension);
            }
            for(var x = 0; x < A.width; x++) {
                var row = A.get(x, y1), col = B.get(x1, x);
                if (C.dimension == 1) {
                    val += col * row;
                    continue;
                }
                for(var k = 0; k < C.dimension; k++) {
                    val [k] += row[k] * col[k];
                }
            }
            return val;
        });
        return C;
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
        A.map(function (src, x, y, index) {
            if (typeof src === "number") {
                return src + K;
            }
            for (var i = 0, n = src.length; i < n; i++) {
                src[i] += K;
            }
            return src;
        });
        return A;
    },
    __sumMatrix: function (A, B, negative) {
        A.map(function (src, x, y, index) {
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
        return A;
    },
};

module.exports = Utils;