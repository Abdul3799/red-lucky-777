// Initial balance and welcome bonus
let balance = 0.1; // Red 0.1 welcome bonus
let lastClaimTime = localStorage.getItem('lastClaimTime') || 0;
const claimAmount = 0.1; // Red token

// Display balance on load
window.onload = function () {
  document.getElementById("balance").innerText = balance.toFixed(2) + " Red";
  checkClaimTimer();
};

// Spin logic
function spinWheel(bet) {
  bet = parseFloat(bet);
  if (bet > balance) {
    alert("Not enough Red to spin.");
    return;
  }

  balance -= bet;

  // Random outcome (basic logic, can be improved)
  const chance = Math.random();
  let win = 0;
  if (chance < 0.05) {
    win = bet * 5; // Jackpot X5
    alert("🎉 Jackpot! You win " + win.toFixed(2) + " Red");
  } else if (chance < 0.4) {
    win = bet * 2; // Regular win X2
    alert("You win " + win.toFixed(2) + " Red");
  } else {
    alert("Try again!");
  }

  balance += win;
  updateBalance();
  animateFruits();
}

// Update balance display
function updateBalance() {
  document.getElementById("balance").innerText = balance.toFixed(2) + " Red";
}

// Claim bonus once every 24 hours
function claimBonus() {
  const now = Date.now();
  if (now - lastClaimTime < 24 * 60 * 60 * 1000) {
    alert("You already claimed your bonus. Try again later.");
    return;
  }

  balance += claimAmount;
  lastClaimTime = now;
  localStorage.setItem('lastClaimTime', lastClaimTime);
  updateBalance();
  alert("You claimed Red " + claimAmount);
}

// Check claim timer on load
function checkClaimTimer() {
  const now = Date.now();
  const remaining = 24 * 60 * 60 * 1000 - (now - lastClaimTime);
  if (remaining > 0) {
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    document.getElementById("claimTimer").innerText = 
      `Bonus in ${hours}h ${minutes}m`;
  } else {
    document.getElementById("claimTimer").innerText = "Bonus available!";
  }
}

// Animate fruits visually (loop simple images)
function animateFruits() {
  const fruits = document.querySelectorAll(".fruit");
  fruits.forEach(fruit => {
    fruit.classList.add("animate");
    setTimeout(() => fruit.classList.remove("animate"), 1000);
  });
}
