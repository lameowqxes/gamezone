if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}
const newsForm = document.getElementById("newsForm");
const adminMessage = document.getElementById("adminMessage");
const adminNewsList = document.getElementById("adminNewsList");


// Добавление новости
newsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("newsTitle").value;
    const date = document.getElementById("newsDate").value;
    const text = document.getElementById("newsText").value;

    const news = {
        title: title,
        date: date,
        text: text
    };

    let newsList =
        JSON.parse(localStorage.getItem("gamezoneNews")) || [];

    newsList.push(news);

    localStorage.setItem(
        "gamezoneNews",
        JSON.stringify(newsList)
    );

    adminMessage.textContent =
        "Новость успешно добавлена!";

    newsForm.reset();

    showNews();
});


// Показываем новости
function showNews() {

    adminNewsList.innerHTML = "";

    const newsList =
        JSON.parse(localStorage.getItem("gamezoneNews")) || [];
    const newsCount = document.getElementById("newsCount");

    if (newsCount) {
        newsCount.textContent = newsList.length;
    }
    if (newsList.length === 0) {
        adminNewsList.innerHTML =
            "<p>Пока нет добавленных новостей.</p>";

        return;
    }

    newsList.forEach((news, index) => {

        const item = document.createElement("div");

        item.className = "admin-news-item";

        item.innerHTML = `
            <div>
                <div class="news-date">${news.date}</div>

                <h3>${news.title}</h3>

                <p>${news.text}</p>
            </div>

            <div class="admin-buttons">

    <button
        class="edit-news"
        onclick="editNews(${index})"
    >
        Изменить
    </button>

    <button
        class="delete-news"
        onclick="deleteNews(${index})"
    >
        Удалить
    </button>

</div>
        `;

        adminNewsList.appendChild(item);
    });
}



function deleteNews(index) {

    let newsList =
        JSON.parse(localStorage.getItem("gamezoneNews")) || [];

    newsList.splice(index, 1);

    localStorage.setItem(
        "gamezoneNews",
        JSON.stringify(newsList)
    );

    showNews();
}



showNews();
function editNews(index) {

    let newsList =
        JSON.parse(localStorage.getItem("gamezoneNews")) || [];

    const news = newsList[index];

    document.getElementById("newsTitle").value = news.title;
    document.getElementById("newsDate").value = news.date;
    document.getElementById("newsText").value = news.text;

    newsList.splice(index, 1);

    localStorage.setItem(
        "gamezoneNews",
        JSON.stringify(newsList)
    );

    showNews();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    adminMessage.textContent =
        "Измените данные новости и нажмите «Добавить новость».";
}
function logout() {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "login.html";
}