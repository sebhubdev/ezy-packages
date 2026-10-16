# Ezy Core Storybook

Storybook **10.6.2**, React **18.3.1**, Webpack 5 y Babel. Catálogo inicial de
**21 historias** de tres componentes originales:

| Catálogo    | Archivo del Core                                              | Historias |
| ----------- | ------------------------------------------------------------- | --------- |
| Button      | `core/ui/components/atoms/Btn/Btn.js`                     | 8         |
| Input       | `core/ui/components/atoms/Form/Input-new/Input.js`        | 8         |
| SelectField | `core/ui/components/molecules/Form/Fields/SelectField.js` | 5         |

Las historias importan el código del Core. No hay copias, parches, overrides
de aplicaciones ni cambios de comportamiento. Los ejemplos controlados añaden
el estado que necesita un consumidor de la API original.

## Preparación

Desde la raíz del repositorio, con el submódulo `core` y las dependencias
habituales de Ezy instalados:

```sh
npm ci --prefix core/tools/storybook --workspaces=false
npm --prefix core/tools/storybook run browsers
npm run storybook
```

Abrir `http://localhost:6006`. Storybook 10 requiere Node 20.19+ o 22.12+;
la verificación inicial usó Node 20.19.5 y npm 10.8.2.

Cada componente dispone de documentación automática, controles de propiedades,
variantes y ejemplos. Las historias con `Limitation` en su nombre caracterizan
defectos existentes; **que pasen no significa que esos defectos estén resueltos**.

## Build y pruebas

```sh
npm --prefix core/tools/storybook run build
npm --prefix core/tools/storybook run test:ci
```

El build se escribe en `core/tools/storybook/storybook-static`. `test:ci` sirve ese
directorio en `127.0.0.1:6006`, ejecuta las 21 historias en Chromium y detiene
el servidor al terminar. El puerto debe estar libre. Recompilar después de
cambiar historias antes de ejecutar las pruebas del sitio estático.

Con el servidor de desarrollo ya arrancado:

```sh
npm --prefix core/tools/storybook test
```

Las pruebas verifican renderizado, clics, escritura, valores controlados,
validación nativa y limitaciones conocidas. El addon de accesibilidad permite
inspeccionar problemas, pero no se aplica una puerta de conformidad a11y a
componentes existentes: está configurado como `todo` y no certifica accesibilidad.

## Aislamiento

- Herramienta propia del submódulo Core en `core/tools/storybook`, con
  instalación independiente del paquete de runtime `@ezy/core`. No se añade
  como workspace ni como dependencia de ese paquete.
- Todas sus dependencias son de desarrollo y se instalan en su propio
  `node_modules`, con su propio `package-lock.json`.
- No se modifica el manifiesto ni el lockfile raíz. La instalación habitual y
  los despliegues actuales de Ezy no incluyen estas herramientas.
- `.storybook/main.mjs` configura únicamente el Webpack de Storybook. No importa
  configuraciones de build ni ejecuta el runtime SSR de Ezy.
- Reutiliza `.ezycore/appsAliases.js` y la fábrica
  `core/engine/config/aliases.js`. No regenera ni modifica esos archivos.
- Los aliases del Core se crean con el directorio de esta herramienta, evitando
  los overrides de `site` e `intranet`. El preview resuelve React y ReactDOM a
  una única copia dentro de la herramienta.
- Los SVG se cargan como texto para respetar la API de `Icon`; Sass, estilos y
  fuentes proceden del Core. No se cargan `.env` de las aplicaciones.
- El paquete no se publica y su salida generada no se versiona.

La publicación desde CI/CD queda como tarea independiente, sin cambios en los
workflows de producción.

## Verificación inicial

- Build estático de Storybook correcto.
- 3 suites y 21 historias correctas en Chromium.
- Builds `site`, `intranet` y `api` correctos antes y después de la instalación:
  `npm run build -- site intranet api`.
- El Core no tiene un script de build independiente en su `package.json`;
  los builds de las aplicaciones compilan sus dependencias del Core.

Consultar [LIMITATIONS.md](LIMITATIONS.md) antes de extender la biblioteca.
