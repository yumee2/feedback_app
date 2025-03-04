## Тестовое задание (feedback post server)

### Дополнения к заданию

Так как в задании указывалась возможность добавлять дополнительные функции, я решил добавить новую модель данных: доски (Boards). По аналогии с рабочимм примером - <a href="https://nolt.io/new-board">https://nolt.io/new-board</a>. Также была добавлена авторизация основанная на JWT токенах, поэтому некоторые запросы требуют добавленимя access токена. 

### Как запустить
Есть три способа запустить проект.
<ul>
  <li>Запустить локально репозиторий</li>
  <li>Запустить с помощью Docker</li>
  <li>Использовать удаленный сервер</li>
</ul>

#### 1. Локальный сервер без Docker 
Для того чтобы локально развернуть сервер без использования Docker, нужно склонировать репозиторий
```git clone https://github.com/yumee2/feedback_app.git```
Установить зависимости 
```npm install```
Создать .env файл со следующими полями
```
JWT_SECRET="SECRET"
DATABASE_URL="postgresql://user:password@localhost:5432/feedback_db?schema=public"
PORT=3000
```
Замените user, password и feedback_db на ваши данные.

Выполнить миграции 
```npx prisma migrate dev --name init```
```npx prisma generate```
И запустить сервер
```npm run dev```

#### 2. Локальный сервер с помощью docker

Для этого способа нужен docker compose файл находящийся в корневой директории репозитория. 
И в консоли выполнить комманду:
```docker-compose up --build -d```
Это запустит docker контейнеры.

#### 3. Использовать удаленный сервер

Удаленный сервер доступен по адресу: http://84.201.146.66:3000

Во всех способах можно как отрправлять запросы напрямую так и использовать swagger документацию, доступную по адресу сервера /docs, например http://84.201.146.66:3000/docs
