function generateNumber() {

    const min = Math.ceil(document.getElementById("min").value);

    const max = Math.floor(document.getElementById("max").value);

    const result = Math.floor(Math.random() * (max - min + 1)) + min;

    
    document.getElementById("result").textContent = " O número sorteado foi: " + result;        
    console.log("O número sorteado foi: " + result);
    

 
}

