# Opciones de Matrix

| Nombre |  Tipo  |   Descripción      |
| ------ | ------ | ------------------ |
| width  | Number | Ancho de la matriz |
| height | Number | Alto de la matriz  |
| dimension | Number | numero de elementos dentro de la matriz. (default: 1) |
| data   | Array  | Matriz rectangular |
| type   | String | Tipo de matriz (default: float32)

# Tipos de matrices

La Api soporta los siguientes tipos de datos.

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

Todos los tipos descritos aplican para la opción type, una vez instanciada la matriz la clase del tipo se almacena dentro de *Matrix.typeInstance*.

