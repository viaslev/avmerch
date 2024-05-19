// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            console.log('Service Worker зарегистрирован:', registration);
        })
        .catch(function (error) {
            console.error('Ошибка регистрации Service Worker:', error);
        });
}
// Регистрация Service Worker

// Web Share API
function shareData() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        })
            .then(() => {
                console.log('Поделись');
            })
            .catch(console.error);
    } else {
        alert('Поделиться не поддерживается в этом браузере!');
    }
}
// Web Share API

// Кнопка назад
function goBack() {
    if (history.length > 2) {
        history.back();
    } else {
        location.href = "#!/~/";
    }
}
// Кнопка назад

// Задержка отображения
setTimeout(function () {
    document.getElementById('DIVnone-footer').style.visibility = 'visible';
}, 3000);
// Задержка отображения

// YandexRobotSEO
var intervalId = setInterval(function() {
    if (document.querySelectorAll('.ecwid').length > 0) {
        window.YandexRotorSettings.IsLoaded = true;
        clearInterval(intervalId);
    }
}, 1000);
// YandexRobotSEO

// Удаление аккаунта
function deleteName(f) {
    if (confirm("Вы уверены, что хотите удалить свою учетную запись? " +
        "Are you sure you want to delete your account?"))
        f.submit();
}
// Удаление аккаунта

// Dark Light Theme
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
    const savedScheme = getSavedScheme();

    if (savedScheme !== null) {
        const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
        currentRadio.checked = true;
    }

    [...switcherRadios].forEach((radio) => {
        radio.addEventListener('change', (event) => {
            setScheme(event.target.value);
        });
    });
}

function setupScheme() {
    const savedScheme = getSavedScheme();
    const systemScheme = getSystemScheme();

    if (savedScheme === null) return;

    if (savedScheme !== systemScheme) {
        setScheme(savedScheme);
    }
}

function setScheme(scheme) {
    switchMedia(scheme);

    if (scheme === 'auto') {
        clearScheme();
    } else {
        saveScheme(scheme);
    }
}

function switchMedia(scheme) {
    let lightMedia;
    let darkMedia;

    if (scheme === 'auto') {
        lightMedia = '(prefers-color-scheme: light)';
        darkMedia = '(prefers-color-scheme: dark)';
    } else {
        lightMedia = (scheme === 'light') ? 'all' : 'not all';
        darkMedia = (scheme === 'dark') ? 'all' : 'not all';
    }

    [...lightStyles].forEach((link) => {
        link.media = lightMedia;
    });

    [...darkStyles].forEach((link) => {
        link.media = darkMedia;
    });
}

function getSystemScheme() {
    const darkScheme = darkSchemeMedia.matches;

    return darkScheme ? 'dark' : 'light';
}

function getSavedScheme() {
    return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
    localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
    localStorage.removeItem('color-scheme');
}

setupSwitcher();
setupScheme();
// Dark Light Theme

// Color CSS --color-hsl
var htmlElem = document.querySelector('html');
var colorSite = document.getElementById('cvet');
if (!localStorage.getItem('cvet')) {
    populateStorage();
} else {
    setStyles();
}
function populateStorage() {
    localStorage.setItem('cvet', document.getElementById('cvet').value);
    setStyles();
}
function setStyles() {
    var currentColor = localStorage.getItem('cvet');
    document.getElementById('cvet').value = currentColor;
    document.documentElement.style.setProperty('--color-hsl', currentColor);
}
colorSite.onchange = populateStorage;
// Color CSS --color-hsl

// Button Sheet
const showModalBtn = document.querySelector(".show-modal")
const bottomSheet = document.querySelector(".bottom-sheet")
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay")
const sheetContent = bottomSheet.querySelector(".content")
const dragIcon = bottomSheet.querySelector(".drag-icon")
const sheetClose = bottomSheet.querySelector(".sheet-close")

// Глобальные переменные для отслеживания событий перетаскивания
let isDragging = false, startY, startHeight

const showBottomSheet = () => {
    bottomSheet.classList.add("show")
    document.body.style.overflow = "hidden"
    updateSheetHeight(50)
}

const hideBottomSheet = () => {
    bottomSheet.classList.remove("show")
    document.body.style.overflow = "auto"
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}%` //обновляет высоту содержимого листа
    // Переключает полноэкранный класс на нижний лист, если высота равна 100.
    bottomSheet.classList.toggle("fullscreen", height === 100)
}

// Устанавливает начальную позицию перетаскивания и высоту содержимого листа.
const dragStart = (e) => {
    isDragging = true
    startY = e.pageY || e.touches?.[0].pageY
    startHeight = parseInt(sheetContent.style.height)
    bottomSheet.classList.add("dragging")
}

//  Рассчитайте новую высоту содержимого листа и вызовите функцию updateSheetHeight.
const dragging = (e) => {
    if (!isDragging) return
    const delta = startY - (e.pageY || e.touches?.[0].pageY)
    const newHeight = startHeight + delta / window.innerHeight * 100
    updateSheetHeight(newHeight)
}
// Определите, следует ли скрыть, установить полноэкранный режим или установить высоту по умолчанию в зависимости от текущей высоты содержимого листа.
const dragStop = () => {
    isDragging = false
    bottomSheet.classList.remove("dragging")
    const sheetHeight = parseInt(sheetContent.style.height)
    sheetHeight < 40 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50)
}

document.addEventListener("mouseup", dragStop)
dragIcon.addEventListener("mousedown", dragStart)
document.addEventListener("mousemove", dragging)

document.addEventListener("touchend", dragStop)
dragIcon.addEventListener("touchstart", dragStart)
document.addEventListener("touchmove", dragging)

showModalBtn.addEventListener("click", showBottomSheet)
sheetOverlay.addEventListener("click", hideBottomSheet)
sheetClose.addEventListener("click", hideBottomSheet)