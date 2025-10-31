document.querySelectorAll('a').forEach(a => {
    const path = window.location.pathname.replace("/index.html", "/");
    const target = a.pathname.replace("/index.html", "/");
    if (target === path) {
        a.classList.add("active-link");
    }
});


document.getElementById('slide').addEventListener("click", ((e) => {
    let sidebar = document.getElementById('sidebar');
    sidebar.style.width = "100%"
    console.log(e)
}))

document.getElementById('close').addEventListener("click", ((e) => {
    let sidebar = document.getElementById('sidebar');
    sidebar.style.width = "0"
    console.log(e)
}))

