/**
 *  Contient les éléments liés à l'onglet késako.
 */
var kesako_tab = {
    "button": document.querySelector("#kesako-link"),
    "contain": document.querySelector("#kesako")
}

/**
 *  Contient les éléments liés à l'onglet tuto.
 */
var tuto_tab = {
    "button": document.querySelector("#tuto-link"),
    "contain": document.querySelector("#tuto")
}

/**
 *  Contient les éléments liés à l'onglet calcul.
 */
var calcul_tab = {
    "button": document.querySelector("#calcul-link"),
    "contain": document.querySelector("#calcul")
}

/**
 * Active l'onglet késako et désactive les autres.
 * Fais de même pour le lien lié à l'onglet.
 */
kesako_tab["button"].onclick = function() {
    kesako_tab["contain"].className = "tab-pane fade show active"
    tuto_tab["contain"].className = "tab-pane fade"
    calcul_tab["contain"].className = "tab-pane fade"
    kesako_tab["button"].className = "nav-link active"
    tuto_tab["button"].className = "nav-link"
    calcul_tab["button"].className = "nav-link"
}

/**
 * Active l'onglet tuto et désactive les autres.
 * Fais de même pour le lien lié à l'onglet.
 */
tuto_tab["button"].onclick = function() {
    kesako_tab["contain"].className = "tab-pane fade"
    tuto_tab["contain"].className = "tab-pane fade show active"
    calcul_tab["contain"].className = "tab-pane fade"
    kesako_tab["button"].className = "nav-link"
    tuto_tab["button"].className = "nav-link active"
    calcul_tab["button"].className = "nav-link"
}

/**
 * Active l'onglet calcul et désactive les autres.
 * Fais de même pour le lien lié à l'onglet.
 */
calcul_tab["button"].onclick = function() {
    kesako_tab["contain"].className = "tab-pane fade"
    tuto_tab["contain"].className = "tab-pane fade"
    calcul_tab["contain"].className = "tab-pane fade show active"
    kesako_tab["button"].className = "nav-link"
    tuto_tab["button"].className = "nav-link"
    calcul_tab["button"].className = "nav-link active"
}