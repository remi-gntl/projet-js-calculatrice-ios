let valeurCourante = '0';
let operationPrecedente = '';
let operateur = null;
let nouveauNombre = true;
let modeScientifique = false;

const affichage = document.getElementById('affichage');
const calculatrice = document.getElementById('calculatrice');
const rotateBtn = document.getElementById('rotate-btn');

rotateBtn.addEventListener('click', () => {
    modeScientifique = !modeScientifique;
    calculatrice.classList.toggle('landscape');
});

function formaterNombre(nombre) {
    if (typeof nombre !== 'number') return nombre;
    let num = nombre.toString();
    const [entier, decimal] = num.split('.');
    if (decimal) {
        return Number(entier).toLocaleString('fr-FR') + '.' + decimal;
    }
    return Number(entier).toLocaleString('fr-FR');
}

function ajouterChiffre(chiffre) {
    if (nouveauNombre) {
        if (chiffre === '.') {
            valeurCourante = '0.';
        } else {
            valeurCourante = chiffre;
        }
        nouveauNombre = false;
    } else {
        if (chiffre === '.' && valeurCourante.includes('.')) return;
        if (valeurCourante === '0' && chiffre !== '.') {
            valeurCourante = chiffre;
        } else {
            valeurCourante += chiffre;
        }
    }
    affichage.value = formaterNombre(parseFloat(valeurCourante));
}

function operation(op) {
    const val = parseFloat(valeurCourante.replace(/,/g, ''));
    
    switch(op) {
        case 'sqrt':
            valeurCourante = Math.sqrt(val).toString();
            break;
        case 'square':
            valeurCourante = (val * val).toString();
            break;
        case 'cube':
            valeurCourante = (val * val * val).toString();
            break;
        case '1/x':
            if (val !== 0) {
                valeurCourante = (1 / val).toString();
            } else {
                valeurCourante = "Erreur";
            }
            break;
        case 'sin':
            valeurCourante = Math.sin(val * Math.PI / 180).toString();
            break;
        case 'cos':
            valeurCourante = Math.cos(val * Math.PI / 180).toString();
            break;
        case 'tan':
            valeurCourante = Math.tan(val * Math.PI / 180).toString();
            break;
        case 'log':
            valeurCourante = Math.log10(val).toString();
            break;
        case 'ln':
            valeurCourante = Math.log(val).toString();
            break;
        case 'exp':
            valeurCourante = Math.exp(val).toString();
            break;
        case 'pi':
            valeurCourante = Math.PI.toString();
            nouveauNombre = true;
            break;
        case 'e':
            valeurCourante = Math.E.toString();
            nouveauNombre = true;
            break;
        case '!':
            valeurCourante = factorial(val).toString();
            break;
        default:
            if (operateur !== null) calculer();
            operationPrecedente = valeurCourante;
            operateur = op;
            nouveauNombre = true;
            return;
    }
    
    affichage.value = formaterNombre(parseFloat(valeurCourante));
    nouveauNombre = true;
}

function factorial(n) {
    if (n < 0) return "Erreur";
    if (n === 0) return 1;
    let result = 1;
    for(let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculer() {
    if (operateur === null || nouveauNombre) return;
    
    let resultat;
    const prev = parseFloat(operationPrecedente.replace(/,/g, ''));
    const current = parseFloat(valeurCourante.replace(/,/g, ''));
    
    switch(operateur) {
        case '+': resultat = prev + current; break;
        case '-': resultat = prev - current; break;
        case '*': resultat = prev * current; break;
        case '/': 
            if (current === 0) {
                resultat = "Erreur";
            } else {
                resultat = prev / current;
            }
            break;
        case 'pow': resultat = Math.pow(prev, current); break;
    }

    if (resultat === "Erreur") {
        valeurCourante = '0';
        affichage.value = resultat;
    } else {
        valeurCourante = resultat.toString();
        affichage.value = formaterNombre(resultat);
    }
    
    operateur = null;
    nouveauNombre = true;
}

function effacer() {
    valeurCourante = '0';
    operationPrecedente = '';
    operateur = null;
    nouveauNombre = true;
    affichage.value = '0';
}

function plusMoins() {
    valeurCourante = (-parseFloat(valeurCourante.replace(/,/g, ''))).toString();
    affichage.value = formaterNombre(parseFloat(valeurCourante));
}

function pourcent() {
    valeurCourante = (parseFloat(valeurCourante.replace(/,/g, '')) / 100).toString();
    affichage.value = formaterNombre(parseFloat(valeurCourante));
}