const output = document.getElementById("output");
const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");

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
    //togli il valore più alto possibile
    let result = "";//IMPORTANTE O SENNò DOVE LO FAI ENTRARE IL RISULTATO!?
    let i = 0;
    while (num > 0) { //while serve per proseguire finché il numero è maggiore di 0!
        if (num >= romanMap[i].value) {
            num -= romanMap[i].value;
            result += romanMap[i].symbol;
        } else { i++ }

    } return result; // fuori dal ciclo while. se lo metti dentro la funzione si interrompe alla prima iterazione.
}

// devi aggiungere i messaggi di errore e pulire il testo!!! (TE LO ERI GIà CHE DIMENTICATO)

const conversion = () => {
    const num = numberInput.value;  
    const messageFont = () => {output.classList.remove("output-num");};

    if (num === "") { // ricorda i ===
        messageFont();
        output.textContent = "Please enter a valid number"
    } else if (num >= 4000) {
        messageFont();
        output.textContent = "Please enter a number less than or equal to 3999"
    } else if (num <= 0) {
        messageFont();
        output.textContent = "Please enter a number greater than or equal to 1"
    } else if (!Number.isInteger(num)) {  //se il numero non è intero
        const roundedNum = Math.floor(num);
        numberInput.value = roundedNum;
        output.textContent = convertRoman(roundedNum);
    } else {
        output.classList.add("output-num");
        
        output.textContent = convertRoman(num)
    };
}

convertBtn.addEventListener("click", conversion)
numberInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        event.preventDefault();
        conversion();
    }
});
