Авито авто

Описание: Фул стак веб приложение, клон авито авто, с удобным размещением объявления, удобным поиском среди всех объявлений нужного, а также с возможностью узнать дополнительную информацию о машине по вин номеру и пообщавшись с ИИ.  
В папке документации описана схема базы данных.

Функционал: Логин/регистрация (JWT токены Access и Refresh).
Изменение настроек профиля пользователя.  
Просмотр всех объявлений с фильтрацией и поиском.  
Просмотр детальной страницы объявления (полное описание, информация по вин номеру (интеграция со сторонним сервисом), возможность пообщаться с ИИ по поводу этой машины).  
Добавить объявление в избранное (избранность видна на всех страницах с карточкой объявления (главная, история просмотра, профили) и на детальной странице.  
Просмотр списка избранных и просмотренных ранее объявлений.  
Просмотр рекомендаций основанный на истории просмотра.  
Написать продавцу и продолжить переписку в чате (чаты реализованы на Web soccet).  
Размещение объявления где это возможно реализован выбор параметров из списка(трансмиссия, привод и тд) (все марки и модели (по выбранной марке) машин для выбора подгружаются из бд) (есть возможность добавлять множество фотографий к одному объявлению).  
Страница изменения объявления загружается сразу с предвыбранными полями, так что можно изменить только что то одно остальное не трогать и все отработает корректно.  
Удаление объявления, реализовано каскадное удаление (удаляются все записи где встречаются ссылки на данное объявление (таблицы: избранного, история просмотра, фотографии)).  
Просмотр своего или чужого профиля пользователя (выводятся все объявления пользователя).

Технологический стэк:  
бек: express, node.js, ts, knex, bcryptjs, jsonwebtoken, pg, ts-node.  
Фронт: React, ts, reduxjs/toolkit, antd, axios, react-router-dom. Бд: PostgreSQL.

Запуск приложения:  
cd backend  
npm install  
npm start  
cd ../frontend  
npm install  
npm run dev
