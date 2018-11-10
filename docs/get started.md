# Instalación

instalar matrix-js es facil con el manejador de dependencias npm.

    npm install --save @matajm/matrix-js

# Uso

Matrix-js es facil de usar y su sintaxis es muy similar Octave en el manejo de matrices.

```javascript
    var Matrix = require("@matajm/matrix-js");
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
    var row = A.get(x, y); // getter
    A.setField(x, y, val); //setter
```
### Matrix.width

Retorna el ancho de la matriz

### Matrix.height

Retorna el alto de la matriz

### Matrix.dimension

Retorna la dimensión de la matriz

### Matrix.size

Para la versión 1.x size será la propiedad que contiene la cantidad de elementos en total de
la matriz, en el caso del metodo size a sido removido.

### Matrix.data

Retonar la matriz actual en forma de un vector rectangular.

### Matrix.instance

Retorna la clase Array usada para la matriz.

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

### Matrix.isNumber

Retorna un booleano que determina si la matriz es numerica.

```javascript
    var result = Matrix.isNumber();
    // true
```

### Matrix.isNotNumber

Retorna un booleano que determina si la matriz no es numerica.

```javascript
    var result = Matrix.isNotNumber();
    // true
```

### Matrix.isEqual

Retorna un booleano que determina si las dos matrices son identicas.

```javascript
    var result = Matrix.isEqual(vector);
    // true
```

**Nota**: El parametro vector debe ser un objeto Matrix.

### Matrix.isNotEqual

Retorna un booleano que determina si las dos matrices son distintas.

```javascript
    var result = Matrix.isNotEqual(vector);
    // false
```

**Nota**: El parametro vector debe ser un objeto Matrix, el metodo *isNotEqual* es la inversa de *isEqual*.

### Matrix.isNull

Retorna un booleano que determina si la matriz es nula. Representa nulo el valor 0, objeto *Null* y el booleano *False*.

```javascript
    var result = Matrix.isNull();
    // false
```

### Matrix.isNotNull

Retorna un booleano que determina si la matriz no es nula. Representa nulo el valor 0, objeto *Null* y el booleano *False*.

```javascript
    var result = Matrix.isNotNull();
    // true
```

### Matrix.isOverTriangle

Retorna un booleano que determina si la matriz es un triangulo superio, se dice que es un triangulo es superior cuando C[i][j] == 0 && i > j.

```javascript
    var result = Matrix.isOverTriangle();
    // true
```

### Matrix.isUnderTriangle

Retorna un booleano que determina si la matriz es un triangulo inferior, se dice que es un triangulo es inferior cuando C[i][j] == 0 && i < j.

```javascript
    var result = Matrix.isUnderTriangle();
    // false
```

### Matrix.isSimetry

Retorna un booleano que determina si la matriz es simetrica, se dice que una matriz es simetrica cuando su transpuesta es igual.

```javascript
    var result = Matrix.isSimetry();
    // true
```

### Matrix.isNotSimetry

Retorna un booleano que determina si la matriz no es simetrica.

```javascript
    var result = Matrix.isNotSimetry();
    // false
```

### Matrix.isAsimetry

Retorna un booleano que determina si la matriz es asimetrica, se dice que una matriz es asimetrica cuando el valor de la matriz transpuesta negativa es igual.

```javascript
    var result = Matrix.isAsimetry();
    // false
```

### Matrix.isSingular

Retorna un booleano que determina si la matriz es cuadrada.

```javascript
    var result = Matrix.isSingular();
    // true
```

### Matrix.clone

Retorna una copia identica modificable del objeto actual, recomendamos este metodo para generar copias sin referencias de variables punteros.

```javascript
    var result = Matrix.clone();
    /*
        1 2
        3 4
    */
```

### Matrix.getRow

Retorna un nuevo objeto Matrix con la fila seleccionada.

```javascript
    var result = Matrix.getRow(y);
    /*
        1 2
    */
```

### Matrix.removeRow

Retorna un nuevo objeto Matrix con la fila removida.

```javascript
    var result = Matrix.removeRow(y);
    /*
        1 2
    */
```

El parametro *y* representa el numero de la fila que desea extraer.

### Matrix.getCol

Retorna un nuevo objeto Matrix con la columna seleccionada.

```javascript
    var result = Matrix.getCol(x);
    /*
        1
        3
    */
```

El parametro *x* representa el numero de la columna que desea extraer.

### Matrix.removeCol

Retorna un nuevo objeto Matrix con la fila removida.

```javascript
    var result = Matrix.removeCol(x);
    /*
        1 2
    */
```

El parametro *x* representa el numero de la columna que desea extraer.


## Matrix.moveRow

Alterna la fila actual por la nueva posición. donde *row* es la fila a cambiar y *newRow* es la fila por la cual será alternada.

```javascript
    matrix.moveRow(row, newRow);
```

## Matrix.moveCol

Alterna la columnar actual por la nueva posición. donde *col* es la columna a cambiar y *newCol* es la columna por la cual será alternada.

```javascript
    matrix.moveCol(col, newCol);
```

### Matrix.remove

Retorna un nuevo objeto Matrix con la fila y columna removida.

```javascript
    var result = Matrix.removeCol(x, y);
    /*
        1 2
    */
```

Parametros:

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
|  x    | Number| numero de la fila.|
|y| Number| numero de la columna. |

### Matrix.slice

Extrae un fragmento de la matriz como un nuevo objeto *Matrix*.

```javascript
    var result = Matrix.getCol(x1, y1, width, height);
    /*
        2
        4
    */
```

Parametros:

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
|  x1    | Number| coordenada x de inicio.|
|  y1    | Number| coordenada y de inicio. |
| width | Number | Ancho de la nueva matriz.|
| height | Number | Alto de la nueva matriz. |

### Matrix.toString

Retorna en formato String los valores de la matriz posicionados segun su orden.

```javascript
    var result = Matrix.toString();
    /*
        1 2
        3 4
    */
```


### Matrix.getIndex

Retorna el indice que representa la matriz en forma de un arreglo rectangular.


Parametros:

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
|  x    | Number| coordenada x.|
|  y    | Number| coordenada y. |

```javascript
    var index = Matrix.getIndex(x, y);    
```
