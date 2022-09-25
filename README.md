#  Дипломный проект: Сервис по поиску информации о фильмах "Movie Explorer"
Это backend сервиса

Адрес: [api.alex-shelukhin-movies.nomorepartiesxyz.ru](https://api.alex-shelukhin-movies.nomorepartiesxyz.ru)  
Публичный IPv4: [178.154.206.63](http://178.154.206.63)

## Реализованные запросы на стороне backend

### Регистрация ➡️
```
POST-запрос http://localhost:3000/signup  
POST-запрос https://api.alex-shelukhin-movies.nomorepartiesxyz.ru/signup
```
В запросе должен быть объект c именем, email-ом и паролем пользователя
```
{
  "name": "Александр",
  "email": "example@example.com",
  "password": "password", 
}
```
---

### Авторизация ⬅️

```
POST-запрос http://localhost:3000/signin  
POST-запрос https://api.alex-shelukhin-movies.nomorepartiesxyz.ru/signin
```
В запросе должен быть объект c email-ом и паролем пользователя
```
{
  "email": "example@example.com",
  "password": "password",
}
```
---

### Редактирование профиля 🔁

```
PATCH-запрос http://localhost:3000/users/me  
PATCH-запрос https://api.alex-shelukhin-movies.nomorepartiesxyz.ru/users/me
```
В запросе должен быть объект c именем и email-ом пользователя
```
{
  "name": "Александр", // Имя пользователя
  "email": "example@example.com", // Email пользователя
}
```
---

### Получить данные о текущем пользователе ⤵️
```
GET-запрос http://localhost:3000/users/me  
GET-запрос https://api.alex-shelukhin-movies.nomorepartiesxyz.ru/users/me
```
---

### Получить даннык о всех сохраненных фильмах ⤵️️
```
GET-запрос http://localhost:3000/movies
GET-запрос https://api.alex-shelukhin-movies.nomorepartiesxyz.ru/movies
```

### Добавить новый фильм ⤴️
```
POST-запрос http://localhost:3000/movies
POST-запрос https://api.alex-shelukhin-movies.nomorepartiesxyz.ru/movies
```
В запросе объект должен содержать страну, режиссера, продолжительность, год выхода, описание фильма, ссылку на постер, ссылку на трейлер, ссылку на миниатюру постера, id из базы данных, название на русской языке и название на английском языке
```
{
    "country": "СССР",
    "director": "Леонид Гайдай",
    "duration": "95",
    "year": "1965",
    "description": "Студент Шурик попадает в самые невероятные ситуации: сражается с хулиганом Верзилой, весьма оригинальным способом готовится к экзамену и предотвращает «ограбление века», на которое идёт троица бандитов — Балбес, Трус и Бывалый.",
    "image": "https://via.placeholder.com/150",
    "trailerLink": "https://via.placeholder.com/150",
    "thumbnail": "https://via.placeholder.com/150",
    "movieId": "3",
    "nameRU": "Операция «Ы» и другие приключения Шурика",
    "nameEN": "Operaciya «Y» i drugie priklyucheniya SHurika"
}
```
---

### Удалить фильм ❌
:id - идентификатор фильма в базе
```
DELETE-запрос http://localhost:3000/movies/:id
DELETE-запрос https://api.alex-shelukhin-movies.nomorepartiesxyz.ru/movies/:id
```
---

