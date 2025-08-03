// script.js

// Telegram WebApp integration const tg = window.Telegram.WebApp; const user = tg.initDataUnsafe?.user;

// Local storage keys const STORAGE_BALANCE = 'rl_balance'; const STORAGE_SIGNUP = 'rl_signup_bonus'; const STORAGE_LAST_CLAIM = 'rl_last_claim';

// Initialize balance and signup bonus let balance = parseFloat(localStorage.getItem(STORAGE_BALANCE)) || 0; let signupDone = localStorage.getItem(STORAGE_SIGNUP) === 'true';

// Signup bonus: free Red 1 upon first Telegram connect function handleSignupBonus() { if (!signupDone && user) { balance += 1; localStorage.setItem(STORAGE_BALANCE, balance.toFixed(2)); localStorage.setItem(STORAGE_SIGNUP, 'true'); signupDone = true; alert(🎉 Welcome ${user.first_name}! You received 1 Red signup bonus.); } }

// Update display function updateUI() { document.getElementById('balance').innerText = balance.toFixed(2) + ' Red'; checkDailyBonusTimer(); }

// Spin logic: any bet 0.1 always X2 function spin() { const bet = parseFloat(document.getElementById('bet').value); if (bet > balance) { alert('⚠️ Not enough balance.'); return; } balance -= bet; let win = 0; if (bet === 0.1) { win = bet * 2; alert(🥳 Double win! You won ${win.toFixed(2)} Red); } else { // Other bets: 50% chance if (Math.random() < 0.5) { win = bet * 2; alert(🎉 You won ${win.toFixed(2)} Red); } else { alert('😢 You lost. Better luck next time!'); } } balance += win; localStorage.setItem(STORAGE_BALANCE, balance.toFixed(2)); updateUI(); animateFruits(); }

// Daily bonus: Red 0.1 every 24h const DAILY_BONUS = 0.1; function claimDailyBonus() { const now = Date.now(); const last = parseInt(localStorage.getItem(STORAGE_LAST_CLAIM)) || 0; if (now - last < 246060*1000) { alert('⏳ Bonus already claimed. Come back later.'); return; } balance += DAILY_BONUS; localStorage.setItem(STORAGE_BALANCE, balance.toFixed(2)); localStorage.setItem(STORAGE_LAST_CLAIM, now); alert(🎁 You claimed daily bonus ${DAILY_BONUS} Red); updateUI(); }

// Timer display function checkDailyBonusTimer() { const now = Date.now(); const last = parseInt(localStorage.getItem(STORAGE_LAST_CLAIM)) || 0; const rem = 2460601000 - (now - last); const timerEl = document.getElementById('claimTimer'); if (rem > 0) { const hrs = Math.floor(rem/(60601000)); const mins = Math.floor((rem%(60601000))/(601000)); timerEl.innerText = Next bonus in ${hrs}h ${mins}m; } else { timerEl.innerText = 'Daily bonus available!'; } }

// Fruit animation function animateFruits() { const fruits = document.querySelectorAll('.fruit'); fruits.forEach(f => { f.classList.add('animate'); setTimeout(() => f.classList.remove('animate'), 1000); }); }

// On load window.onload = () => { handleSignupBonus(); updateUI(); };

// Expose functions to global window.spin = spin; window.claimBonus = claimDailyBonus;

