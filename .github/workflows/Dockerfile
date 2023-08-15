# Build stage
FROM node:18 AS build

# root 에 app 폴더를 생성
RUN mkdir /app

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/package.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the React app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사한다.
COPY ./nginx/nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
