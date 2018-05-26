# Funciones magicas

Las funciones mágicas del objeto *Matrix* no son mas que funciones estaticas dentro del objeto que generan nuevas matrices.

Estas funciones estan inspiradas en la sintaxis de Octave.

## Matrix.random

Genera una matriz aleatoria de coma flotante de 32 bits en un rango [0, ...1].

### Parametros

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
| width | Number | Ancho de la nueva matriz.|
| height | Number | Alto de la nueva matriz. |
| dimension | Number | numero de elementos por posición de la nueva matriz. (default: 1) |

```javascript
    var result = Matrix.random(width, height, dimension);
    /*
        0.13353611528873444
        0.9958998560905457
        0.8407717943191528
        0.10707005858421326
    */
```

## Matrix.PI

Genera una matriz constante del valor PI.

### Parametros

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
| width | Number | Ancho de la nueva matriz.|
| height | Number | Alto de la nueva matriz. |
| dimension | Number | numero de elementos por posición de la nueva matriz. (default: 1) |

```javascript
    var result = Matrix.PI(width, height, dimension);
    /*
        3.1415927410125732
        3.1415927410125732
        3.1415927410125732
        3.1415927410125732
    */
```

## Matrix.ones

Genera una matriz rellena del valor 1.

### Parametros

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
| width | Number | Ancho de la nueva matriz.|
| height | Number | Alto de la nueva matriz. |
| dimension | Number | numero de elementos por posición de la nueva matriz. (default: 1) |

```javascript
    var result = Matrix.ones(width, height, dimension);
    /*
        1 1
        1 1
    */
```



## Matrix.zeros

Genera una matriz nula rellena del valor 0.

### Parametros

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
| width | Number | Ancho de la nueva matriz.|
| height | Number | Alto de la nueva matriz. |
| dimension | Number | numero de elementos por posición de la nueva matriz. (default: 1) |

```javascript
    var result = Matrix.zeros(width, height, dimension);
    /*
        0 0
        0 0
    */
```


## Matrix.ones

Genera una matriz rellena del valor 1.

### Parametros

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
| width | Number | Ancho de la nueva matriz.|
| height | Number | Alto de la nueva matriz. |
| dimension | Number | numero de elementos por posición de la nueva matriz. (default: 1) |

```javascript
    var result = Matrix.ones(width, height, dimension);
    /*
        1 1
        1 1
    */
```



## Matrix.eyes

Genera una matriz identidad, las matrices identidad son cuadradas por lo que el orden es N x N.

### Parametros

| nombre | tipo | descripción |
| ------ | ---- | ----------- |
| n | Number | Numero de posiciones en alto y ancho|

```javascript
    var result = Matrix.eyes(n);
    /*
        1 0
        0 1
    */
```

