




const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateflg(evt.target)

  })



}



const updateflg = (ele) => {
  let curr = ele.value
  let currCode = countryList[curr]
  let newsrc = `https://flagsapi.com/${currCode}/flat/64.png`
  let img = ele.parentElement.querySelector("img")
  img.src = newsrc

}

const updateRate = async () => {
  let amount = document.querySelector(".amount input")
  let amtVal = amount.value
  if (amtVal === "" && amtVal < 1) {
    amtVal = 1
  }
  const URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`
  let data = await fetch(URL)
  let res = await data.json();
  let cuDetails = res.rates

  let toCurName = toCurr.value

  let cVal = cuDetails[toCurName]
  let exVal = amtVal * cVal
  msg.innerText = `${amtVal} ${fromCurr.value} is equal to ${exVal.toFixed(2)} ${toCurr.value}`

}
btn.addEventListener("click", (e) => {
  e.preventDefault()
  updateRate()
})

window.addEventListener("load", () => {
  updateRate();
});




