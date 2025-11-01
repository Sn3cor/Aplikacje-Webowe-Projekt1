document.querySelectorAll('a').forEach(a => {
    const path = window.location.pathname.replace("/index.html", "/");
    const target = a.pathname.replace("/index.html", "/");
    if (target === path) {
        a.classList.add("active-link");
    }
});


document.getElementById('slide').addEventListener("click", (() => {
    let sidebar = document.getElementById('sidebar');
    sidebar.style.width = "100%";
}))

document.getElementById('close').addEventListener("click", (() => {
    let sidebar = document.getElementById('sidebar');
    sidebar.style.width = "0";
}))

