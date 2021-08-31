function fetchArticle(url) {
    displayLoading();
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            hideLoading();
            let articles = data['articles'];
            let i = 0;
            $(".content-wrapper").empty();
            for (let article of articles) {
                $(".content-wrapper").append(`
                <div class="content article">
                    <div class="content__image" style="background-image:url('${article['image']}')">
                    </div>
                    <div class="content__text">
                        <div class="content__text--header">
                            <h2><a href="${article['url']}" target="_blank">${article['title']}</a></h2>
                        </div>
                        <div class="content__text--date-time">${article['publishedAt']}</div>
                        <div class="content__text--short-content">${article['description']}...</div>
                    </div>
                </div>
                `);
                i++;
            }
        });
}
$(document).ready(function() {
    fetchArticle('https://gnews.io/api/v4/search?q=example&token=44474dc71c8668c1f8e112b2a44a249d');
});

$(".btnSearch").click(function(e) {
    e.preventDefault();
    let keyWords = encodeURIComponent($("#searchKws").val());
    let url = "https://gnews.io/api/v4/search?q=example&token=44474dc71c8668c1f8e112b2a44a249d&q=" + keyWords;
    console.log(url);
    fetchArticle(url);
});

$(".search").click(function(e) {
    e.preventDefault();
    $(".modal").css('display', "flex");
});

$(".btnClose").click(function(e) {
    e.preventDefault();
    $(".modal").css('display', "none");
});

const loader = document.querySelector("#loading");

// showing loading tham khảo: https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}