# Changelog

## [Unreleased] - 2018-08-06

### Added

- Getter/setter para la propiedad "data".
- Metodo "isValidArray" en Matrix.
- Propiedad "typeArray" lista soporte de arreglos tipeados.
- Metodo "getIndex"para obtener indices en un arreglo de matrices.
- Metodo "convolution" para aplicar filtros de convolución.

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