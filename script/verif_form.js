/**
 * Stocke l'élément input height.
 */
 var height = document.querySelector("#height");

/**
 * Stocke l'élément input weight.
 */
var weight = document.querySelector("#weight");

/**
 * Stocke l'élément a cancel.
 */
var cancel = document.querySelector("#cancel");

/**
 * Stocke l'élément a ok.
 */
var ok = document.querySelector("#ok");

window.onload = function(){
    let imc = localStorage.getItem('imc');
    if(imc !== undefined && imc !== null){
        history();
    }
}

/**
 * Cette fonction réagit aux entrées claviers grâce à l'évènement oninput.
 * Dans un premier temps, elle va vider son résultat précédent et effacer 
 * la classe Color du tableau dynamique. 
 * 
 * Dans un second temps, elle va s'assurer que weight est défini, puis elle
 * va calculer l'IMC.
 * 
 * Dans un dernier temps, elle va choisir une ligne du tableau dynamique 
 * pour la mettre en couleur grâce à la classe Color. 
 * 
 */
height.oninput = function () {
    let result = undefined;
    document.querySelectorAll('.color').forEach(function (el) {
        el.className = "";
    });
    if (weight.value != undefined) {
        result = weight.value / (height.value / 100 * height.value / 100);
    }
    if (result != 0) {
        if (result <= 18.4) {
            document.querySelector("#maigre").className = "color";
        } else if (result <= 24.9) {
            document.querySelector("#normal").className = "color";
        } else if (result <= 29.9) {
            document.querySelector("#surpoids").className = "color";
        } else if (result <= 34.9) {
            document.querySelector("#modere").className = "color";
        } else if (result <= 39.9) {
            document.querySelector("#severe").className = "color";
        } else {
            document.querySelector("#danger").className = "color";
        }
    } else {
        document.querySelectorAll(".color").className = "";
    }
}

/**
 * Cette fonction réagit aux entrées claviers grâce à l'évènement oninput.
 * Dans un premier temps, elle va vider son résultat précédent et effacer 
 * la classe Color du tableau dynamique. 
 * 
 * Dans un second temps, elle va s'assurer que height est défini, puis elle
 * va calculer l'IMC.
 * 
 * Dans un dernier temps, elle va choisir une ligne du tableau dynamique 
 * pour la mettre en couleur grâce à la classe Color. 
 * 
 */
weight.oninput = function () {
    let result = undefined;
    document.querySelectorAll('.color').forEach(function (el) {
        el.className = "";
    });
    if (height.value != undefined) {
        result = weight.value / (height.value / 100 * height.value / 100);
    }
    if (result != 0) {
        if (result < 18.4) {
            document.querySelector("#maigre").className = "color";
        } else if (result < 24.9) {
            document.querySelector("#normal").className = "color";
        } else if (result < 29.9) {
            document.querySelector("#surpoids").className = "color";
        } else if (result < 34.9) {
            document.querySelector("#modere").className = "color";
        } else if (result <= 39.9) {
            document.querySelector("#severe").className = "color";
        } else {
            document.querySelector("#danger").className = "color";
        }
    } else {
        document.querySelectorAll(".color").className = "";
    }
}

/**
 * Vide le formulaire de la calculatrice et le tableau dynamique.
 */
cancel.onclick = function () {
    height.value = 0;
    weight.value = 0;
    document.querySelectorAll('.color').forEach(function (el) {
        el.className = "";
    });
}

/**
 * Cette fonction permet d'ouvrir la modal et d'afficher le résultat de la calculatrice 
 * avec une phrase liée à ce dernier obtenu puis, elle le sauvegarde dans le localstorage. 
 *
 * @returns Retourne le moyen de fermer la modal.
 */

ok.onclick = function () {
    if (height.value == 0 || height.value == undefined || weight.value == 0 || weight.value == undefined) return false;
    let result = weight.value / (height.value / 100 * height.value / 100);
    document.querySelector("#myModal").className = "modal active";
    document.querySelector("#result").textContent = Math.round(result * 100) / 100
    let sentence = "D'après votre IMC, vous êtes ";
    setLocaleStorage(result);
    if (result < 18.4) {
        sentence = sentence + "maigre.";
    } else if (result < 24.9) {
        sentence = sentence + "de bonne corpulence.";
    } else if (result < 29.9) {
        sentence = sentence + "en surpoids.";
    } else if (result < 34.9) {
        sentence = sentence + "en obésité modéré.";
    } else if (result <= 39.9) {
        sentence = sentence + "en obésité sévère.";
    } else {
        sentence = sentence + "en obésité morbide.";
    }
    document.querySelector("#sentence").textContent = sentence;
    document.querySelector("#close").onclick = function () {
        return close();
    }
    document.querySelector("#close-button").onclick = function () {
        return close();
    }
}

// source LocalStorage : https://www.codegrepper.com/code-examples/javascript/js+how+to+edit+local+storage+value
/**
 * Ajout de l'IMC dans le local storage
 * @param {*} data: Donnée à ajouter dans le local storage.
 */
function setLocaleStorage(data){
    if(localStorage.getItem('imc') !== undefined && localStorage.getItem('imc') !== null){
        imc = JSON.parse(localStorage.getItem('imc'));
    } else {
        localStorage.setItem('imc', JSON.stringify([]));
        imc = JSON.parse(localStorage.getItem('imc'));
    }
    imc.push({"date": new Date().toLocaleDateString('fr-FR', 
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }), // Configuration d'affichage de la date et l'heure
        "data": Math.round(data*100)/100}); // Conversion au centième près
    localStorage.setItem('imc', JSON.stringify(imc));
}

/**
 * Gère le tableau avec toute l'historique
 */
function history(){
    let imc = JSON.parse(localStorage.getItem('imc')); // Récupération de la données de la localstorage d'une chaine de caractère en objet
    let table = document.querySelector('#contentHistorique'); // Récupération de l'élément HTML le contenu du tableau de l'historique
    table.innerHTML = ''; // Vide le tableau
    for(let row of imc){ // Parcours des éléments du localStorage
        let tr = document.createElement('tr');
        let tdDate = document.createElement('td')
        tdDate.innerText = row["date"];
        let tdData = document.createElement('td')
        tdData.innerText = row["data"]; 
        tr.appendChild(tdDate);
        tr.appendChild(tdData);
        table.appendChild(tr);
    }
    document.querySelector('#historique').className = "table table-bordered";
}

/**
 * fonction qui ferme la modal.
 */
function close() {
    document.querySelector("#myModal").className = "modal";
    history();
}
