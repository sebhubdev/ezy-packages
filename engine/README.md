# Ezy Engine

El motor permanece dentro de `core/engine`. La reorganización separa las
responsabilidades sin cambiar la selección de aplicaciones, los entornos,
la compilación ni las respuestas SSR.

```text
engine/
├── build/
│   ├── targets/       # Entradas de compilación por tipo de aplicación
│   ├── webpack/       # Configuraciones existentes
│   └── utils/         # Sass, documento y coordinación del compilador
├── cli/
│   ├── bin/           # Entrada ezy-core
│   ├── commands/      # Adaptadores de argumentos y comandos del usuario
│   ├── actions/       # Operaciones de crear y renombrar aplicaciones
│   ├── runners/       # runApps: ejecución de build, dev y start
│   ├── utils/         # Descubrimiento de aplicaciones
│   └── legacy/        # Scripts antiguos sin consumidores actuales
├── config/            # Rutas, aliases y carga de entornos
├── generators/
│   └── utils/         # Escritura de archivos generados
├── runtime/
│   ├── server/        # Servidores SSR, SPA, API y HMR
│   ├── client/        # Montaje e hidratación de React en el navegador
│   ├── rendering/     # Documento HTML, Helmet y render SSR
│   ├── data/
│   │   └── defaults/  # Datos que la intranet sigue consumiendo
│   ├── router/
│   ├── requests/
│   ├── errors/
│   ├── pagination/
│   └── devtools/
├── templates/         # Plantilla SSR y sus previews existentes
└── testing/
    └── fixtures/
        └── pages/     # Páginas de ejemplo sin consumidores de runtime
```

Los tests permanecen junto a sus módulos. No se crean carpetas de plantillas
API/SPA ni utilidades de prueba vacías.

## Rutas de importación

El alias `@ezycore` y el nombre de paquete `@ezy/core` se conservan. Se
actualizaron los consumidores y las plantillas a las siguientes ubicaciones:

| Ruta anterior dentro de `engine` | Ruta actual |
| --- | --- |
| `scripts/bin/ezy-core` | `cli/bin/ezy-core` |
| `scripts/runApps.js` | `cli/runners/runApps.js` |
| `build/buildApi.js`, `build/buildSsr.js` | `build/targets/` |
| `build/commons/` | `build/utils/` |
| `runtime/commons/ssrServer` | `runtime/server/ssrServer` |
| `runtime/commons/createRoot` | `runtime/client/createRoot` |
| `runtime/commons/useGetAppData` | `runtime/data/useGetAppData` |
| `runtime/commons/getGlobalData` | `runtime/data/getGlobalData` |
| `runtime/commons/renderSsrApp` | `runtime/rendering/renderSsrApp` |
| `helpers/getAppEnvironment` | `config/getAppEnvironment` |
| `helpers/getAppsNames` | `cli/utils/getAppsNames` |
| `helpers/writeGeneratedFile` | `generators/utils/writeGeneratedFile` |

`createHtmlDoc` conserva su función de adaptar Helmet a `renderHtmlDocument`;
no se fusionan. Los antiguos datos globales de `fakeData` no son fixtures de
test: la intranet los utiliza, por lo que permanecen en runtime bajo `defaults`.
Las páginas de ejemplo se trasladan a `testing/fixtures/pages`.

## Comandos y verificaciones

Desde la raíz del monorepo, los comandos habituales no cambian:

```sh
npm run dev -- site
npm run build -- site intranet api
npm run start -- site
npm run storybook
node --test $(rg --files core/engine -g '*.test.js')
npm --prefix core/tools/storybook run build
npm --prefix core/tools/storybook run test:ci
```

Las pruebas de creación y renombrado usan directorios temporales. Las historias
de Storybook mantienen dependencias y configuración independientes del motor.

## Código anterior conservado

- `cli/legacy/dev-copy.js` y `cli/legacy/log.js` no tienen consumidores actuales.
  Se conservan como código histórico, sin ejecutarlos durante la verificación.
- El comando `update` ya dependía de `engine/update/sassVars`, que no existe.
  Se conserva esa dependencia; repararlo queda fuera de esta reorganización.
- `build/targets/buildSpa.js` era un archivo vacío y continúa siéndolo. No se
  añade soporte nuevo a build/dev de SPA; `start` conserva su servidor existente.
- El generador de componentes conserva su destino y comportamiento originales;
  este cambio no corrige posibles limitaciones anteriores de ese comando.
