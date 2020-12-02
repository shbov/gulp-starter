
## :hammer_and_wrench: Установка
* установите [NodeJS](https://nodejs.org/en/) (если требуется) и [Yarn](https://yarnpkg.com/en/docs/install)
* скачайте сборку с помощью [Git](https://git-scm.com/downloads): ```git clone https://github.com/shbov/gulp-starter.git```
* установите ```gulp``` глобально: ```yarn global add gulp-cli```
* установите ```bem-tools-core``` глобально: ```yarn global add bem-tools-core```
* перейдите в скачанную папку со сборкой: ```cd gulp-starter```
* скачайте необходимые зависимости: ```yarn``` (Лучше не использовать терминал из [VSCode](https://code.visualstudio.com/))
* чтобы начать работу, введите команду: ```yarn run dev``` (режим разработки)
* чтобы собрать проект, введите команду ```yarn run build``` (режим сборки)

## :keyboard: Команды
* ```yarn run lint:styles``` - проверить SCSS-файлы. Для VSCode необходимо установить [плагин](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint). Для WebStorm
или PHPStorm необходимо включить Stylelint в ```Languages & Frameworks - Style Sheets - Stylelint``` (ошибки будут исправлены автоматически при сохранении файла)
* ```yarn run lint:styles --fix``` - исправить ошибки в SCSS-файлах
* ```yarn run lint:scripts``` - проверить JS-файлы
* ```yarn run lint:scripts --fix``` - исправить ошибки в JS-файлах
* ```yarn run dev``` - запуск сервера для разработки проекта
* ```yarn run build``` - собрать проект с оптимизацией без запуска сервера
* ```yarn run build:netlify``` - собрать проект с оптимизацией для Netlify (без оптимизации картинок)
* ```yarn run build:fast``` - ускоренная сборка проекта (без оптимизации картинок)
* ```yarn run build:views``` - собрать HTML-файлы
* ```yarn run build:json``` - собрать JSON-файлы
* ```yarn run build:styles``` - скомпилировать SCSS-файлы
* ```yarn run build:scripts``` - собрать JS-файлы
* ```yarn run build:images``` - собрать изображения
* ```yarn run build:fonts``` - собрать шрифты
* ```yarn run build:favicons``` - собрать фавиконки
* ```yarn run bem-m``` - добавить БЭМ-блок
* ```yarn run bem-c``` - добавить компонент

## :bulb: Рекомендации по использованию
### Компонентный подход к разработке сайтов
* каждый БЭМ-блок имеет свою папку внутри ```src/blocks/modules```
* папка одного БЭМ-блока содержит в себе один HTML-файл, один SCSS-файл и один JS-файл (если у блока используется скрипт)
    * HTML-файл блока импортируется в файл ```src/views/index.html``` (или в необходимый файл страницы, откуда будет вызываться блок)
    * SCSS-файл блока импортируется в файл ```src/blocks/modules/_modules.scss```
    * JS-файл блока импортируется в ```src/js/import/modules.js```

Пример структуры папки с БЭМ-блоком:
```
blocks
├── modules
│   ├──header
│   │   ├── header.html
│   │   ├── header.js
│   │   ├── header.scss
```

Чтобы вручную не создавать соответствующие папку и файлы, достаточно в консоли прописать следующие команды:
* ```yarn run bem-m my-block``` - для создания БЭМ-блока в ```src/block/modules``` (для основных БЭМ-блоков), где ```my-block``` - имя БЭМ-блока; 
* ```yarn run bem-с my-component``` - для создания компонента в ```src/blocks/components``` (для компонентов), где ```my-component``` - имя компонента

### Страницы проекта
* страницы проекта находятся в папке ```src/views/pages```
    * главная страница: ```src/views/index.html```

### Шрифты
* шрифты находятся в папке ```src/fonts```
    * используйте [форматы](https://caniuse.com/#search=woff) ```.woff``` и ```.woff2```
    * шрифты подключаются в файл ```src/styles/base/_fonts.scss```
    * сконвертировать локальные шрифты можно с помощью [данного сервиса](https://onlinefontconverter.com/)

### Изображения
* изображения находятся в папке ```src/img```
    * изображение для генерации фавиконок должно находиться в папке ```src/img/favicon``` и иметь размер не менее ```1024px x 1024px```

### Сторонние библиотеки
* все сторонние библиотеки устанавливаются в папку ```node_modules```
    * для их загрузки воспользуйтеcь командой ```yarn add package_name```
    * для подключения JS-файлов библиотек импортируйте их в самом начале JS-файла БЭМ-блока (то есть тот БЭМ-блок, который использует скрипт), например:
    ```javascript
    import $ from "jquery";
    ```
    * для подключения стилевых файлов библиотек импортируйте их в файл ```src/styles/vendor/_libs.scss```
    * JS-файлы и стилевые файлы библиотек самостоятельно изменять нельзя

:warning: Если в вашем проекте используется несколько библиотек, которые необходимо подключать на нескольких страницах, во избежании ошибок нужно:
* по пути ```src/js/import``` создать папку ```pages```
* в папке ```pages``` создать js-файл для страницы, например, ```pageA.js```, и импортировать туда библиотеку, которая будет использоваться только на этой странице
    * аналогично проделать шаг для дополнительных страниц
* в файле ```webpack.config.js``` в точку входа добавить js-файлы страниц, пример:
```javascript
entry: {
    main: "./src/js/index.js",
    pageA: "./src/js/import/pages/pageA.js",
    pageB: "./src/js/import/pages/pageB.js"
}
```
* подключить скомпилированные js-файлы на необходимых страницах

## :hash: CSS-сетка smart-grid
В сборщик включена CSS-сетка [smart-grid](https://github.com/dmitry-lavrik/smart-grid) от [Дмитрия Лаврика](https://dmitrylavrik.ru/). Она позволяет избавиться от
лишних классов в разметке за счёт использования примесей в SCSS и ускоряет адаптивную вёрстку. Конфигурация уже настроена в соответствии с сеткой [Bootstrap](https://getbootstrap.com/). Инструкция по использованию [здесь](https://grid4web.ru/basics).

## :gem: Информация
Репозиторий основан на [gulp-scss-starter](https://github.com/andreyalexeich/gulp-scss-starter) от [Andrey Gorokhov](https://github.com/andreyalexeich).