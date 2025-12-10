# packages/ui/Dockerfile

FROM node:20-alpine AS base
WORKDIR /work
RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN corepack enable && corepack prepare pnpm@9.7.0 --activate

# Etapa deps: copiar SOLO manifests del root + del package UI
FROM base AS deps
WORKDIR /work
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./           
COPY packages/ui/package.json packages/ui/                        

# Si UI depende de otros packages locales, agrega sus package.json aquí:
# COPY packages/utils/package.json packages/utils/

RUN pnpm fetch --frozen-lockfile

# Etapa dev: ahora el código
FROM base AS dev
WORKDIR /work
COPY --from=deps /work/ /work/
COPY packages/ui/ packages/ui/
# Si UI importa código de otros packages locales, cópialos también:
# COPY packages/utils/ packages/utils/

WORKDIR /work/packages/ui
RUN pnpm install --frozen-lockfile --offline

EXPOSE 6006
ENV CHOKIDAR_USEPOLLING=1
ENV WATCHPACK_POLLING=true
CMD ["pnpm","storybook"]
