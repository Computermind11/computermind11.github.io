"use strict";

//Объект модуля подписки на рассылку.
class Subscribe {
    /**
     * Функция-конструктор объектов класса "Subscribe".
     */
    constructor() {
        this.emailInput = document.querySelector(`#subscribe input[type="email"]`);
        this.subscribeButton = document.querySelector("#subscribe button");
        this.subscribeSpan = document.querySelector("#subscribe span");
        this.regExpForEmailInput = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i;
    }
    /**
     * Метод добавляет слушателя события клика на кнопку "SUBSCRIBE". При нажатии на кнопку происходит проверка валидности
     * введенной электронной почты.
     */
    addListenerOnSubscribeButton() {
        this.subscribeButton.addEventListener("click", () => {
            if (this.regExpForEmailInput.test(this.emailInput.value)) { //Если введенная электронная почта валидна, то применяются следующие стили:
                this.subscribeSpan.style.color = "green"; //Цвет текста блока - зеленый.
                this.subscribeSpan.style.outline = "1px solid green"; //Рамка блока - зеленая.
                this.subscribeSpan.innerText = "You signed up!"; //Текст внутри блока.
                this.emailInput.value = ""; //Чистим строку ввода почты.
            } else {
                this.subscribeSpan.style.color = "red"; //В противном случае цвет текста блока - красный.
                this.subscribeSpan.style.outline = "1px solid red"; //Рамка блока - красная.
                this.subscribeSpan.innerText = "E-mail is incorrect!"; //Текст внутри блока.
            }

            this.subscribeSpan.style.display = "block"; //При нажатии на кнопку "SUBSCRIBE" появлется блок с информацией о валидности почты.
            setTimeout(() => this.subscribeSpan.style.display = "none", 2000); //Через 2 секунды он автоматически исчезает.
        });
    }
}


//Запускаем модуль подписки после полной загрузки страницы.
window.addEventListener("load", () => {
    const subscribe = new Subscribe(); //Создаем объект модуля подписки.
    subscribe.addListenerOnSubscribeButton(); //Запускаем метод, который добавляет слушателя события клика на кнопку "SUBSCRIBE".
});