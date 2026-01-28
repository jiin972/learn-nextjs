# 1단계: 빌드
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
#의존성 설치
RUN npm install

COPY . .
RUN npm run build

# 2단계: 실행

FROM node:20-alpine AS runner
WORKDIR /app

#보안과 성능을 위해 환경 변수 설정
ENV NODE_ENV production

#핵심. standalone추출
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
#COPY --from=builder /app/public ./public

#포트설정
EXPOSE 8282
ENV PORT 8282

#서버 시작
CMD ["node", "server.js"]