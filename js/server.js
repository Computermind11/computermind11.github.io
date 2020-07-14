"use strict";

const fs = require("fs");
const moment = require("moment");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;


app.use(express.static("../"));
app.use(bodyParser.json());


//Получаем данные из файла каталога товаров.
app.get("/catalog", (request, response) => {
    fs.readFile("./JSON/catalog.json", "UTF-8", (error, data) => {
        if (error) {
            response.send(error);
        } else {
            response.send(data);
        }
    });
});

//Получаем данные из файла корзины товаров.
app.get("/cart", (request, response) => {
    fs.readFile("./JSON/cart.json", "UTF-8", (error, data) => {
        if (error) {
            response.send(error);
        } else {
            response.send(data);
        }
    });
});

//Отправляем данные в файл корзины товаров.
app.post("/cart", (request, response) => {
    fs.readFile("./JSON/cart.json", "UTF-8", (error, data) => {
        if (error) {
            response.send(error);
        } else {
            let productsInCart = JSON.parse(data); //Данные в файле корзины товаров.
            let product = request.body; //Отправленные на сервер в файл корзины данные.

            for (let i = 0; i < productsInCart.length; i++) {
                if (product.id == 0) { //Если на сервер отправлен объект с "id" = 0, то:
                    productsInCart[i].counter = 0; //У всех товаров в файле корзины счетчики обнуляются.
                } else if (product.id == productsInCart[i].id && product.counter > productsInCart[i].counter) { //Если счетчик товара возрос, то:
                    productsInCart[i].counter++; //Увеличиваем счетчик данного товара в файле корзины.
                } else if (product.id == productsInCart[i].id && product.counter < productsInCart[i].counter) { //Если счетчик товара уменьшился, то:
                    productsInCart[i].counter--; //Уменьшаем счетчик данного товара в файле корзины.
                }
            }

            fs.writeFile("./JSON/cart.json", JSON.stringify(productsInCart), (error) => {
                if (error) {
                    response.send(error);
                } else {
                    response.send("All right!");
                }
            });
        }
    });
});

//Отправляем данные в файл статистики действий пользователя.
app.post("/statistics", (request, response) => {
    fs.readFile("./JSON/statistics.json", "UTF-8", (error, data) => {
        if (error) {
            response.send(error);
        } else {
            let statisticsFile = JSON.parse(data); //Данные в файле статистики.
            let newUserAction = request.body; //Отправленные на сервер в файл статистики новые данные.
            let timeOfAction = moment().format("MMMM Do YYYY, h:mm:ss"); //Новый объект даты.

            newUserAction.counter = 1; //Пользователь за клик может добавить или удалить только 1 товар, поэтому всем объектам указываем счетчик = 1.
            newUserAction.time = timeOfAction; //Новому объекту статистики добавляем свойство "time", в который записываем его время.
            statisticsFile.push(newUserAction); //В файл статистики добавляем новый объект статистики действий пользователя.

            if (newUserAction.id == 0) { //Если на сервер отправлен объект с "id" = 0, то:
                statisticsFile = []; //Очищаем файл статистики.
            }

            fs.writeFile("./JSON/statistics.json", JSON.stringify(statisticsFile), (error) => {
                if (error) {
                    response.send(error);
                } else {
                    response.send("All right!");
                }
            });
        }
    });
});


app.listen(port, () => console.log(`Example app listening at http://localhost: ${port}.`));