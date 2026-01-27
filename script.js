const BASE_URL = "https://v6.exchangerate-api.com/v6/0caeb1d8ba14a23387283f8e/pair/INR/USD"

const selection_menu = document.querySelectorAll(".selection_menu");
const btn = document.querySelector("#exchange-btn");
const FromCurr = document.querySelector("#from .selection_menu");
const ToCurr = document.querySelector("#to .selection_menu");
const Answer = document.querySelector("#answer");

for(let select of selection_menu) {
    for(let CurrCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = CurrCode;
        newOption.value = CurrCode;
        select.append(newOption);
        if (select.name === "From" && CurrCode === "INR") {
            newOption.selected = "selected";
        } else if (select.name === "To" && CurrCode === "USD") {
            newOption.selected = "selected";
        }   
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });   
}

const updateFlag = (evt) => {
    let CurrCode = evt.value;
    let country = countryList[CurrCode];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`
    let name = evt.name;
    let img = document.querySelector(`#${name}-flag`);
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const amount = document.querySelector("#amount input");
    let amount_value = amount.value;
    if(amount_value < 0) {
        alert("Please Enter a value above 0");
        amount.value = 0;
    }
    let FromCurr_code = FromCurr.value;
    let ToCurr_code = ToCurr.value;
    let URL = `https://v6.exchangerate-api.com/v6/0caeb1d8ba14a23387283f8e/pair/${FromCurr_code}/${ToCurr_code}`
    let response = await fetch(URL);
    let data = await response.json();
    let conv_rate = data["conversion_rate"];
    let conv_amount = amount_value*conv_rate;
    Answer.innerText = `${amount_value} ${FromCurr_code} = ${conv_amount} ${ToCurr_code}`;
});