# Changelog

## [1.0.0-latest-1] - 2022-06-21

### Added

- Soporte de propiedades "width", "height", "dimension" en formato string numericos
- Metodo "isVoid" para validar matrices vacias sin contenido.

### Changed

- Filtro "BLUR" separado como una constante exportable.
- Filtro "GAUSSIAN" separado como una constante exportable.
- Filtro "MEDIA" separado como una constante exportable.
- Filtro "PREWITTV" separado como una constante exportable.
- Filtro "PREWITTH" separado como una constante exportable.
- Filtro "SOBELV" separado como una constante exportable.
- Filtro "SOBELH" separado como una constante exportable.
- Filtro "LAPLACIANO" separado como una constante exportable.
- Filtro "LAGAUSSIANO" separado como una constante exportable.
- Filtro "SHARPEN" separado como una constante exportable.
- Filtro "EMBOSS" separado como una constante exportable.

### Removed

- Metodo "getField" en clase Matrix user metodo "get"
- Metodo "setField" en clase Matrix user metodo "set"

### Fixed

- Objeto es "undefined" en versiones recientes de nodejs

## [1.0.0-latest-0] - 2018-11-10

### Added

- Getter/setter para la propiedad "data".
- Metodo "isValidArray" en Matrix.
- Propiedad estatica "typeArray" lista soporte de arreglos tipeados.
- Metodo "getIndex"para obtener indices en un arreglo de matrices.
- Metodo "convolution" para aplicar filtros de convolución.
- Metodo "moveCol" y "moveRow" para mover filas y columnas internas.

### Changed

- Propiedad "instance" reemplaza a "typeInstance".
- Metodo size reemplazado por propiedad size. Use propiedades "width", "height" y "dimension".

### Deprecated

- Metodo "getField" será reemplazado por "get" en la proxima versión.
- Metodo "setField" será reemplazado por "set" en la proxima versión.

### Removed

- propiedad "typeInstance" obsoleta.
- Compilación ASM.js

### Fixed

- Parametro "index" en forEach y map retorna un indice matricial con las dimensiones agregadas. Eliminada dimensiones en el indice.

### Security

- Optimización de rendimiento en metodos "inmultiply"
- Optimización de rendimiento en metodos "forEach"
- Optimización de rendimiento en metodos "map"
- actualizado dependencias obsoletas para el desarrollo

## [0.0.2-alpha-0] - 2018-07-08

### Security

- Optimización en carga de modulos en navegadores

## [0.0.1-alpha-1] - 2018-05-26

### Fixed

- Soporte a navegadores web y nodejs

## [0.0.1-alpha.0] - 2018-05-25

### Added
- Constructor Matrix
- Soporte para Array Buffer
- Soporte a funciones de algebra lineal básicas
- Soporte para asm.js