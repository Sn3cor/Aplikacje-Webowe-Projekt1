const getNewCatSrc = () => {
    return `./assets/img/IMG_${Math.round(Math.random() * 100) % 26}.webp`
}

const generateNextCat = (cat) => {
    const cat_src = cat.src;
    let new_cat_src = getNewCatSrc();

    while (cat_src === new_cat_src) {
        new_cat_src = getNewCatSrc();
    }

    cat.src = new_cat_src;
}

document.querySelector('.cat').addEventListener('click', (e) => {
    console.log(e);
    const cat = e.target;
    generateNextCat(cat);
})