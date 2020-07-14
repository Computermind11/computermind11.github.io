"use strict";

//Объект анимаций.
class Animations {
    /**
     * Функция-конструктор объектов класса "Animations".
     */
    constructor() {
        this.firstButton = document.querySelector(`button[data-button="1"]`);
        this.secondButton = document.querySelector(`button[data-button="2"]`);
    }
    /**
     * Метод добавляет слушателя события клика на кнопку "FEATURED PRODUCTS".
     */
    addListenerOnFirstButton() {
        this.firstButton.addEventListener("click", () => {
            if (!this.firstButton.classList.contains("clicked")) {
                this.firstButton.classList.add("clicked");
                this.secondButton.classList.remove("clicked");
            }
        });
    }
    /**
     * Метод добавляет слушателя события клика на кнопку "LATEST PRODUCTS".
     */
    addListenerOnSecondButton() {
        this.secondButton.addEventListener("click", () => {
            if (!this.secondButton.classList.contains("clicked")) {
                this.secondButton.classList.add("clicked");
                this.firstButton.classList.remove("clicked");
                this.firstButton.style.color = "#282d3b";
                this.firstButton.style.borderColor = "lightgray";
            }
        });
    }
    /**
     * Метод добавляет слушателей события наведения мыши, убирания мыши и клика на иконки-звездочки рейтинга товаров.
     */
    addListenersOnRatingButtons() {
        //Запускаем через 1 секунду, чтобы товары успели выгрузиться с сервера, иначе не будет работать.
        setTimeout(() => {
            let allParagraphs = document.querySelectorAll(".item p");
            let allIcons = [];

            for (let i = 0; i < allParagraphs.length; i++) {
                allIcons.push(allParagraphs[i].children);
            }

            this.addMouseoverOnIcons(allIcons); //Добавляем слушателей события наведения мыши.
            this.addMouseoutOnIcons(allIcons); //Добавляем слушателей события убирания мыши.
            this.addClickOnIcons(allIcons, allParagraphs); //Добавляем слушателей события клика мыши.
        }, 1000);
    }
    /**
     * Метод меняет цвета иконок-звездочек рейтинга товаров.
     * @param {Object} event - объект события.
     * @param {Array} allIcons - двухмерный массив иконок-звездочек рейтинга товаров.
     * @param {number} i - индекс массива иконок-звездочек в двухмерном массиве "allIcons".
     * @param {string} color - цвет иконок-звездочек.
     */
    changeColor(event, allIcons, i, color) {
        if (event.target == allIcons[i][0]) {
            allIcons[i][0].style.color = color;
        } else if (event.target == allIcons[i][1]) {
            allIcons[i][0].style.color = color;
            allIcons[i][1].style.color = color;
        } else if (event.target == allIcons[i][2]) {
            allIcons[i][0].style.color = color;
            allIcons[i][1].style.color = color;
            allIcons[i][2].style.color = color;
        } else if (event.target == allIcons[i][3]) {
            allIcons[i][0].style.color = color;
            allIcons[i][1].style.color = color;
            allIcons[i][2].style.color = color;
            allIcons[i][3].style.color = color;
        } else if (event.target == allIcons[i][4]) {
            allIcons[i][0].style.color = color;
            allIcons[i][1].style.color = color;
            allIcons[i][2].style.color = color;
            allIcons[i][3].style.color = color;
            allIcons[i][4].style.color = color;
        }
    }
    /**
     * Метод добавляет слушателей события наведения мыши на иконки-звездочки рейтинга товаров.
     * @param {Array} allIcons - двухмерный массив иконок-звездочек рейтинга товаров.
     */
    addMouseoverOnIcons(allIcons) {
        for (let i = 0; i < allIcons.length; i++) {
            for (let a = 0; a < allIcons[i].length; a++) {
                allIcons[i][a].addEventListener("mouseover", (event) => {
                    this.changeColor(event, allIcons, i, "#343a40");
                });
            }
        }
    }
    /**
     * Метод добавляет слушателей события убирания мыши с иконок-звездочек рейтинга товаров.
     * @param {Array} allIcons - двухмерный массив иконок-звездочек рейтинга товаров.
     */
    addMouseoutOnIcons(allIcons) {
        this.mouseOut = (event) => {
            for (let i = 0; i < allIcons.length; i++) {
                for (let a = 0; a < allIcons[i].length; a++) {
                    this.changeColor(event, allIcons, i, "lightgray");
                }
            }
        };

        for (let i = 0; i < allIcons.length; i++) {
            for (let a = 0; a < allIcons[i].length; a++) {
                allIcons[i][a].addEventListener("mouseout", this.mouseOut);
            }
        }
    }
    /**
     * Метод добавляет слушателей события клика на иконки-звездочки рейтинга товаров.
     * @param {Array} allIcons - двухмерный массив иконок-звездочек рейтинга товаров.
     * @param {Array} allParagraphs - массив параграфов, внутри которых находятся иконки-звездочки рейтинга товаров.
     */
    addClickOnIcons(allIcons, allParagraphs) {
        for (let i = 0; i < allIcons.length; i++) {
            for (let a = 0; a < allIcons[i].length; a++) {
                allIcons[i][a].addEventListener("click", (event) => {
                    this.changeColor(event, allIcons, i, "#343a40");
                    allIcons[i][a].removeEventListener("mouseout", this.mouseOut);
                    allParagraphs[i].style.pointerEvents = "none";
                });
            }
        }
    }
    /**
     * Метод назначает слушателя события скроллинга страницы на окно браузера. Он переопределяет стили у элементов страницы
     * в зависимости от прокрутки страницы вверх-вниз.
     */
    addScrollingListener() {
        let nav = document.querySelector("nav");
        let navLogo = document.querySelector("nav .logo");
        let allNavButtons = document.querySelectorAll(".navButtons li");
        let section01 = document.querySelector(".s1");
        let windowScroller = document.getElementById("windowScroller");

        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 110) {
                nav.classList.remove("static");
                nav.classList.add("fixed");
                navLogo.style.display = "block";
                allNavButtons.forEach(element => element.style.display = "block");
                section01.style.marginTop = "10.25%";
                windowScroller.style.opacity = "0.7";
                windowScroller.style.pointerEvents = "auto";
            } else if (window.pageYOffset <= 110) {
                nav.classList.remove("fixed");
                nav.classList.add("static");
                navLogo.style.display = "none";
                allNavButtons.forEach(element => element.style.display = "none");
                section01.style.marginTop = "2%";
                windowScroller.style.opacity = "0";
                windowScroller.style.pointerEvents = "none";
            }
        });
    }
    /**
     * Метод запускает прокрутку экрана наверх после нажатия на кнопку скроллинга.
     */
    makeScrolling() {
        let idTimeout = null;

        const scrolling = () => {
            if (window.pageYOffset > 0) {
                window.scrollBy(0, -35);
                idTimeout = setTimeout(scrolling, 15);
            } else {
                clearTimeout(idTimeout);
            }
        };

        document.getElementById("windowScroller").addEventListener("click", scrolling);
    }
}


//Запускаем анимации после полной загрузки страницы.
window.addEventListener("load", () => {
    const animations = new Animations(); //Создаем объект анимаций.
    animations.addListenerOnFirstButton(); //Запускаем метод, который добавляет слушателя события клика на кнопку "FEATURED PRODUCTS".
    animations.addListenerOnSecondButton(); //Запускаем метод, который добавляет слушателя события клика на кнопку "LATEST PRODUCTS".
    animations.addListenersOnRatingButtons(); //Запускаем метод, который добавляет слушателей событий на иконки-звездочки рейтинга товаров.
    animations.addScrollingListener(); //Запускаем метод, который добавляет слушателя события скроллинга страницы на окно браузера.
    animations.makeScrolling(); //Запускаем метод, который добавляет слушателя события клика на кнопку скроллинга экрана.
});