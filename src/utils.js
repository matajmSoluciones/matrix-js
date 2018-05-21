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
         * @return {Number}
         */
        function getIndex(x, y, width, height, dimension) {
            x = x | 0;
            y = y | 0;
            width = width | 0;
            height = height | 0;
            dimension = dimension | 0;
            return ~~stdlib.Math.round(Math.fround(x + y * width)) * dimension | 0;
        }
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
         */
        function replace(A, B, index, type) {
            index = index | 0;
            var i = 0, n = B.length | 0,
                end = (index + B) | 0,
                n2 = A.length | 0,
                C = type.from(A);
            if (n >= n2 ||  end >= n2) {
                throw new Error("El reemplazo es incorrecto!. Repare los indices");
            }
            for (i = 0; (i | 0) < n; i = (i + 1) | 0) {
                    C[index + i | 0] = B[i];
            }
            return C;
        }
    
        return {
            getIndex: getIndex,
            forEach: forEach,
            replace: replace
        };
    }
    module.exports = Utils(global);
})();