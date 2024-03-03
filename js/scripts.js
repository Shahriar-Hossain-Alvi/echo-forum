//spinner
window.addEventListener('load', () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    setTimeout(function () {
        spinner.style.display = 'none';
    }, 2000);

});

//fetch data
const loadAllPostData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    console.log(data);
}

loadAllPostData();



