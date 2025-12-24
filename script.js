// === НАСТРОЙКИ ===
const SHOP_ID = '130476'; // Твой ID магазина
// Впиши сюда свой адрес из настроек EasyDonate (например 'servant.easydonate.ru')
const SHOP_DOMAIN = 'servant.easydonate.ru'; 

let currentItemId = null; // Переменная для хранения выбранного товара

// === 1. НАЖАТИЕ НА КНОПКУ КУПИТЬ ===
function buy(itemId) {
    const usernameInput = document.getElementById('username');
    const nick = usernameInput.value.trim();

    // Если ник не введен — трясем поле
    if (!nick) {
        shakeInput();
        return;
    }

    // Запоминаем товар и открываем окно ввода почты
    currentItemId = itemId;
    openModal();
}

// === 1.1. ПОКУПКА РАЗБАНА (ИЗ СПИСКА) ===
function buyUnban() {
    const select = document.getElementById('ban-select');
    buy(select.value);
}

// === 2. ПОДТВЕРЖДЕНИЕ В МОДАЛКЕ (ОПЛАТИТЬ) ===
function confirmPurchase() {
    const emailInput = document.getElementById('user-email');
    const email = emailInput.value.trim();
    const nick = document.getElementById('username').value.trim();

    // Простая проверка почты
    if (!email || !email.includes('@')) {
        emailInput.parentElement.style.borderColor = '#ffb4ab';
        return;
    }

    // === ФОРМИРУЕМ ПРЯМУЮ ССЫЛКУ НА ОПЛАТУ ===
    // Эта ссылка ведет сразу в "чекаут" (оформление заказа) вашего магазина.
    // Мы передаем ник, почту и ID товара.
    
    // Если у вас не настроен поддомен, используйте адрес через основной сайт:
    // const finalUrl = `https://easydonate.ru/pay/${SHOP_ID}?username=${nick}&email=${email}&products[${currentItemId}]=1`;
    
    // Но лучше и надежнее использовать ваш поддомен магазина:
    const finalUrl = `https://${SHOP_DOMAIN}/checkout?customer=${nick}&email=${email}&products[${currentItemId}]=1`;

    // Перенаправляем игрока СРАЗУ на страницу подтверждения и выбора способа оплаты
    window.location.href = finalUrl;
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

function openModal() {
    document.getElementById('email-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('email-modal').classList.remove('active');
}

function shakeInput() {
    const container = document.querySelector('.input-container');
    container.style.borderColor = '#ffb4ab';
    container.style.background = '#2a0a0a';
    document.getElementById('username').focus();
    setTimeout(() => {
        container.style.borderColor = 'transparent';
        container.style.background = 'var(--surface-variant)';
    }, 1500);
}

// Закрыть при клике вне окна
document.getElementById('email-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('email-modal')) {
        closeModal();
    }
});

// Анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.card').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});