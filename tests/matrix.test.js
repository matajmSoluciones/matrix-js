/**
 * Pruebas unitarias Matrix.js
 */
var Matrix = require("../src/matrix");
var assert = require('assert'),
    expect = require("chai").expect;

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
        assert.equal(matrix.getField(1,1), 5);
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
        assert.equal(matrix.getField(1,1), 5);
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
        assert.equal(matrix.getField(1,1), 5);
        assert.ok(matrix.data instanceof Array);
        assertForEach(matrix, expect);
    });
    it("test Constructor 3D: map invalid row return", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "array",
                width: 2,
                height: 1,
                dimension: 3,
                data: expect
            }
        );
        assert.throws((function () {
            matrix.map(function (row) {
                return [row[1]];
            });
        }), Error, "Reemplazo el valor de un vector 3D");
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
    it("test Constructor 2D: void options", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            expect,
            3,
            2
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
    it("test Constructor 2D: type Invalid", function() {
        var expect = [1, 2, 3, 4, 5, 6];
        assert.throws((function () {
            var matrix = new Matrix(
                {
                    type: "object",
                    width: 3,
                    height: 2,
                    data: expect
                }
            );
            console.log(matrix);
        }), Error, "Paso de largo");
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
        assert.equal(matrix.getField(1, 1), 5);
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
        assert.equal(matrix.getField(1, 1), 5);
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
        assert.equal(matrix.getField(1, 1), 5);
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
        assert.equal(matrix.getField(1, 1), 5);
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
        assert.equal(matrix.getField(1, 1), 5);
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
        matrix.sqrt().forEach(function (rows, x, y, index) {
            var elements = matrix.getField(x, y);
            rows.forEach(function(row, index2) {
                assert.equal(row, Math.sqrt(elements[index2]));
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
            var elements = matrix.getField(x, y);
            row.forEach(function(row2, index2) {
                assert.equal(row2, Math.pow(elements[index2], 2));
            });
        });
    });
    it ("test constructor 3D: getField", function() {
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
            var elements = matrix.getField(x, y);
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
    it ("test get PI matrix 3D", function () {
        var matrix = Matrix.PI(2,2,3);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 12);
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
    it("test get eyes Transposed matrix 2D", function () {
        var matrix = new Matrix([1,2,3,4], {
            width: 2,
            height: 2,
            dimension: 1
        });
        var obj = matrix.Transposed();
        obj.forEach(function (row, x, y) {
            var element = matrix.getField(y, x);
            assert.equal(element, row);
        });
    });
    it("test isNumber 2D", function () {
        var matrix = new Matrix([1,2,3,4], {
            width: 2,
            height: 2,
            dimension: 1
        });
        assert.ok(!matrix.isNotNumber(), "Es una matriz no numerico");
        assert.ok(matrix.isNumber(), " No es una matriz numerica");
    });
    it("test isNotNumber 2D", function () {
        var matrix = new Matrix([1,2,3,"hola"], {
            width: 2,
            height: 2,
            dimension: 1
        });
        assert.ok(matrix.isNotNumber(), "No es una matriz no numerico");
        assert.ok(!matrix.isNumber(), " Es una matriz numerica");
    });
    it("test isNull 2D", function () {
        var matrix = new Matrix({
            width: 2,
            height: 2,
            dimension: 1
        });
        assert.ok(!matrix.isNotNull(), "Es una matriz nula");
        assert.ok(matrix.isNull(), " No es una matriz nula");
    });
    it("test isNull 2D", function () {
        var matrix = new Matrix([1, 2, 3, 4], {
            width: 2,
            height: 2,
            dimension: 1
        });
        assert.ok(matrix.isNotNull(), "No es una matriz no nula");
        assert.ok(!matrix.isNull(), " Es una matriz nula");
    });
    it("test Constructor 2D: log", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.log().forEach(function (row, x, y, index) {
            assert.equal(row, Math.log(matrix.data[index]));
        });
    });
    it("test constructor 3D: log", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.log().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function(row2, index2) {
                assert.equal(row2, Math.log(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: exp", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.exp().forEach(function (row, x, y, index) {
            assert.equal(row, Math.exp(matrix.data[index]));
        });
    });
    it("test constructor 3D: exp", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.exp().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function(row2, index2) {
                assert.equal(row2, Math.exp(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: abs", function () {
        var expect = [1, -2, 3, -4, 5, -6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.abs().forEach(function (row, x, y, index) {
            assert.equal(row, Math.abs(matrix.data[index]));
        });
    });
    it("test constructor 3D: abs", function () {
        var data = [-1, 2, 3, 4, 5, -6, 7, 8, 9, 10, -11, 12, 13, 14, -15, 16, 17, -18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.abs().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function(row2, index2) {
                assert.equal(row2, Math.abs(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: sin", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.sin().forEach(function (row, x, y, index) {
            assert.equal(row, Math.sin(matrix.data[index]));
        });
    });
    it("test constructor 3D: sin", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.sin().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function (row2, index2) {
                assert.equal(row2, Math.sin(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: cos", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.cos().forEach(function (row, x, y, index) {
            assert.equal(row, Math.cos(matrix.data[index]));
        });
    });
    it("test constructor 3D: cos", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.cos().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function (row2, index2) {
                assert.equal(row2, Math.cos(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: atan", function () {
        var expect = [1, 2, 3, 4, 5, 6];
        var matrix = new Matrix(
            {
                type: "float64",
                width: 3,
                height: 2,
                data: expect
            }
        );
        matrix.atan().forEach(function (row, x, y, index) {
            assert.equal(row, Math.atan(matrix.data[index]));
        });
    });
    it("test constructor 3D: atan", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var matrix = new Matrix({
            width: 3,
            height: 2,
            dimension: 3,
            data: data
        });
        matrix.atan().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function (row2, index2) {
                assert.equal(row2, Math.atan(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: round", function () {
        var matrix = Matrix.random(2, 2);
        matrix.round().forEach(function (row, x, y, index) {
            assert.equal(row, Math.round(matrix.data[index]));
        });
    });
    it("test constructor 3D: round", function () {
        var matrix = Matrix.random(2, 2, 3);
        matrix.round().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function (row2, index2) {
                assert.equal(row2, Math.round(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: ceil", function () {
        var matrix = Matrix.random(2, 2);
        matrix.ceil().forEach(function (row, x, y, index) {
            assert.equal(row, Math.ceil(matrix.data[index]));
        });
    });
    it("test constructor 3D: ceil", function () {
        var matrix = Matrix.random(2, 2, 3);
        matrix.ceil().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function (row2, index2) {
                assert.equal(row2, Math.ceil(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: floor", function () {
        var matrix = Matrix.random(2, 2);
        matrix.floor().forEach(function (row, x, y, index) {
            assert.equal(row, Math.floor(matrix.data[index]));
        });
    });
    it("test constructor 3D: floor", function () {
        var matrix = Matrix.random(2, 2, 3);
        matrix.floor().forEach(function (row, x, y, index) {
            var elements = matrix.getField(x, y);
            row.forEach(function (row2, index2) {
                assert.equal(row2, Math.floor(elements[index2]));
            });
        });
    });
    it("test Constructor 2D: max", function () {
        var matrix = Matrix.random(2, 2);
        assert.equal(matrix.max(), Math.max.apply(null, matrix.data));
    });
    it("test constructor 3D: max", function () {
        var matrix = Matrix.random(2, 2, 3);
        assert.equal(matrix.max(), Math.max.apply(null, matrix.data));
    });
    it("test Constructor 2D: min", function () {
        var matrix = Matrix.random(2, 2);
        assert.equal(matrix.min(), Math.min.apply(null, matrix.data));
    });
    it("test constructor 3D: min", function () {
        var matrix = Matrix.random(2, 2, 3);
        assert.equal(matrix.min(), Math.min.apply(null, matrix.data));
    });
    it("test constructor 3D: size", function () {
        var matrix = Matrix.random(2, 2, 3);
        var size = matrix.size();
        assert.equal(size[0], 2); // width
        assert.equal(size[1], 2); //height
        assert.equal(size[2], 3); //dimension
    });
    it("test Constructor 2D: isNotSimetry", function () {
        var matrix = Matrix.random(2, 2);
        assert.ok(!matrix.isSimetry(), "Dice que la matriz es asimetrica!");
        assert.ok(matrix.isNotSimetry(), "Dice que la matriz es simetrica!");
    });
    it("test constructor 3D: min", function () {
        var matrix = Matrix.random(2, 2, 3);
        assert.ok(!matrix.isSimetry(), "Dice que la matriz es asimetrica!");
        assert.ok(matrix.isNotSimetry(), "Dice que la matriz es simetrica!");
    });
    it("test get zeros matrix 2D 1 argument", function () {
        var expect = [0,0,0,0];
        var matrix = Matrix.zeros(2);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
        matrix.forEach(function (row, x, y, index) {
            assert.equal(row, expect[index]);
        });
    });
    it("test get zeros matrix 3D", function () {
        var expect = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        var matrix = Matrix.zeros(2, 2, 3);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 12);
        matrix.forEach(function (row, x, y, index) {
            row.forEach(function (row2, index2) {
                assert.equal(row2, expect[index2]);
            });
        });
    });
    it("test get ones matrix 2D 1 argument", function () {
        var expect = [1,1,1,1];
        var matrix = Matrix.ones(2);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
        matrix.forEach(function (row, x, y, index) {
            assert.equal(row, expect[index]);
        });
    });
    it("test get ones matrix 3D", function () {
        var expect = [1,1,1,1,1,1,1,1,1,1,1,1,1];
        var matrix = Matrix.ones(2, 2, 3);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 12);
        matrix.forEach(function (row, x, y, index) {
            row.forEach(function (row2, index2) {
                assert.equal(row2, expect[index2]);
            });
        });
    });
    it("test get eyes matrix 2D 1 argument", function () {
        var expect = [1,0,0,1];
        var matrix = Matrix.eyes(2);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 4);
        matrix.forEach(function (row, x, y, index) {
            assert.equal(row, expect[index]);
        });
    });
    it("test get eyes matrix 3D", function () {
        var expect = [1, 1, 1, 0,0,0,0,0,0,1,1,1];
        var matrix = Matrix.eyes(2, 3);
        assert.equal(matrix.data.length, matrix.length);
        assert.equal(matrix.length, 12);
        matrix.data.forEach(function (row, index) {
            assert.equal(row, expect[index]);            
        });
    });
    it("test get sum matrix 2D", function () {
        var expect = [2,0,0,2];
        var matrix = Matrix.eyes(2);
        var result = matrix.sum(matrix);
        result.forEach(function (row, x, y, index) {
            assert.equal(row, expect[index]);
        });
    });
    it("test get sum matrix 3D", function () {
        var expect = [2, 2, 2, 0,0,0,0,0,0,2,2,2];
        var matrix = Matrix.eyes(2, 3);
        var result = matrix.sum(matrix);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index]);            
        });
    });
    it("test get sum alpha matrix 3D", function () {
        var expect = [3, 3, 3, 2,2,2,2,2,2,3,3,3];
        var matrix = Matrix.eyes(2, 3);
        var result = matrix.sum(2);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index]);            
        });
    });
    it("test get sum alpha vector", function () {
        var expect = [3, 3, 3];
        var matrix = Matrix.ones(3,1);
        var result = matrix.sum(2);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index]);            
        });
    });
    it("test get sum vector", function () {
        var expect = [2, 2, 2];
        var matrix = Matrix.ones(3,1);
        var result = matrix.sum(matrix);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index]);            
        });
    });
    it("test getRow vector", function () {
        var expect = [4, 5, 6];
        var matrix1 = new Matrix({
            width: 3,
            height: 3,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        });
        var result = matrix1.getRow(1);
        var size = result.size();
        assert.equal(size[0], 3);
        assert.equal(size[1], 1);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index], result.toString());            
        });
    });
    it("test getRow 3D vector", function () {
        var expect = [7, 8, 9, 10, 11, 12];
        var matrix1 = new Matrix({
            width: 2,
            height: 2,
            dimension: 3,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        });
        var result = matrix1.getRow(1);
        var size = result.size();
        assert.equal(size[0], 2);
        assert.equal(size[1], 1);
        assert.equal(size[2], 3);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index], result.toString());            
        });
    });
    it("test getCol vector", function () {
        var expect = [2, 5, 8];
        var matrix1 = new Matrix({
            width: 3,
            height: 3,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        });
        var result = matrix1.getCol(1);
        var size = result.size();
        assert.equal(size[0], 1);
        assert.equal(size[1], 3);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index], result.toString());            
        });
    });
    it("test getCol 3D vector", function () {
        var expect = [4, 5, 6, 10, 11, 12];
        var matrix1 = new Matrix({
            width: 2,
            height: 2,
            dimension: 3,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        });
        var result = matrix1.getCol(1);
        var size = result.size();
        assert.equal(size[0], 1);
        assert.equal(size[1], 2);
        assert.equal(size[2], 3);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index], result.toString());            
        });
    });
    it("test get inmultiply vector", function () {
        var expect = [30, 60, 90, 120];
        var matrix1 = new Matrix({
            width: 4,
            height: 4,
            data: [1,2,3,4, 2, 4, 6, 8, 3, 6, 9, 12, 4, 8, 12, 16]
        }), matrix2 = new Matrix({
            width: 1,
            height: 4,
            data: [1, 2, 3, 4]
        });
        var result = matrix1.inmultiply(matrix2);
        var size = result.size();
        assert.equal(size[0], 1);
        assert.equal(size[1], 4);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index], result.toString());            
        });
    });
    it("test get inmultiply matrix", function () {
        var expect = [108, 66, 60, 15, 15, 24, 17, 19, 34];
        var matrix = new Matrix({
            width: 3,
            height: 3,
            data: [10, 5, 3, 1, 2, 3, 1, 2, 5]
        });
        var result = matrix.inmultiply(matrix);
        var size = result.size();
        assert.equal(size[0], 3);
        assert.equal(size[1], 3);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index], result.toString());            
        });
    });
    it("test get inmultiply matrix result 1x1", function () {
        var expect = 14;
        var matrix1 = new Matrix({
            width: 3,
            height: 1,
            data: [1, 2, 3]
        }), matrix2 = new Matrix({
            width: 1,
            height: 3,
            data: [1, 2, 3]
        });
        var result = matrix1.inmultiply(matrix2);
        assert.equal(result, expect);
    });
    it("test get inmultiply 3D vector", function () {
        var expect = [174,
            219,
            270,
            210,
            264,
            324,
            246,
            309,
            378,
            444,
            516,
            594,
            561,
            642,
            729,
            678,
            768,
            864,
            714,
            813,
            918,
            912,
            1020,
            1134,
            1110,
            1227,
            1350];
        var matrix = new Matrix({
            width: 3,
            height: 3,
            dimension: 3,
            data: [
                1, 2, 3, 4, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27
            ]
        });
        var result = matrix.inmultiply(matrix);
        var size = result.size();
        assert.equal(size[0], 3);
        assert.equal(size[1], 3);
        result.data.forEach(function (row, index) {
            assert.equal(row, expect[index], result.toString());            
        });
    });
    it ("test Matrix inmultiply data random", function() {
        var data = require("./examples.inmultiply.json");
        var index = Math.round(Math.random() * (data.length - 1)),
            matrix1 = new Matrix(data[index].src),
            matrix2 = new Matrix(data[index].dest),
            init = Date.now(),
            result = matrix1.inmultiply(matrix2),
            time = Date.now() - init;
        assert.ok(time < 350000, time + "ms");
        assert.equal(result.width, data[index].result.width);
        assert.equal(result.height, data[index].result.height);
        assert.equal(result.dimension, data[index].result.dimension);
        result.data.forEach(function (row, index2){
            expect(row)
            .to.be
            .within(
                data[index].result.data[index2] - 0.001,
                data[index].result.data[index2] + 0.001
            );
        });
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