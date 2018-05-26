# Contribuciones

Nos gustaría que participaras en la mejora continua de este proyecto para ello necesitas que cumplas las siguientes pautas al participar.

* Use el estandar JsDoc 3 para estilos y documentacion de codigo.
* Mantenga lo más que pueda la compatibilidad con el estandar ECMAScript versión 5.

* Las funciones matematicas complejas ejecutelas dentro del contexto de asmjs, el modulo Utils.js posee un contexto activo.

* Cumpla la sintaxis básica de asmjs para las operaciones complejas.

* Para las pruebas debe tener presente que el margen de diferencia de un coma flotante debe ser maximo de 0.0001.

* Evite lo mas que puede superar un máximo de 3 barrido (bucles) de elementos por función.

* Utilice las variables con una estructura tipeada para reducir el tiempo de ejecución del interprete, evite reutilizar variables con diferentes tipos de datos.

* Recomendamos el uso de arreglo tipeados durante todas las operaciones de matrices.

* Recomendamos funciones lo mas simples y modular posible manteniendo en cuenta el rendimiento de la misma.

* Evite la dependencia excesiva entre modulos.

Estaremos agradecidos por su colaboración cualquier duda o incidencias detectadas reportelas por el siguiente repositorio.
