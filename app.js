const apiKey = "pub_59d4fdbb32004b4bbad53cb117b53442";

let page = 1;
let isLoading = false;
let category = "";

const newsContainer = document.getElementById("news-container");
const loader = document.getElementById("loader");

async function loadNews() {
    if (isLoading) return;
    isLoading = true;

    loader.style.display = "block";

    const res = await fetch(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=te&page=${page}&category=${category}`
    );
    const data = await res.json();

    data.results.forEach(article => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
            <img src="${article.image_url || "https://via.placeholder.com/300"}">
            <h3>${article.title}</h3>
        `;

        card.addEventListener("click", () => openPopup(article));
        newsContainer.appendChild(card);
    });

    loader.style.display = "none";
    isLoading = false;
    page++;
}

loadNews();

// Infinite Scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadNews();
    }
});

// Category Tabs
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        category = tab.dataset.cat;
        page = 1;
        newsContainer.innerHTML = "";
        loadNews();
    });
});
