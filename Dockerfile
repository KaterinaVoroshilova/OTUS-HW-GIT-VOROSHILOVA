# Вместо node:22.14.0, укажите актуальную версию node lts. https://nodejs.org/en/about/previous-releases#looking-for-the-latest-release-of-a-version-branch
FROM node:22.17.1

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json внутрь контейнера
COPY package.json package-lock.json ./

# Устанавливаем зависимости проекта
RUN npm ci

# Копируем все остальные файлы проекта внутрь контейнера
COPY . .

# В докере для улучшения кэширования рекомендуется сначала копировать файлы
# package.json и package-lock.json, а затем выполнять
# установку зависимостей и копировать остальные файлы проекта

# Опционально: можно добавить команду, которая будет запускаться при старте контейнера
# CMD ["npm", "start"]