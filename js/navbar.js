document.addEventListener("DOMContentLoaded", async () => {
    const navbarContainer = document.getElementById("navbar");

    if (!navbarContainer) {
        return;
    }

    try {
        const navbarResponse = await fetch("includes/navbar.html");

        if (!navbarResponse.ok) {
            throw new Error("Die Navigationsleiste konnte nicht geladen werden.");
        }

        navbarContainer.innerHTML = await navbarResponse.text();

        initializeBackButton();
        initializeRandomPageButton();
    } catch (error) {
        console.error(error);
    }
});

function initializeBackButton() {
    const backButton = document.getElementById("back-button");

    if (!backButton) {
        return;
    }

    backButton.addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    });
}

function initializeRandomPageButton() {
    const randomButton = document.getElementById("random-page-button");

    if (!randomButton) {
        return;
    }

    randomButton.addEventListener("click", async () => {
        try {
            const pagesResponse = await fetch("pages.json");

            if (!pagesResponse.ok) {
                throw new Error("pages.json konnte nicht geladen werden.");
            }

            const pages = await pagesResponse.json();

            if (!Array.isArray(pages) || pages.length === 0) {
                throw new Error("In pages.json wurden keine Seiten gefunden.");
            }

            const currentPage =
                window.location.pathname.split("/").pop() || "index.html";

            const availablePages = pages.filter(page => page !== currentPage);

            const pageSelection =
                availablePages.length > 0 ? availablePages : pages;

            const randomIndex = Math.floor(
                Math.random() * pageSelection.length
            );

            window.location.href = pageSelection[randomIndex];
        } catch (error) {
            console.error(error);
        }
    });
}
