/**
 * Matrix
 * 
 * Clase para el manejo de arreglos multidimenciones.
 */
function Matrix() {

    this.typeInstance = Array;
    this.length = 0; // tamaño del arreglo.
    this.dimension = 2;
    /**
     * Constructor.
     * 
     * new Matrix ([1,2,3,4,5,6], 3, 2, 2, {});
     * new Matrix ([1,2,3,4,5,6], 3, 2, 2);
     * new Matrix ([1,2,3,4,5,6], 3, 2);
     * new Matrix ([1,2,3,4,5,6], {width: 3, height: 2});
     * new Matrix ({width: 3, height: 2, data: [1,2,3,4,5,6]});
     * 
     * @param {Array|Int8Array|Int16Array|Int32Array|Float32Array|Float64Array|ArrayBuffer} data Arreglo de datos.
     * @param {Number} width Ancho de la matriz.
     * @param {Number} height Alto de la matriz.
     * @param {Number} dimension Dimensión de la matriz.
     * @param {object} options Opciones de la matriz.
     */
    function constructor(data, width, height, dimension, options) {
        if (arguments.length == 1) {
            if (typeof data == "object") {
                this.setOptions(data);
                if (data.data) {
                    this.loadData(data.data);
                }
            }
            if (arguments.length == 2) {
                this.setOptions(width);
                this.loadData(data);
            }
            if (arguments.length > 2) {
                if (!options) {
                    options = {};
                }
                assert(typeof options == "object", "config debe ser un objeto.");
                options.width = width;
                options.height = height;
                if (dimension) {
                    options.dimension = dimension;
                }
                this.setOptions(options);
                this.loadData(data);
            }
            this.length = this.width * this.height * (this.dimension - 1);
            if (!this.data) {
                this.data = new this.typeInstance(this.length);
            }
            assert(
                this.data.length == this.length,
                "No coinciden el numero de elementos de la matriz..."
            );
        }
    }
    /**
     * loadData.
     * Carga el arreglo de datos matricial.
     * 
     */
    function loadData(data) {
        assert(
            data instanceof this.typeInstance,
            `El parametro data debe ser un ${this.typeInstance}...`
        );
        this.data = data;
    }
    /**
     * setOptions.
     * Establece las opciones de la clase.
     * 
     * @param {object} config Objetos.
     * @returns {void}
     */
    function setOptions(config) {
        assert(data.width, "Es necesario el ancho de la matriz.");
        assert(data.height, "Es necesario el alto de la matriz.");
        this.width = data.width;
        this.height = data.height;
        if (data.dimension) {
            this.dimension = data.dimension;
        }
        if (data.type) {
            this.isTypeInstance(data.type);
        }
    }
    /**
     * isTypeInstance.
     * 
     * Obtiene la clase Arreglo para generar datos. 
     * @param {string} type Tipo de arreglo.
     * @returns {void}
     */
    function isTypeInstance(type) {
        switch (type) {
            case "int8":
                this.typeInstance = Int8Array;
                break;
            case "int16":
                this.typeInstance = Int16Array;
                break;
            case "int32":
                this.typeInstance = Int32Array;
                break;
            case "float32":
                this.typeInstance = Float32Array;
                break;
            case "float64":
                this.typeInstance = Float64Array;
                break;
            case "buffer":
                this.typeInstance = ArrayBuffer;
                break;
            default:
                throw new Error("El tipo de objeto no es valido...");
        }
    }
}
module.exports = Matrix;