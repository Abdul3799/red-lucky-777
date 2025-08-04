let balance = 1.0;

window.onload = function () {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.querySelector(".app").style.display = "block";
    updateBalance();
  }, 5000); // Show loading screen for 5 seconds
};

function updateBalance() {
  document.getElementById("balance").innerText = "Red " + balance.toFixed(2);
}

function spin() {
  if (balance < 0.1) {
    alert("Not enough balance!");
    return;
  }

  balance -= 0.1;
  const fruit = document.getElementById("fruit");
  const result = document.getElementById("result");

  const fruits = ["fruit1.png", "fruit2.png", "fruit3.png"];
  const win = Math.random() < 0.4;

  const newFruit = fruits[Math.floor(Math.random() * fruits.length)];
  fruit.src = "images/" + newFruit;

  if (win) {
    balance += 0.2; // x2 win
    result.innerText = "🎉 You won Red 0.2!";
  } else {
    result.innerText = "😢 Try again!";
  }

  updateBalance();
}
