const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/"
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("form .msg");



let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 0) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}${fromCurr.value}_${toCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let Rate = data.rate;
    let Final_amount = amtVal * Rate;
    // console.log(Final_amount)
    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${Final_amount} ${toCurr.value}`



})


let arrow =  document.querySelector(".arrow")
arrow.addEventListener("click", () => {
    if((arrow.src.includes("arrow1.svg"))){
        arrow.src="arrow2.svg"
    }
    else{
        arrow.src="arrow1.svg"
    }
    
    temp_fromcurr=fromCurr.value
    let from_options=fromCurr.getElementsByTagName("option")
    // console.log(from_options)
    for(let i in from_options){
        if(from_options[i].value==toCurr.value){
            from_options[i].selected="selected"
            updateFlag(fromCurr)
        }
    }

    let to_options=toCurr.getElementsByTagName("option")
    // console.log(to_options)
    for(let i in to_options){
        if(to_options[i].value==temp_fromcurr){
            to_options[i].selected="selected"
            updateFlag(toCurr)
        }
    }
})

