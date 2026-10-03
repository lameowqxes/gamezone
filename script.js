function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("active");
    }
}
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = Number(counter.dataset.target);
    let current = 0;

    const updateCounter = () => {

        const step = Math.ceil(target / 50);

        current += step;

        if (current >= target) {
            current = target;
        }

        if (target === 87) {
            counter.textContent = current + "%";
        } else {
            counter.textContent = current;
        }

        if (current < target) {
            requestAnimationFrame(updateCounter);
        }
    };

    updateCounter();
});
const revealElements = document.querySelectorAll(
    ".players, .stats, .about, .contacts"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    formMessage.textContent =
        "Спасибо, " + name + "! Сообщение отправлено.";

    contactForm.reset();
});
function toggleTheme() {
    document.body.classList.toggle("light-theme");

    const themeButton = document.getElementById("themeButton");

    if (document.body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
        themeButton.textContent = "🌙";
    } else {
        localStorage.setItem("theme", "dark");
        themeButton.textContent = "☀";
    }
}
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");

    const themeButton = document.getElementById("themeButton");

    if (themeButton) {
        themeButton.textContent = "🌙";
    }
}
const playerCards = document.querySelectorAll(".card");

const playerData = [
    {
        name: "PlayerOne",
        role: "ENTRY FRAGGER",
        winRate: "87%",
        kd: "1.42",
        image: "images/player1.jpg"
    },
    {
        name: "Shadow",
        role: "SNIPER",
        winRate: "91%",
        kd: "1.67",
        image: "images/player2.jpg"
    },
    {
        name: "Night",
        role: "SUPPORT",
        winRate: "84%",
        kd: "1.31",
        image: "images/player3.jpg"
    }
];

const playerModal = document.getElementById("playerModal");

playerCards.forEach((card, index) => {
    card.addEventListener("click", () => {

        const player = playerData[index];

        document.getElementById("modalName").textContent = player.name;
        document.getElementById("modalRole").textContent = player.role;
        document.getElementById("modalWinRate").textContent = player.winRate;
        document.getElementById("modalKD").textContent = player.kd;

        document.getElementById("modalAvatar").innerHTML =
            `<img src="${player.image}" alt="${player.name}">`;

        playerModal.classList.add("active");
    });
});

function closePlayerModal() {
    playerModal.classList.remove("active");
}

playerModal.addEventListener("click", (event) => {
    if (event.target === playerModal) {
        closePlayerModal();
    }
});
const playerSearch = document.getElementById("playerSearch");

playerSearch.addEventListener("input", function() {

    const searchText = playerSearch.value.toLowerCase();

    playerCards.forEach(card => {

        const playerName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (playerName.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});
const playerSort = document.getElementById("playerSort");
const cardsContainer = document.querySelector(".cards");

playerSort.addEventListener("change", function() {

    const cards = Array.from(playerCards);

    if (playerSort.value === "winRate") {

        cards.sort((a, b) => {
            const aValue = parseFloat(
                a.querySelector(".player-stats span:first-child b").textContent
            );

            const bValue = parseFloat(
                b.querySelector(".player-stats span:first-child b").textContent
            );

            return bValue - aValue;
        });

    }

    if (playerSort.value === "kd") {

        cards.sort((a, b) => {
            const aValue = parseFloat(
                a.querySelector(".player-stats span:last-child b").textContent
            );

            const bValue = parseFloat(
                b.querySelector(".player-stats span:last-child b").textContent
            );

            return bValue - aValue;
        });

    }

    cards.forEach(card => {
        cardsContainer.appendChild(card);
    });

});
const newsGrid = document.getElementById("newsGrid");

if (newsGrid) {

    const savedNews =
        JSON.parse(localStorage.getItem("gamezoneNews")) || [];

    savedNews.forEach(news => {

        const article = document.createElement("article");

        article.className = "news-card";

        article.innerHTML = `
            <div class="news-date">${news.date}</div>

            <h3>${news.title}</h3>

            <p>${news.text}</p>

            <span class="news-link">Новая публикация →</span>
        `;

        newsGrid.prepend(article);
    });
}


let english = false;

function toggleLanguage() {

    english = !english;

    const languageButton =
        document.getElementById("languageButton");

    const elements =
        document.querySelectorAll("[data-ru][data-en]");

    elements.forEach(element => {

        if (english) {
            element.textContent = element.dataset.en;
        } else {
            element.textContent = element.dataset.ru;
        }

    });

    languageButton.textContent = english ? "RU" : "EN";

    if (english) {

        document.querySelector(".hero h1").innerHTML =
            "PLAY.<br>WIN.<br>DOMINATE.";

        document.querySelector(".hero-content p").textContent =
            "GAMEZONE — esports team that brings together players, competitions and the best gaming moments.";

    } else {

        document.querySelector(".hero h1").innerHTML =
            "ИГРАЙ.<br>ПОБЕЖДАЙ.<br>ДОМИНИРУЙ.";

        document.querySelector(".hero-content p").textContent =
            "GAMEZONE — игровая команда, которая объединяет игроков, соревнования и лучшие моменты.";
    }
}