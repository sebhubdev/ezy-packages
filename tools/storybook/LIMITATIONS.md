# Limitaciones observadas

Estos puntos se registran para corregirlos posteriormente. La integración de
Storybook no modifica componentes ni sus estilos originales.

## Button (`Btn`)

- `Btn` solo transmite `type` y `onClick` al elemento `<button>`. El resto de
  propiedades termina en el `<span>` de `BaseBtn`, incluyendo `disabled` y
  atributos destinados al botón nativo. `disabled=true` no impide el clic.
- `size` genera `btn--sm`, `btn--md` y `btn--lg`, pero el SCSS actual de Btn no
  define reglas para estas clases. No se simulan tamaños mediante CSS local.
- `variant="icon"` suprime el texto visible. Antes de documentar su uso como
  botón accesible, hay que revisar cómo transmite Btn el nombre accesible al
  botón nativo. Las primeras historias incluyen botones con texto e iconos.

Las historias `DisabledLimitation` y `SizeClasses` muestran estas limitaciones.

## Input (`atoms/Form/Input-new/Input`)

- Convive con `atoms/Form/Input/InputText`, una API anterior diferente. El
  catálogo usa explícitamente `Input-new/Input` para evitar ambigüedades.
- Es controlado y llama a `onChange(value)` sin comprobar si se proporcionó
  callback. Las historias aportan valor, callback y estado del consumidor.
- No incorpora label, mensajes de validación ni `aria-invalid`. La etiqueta
  externa de los ejemplos está asociada a su `id` nativo.
- `variant`, `size` y `state` generan clases, pero su SCSS actual solo contiene
  estilos base y de foco. `state="error"` no produce por sí mismo validación,
  un mensaje ni semántica de error accesible.
- `required` y `disabled` sí se transmiten al input nativo y se comprueban.

La historia `ErrorClassLimitation` distingue la clase de error de su semántica.

## SelectField

- Renderiza un `<select>` y un `<input type="checkbox">` adicional por defecto,
  con el mismo `name` y el mismo ref. Si el checkbox está marcado, FormData
  puede contener dos valores para ese nombre.
- El ref acaba apuntando al input adicional. La validación `required` consulta
  ese input en lugar de la opción seleccionada y puede devolver `true` sin
  elegir una opción; no usa la validación nativa `required` del select.
- El placeholder usa `value={null}`, no un valor vacío explícito.
- `onChange` devuelve `event.target.checked`, por lo que cambiar el select
  entrega `undefined` en lugar del valor de la opción.
- Sin `label` no se renderiza ninguno de los dos controles.
- El efecto de registro del validador no incluye desregistro. Su dependencia
  `validations=[]` también puede generar registros repetidos al renderizar.
- Un mismo label engloba dos controles interactivos; revisar su asociación
  accesible cuando se corrija el componente.

Las historias conservan el checkbox adicional y prueban el comportamiento
actual del callback y del validador. No se ocultan ni sustituyen esos elementos.

## Herramientas y mantenimiento

- Storybook genera advertencias de tamaño por sus bundles de documentación y
  axe-core. Son artefactos del catálogo y no se añaden a las aplicaciones Ezy.
- `@storybook/test-runner` **0.26.0** ejecuta correctamente estas historias con
  Webpack, pero su CLI avisa de que ha finalizado su soporte oficial. Arrastra
  además paquetes obsoletos de Jest/Playwright. Su versión queda fijada en el
  lockfile; evaluar una alternativa mantenida antes de ampliar la infraestructura
  de pruebas. La documentación actual de Storybook prioriza Vitest para Vite:
  https://storybook.js.org/docs/writing-tests/integrations/test-runner
- El addon a11y está en modo `todo`: permite examinar problemas sin presentar
  componentes existentes como conformes ni cambiar su comportamiento.
- El funcionamiento de los tres componentes iniciales no garantiza que el
  resto de componentes con router, providers, servicios o APIs del navegador
  pueda incorporarse sin decoradores o fixtures específicos.
