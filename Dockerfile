FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

RUN npx prisma generate
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


WORKDIR /app

COPY --from=development /app/ .

EXPOSE 8000

CMD [ "node", "dist/main" ]
