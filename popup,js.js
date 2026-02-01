const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopup");

function openPopup(article) {
    document.getElementById("pop-title").textContent = article.title;
    document.getElementById("pop-img").src = article.image_url || "https://via.placeholder.com/400";
    document.getElementById("pop-desc").textContent = article.description || "No description available";
    document.getElementById("pop-link").href = article.link;

    popup.classList.remove("hidden");
}

closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});
