FROM node:15.4.0-alpine3.12 as builder

WORKDIR /app

COPY . .

RUN yarn build

FROM node:15.4.0-alpine3.12

WORKDIR /app

COPY --from=builder /app/build /app

CMD node .
