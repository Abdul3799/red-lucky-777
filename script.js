const symbols = ['cherry.png', 'lemon.png', 'grape.png', '777.png'];

function spin() {
  const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById('slot1').src = 'images/' + slot1;
  document.getElementById('slot2').src = 'images/' + slot2;
  document.getElementById('slot3').src = 'images/' + slot3;

  const result = document.getElementById('result');
  if (slot1 === slot2 && slot2 === slot3) {
    result.innerText = "🎉 JACKPOT! You Win!";
  } else {
    result.innerText = "😢 Try Again!";
  }
}
