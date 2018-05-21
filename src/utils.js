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
        var index = 0, x = 0, y = 0;
        x = x | 0;
        y = y | 0;
        width = width | 0;
        height = height | 0;
        dimension = dimension | 0;
        for (index = 0; (index | 0) < data.length; index = (index + dimension) | 0) {
            var elements;
            if (dimension == 1) {
                elements = +data[index];
            } else {
                elements = type.from(data.slice(index, index + dimension));
            }
            callback(elements, x | 0, y | 0, index | 0);
            if (x >= width) {
                x = 0;
                y++;
            }
            x++;
        }
    }

    return {
        getIndex: getIndex,
        forEach: forEach
    };
}
