FROM node:22-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .
COPY .npmrc .
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build-stories

FROM nginx:1.27

COPY --from=builder /app/storybook-static /usr/share/nginx/html