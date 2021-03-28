# LINCELEY
API REST LINCELEY

## Convenciones

### Nombres

    Usar PascalCase para nombers de tipos.
    No usar "I" como prefijo de nombres de interfaces.
    Usar PascalCase para valores de enumeraciones.
    Usar camelCase para nombres de funciones.
    Usar camelCase para nombres de de propiedades y variables locales.
    No usar "_" como prefijo para propiedades privadas.
    Usar palabras completas en nombres cuando sea posible.
### Componentes

    1 archivo por componente lógico (ej: parser, scanner, emitter, checker).
    Archivo con el sufijo ".generated.*" son autogenerados, no editarlos manualamente.

### Tipos

    No exportar tipos/funciones a menos que se necesiten compartirlos en múltiples componentes.
    No introducir nuevos tipos/valores al espacio de nombres global.
    Dentro de un archivo, las definiciones de tipos van primero.

 ### null y undefined

    Usar undefined. No usar null.   

### Supuestos generales

     Considere objetos como nodos, símbolos, etc. como inmutables fuera del componente que los creó. No los cambie.
     Considere las matrices como inmutables de forma predeterminada después de la creación.

## Clases

     Para mantener la coherencia, no utilice clases en la canalización del compilador principal. En su lugar, utilice cierres de funciones.

## Banderas

     Más de 2 propiedades booleanas relacionadas en un tipo deben convertirse en una bandera.

## Comentarios

     Utilice comentarios de estilo JSDoc para funciones, interfaces, enumeraciones y clases.

## Cadenas

     Utilice comillas dobles para las cadenas.
     Todas las cadenas visibles para el usuario deben estar localizadas (ingrese una entrada en diagnosticMessages.json).

## Mensajes de diagnóstico

     Use un punto al final de una oración.
     Utilice artículos indefinidos para entidades indefinidas.
     Las entidades definidas deben ser nombradas (esto es para un nombre de variable, nombre de tipo, etc.).
     Al establecer una regla, el asunto debe estar en singular (por ejemplo, "Un módulo externo no puede ..." en lugar de "Los módulos externos no pueden ...").
     Usa el tiempo presente.

### Códigos de mensajes de diagnóstico

Los diagnósticos se clasifican en rangos generales. Si agrega un nuevo mensaje de diagnóstico, use el primer número entero mayor que el último número usado en el rango apropiado.

     Rango 1000 para mensajes sintácticos
     2000 para mensajes semánticos
     4000 para mensajes de emisión de declaración
     5000 para mensajes de opciones del compilador
     6000 para mensajes del compilador de línea de comandos
     7000 para mensajes noImplicitAny

## Construcciones generales

Por una variedad de razones, evitamos ciertas construcciones y usamos algunas propias. Entre ellos:

     No utilice for..in declaraciones; en su lugar, utilice ts.forEach, ts.forEachKey y ts.forEachValue. Tenga en cuenta su semántica ligeramente diferente.
     Intente utilizar ts.forEach, ts.map y ts.filter en lugar de bucles cuando no sea muy inconveniente.

## Estilo

     Utilice funciones de flecha sobre expresiones de funciones anónimas.
     Solo los parámetros de función de flecha envolvente cuando sea necesario.
     Por ejemplo, (x) => x + x es incorrecto, pero lo siguiente es correcto:
         x => x + x
         (x, y) => x + y
         <T> (x: T, y: T) => x === y
     Siempre rodee los cuerpos de bucle y condicionales con llaves. Las declaraciones en la misma línea pueden omitir llaves.
     Los tirantes rizados abiertos siempre van en la misma línea que lo que los necesite.
     Las construcciones entre paréntesis no deben tener espacios en blanco circundantes.
     Un solo espacio sigue a las comas, los dos puntos y el punto y coma en esas construcciones. Por ejemplo:
         para (var i = 0, n = str.length; i <10; i ++) {}
         si (x <10) {}
         función f (x: número, y: cadena): void {}
     Utilice una sola declaración por declaración de variable
     (es decir, use var x = 1; var y = 2; sobre var x = 1, y = 2;).
     de lo contrario, va en una línea separada de la llave de cierre.
     Utilice 4 espacios por sangría.
