var backButton = document.getElementById('goback');
var nlogo = document.getElementById('nlogo');

backButton.setAttribute('href', document.referrer);

function goBack() {
    history.back();
    return false;
}

nlogo.onclick = goBack;