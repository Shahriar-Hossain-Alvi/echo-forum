//spinner
window.addEventListener('load', () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    setTimeout(function () {
        spinner.style.display = 'none';
    }, 2000);

});



