const [bill, peopleNum] = document.querySelectorAll(".calc-input");
const [tipAmount, total] = document.querySelectorAll(".sump");
const error = document.querySelector(".error-message");
const tips = document.querySelectorAll(".tip");
const reset = document.querySelector(".btn-reset");
let billAmount = 0;
let timeOut;

const tipsArr = [5, 10, 15, 25, 50];
let selectedTip = 0;
let peopleAmount = 0;

// check if the input of people number whether ==0 or not
const checkErr = () => {
  if (!peopleNum.value || peopleNum.value == 0) {
    error.classList.remove("hidden");
    peopleNum.classList.add("input-error");
    return false;
  } else {
    error.classList.add("hidden");
    peopleNum.classList.remove("input-error");
    return true;
  }
};

// count the tip and display to browser through  tipAmount.textContent and total.textContent

const calcTipAmount = (bill, tip, peopleNum) => {
  if (bill && tip && peopleNum && bill > 0 && tip > 0 && peopleNum > 0) {
    const amount = (bill * tip) / 100;
    tipAmount.textContent = `$${Math.round((amount / peopleNum) * 100) / 100}`;
    // round to 2 decimal places
    total.textContent = `$${Math.round(amount * 100) / 100}`;
  } else {
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
  }
};

bill.addEventListener("input", function (event) {
  event.preventDefault();
  // typeof event.target.value==>string
  //   cleanup func for  wait a seconds for input event prevent to repeat code many time
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    billAmount = +event.target.value;
    calcTipAmount(billAmount, selectedTip, peopleAmount);
  }, 500);
});

// peopleNum.value === "" ==>true (empty input)
const removeActive = (currentActive) => {
  for (let i = 0; i < 5; i++) {
    tips[i].classList.remove("tip-active");
  }
  tips[tips.length - 1].classList.remove("custom-active");
  if (currentActive) {
    currentActive.classList.add("tip-active");
  }
};
// add EventListener for each tip elemenet except custom one
for (let i = 0; i < 5; i++) {
  tips[i].addEventListener("click", () => {
    selectedTip = +tips[i].textContent.slice(0, -1);
    removeActive(tips[i]);
    calcTipAmount(billAmount, selectedTip, peopleAmount);
  });
}

// line 71 to
tips[tips.length - 1].addEventListener("click", function () {
  removeActive();
  tips[tips.length - 1].classList.add("custom-active");
});
tips[tips.length - 1].addEventListener("input", function (event) {
  event.preventDefault();

  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    selectedTip = +event.target.value;
    calcTipAmount(billAmount, selectedTip, peopleAmount);
  }, 500);
});

peopleNum.addEventListener("input", function (event) {
  event.preventDefault();

  checkErr();
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    peopleAmount = +event.target.value;
    calcTipAmount(billAmount, selectedTip, peopleAmount);
  }, 500);
});
reset.addEventListener("click", () => {
  removeActive();
  calcTipAmount();
  bill.value = "";
  peopleNum.value = "";
  tips[tips.length - 1].value = "";
  selectedTip = 0;
  peopleAmount = 0;
  billAmount = 0;
});
