# matrix-js

Librería para el procesamiento de matrices.

# Instalación

instalar matrix-js es facil con el manejador de dependencias npm.

    npm install --save matrix-js

# Uso

Matrix-js es facil de usar y su sintaxis es muy similar Octave en el manejo de matrices.

```javascript
    var Matrix = require("matrix-js");
    var A = new Matrix({
        width: 2,
        height: 2,
        data: [
            1, 2,
            3, 4
        ]
    });
    console.log(A.toString());
    /* Resultado:
        1 2
        3 4
    */
```

## Getter/Setter

La clase Matrix cuenta con sus propios getter y setter para el acceso rapido a la matriz.

```javascript
    var row = A.getField(x, y); // getter
    A.setField(x, y, val); //setter
```

## Soporte de datos

De acuerto al tipo de matriz selecciona en las configuraciones, la Api soporta los siguientes tipos de datos.
Data type | String
--------: | :-----
`Int8Array` | "int8"
`Int16Array` | "int16"
`Int32Array` | "int32"
`Uint8Array` | "uint8"
`Uint16Array` | "uint16"
`Uint32Array` | "uint32"
`Float32Array` | "float32"
`Float64Array` | "float64"
`Uint8ArrayClamped` | "uint8_clamped"
`Buffer` | "buffer"

### Matrix.size

Retorna el tamaño de la matriz en un arreglo de 3 elementos.

    Matrix.size()
    [ancho, alto, dimension]

### Matrix.forEach

Recorre la matriz en orden de fila ubicando el elemento en el plano cartesiano.

```javascript
    Matrix.forEach(function (row, x, y, index) {
        // codigo a ejecutar por iteracion.
    });
```

Donde:

**row**: Valor del elemento actual.

**x**: Representa la posición en el plano de las x.

**y**: Representa la posición en el plano de las y.

**index**: Representa el indice del arreglo rectangular de la matriz.

### Matrix.map

Recorre y reemplaza la matriz en orden de fila ubicando el elemento en el plano cartesiano.

```javascript
    Matrix.map(function (row, x, y, index) {
        // codigo a ejecutar por iteracion.
        return row;
    });
```

Donde:

**row**: Valor del elemento actual.

**x**: Representa la posición en el plano de las x.

**y**: Representa la posición en el plano de las y.

**index**: Representa el indice del arreglo rectangular de la matriz.

## Matrix.transposed

Retorna una nueva matriz transpuesta de la matriz original.

```javascript
    var matrix2 = Matrix.transposed();
```

## Matrix.sum

Retorna una nueva matriz con la suma de todas las matrices o escalares pasados como argumentos.

```javascript
    // suma de matrices.
    var result = Matrix.sum(matrix2, matrix3, ...);
    // suma de una matriz mas escalares.
    var result = Matrix.sum(2, 3, ...)
```

**Nota**: Para la suma de matrices los argumentos deben ser objetos Matrix.

## Matrix.subtract

Retorna una nueva matriz con la resta de todas las matrices o escalares pasados como argumentos.

```javascript
    // resta de matrices.
    var result = Matrix.subtract(matrix2, matrix3, ...);
    // resta de una matriz mas escalares.
    var result = Matrix.subtract(2, 3, ...)
```

**Nota**: Para la resta de matrices los argumentos deben ser objetos Matrix.

## Matrix.inmultiply

Retorna una nueva matriz con la multiplicación de todas las matrices o escalares pasados como argumentos.

```javascript
    // multiplicacion de matrices.
    var result = Matrix.inmultiply(matrix2, matrix3, ...);
    // multiplicacion de una matriz mas escalares.
    var result = Matrix.inmultiply(2, 3, ...)
```

**Nota**: Para la multiplicacion de matrices los argumentos deben ser objetos Matrix.

## Matrix.inverse

Retorna una nueva matriz con la inversa de la matriz original.

```javascript
    var matrix2 = Matrix.inverse();
```

**Nota**: El calculo de la matriz la realiza por el metodo de la determinante.

Para obtener el valor de la determinante de la matriz use el metodo.

```javascript
    var det = Matrix.det();
```

## Matrix.divide

Retorna una nueva matriz con lo que se considera una división de matrices.

    A / B == A * B^-1

Para el caso de escalares se aplica la división de cada elemento dentro de la matriz por el escalar.

```javascript
    // División de matrices.
    var result = Matrix.divide(matrix2, matrix3, ...);
    // División de una matriz mas escalares.
    var result = Matrix.divide(2, 3, ...)
```

**Nota**: Para la división de matrices los argumentos deben ser objetos Matrix.

# License

(c) 2018-2025 Jhonny Mata. MIT License