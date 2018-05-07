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