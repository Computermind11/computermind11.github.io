"use strict";

//Объект баннеров.
class Banners {
    /**
     * Функция-конструктор объектов класса "Banners".
     */
    constructor() {
        this.allBannerBlocks = document.getElementsByClassName("bannerBlock");
        this.allBannerImages = document.querySelectorAll(".bannerBlock img");
        this.allBannerButtons = document.querySelector(".bannerButtons").children;
        this.timer = 14800;
    }
    /**
     * Метод запускает в работу баннеры.
     */
    launchBanners() {
        this.showAndHideAllBanners(3, 0, 1, 2); //Запускаем показ баннеров.
        setInterval(this.showAndHideAllBanners.bind(this), this.timer, 3, 0, 1, 2); //Делаем бесконечный показ баннеров.
    }
    /**
     * Метод скрывает текущий баннер и показывает следующий.
     * @param {number} index1 - индекс баннера, который надо скрыть.
     * @param {number} index2 - индекс баннера, который надо показать.
     */
    showAndHideBanner(index1, index2) {
        this.allBannerBlocks[index1].style.display = "none"; //Скрываем текущий баннер.
        this.allBannerButtons[index1].style.color = "gray"; //Меняем цвет кнопки внизу баннеров.
        this.allBannerBlocks[index2].style.display = "block"; //Показываем следующий баннер.
        this.allBannerImages[index2].style.animation = "appearanceBannerImage 0.9s"; //Добавляем анимацию плавного появления баннера.
        this.allBannerButtons[index2].style.color = "lightyellow"; //Добавляем нужный цвет нужной кнопке внизу баннеров.
    }
    /**
     * Метод поочередно скрывает и показывает все баннеры согласно таймерам.
     * @param {number} index1 - индекс баннера, который надо скрыть или показать в данный момент.
     * @param {number} index2 - индекс баннера, который надо скрыть или показать в данный момент.
     * @param {number} index3 - индекс баннера, который надо скрыть или показать в данный момент.
     * @param {number} index4 - индекс баннера, который надо скрыть или показать в данный момент.
     */
    showAndHideAllBanners(index1, index2, index3, index4) {
        setTimeout(this.showAndHideBanner.bind(this), 0, index1, index2); //Скрываем последний и показываем первый баннеры.
        setTimeout(this.animationDisappearance.bind(this), 3000); //Меняем анимацию плавного появления на плавное исчезание.
        setTimeout(this.showAndHideBanner.bind(this), 3700, index2, index3); //Скрываем первый и показываем второй баннеры.
        setTimeout(this.animationDisappearance.bind(this), 6700); //Меняем анимацию плавного появления на плавное исчезание.
        setTimeout(this.showAndHideBanner.bind(this), 7400, index3, index4); //Скрываем второй и показываем третий баннеры.
        setTimeout(this.animationDisappearance.bind(this), 10400); //Меняем анимацию плавного появления на плавное исчезание.
        setTimeout(this.showAndHideBanner.bind(this), 11100, index4, index1); //Скрываем третий и показываем последний баннеры.
        setTimeout(this.animationDisappearance.bind(this), 14100); //Меняем анимацию плавного появления на плавное исчезание.
    }
    /**
     * Метод добавляет баннерам анимацию плавного исчезания.
     */
    animationDisappearance() {
        this.allBannerImages.forEach(element => element.style.animation = "disappearanceBannerImage 0.8s");
    }
}


//Создаем и запускаем баннеры после полной загрузки страницы.
window.addEventListener("load", () => {
    const banners = new Banners(); //Создаем объект баннеров.
    banners.launchBanners(); //Запускаем метод, который запускает баннеры.
});