# Operadores aritmeticos

El objeto Matrix soporta la mayoria de los metodos aritmeticos que posee *Math*

|     Operador       |        Descripción                       |
| ------------------ | ---------------------------------------- |
|   Matrix.sum       | Suma de matrices o escalares.            |
|   Matrix.subtract  | Resta de matrices o escalares.           |
|   Matrix.inmultiply| Multiplicación de matrices o escalares   |
|   Matrix.divide   | División de matrices o escalares   |
|   Matrix.sqrt   | Raiz cuadrada de la matriz   |
|   Matrix.cbrt   | Raiz cubica de la matriz   |
|   Matrix.log   | Logaritmo natural de la matriz   |
|   Matrix.exp   | Matriz exponencial   |
|   Matrix.abs   | Matriz valor absoluto   |
|   Matrix.atan   | Matriz tangente   |
|   Matrix.cos   | Matriz coseno   |
|   Matrix.sin   | Matriz seno   |
|   Matrix.round   | Matriz redondeada   |
|   Matrix.ceil   | Matriz redondeada al valor superior  |
|   Matrix.floor   | Matriz redondeada al valor inferior  |
|   Matrix.pow   | Matriz potencia  |
|   Matrix.max   | Valor máximo de la matriz  |
|   Matrix.min   | Valor mínimo de la matriz  |
|   Matrix.transposed   | Matriz transpuesta  |
|   Matrix.inverse   | Matriz inversa  |
|   Matrix.not   | Matriz negativa  |
|   Matrix.adj   | Matriz adjunta  |
|   Matrix.det   | Determinante de la matriz  |
|   Matrix.promd   | Promedio de toda la matriz  |

## Matrix.sum

Retorna una nueva matriz con la suma de todas las matrices o escalares pasados como argumentos.

```javascript
    // suma de matrices.
    var result = matrix.sum(matrix2, matrix3, ...);
    // suma de una matriz mas escalares.
    var result = matrix.sum(2, 3, ...)
```

**Nota**: Para la suma de matrices los argumentos deben ser objetos Matrix.

## Matrix.subtract

Retorna una nueva matriz con la resta de todas las matrices o escalares pasados como argumentos.

```javascript
    // resta de matrices.
    var result = matrix.subtract(matrix2, matrix3, ...);
    // resta de una matriz mas escalares.
    var result = matrix.subtract(2, 3, ...)
```

**Nota**: Para la resta de matrices los argumentos deben ser objetos Matrix.

## Matrix.inmultiply

Retorna una nueva matriz con la multiplicación de todas las matrices o escalares pasados como argumentos.

```javascript
    // multiplicacion de matrices.
    var result = matrix.inmultiply(matrix2, matrix3, ...);
    // multiplicacion de una matriz mas escalares.
    var result = matrix.inmultiply(2, 3, ...)
```

**Nota**: Para la multiplicacion de matrices los argumentos deben ser objetos Matrix.

## Matrix.divide

Retorna una nueva matriz con lo que se considera una división de matrices.

    A / B == A * B^-1

Para el caso de escalares se aplica la división de cada elemento dentro de la matriz por el escalar.

```javascript
    // División de matrices.
    var result = matrix.divide(matrix2, matrix3, ...);
    // División de una matriz mas escalares.
    var result = matrix.divide(2, 3, ...)
```

## Matrix.convolution

Genera una nueva matriz aplicando filtros de convolución. Donde *filter* debe ser un objeto *Matrix* valido.


```javascript
    // División de matrices.
    var result = matrix.convolution(filter);
```

## Matrix.sqrt

Calcula la raiz cuadrada de cada elemento de la matriz.

```javascript
    var result = matrix.sqrt();
    // retorna una nueva instancia de Matrix
```

## Matrix.cbrt

Calcula la raiz cubica de cada elemento de la matriz.

```javascript
    var result = matrix.cbrt();
    // retorna una nueva instancia de Matrix
```

## Matrix.log

Calcula el logaritmo natural de cada elemento de la matriz.

```javascript
    var result = matrix.log();
    // retorna una nueva instancia de Matrix
```

## Matrix.exp

Calcula la exponencial de cada elemento de la matriz.

```javascript
    var result = matrix.exp();
    // retorna una nueva instancia de Matrix
```

## Matrix.abs

Obtiene el valor absoluto de cada elemento de la matriz.

```javascript
    var result = matrix.abs();
    // retorna una nueva instancia de Matrix
```

## Matrix.atan

Calcula la tangente de cada elemento de la matriz.

```javascript
    var result = matrix.atan();
    // retorna una nueva instancia de Matrix
```

## Matrix.cos

Calcula el coseno de cada elemento de la matriz.

```javascript
    var result = matrix.cos();
    // retorna una nueva instancia de Matrix
```

## Matrix.sin

Calcula el seno de cada elemento de la matriz.

```javascript
    var result = matrix.sin();
    // retorna una nueva instancia de Matrix
```

## Matrix.round

Redondea cada elemento de la matriz.

```javascript
    var result = matrix.round();
    // retorna una nueva instancia de Matrix
```

## Matrix.ceil

Redondea al valor superior cada elemento de la matriz.

```javascript
    var result = matrix.ceil();
    // retorna una nueva instancia de Matrix
```

## Matrix.floor

Redondea al valor inferior cada elemento de la matriz.

```javascript
    var result = matrix.floor();
    // retorna una nueva instancia de Matrix
```

## Matrix.pow

Calcula la potencia de cada elemento de la matriz.

```javascript
    var result = matrix.pow();
    // retorna una nueva instancia de Matrix
```

## Matrix.max

Obtiene el maximo valor de toda la matriz.

```javascript
    var result = matrix.max();
    // retorna un numero
```

## Matrix.min

Obtiene el mínimo valor de toda la matriz.

```javascript
    var result = matrix.min();
    // retorna un numero
```

## Matrix.transposed

Genera una matriz volteada del orden M x N a N x M.

```javascript
    var result = matrix.transposed();
    // retorna una nueva instancia de Matrix
```

## Matrix.inverse

Genera una matriz inversa por el metodo de la determinante.

```javascript
    var result = matrix.inverse();
    // retorna una nueva instancia de Matrix
```

## Matrix.adj

Genera una matriz adjunta a partir de los cofactores de la matriz original.

```javascript
    var result = matrix.adj();
    // retorna una nueva instancia de Matrix
```

## Matrix.det

Calcula el valor de la determinante.

```javascript
    var result = matrix.det();
    // retorna un numero.
```

## Matrix.promd

Calcula el valor de la promedio de la matriz.

```javascript
    var result = matrix.promd();
    // retorna un numero.
```
