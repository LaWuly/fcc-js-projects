// ✅ Inizializzazione degli elementi del DOM
const output = document.getElementById("output");
const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");


// ✅ Funzione per convertire un numero in numeri romani
const convertRoman = (num) => {
    const romanMap = [
        { value: 1000, symbol: "M" },
        { value: 900, symbol: "CM" },
        { value: 500, symbol: "D" },
        { value: 400, symbol: "CD" },
        { value: 100, symbol: "C" },
        { value: 90, symbol: "XC" },
        { value: 50, symbol: "L" },
        { value: 40, symbol: "XL" },
        { value: 10, symbol: "X" },
        { value: 9, symbol: "IX" },
        { value: 5, symbol: "V" },
        { value: 4, symbol: "IV" },
        { value: 1, symbol: "I" }
    ];

    let result = "";
    let i = 0;
    while (num > 0) {
        if (num >= romanMap[i].value) {
            num -= romanMap[i].value;
            result += romanMap[i].symbol;
        } else {
            i++;
        }
    }
    return result;
};


// ✅ MODIFICA: Funzione per gestire gli errori dell'input separata da Funzione per la conversione del numero
const errText = (num) => {
    output.classList.remove("output-num"); // ✅ MODIFICA: messo all'inizio anziché dentro ogni if.

    // ✅ MODIFICA: Aggiunto controllo per input vuoto usando trim() per gestire anche spazi vuoti
    if (isNaN(num) || numberInput.value.trim() === "") { 
        output.textContent = "Please enter a valid number";
        return false;
    } else if (num >= 4000) { 
        output.textContent = "Please enter a number less than or equal to 3999";
        return false;
    } else if (num <= 0) {
        output.textContent = "Please enter a number greater than or equal to 1";
        return false;
    }
    return true; // ✅ MODIFICA: Se tutto è valido, restituisce true
};

const conversion = (num) => { // ✅ MODIFICA: Funzione per convertire un numero passato come parametro, rendendola più flessibile e riutilizzabile (precedentemente avevo inserito conversion=()=> { const num = numberInput.value;...}  => const num spostato in handeConversion.)

    if (!Number.isInteger(num)) {
        num = Math.floor(num); 
        numberInput.value = num; 
    }
    output.classList.add("output-num");
    output.textContent = convertRoman(num); // ✅ MODIFICA: Conversione sempre eseguita se parte la funzione (prima era gestito come else). Aggiunge sempre la classe per lo stile. 
};


// ✅ AGGIUNTA -> conversion viene chiamato SOLO se errText è true. 
const handleConversion = () => { 
    const num = Number(numberInput.value); // ❓ MODIFICA: Conversione in numero per garantire il tipo corretto (ma serve? cioè già input è solo numero, e poi è controllato prima da isNan????)
    if (errText(num)) {
        conversion(num);
    }
};


// ✅ Event Listener per il click sul bottone di conversione
convertBtn.addEventListener("click", handleConversion); 


// ❓ Event Listener per il tasto "Enter" ma è corretto mettere così o sarebbe più giusto attivarlo con l'invio del form?????? 
numberInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        handleConversion(); 
    }
});
