"use strict";

//Объект слайдера.
class Slider {
    /**
     * Функция-конструктор объектов класса "Slider".
     */
    constructor() {
        this.slider = document.getElementById("slider");
        this.allSlides = document.getElementsByClassName("slide");
        this.allSliderImages = document.querySelectorAll(".slide img");
        this.allLeftArrows = document.getElementsByClassName("fa-angle-left");
        this.allRightArrows = document.getElementsByClassName("fa-angle-right");
        this.allSliderButtons = document.querySelector(".sliderButtons").children;
        this.timer = 14800;
        this.idInterval = null;
        this.idTimeout01 = null;
        this.idTimeout02 = null;
        this.idTimeout03 = null;
        this.idTimeout04 = null;
        this.idTimeout05 = null;
        this.idTimeout06 = null;
        this.idTimeout07 = null;
        this.idTimeout08 = null;
    }
    /**
     * Метод создает и вставляет вращающуюся иконку в окно слайдера. Иконка видима до тех пор, пока страница полностью не загрузится.
     */
    addSpinIcon() {
        let icon = document.createElement("i"); //Создаем вращающуюся иконку загрузки.
        icon.classList.add("fa", "fa-spinner", "fa-spin");
        icon.setAttribute("aria-hidden", "true");
        this.slider.insertAdjacentElement("afterbegin", icon); //Вставляем ее в HTML-страницу.

        window.addEventListener("load", () => { //Если страница загрузилась, то:
            icon.style.display = "none"; //Скрываем иконку.
        });
    }
    /**
     * Метод запускает в работу слайдер.
     */
    launchSlider() {
        window.addEventListener("load", () => { //Если страница загрузилась, то:
            this.showAndHideAllSlides(3, 0, 1, 2); //Запускаем показ слайдов.
            this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 3, 0, 1, 2); //Делаем бесконечный показ слайдов.
            this.addSliderListeners(); //Добавляем слушателей события клика на все правые и левые стрелки, а также на кнопки внизу слайдера.
        });
    }
    /**
     * Метод скрывает текущий слайд и показывает следующий.
     * @param {number} index1 - индекс слайда, который надо скрыть.
     * @param {number} index2 - индекс слайда, который надо показать.
     */
    showAndHideSlide(index1, index2) {
        this.allSlides[index1].style.display = "none"; //Скрываем текущий слайд.
        this.allSliderButtons[index1].classList.remove("currentButton"); //Чистим стили у кнопок внизу слайдера.
        this.allSlides[index2].style.display = "block"; //Показываем следующий слайд.
        this.allSliderImages[index2].style.animation = "appearanceSliderImage 0.9s"; //Добавляем анимацию плавного появления слайда.
        this.allSliderButtons[index2].classList.add("currentButton"); //Добавляем нужные стили нужной кнопке внизу слайдера.
    }
    /**
     * Метод поочередно скрывает и показывает все слайды согласно таймерам.
     * @param {number} index1 - индекс слайда, который надо скрыть или показать в данный момент.
     * @param {number} index2 - индекс слайда, который надо скрыть или показать в данный момент.
     * @param {number} index3 - индекс слайда, который надо скрыть или показать в данный момент.
     * @param {number} index4 - индекс слайда, который надо скрыть или показать в данный момент.
     */
    showAndHideAllSlides(index1, index2, index3, index4) {
        this.idTimeout01 = setTimeout(this.showAndHideSlide.bind(this), 0, index1, index2); //Скрываем последний и показываем первый слайды.
        this.idTimeout02 = setTimeout(this.animationDisappearance.bind(this), 3000); //Меняем анимацию плавного появления на плавное исчезание.
        this.idTimeout03 = setTimeout(this.showAndHideSlide.bind(this), 3700, index2, index3); //Скрываем первый и показываем второй слайды.
        this.idTimeout04 = setTimeout(this.animationDisappearance.bind(this), 6700); //Меняем анимацию плавного появления на плавное исчезание.
        this.idTimeout05 = setTimeout(this.showAndHideSlide.bind(this), 7400, index3, index4); //Скрываем второй и показываем третий слайды.
        this.idTimeout06 = setTimeout(this.animationDisappearance.bind(this), 10400); //Меняем анимацию плавного появления на плавное исчезание.
        this.idTimeout07 = setTimeout(this.showAndHideSlide.bind(this), 11100, index4, index1); //Скрываем третий и показываем последний слайды.
        this.idTimeout08 = setTimeout(this.animationDisappearance.bind(this), 14100); //Меняем анимацию плавного появления на плавное исчезание.
    }
    /**
     * Метод добавляет слайдам анимацию плавного исчезания.
     */
    animationDisappearance() {
        this.allSliderImages.forEach(element => element.style.animation = "disappearanceSliderImage 0.8s");
    }
    /**
     * Метод отменяет все таймеры фунции "showAndHideAllSlides()" и "setInterval()".
     */
    clearTimeoutsAndInterval() {
        clearInterval(this.idInterval);
        clearTimeout(this.idTimeout01);
        clearTimeout(this.idTimeout02);
        clearTimeout(this.idTimeout03);
        clearTimeout(this.idTimeout04);
        clearTimeout(this.idTimeout05);
        clearTimeout(this.idTimeout06);
        clearTimeout(this.idTimeout07);
        clearTimeout(this.idTimeout08);
    }
    /**
     * Метод скрывает все слайды и чистит ненужные стили у кнопок внизу слайдера.
     */
    hideAllSlides() {
        for (let i = 0; i < this.allSlides.length; i++) {
            this.allSlides[i].style.display = "none";
            this.allSliderButtons[i].classList.remove("currentButton");
        }
    }
    /**
     * Метод в одном цикле добавляет слушателей события клика на все правые и левые стрелки, а также на все кнопки внизу слайдера.
     */
    addSliderListeners() {
        for (let i = 0; i < this.allSlides.length; i++) {
            this.allLeftArrows[i].addEventListener("click", () => { //Добавляем слушателей события клика на левые стрелки.
                this.clearTimeoutsAndInterval(); //Отменяем все показы всех слайдов.
                this.hideAllSlides(); //Скрываем все слайды и чистим ненужные стили у кнопок внизу слайдера.

                if (i == 0) {
                    this.showAndHideAllSlides(2, 3, 0, 1); //Запускаем показ слайдов по-новой.
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 2, 3, 0, 1); //Делаем бесконечный показ слайдов.
                } else if (i == 1) {
                    this.showAndHideAllSlides(3, 0, 1, 2); //Запускаем показ слайдов по-новой.
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 3, 0, 1, 2); //Делаем бесконечный показ слайдов.
                } else if (i == 2) {
                    this.showAndHideAllSlides(0, 1, 2, 3); //Запускаем показ слайдов по-новой.
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 0, 1, 2, 3); //Делаем бесконечный показ слайдов.
                } else if (i == 3) {
                    this.showAndHideAllSlides(1, 2, 3, 0); //Запускаем показ слайдов по-новой.
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 1, 2, 3, 0); //Делаем бесконечный показ слайдов.
                }
            });


            this.allRightArrows[i].addEventListener("click", () => { //Добавляем слушателей события клика на правые стрелки.
                this.clearTimeoutsAndInterval();
                this.hideAllSlides();

                if (i == 0) {
                    this.showAndHideAllSlides(0, 1, 2, 3);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 0, 1, 2, 3);
                } else if (i == 1) {
                    this.showAndHideAllSlides(1, 2, 3, 0);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 1, 2, 3, 0);
                } else if (i == 2) {
                    this.showAndHideAllSlides(2, 3, 0, 1);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 2, 3, 0, 1);
                } else if (i == 3) {
                    this.showAndHideAllSlides(3, 0, 1, 2);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 3, 0, 1, 2);
                }
            });


            this.allSliderButtons[i].addEventListener("click", () => { //Добавляем слушателей события клика на кнопки внизу слайдера.
                this.clearTimeoutsAndInterval();
                this.hideAllSlides();

                if (i == 0) {
                    this.showAndHideAllSlides(3, 0, 1, 2);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 3, 0, 1, 2);
                } else if (i == 1) {
                    this.showAndHideAllSlides(0, 1, 2, 3);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 0, 1, 2, 3);
                } else if (i == 2) {
                    this.showAndHideAllSlides(1, 2, 3, 0);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 1, 2, 3, 0);
                } else if (i == 3) {
                    this.showAndHideAllSlides(2, 3, 0, 1);
                    this.idInterval = setInterval(this.showAndHideAllSlides.bind(this), this.timer, 2, 3, 0, 1);
                }
            });
        }
    }
}


//Создаем и запускаем слайдер после построения DOM.
window.addEventListener("DOMContentLoaded", () => {
    const slider = new Slider(); //Создаем объект слайдера.
    slider.addSpinIcon(); //Запускаем метод, который создает вращающуюся иконку в окне слайдера.
    slider.launchSlider(); //Запускаем метод, который запускает слайдер.
});