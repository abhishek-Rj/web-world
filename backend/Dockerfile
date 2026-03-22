FROM node:22-alpine

WORKDIR /app

COPY ./package* ./
RUN npm install node-pre-gyp
RUN npm install

COPY . .

EXPOSE 4000

CMD sh -c "npx prisma migrate deploy && npx prisma generate client && npm run build && npm start"