/*module.exports.getIndex = function (stdlib, foreign, heap) {
    "use asm";
    var floor = stdlib.Math.floor;
    
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
};*/

module.exports = function (stdlib, foreign, heap) {
    "use asm";
    var floor = stdlib.Math.floor,
        data = new stdlib.Float64Array(heap);

    function inmultiply_const(K, length) {
        K = +K;
        length = length|0;
        var p = 0, q = 0;
        for (p = 0 << 3, q = length << 3; (p | 0) < (q | 0); p = (p + 8) | 0) {
            data[p >> 3] = data[p >> 3] * K;
        }
        return 0;
    }
    return {
        inmultiply_const: inmultiply_const
    };
};
