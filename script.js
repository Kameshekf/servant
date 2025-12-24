// === НАСТРОЙКИ ===
const SHOP_DOMAIN = 'servant.easydonate.ru'; // Твой подтвержденный адрес

let currentItemId = null; // Переменная для хранения выбранного товара

// === 1. НАЖАТИЕ НА КНОПКУ КУПИТЬ ===
function buy(itemId) {
    const usernameInput = document.getElementById('username');
    const nick = usernameInput.value.trim();

    if (!nick) {
        shakeInput();
        return;
    }

    currentItemId = itemId;
    openModal();
}

// === 1.1. ПОКУПКА РАЗБАНА (ИЗ СПИСКА) ===
function buyUnban() {
    const select = document.getElementById('ban-select');
    buy(select.value);
}

// === 2. ГЛАВНАЯ ФУНКЦИЯ ОПЛАТЫ (ЧЕРЕЗ ФОРМУ) ===
function confirmPurchase() {
    const emailInput = document.getElementById('user-email');
    const email = emailInput.value.trim();
    const nick = document.getElementById('username').value.trim();

    if (!email || !email.includes('@')) {
        emailInput.parentElement.style.borderColor = '#ffb4ab';
        return;
    }

    // === СОЗДАЕМ НЕВИДИМУЮ ФОРМУ ДЛЯ ПЕРЕХОДА НА ОПЛАТУ ===
    // Это имитирует нажатие кнопки на самом сайте EasyDonate
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://${SHOP_DOMAIN}/payment/start`;
    form.style.display = 'none';

    // Добавляем ник
    const customerInput = document.createElement('input');
    customerInput.name = 'customer';
    customerInput.value = nick;
    form.appendChild(customerInput);

    // Добавляем почту
    const emailField = document.createElement('input');
    emailField.name = 'email';
    emailField.value = email;
    form.appendChild(emailField);

    // Добавляем товар (ID и количество)
    const productInput = document.createElement('input');
    productInput.name = `products[${currentItemId}]`;
    productInput.value = '1';
    form.appendChild(productInput);

    // Отправляем форму
    document.body.appendChild(form);
    form.submit();
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

// Анимация карточек
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
