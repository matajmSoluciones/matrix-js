module.exports.getIndex = function (stdlib, foreign, heap) {
    "use asm";
    var floor = stdlib.Math.floor;
    /**
     * getIndex.
     * Obtiene el indice del un arreglo unidimencional de la matriz.
     * 
     * @param {Array} arguments lista de argumentos del indice.
     * @param {Number} x primer elemento del par.
     * @param {Number} y segundo elemento del par.
     * @return {Number}
     */
    function getIndex(x, y, width, dimension) {
        x = +x;
        y = +y;
        width = +width;
        dimension = +dimension;
        var result = 0.0;
        result = (x + y * width) * dimension;
        return ~~floor(result);
    }
    return getIndex;
};