// Telegram WebApp integration
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;

// LocalStorage keys
const BAL = 'rl_balance';
const SIGN = 'rl_signup';
const LAST = 'rl_last_claim';

// Load or initialize
let balance = parseFloat(localStorage.getItem(BAL)) || 0;
let signed = localStorage.getItem(SIGN) === 'true';

// Give signup bonus of Red 1
function handleSignup() {
  if (!signed && user) {
    balance += 1;
    localStorage.setItem(BAL, balance.toFixed(2));
    localStorage.setItem(SIGN, 'true');
    signed = true;
    alert(`🎉 Hi ${user.first_name}, you got 1 Red bonus!`);
  }
}

// Update UI
function updateUI() {
  document.getElementById('balance').innerText = balance.toFixed(2) + ' Red';
  checkBonusTimer();
}

// Spin logic: bet 0.1 guaranteed X2; others 50% X2
function spin() {
  const bet = parseFloat(document.getElementById('bet').value);
  if (bet > balance) return alert('⚠️ Not enough balance');
  balance -= bet;
  let win = 0;
  if (bet === 0.1) {
    win = bet * 2;
    alert(`🥳 Double win! +${win} Red`);
  } else {
    if (Math.random() < 0.5) {
      win = bet * 2;
      alert(`🎉 You win ${win} Red`);
    } else {
      alert('😢 You lost');
    }
  }
  balance += win;
  localStorage.setItem(BAL, balance.toFixed(2));
  updateUI();
  animateFruits();
}

// Daily bonus claim of 0.1 Red
const BONUS = 0.1;
function claimBonus() {
  const now = Date.now();
  const last = parseInt(localStorage.getItem(LAST)) || 0;
  if (now - last < 24*60*60*1000) return alert('⏳ Already claimed');
  balance += BONUS;
  localStorage.setItem(BAL, balance.toFixed(2));
  localStorage.setItem(LAST, now);
  alert(`🎁 Claimed ${BONUS} Red`);
  updateUI();
}

// Show timer until next bonus
function checkBonusTimer() {
  const now = Date.now();
  const last = parseInt(localStorage.getItem(LAST)) || 0;
  const rem = 24*60*60*1000 - (now - last);
  const el = document.getElementById('claimTimer');
  if (rem > 0) {
    const h = Math.floor(rem/3600000);
    const m = Math.floor((rem%3600000)/60000);
    el.innerText = `Next bonus in ${h}h ${m}m`;
  } else {
    el.innerText = 'Daily bonus available!';
  }
}

// Animate fruits
function animateFruits() {
  document.querySelectorAll('.fruit').forEach(f => {
    f.classList.add('bounce');
    setTimeout(()=>f.classList.remove('bounce'), 1000);
  });
}

// On load
window.onload = () => {
  handleSignup();
  updateUI();
};

// Expose
window.spin = spin;
window.claimBonus = claimBonus;
