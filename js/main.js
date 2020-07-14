"use strict";

//Главный объект модуля онлайн-магазина.
class Main {
    /**
     * Функция-конструктор объектов класса "Main".
     */
    constructor() {
        this.cart = document.querySelectorAll(".productsInCart");
        this.emptyCart = document.querySelectorAll(".emptyCart");
        this.productCatalog = document.getElementById("productCatalog");
        this.errorMessage = document.querySelector("#productCatalog .errorMessage");
        this.products = [];
        this.productsInCart = [];
        this.totalItems = 0;
        this.totalCost = 0;
    }
    /**
     * Метод отправляет данные на сервер.
     * @param {string} url - адрес ресурса, куда будем отправлять данные.
     * @param {Object} data - данные, которые надо добавить в JSON-файл на сервере.
     * @param {Object} callback - функция, которая вызывается после получения ответа от сервера.
     */
    makePOSTRequest(url, data, callback) {
        let xhr = null;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 ) {
                callback(xhr.responseText);
            }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data)); //Перед отправкой переводим данные в формат JSON.
    }
    /**
     * Метод запускает в работу метод "makePOSTRequest()" для добавления данных в JSON-файл на сервере.
     * @param {string} API_URL - адрес ресурса, куда будем отправлять данные.
     * @param {Object} product - данные (в нашем случае это объект товара), которые будем отправлять.
     */
    sendDataToServer(API_URL, product) {
        this.makePOSTRequest(API_URL, product, (error) => console.log(error));
    }
    /**
     * Метод создает запрос к серверу для получения данных.
     * @param {string} url - адрес ресурса, куда необходимо сделать запрос.
     * @param {Object} callback - функция, которая вызывается после получения ответа от сервера.
     */
    makeGETRequest(url, callback) {
        let xhr = null;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }
    /**
     * Метод запускает в работу метод "makeGETRequest()" для получения JSON-файла на сервере. После получения ответа от сервера
     * создается новый промис, который в течение 0.15 секунды проверяет: если файл JSON был успешно получен (и он не пустой),
     * то запускается обработчик промиса, который заполняет массив товарами, извлекая их из JSON-файла.
     * @param {string} API_URL - адрес ресурса, куда будем отправлять запрос на получение данных.
     * @returns {Object} - промис.
     */
    extractDataFromServer(API_URL) {
        this.makeGETRequest(API_URL, (catalog) => {
            const create = () => { //Функция создает новый промис.
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (catalog.length != 0) { //Если JSON-файл получен и длина строки в нем не равна 0, то:
                            resolve(); //Запускаем обработчика промиса.
                        } else {
                            reject("Error"); //В противном случае выведем на экран и в консоль ошибку.
                        }
                    }, 150);
                });
            };

            create()
                .then(() => {
                if (API_URL == "catalog") { //Если мы обращались на сервер к файлу каталога, то:
                    this.products = JSON.parse(catalog); //Заполняем массив "products" товарами из JSON-файла каталога товаров.
                    this.insertCatalogInHTML(); //Запускаем метод, который вставляет каталог товаров в HTML-страницу.

                    //Следующие методы запускаем с задержкой, чтобы каталог товаров успел появиться на HTML-странице, иначе работать не будет.
                    setTimeout(() => {
                        const search = new Search(this.products); //Создаем объект модуля поиска товаров в каталоге.
                        search.addListenerOnSearchButton(); //Запускаем метод, который добавляет слушателя события клика на кнопку поиска товаров.
                        this.addListenersOnBuyButtons(); //Добавляем слушателей события клика на кнопки добавления товаров в корзину.
                    }, 100);
                } else if (API_URL == "cart") { //Если мы обращались на сервер к файлу корзины, то:
                    this.productsInCart = JSON.parse(catalog); //Заполняем массив "productsInCart" товарами из JSON-файла корзины.
                }
            })
                .catch((error) => {
                this.errorMessage.style.display = "block"; //Делаем блок сообщения об ошибке видимым на экране.
                console.log(error);
            });
        });
    }
    /**
     * Метод создает блок HTML-кода для каждого товара из массива "products", который является каталогом товаров.
     * @param {number} i - индекс товара в массиве товаров "products".
     * @returns {string} - готовый блок HTML-кода товара.
     */
    createProductBlock(i) {
        return `<div class="item">
                    <div>
                        <img src="${this.products[i].img01}" alt="productImage">
                        <img src="${this.products[i].img02}" alt="productImage">
                        <a class="info" href="#" title="Info about product"><i class="fa fa-question-circle-o" aria-hidden="true"></i></a>
                        <button class="addToCart" title="Add to cart!"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
                    </div>
                    <h3>${this.products[i].title}</h3>
                    <button class="addToWishlist" title="Add to Wishlist!"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                    <p><i class="fa fa-star" title="Rate product!" aria-hidden="true"></i><i class="fa fa-star" title="Rate product!" aria-hidden="true"></i><i class="fa fa-star" title="Rate product!" aria-hidden="true"></i><i class="fa fa-star" title="Rate product!" aria-hidden="true"></i><i class="fa fa-star" title="Rate product!" aria-hidden="true"></i></p>
                    <span>$${this.products[i].price}</span>
                </div>`;
    }
    /**
     * Метод вставляет в HTML-страницу блоки HTML-кода товаров из массива "products", который является каталогом товаров.
     */
    insertCatalogInHTML() {
        for (let i = 0; i < this.products.length; i++) {
            this.productCatalog.insertAdjacentHTML("beforeend", this.createProductBlock(i));
        }
    }
    /**
     * Метод добавляет слушателей события клика на кнопки "Add to cart!" добавления товаров в корзину.
     */
    addListenersOnBuyButtons() {
        let addToCartButtons = document.querySelectorAll(".addToCart");
        for (let i = 0; i < addToCartButtons.length; i++) {
            addToCartButtons[i].addEventListener("click", () => {
                this.productsInCart[i].counter++; //Увеличиваем счетчик данного товара на 1.
                this.sendDataToServer("cart", this.productsInCart[i]); //Отправляем данные в файл корзины на сервере.
                this.productsInCart[i].status = "addedToCart"; //Добавляем объекту товара свойство "status" со значением "addedToCart".
                this.sendDataToServer("statistics", this.productsInCart[i]); //Отправляем данные в файл статистики действий пользователя на сервере.
                this.getTotalItems(); //Пересчитываем общее количество товаров в корзине и отображаем его.
                this.getTotalCost(); //Пересчитываем общую стоимость корзины товаров и отображаем ее.
                this.checkCart(); //Проверяем, есть ли в корзине какие-то товары или нет.

                if (this.productsInCart[i].counter == 1) { //Если товара в корзине было 0, то:
                    this.insertProductBlockInCart(i); //Вставляем строку с выбранным пользователем продуктом в корзину.
                    this.addListenersOnDeleteButtons(i); //Добавляем слушателя события клика на кнопку удаления товара из корзины.
                } else if (this.productsInCart[i].counter > 1) {
                    this.changeMeterValue(i); //В противном случае просто меняем значение счетчика товара в корзине.
                }
            });
        }
    }
    /**
     * Метод создает блок HTML-кода для каждого товара из массива "productsInCart", который является каталогом корзины товаров.
     * @param {number} i - индекс товара в массиве корзины товаров "productsInCart".
     * @returns {string} - готовый блок HTML-кода товара.
     */
    createProductBlockForCart(i) {
        return `<div class="cartRow" data-row="${i}">
                    <p class="product">
                        <span>${this.productsInCart[i].title}</span>
                        <span class="meter${i}">${this.productsInCart[i].counter} x $${this.productsInCart[i].price}</span>
                    </p>
                    <div class="cartImage">
                        <img src="${this.productsInCart[i].img01}" alt="cartImage" width="100" height="100"><span class="deleteButton" data-delete="${i}">x</span>
                    </div>
                </div>`;
    }
    /**
     * Метод вставляет в корзину блоки HTML-кода товаров из массива "productsInCart", который является каталогом корзины товаров.
     * @param {number} i - индекс товара в массиве корзины товаров "productsInCart".
     */
    insertProductBlockInCart(i) {
        for (let a = 0; a < this.cart.length; a++) {
            this.cart[a].insertAdjacentHTML("beforeend", this.createProductBlockForCart(i));
        }
    }
    /**
     * Метод добавляет слушателей события клика на кнопки удаления товаров из корзины.
     * @param {number} i - индекс товара в массиве корзины товаров "productsInCart".
     */
    addListenersOnDeleteButtons(i) {
        let deleteButtons = document.querySelectorAll(`span[data-delete="${i}"]`);
        for (let a = 0; a < deleteButtons.length; a++) {
            deleteButtons[a].addEventListener("click", () => {
                this.productsInCart[i].counter--; //Уменьшаем счетчик данного товара на 1.
                this.sendDataToServer("cart", this.productsInCart[i]); //Отправляем данные в файл корзины на сервере.
                this.productsInCart[i].status = "removedFromCart"; //Добавляем объекту товара свойство "status" со значением "removedFromCart".
                this.sendDataToServer("statistics", this.productsInCart[i]); //Отправляем данные в файл статистики действий пользователя на сервере.
                this.getTotalItems(); //Пересчитываем общее количество товаров в корзине и отображаем его.
                this.getTotalCost(); //Пересчитываем общую стоимость корзины товаров и отображаем ее.
                this.checkCart(); //Проверяем, есть ли в корзине какие-то товары или нет.

                if (this.productsInCart[i].counter > 0) { //Если товара в корзине было больше 1, то:
                    this.changeMeterValue(i); //Меняем значение счетчика товара в корзине.
                } else if (this.productsInCart[i].counter == 0) {
                    this.removeProductBlockFromCart(i); //В противном случае удаляем товарную строку из корзины.
                }
            });
        }
    }
    /**
     * Метод считает и отображает общее количество всех товаров в корзине.
     */
    getTotalItems() {
        this.totalItems = this.productsInCart.reduce((sum, element) => sum += element.counter, 0);

        document.querySelectorAll(".counter").forEach(element => element.innerText = `${this.totalItems}`);
        document.querySelectorAll(".itemCounter").forEach(element => element.innerText = `${this.totalItems} ITEMS`);
    }
    /**
     * Метод считает и отображает общую стоимость всех товаров в корзине.
     */
    getTotalCost() {
        this.totalCost = this.productsInCart.reduce((sum, element) => sum += element.price * element.counter, 0);

        document.querySelectorAll(".totalCost").forEach(element => element.innerText = `$${this.totalCost}`);
    }
    /**
     * Метод проверяет, есть ли товары в корзине. Если товаров нет, то текстовый блок об отсутствии товаров будет показан.
     * Если товары в корзине есть, то текстовый блок будет скрыт.
     */
    checkCart() {
        if (this.totalItems == 0) {
            this.emptyCart.forEach(element => element.style.display = "block");
        } else if (this.totalItems > 0) {
            this.emptyCart.forEach(element => element.style.display = "none");
        }
    }
    /**
     * Метод меняет счетчик товара в корзине.
     * @param {number} i - индекс товара в массиве корзины товаров "productsInCart".
     */
    changeMeterValue(i) {
        document.querySelectorAll(`.meter${i}`).forEach(element => element.innerText = `${this.productsInCart[i].counter} x $${this.productsInCart[i].price}`);
    }
    /**
     * Метод удаляет товарную строку из корзины.
     * @param {number} i - индекс товара в массиве корзины товаров "productsInCart".
     */
    removeProductBlockFromCart(i) {
        document.querySelectorAll(`div[data-row="${i}"]`).forEach(element => element.remove());
    }
    /**
     * Метод обнуляет на сервере файл корзины и файл статистики действий пользователя в том случае, если страница была загружена
     * по-новой. Это нужно, чтобы те данные, которые там остались после предыдущей сессии пользователя, не мешали его новой сессии.
     */
    zeroizeJSONFilesOnServer() {
        let loaded = sessionStorage.getItem("loaded");

        if (loaded) { //Если событие загрузки или перезагрузки произошло, то:
            this.sendDataToServer("cart", {id: 0}); //Отправляем на сервер в файл корзины один объект с "id" = 0.
            this.sendDataToServer("statistics", {id: 0}); //Отправляем на сервер в файл статистики один объект с "id" = 0.
        } else {
            sessionStorage.setItem("loaded", true);
        }
    }
}


//Объект модуля поиска товаров в каталоге.
class Search {
    /**
     * Функция-конструктор объектов класса "Search".
     * @param {Array} products - массив объектов товаров каталога.
     */
    constructor(products) {
        this.searchInput = document.querySelector(`.search input[type="text"]`);
        this.searchButton = document.querySelector(".search button");
        this.allProductsOnPage = document.querySelectorAll(".item");
        this.products = products;
    }
    /**
     * Метод добавляет слушателя события клика на кнопку поиска товаров в каталоге. При нажатии на кнопку происходит фильтрация
     * каталога по введенному пользователем названию товара и отображение на странице отфильтрованных товаров.
     */
    addListenerOnSearchButton() {
        this.searchButton.addEventListener("click", () => {
            this.createTemplateForSearch(); //Создаем шаблон для фильтрации товаров в каталоге.
            this.filterAllFoundProducts(); //Фильтруем каталог товаров по шаблону.
            this.showFilteredProducts(); //Отображаем отфильтрованные товары.
            this.searchInput.value = ""; //В конце чистим поле для ввода нового поискового слова.
        });
    }
    /**
     * Метод создает шаблон регулярного выражения из слова, введенного пользователем в поле для поиска. Затем по этому шаблону будет
     * происходить фильтрация каталога.
     */
    createTemplateForSearch() {
        this.templateForSearch = new RegExp(this.searchInput.value, "i");
    }
    /**
     * Метод фильтрует весь каталог товаров по шаблону созданного регулярного выражения и отбирает только соответствующие товары.
     */
    filterAllFoundProducts() {
        this.filteredProducts = this.products.filter(element => this.templateForSearch.test(element.title));
    }
    /**
     * Метод отображает на странице каталога только отфильтрованные по шаблону товары, а остальные товары скрывает.
     */
    showFilteredProducts() {
        for (let i = 0; i < this.products.length; i++) {
            if (this.filteredProducts.includes(this.products[i])) { //Если массив отфильтрованных товаров содержит товар из каталога, то:
                this.allProductsOnPage[i].style.display = "block"; //Этот товар будет видимым на странице.
            } else {
                this.allProductsOnPage[i].style.display = "none"; //В противном случае этот товар будет скрыт.
            }
        }
    }
}


//Создаем модуль онлайн-магазина после полной загрузки страницы.
window.addEventListener("load", () => {
    document.querySelector(".date").innerText = `2017 - ${new Date().getFullYear()}`; //Вставляем даты в футер.

    const main = new Main(); //Создаем главный объект модуля онлайн-магазина.
    main.zeroizeJSONFilesOnServer(); //Запускаем метод, который обнуляет файлы на сервере, если страница магазина была перезагружена.

    //Следующие методы запускаем с задержкой, чтобы файлы на сервере успели обнулиться после загрузки страницы.
    setTimeout(main.extractDataFromServer.bind(main), 50, "catalog"); //Запускаем метод, который получает товары из JSON-файла каталога.
    setTimeout(main.extractDataFromServer.bind(main), 50, "cart"); //Запускаем метод, который получает товары из JSON-файла корзины.
});