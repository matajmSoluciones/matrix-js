var benchmarkjs = require('benchmarkjs'),
    Matrix = require("../src/matrix");
var matrix2d = Matrix.random(100, 100);
var matrix3d = Matrix.random(100, 100, 3);
var matrixnd = Matrix.random(100, 100, 100);
benchmarkjs.options({
    testTime: 1000
});
benchmarkjs('constructor', function () {
    new Matrix(
        [1, 2, 3, 4, 5, 6],
        3,
        2,
        1,
        {
            type: "float32"
        }
    );
    new Matrix(
        [1, 2, 3, 4, 5, 6],
        {
            type: "float32",
            width: 3,
            height: 2,
            dimension: 1
        }
    );
    new Matrix(
        {
            type: "float32",
            width: 3,
            height: 2,
            data: [1, 2, 3, 4, 5, 6]
        }
    );
    new Matrix(
        {
            type: "float32",
            width: 2,
            height: 1,
            dimension: 3,
            data: [1, 2, 3, 4, 5, 6]
        }
    );
    new Matrix(
        {
            type: "float32",
            width: 3,
            height: 2,
        }
    );
    new Matrix(
        [1, 2, 3, 4, 5, 6],
        3,
        2
    );
});
benchmarkjs('get 2D', function () {
    matrix2d.get(1, 1);
});
benchmarkjs('set 2D', function () {
    matrix2d.set(1, 1, 50);
});
benchmarkjs('get 3D', function () {
    matrix3d.get(1, 1);
});
benchmarkjs('set 3D', function () {
    matrix3d.set(1, 1, [50, 10, 3]);
});
benchmarkjs('get ND', function () {
    matrixnd.get(1, 1);
});
benchmarkjs('isNumber 2D', function () {
    matrix2d.isNumber();
});
benchmarkjs('isNumber 3D', function () {
    matrix3d.isNumber();
});
benchmarkjs('isNotNumber 2D', function () {
    matrix2d.isNotNumber();
});
benchmarkjs('isNotNumber 3D', function () {
    matrix3d.isNotNumber();
});
benchmarkjs('isEqual 2D', function () {
    matrix2d.isEqual(matrix2d);
});
benchmarkjs('isEqual 3D', function () {
    matrix3d.isEqual(matrix3d);
});
benchmarkjs('clone 2D', function () {
    matrix2d.clone();
});
benchmarkjs('clone 3D', function () {
    matrix3d.clone();
});
benchmarkjs('2D', function () {
    matrix2d.forEach(function (rows, x, y, index) {});
});
benchmarkjs('forEach 3D', function () {
    matrix3d.forEach(function (rows, x, y, index) {});
});
benchmarkjs('map 2D', function () {
    matrix2d.map(function (rows, x, y, index) {
        return 1;
    });
});
benchmarkjs('map 3D', function () {
    matrix3d.map(function (rows, x, y, index) {
        return [1, 1, 1];
    });
});
benchmarkjs.results.forEach(function (result) {
    console.log(
        "[%s]:\nTiempo total: %d ms\nEjecuciones por segundo: %d",
        result.name,
        result.elapsed,
        result.perSecondIterations
    );
});
//console.log(benchmarkjs.results);