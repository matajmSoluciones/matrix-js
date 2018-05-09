/**
 * Pruebas unitarias Matrix.js
 */
var Matrix = require("../src/matrix");
var assert = require('assert');

describe("class Matrix", function() {
    it("test Constructor 2D: Argumentos completos", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            expect,
            3,
            2,
            1,
            {
                type: "array"
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1,1), 5);
        assert.ok(matrix.data instanceof Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: Argumentos data y options", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            expect,
            {
                type: "array",
                width: 3,
                height: 2,
                dimension: 1
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1,1), 5);
        assert.ok(matrix.data instanceof Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: Argumentos options", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "array",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1,1), 5);
        assert.ok(matrix.data instanceof Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: void data", function() {
        var expect = new Array(6);
        var matrix = new Matrix(
            {
                type: "array",
                width: 3,
                height: 2,
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.ok(matrix.data instanceof Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: options not found width", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        assert.throws((function () {
            var matrix = new Matrix(
                {
                    type: "array",
                    height: 2,
                    data: expect
                }
            );
            console.log(matrix);
        }), assert.AssertionError, "Paso de largo");
    });
    it("test Constructor 2D: options width type var invalid", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        assert.throws((function () {
            var matrix = new Matrix(
                {
                    type: "array",
                    width: "3",
                    height: 2,
                    data: expect
                }
            );
            console.log(matrix);
        }), assert.AssertionError, "Paso de largo");
    });
    it("test Constructor 2D: options height type var invalid", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        assert.throws((function () {
            var matrix = new Matrix(
                {
                    type: "array",
                    width: 3,
                    height: "2",
                    data: expect
                }
            );
            console.log(matrix);
        }), assert.AssertionError, "Paso de largo");
    });
    it("test Constructor 2D: options dimension type var invalid", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        assert.throws((function () {
            var matrix = new Matrix(
                {
                    type: "array",
                    width: 3,
                    height: 2,
                    dimension: "1",
                    data: expect
                }
            );
            console.log(matrix);
        }), assert.AssertionError, "Paso de largo");
    });
    it("test Constructor 2D: type Int8", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "int8",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1, 1), 5);
        assert.ok(matrix.data instanceof Int8Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: type Int16", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "int16",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1, 1), 5);
        assert.ok(matrix.data instanceof Int16Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: type Int32", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "int32",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1, 1), 5);
        assert.ok(matrix.data instanceof Int32Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: type Float32", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float32",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1, 1), 5);
        assert.ok(matrix.data instanceof Float32Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: type Float64", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.equal(matrix.getRow(1, 1), 5);
        assert.ok(matrix.data instanceof Float64Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: void typing data", function () {
        var expect = new Int8Array(6);
        var matrix = new Matrix(
            {
                type: "int8",
                width: 3,
                height: 2,
            }
        );
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 1);
        assert.ok(matrix.data instanceof Int8Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 2D: Equals two matrix", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.ok(matrix.isEqual(matrix), "No es el mismo objeto!");
        assert.ok(!matrix.isNotEqual(matrix), "Dicese que es igual!");
    });
    it("test Constructor 2D: Replace value", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.map(function (row, x, y) {
            return row * 2;
        });
        var index = 0, _x = 0, _y = 0;
        matrix.forEach(function (row, x, y) {
            assert.equal(expect[index] * 2, row, "El valor de la matriz no coindice.");
            assert.equal(x, _x, "Fallo coordenada X");
            assert.equal(y, _y, "Fallo coordenada Y");
            index++;
            _x++;
            if (_x >= matrix.width) {
                _x = 0;
                _y++;
            }
        });
    });
    it("test constructor 3D: recorrido agrupado", function () {
        var expect = [
            [1,2,3],[4,5,6],[7,8,9],
            [10,11,12], [13,14,15], [16,17,18]
        ], data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.width, 3);
        assert.equal(matrix.height, 2);
        assert.equal(matrix.dimension, 3);
        var index = 0, _x = 0, _y = 0;
        matrix.forEach(function (row, x, y) {
            assert.ok(row.every(function(row, index2) {
                return expect[index][index2] === row;
            }), "El valor de la matriz no coindice.");
            assert.equal(x, _x, "Fallo coordenada X");
            assert.equal(y, _y, "Fallo coordenada Y");
            index++;
            _x++;
            if (_x >= matrix.width) {
                _x = 0;
                _y++;
            }
        });
    });
    it("test Constructor 3D: Replace value", function () {
        var expect = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [10, 11, 12], [13, 14, 15], [16, 17, 18]
        ], data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.map(function (rows, x, y) {
            return rows.map(function(row) {
                return row * 2;
            });
        });
        var index = 0, _x = 0, _y = 0;
        matrix.forEach(function (row, x, y) {
            assert.ok(row.every(function (row, index2) {
                return expect[index][index2] * 2 === row;
            }), "El valor de la matriz no coindice.");
            assert.equal(x, _x, "Fallo coordenada X");
            assert.equal(y, _y, "Fallo coordenada Y");
            index++;
            _x++;
            if (_x >= matrix.width) {
                _x = 0;
                _y++;
            }
        });
    });
    it("test Constructor 2D: isNumber", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.ok(matrix.isNumber(), "No es numerico");
    });
    it("test Constructor 2D: isNumber not", function () {
        var expect = ["hola", 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        assert.ok(!matrix.isNumber(), "Es numerico");
    });
    it("test constructor 3D: isNumber", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        assert.ok(matrix.isNumber(), "No es numerico");
    });
    it("test constructor 3D: isNumber not", function () {
        var data = [1, 2, 3, 4, 5, 6, "hola", 8, 9, [10, 12], 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        assert.ok(!matrix.isNumber(), "Es numerico");
    });
    it("test Constructor 2D: sqrt", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.sqrt().forEach(function (row, x, y, index) {
            assert.equal(row, Math.sqrt(matrix.data[index]));
        });
    });
    it("test constructor 3D: sqrt", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.sqrt().forEach(function (row, x, y, index) {
            var elements = matrix.getRow(x, y);
            row.forEach(function(row2, index2) {
                assert.equal(row2, Math.sqrt(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: pow", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.pow(2).forEach(function (row, x, y, index) {
            assert.equal(row, Math.pow(matrix.data[index], 2));
        });
    });
    it("test constructor 3D: pow", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.pow(2).forEach(function (row, x, y, index) {
            var elements = matrix.getRow(x, y);
            row.forEach(function(row2, index2) {
                assert.equal(row2, Math.pow(elements[index2], 2));
            });
        });
    });
    it ("test constructor 3D: GetRow", function() {
        var data = [1,2,3,4,5,6,7,8],
            expect = [
                [1,2], [3,4],
                [5,6], [7,8]
            ];
        var matrix = new Matrix({
            width: 2,
            height: 2,
            dimension: 2,
            data: data
        });
        matrix.forEach(function(rows, x, y) {
            var elements = matrix.getRow(x, y);
            rows.forEach(function(row, index2){
                assert.equal(row, elements[index2]);
            });
        });
    });
    it ("test get Random matrix 2D", function () {
        var matrix = Matrix.random(2,2,1);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
    });
    it ("test get PI matrix 2D", function () {
        var matrix = Matrix.PI(2,2,1);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
    });
    it ("test get Random matrix 2D 1 argument", function () {
        var matrix = Matrix.random(2);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
    });
    it("test get PI matrix 2D 1 argument", function () {
        var matrix = Matrix.PI(2);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
    });
    it("test get PI matrix 2D 2 argument", function () {
        var matrix = Matrix.PI(2, 2);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
    });
    it("test get eyes matrix 2D", function () {
        var matrix = Matrix.eyes(2);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
    });
});
/**
 * assertForEach.
 * Prueba si el recorrido de la matriz
 * es correcto.
 * 
 * @param {Matrix} matrix Valor a evaluar.
 * @param {Array} expect  Valor esperado.
 * @returns {void}
 */
function assertForEach(matrix, expect) {
    var index = 0, _x = 0, _y = 0;
    matrix.forEach(function (row, x, y) {
        assert.equal(row, expect[index], "El valor de la matriz no coindice.");
        assert.equal(x, _x, "Fallo coordenada X");
        assert.equal(y, _y, "Fallo coordenada Y");
        index++;
        _x++;
        if (_x >= matrix.width) {
            _x = 0;
            _y++;
        }
    });
}