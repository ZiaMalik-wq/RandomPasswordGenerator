const passwordBox = document.getElementById("password");
const lengthInput = document.getElementById("length");
const messageBox = document.getElementById("message");
const strengthFill = document.getElementById("strengthFill");

function createRandomPassword() {
  const upper = document.getElementById("upper").checked;
  const lower = document.getElementById("lower").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "@#$%^&*()_+-=~{}[]|<>?/,";

  let allChars = "";
  if (upper) allChars += upperCase;
  if (lower) allChars += lowerCase;
  if (numbers) allChars += numberChars;
  if (symbols) allChars += symbolChars;

  const length = parseInt(lengthInput.value);
  if (isNaN(length) || length < 4 || length > 50) {
    passwordBox.value = "";
    showMessage("Please select a password length between 4 and 50.", true);
    strengthFill.style.width = '0%';
    return;
  }

  if (!allChars) {
    passwordBox.value = "";
    showMessage("Select at least one character type!", true);
    return;
  }

  let password = "";
  if (upper) password += getRandomChar(upperCase);
  if (lower) password += getRandomChar(lowerCase);
  if (numbers) password += getRandomChar(numberChars);
  if (symbols) password += getRandomChar(symbolChars);

  while (password.length < length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  password = shuffleString(password);
  passwordBox.value = password;
  showMessage("Password generated successfully.");
  strengthFill.style.width = '0%'; // Reset strength meter
}

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffleString(str) {
  return str.split('').sort(() => 0.5 - Math.random()).join('');
}

async function copyPassword() {
  const password = passwordBox.value;
  if (!password) {
    showMessage("Nothing to copy!", true);
    return;
  }
  try {
    await navigator.clipboard.writeText(password);
    showMessage("Password copied to clipboard.");
  } catch {
    showMessage("Failed to copy password.", true);
  }
}

function showStrength() {
  const password = passwordBox.value;
  if (!password) {
    showMessage("Please generate a password first.", true);
    strengthFill.style.width = '0%';
    return;
  }

  let score = 0;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  if (password.length >= 12) score += 2; // Strong length bonus
  else if (password.length >= 8) score += 1; // Medium length bonus
  else score = Math.min(score, 2); // Cap score for short passwords

  let strength = '', width = '0%', color = 'red';
  if (score <= 2) {
    strength = 'Weak';
    width = '20%';
    color = 'red';
  } else if (score === 3 || score === 4) {
    strength = 'Medium';
    width = '60%';
    color = 'orange';
  } else if (score >= 5) {
    strength = 'Strong';
    width = '100%';
    color = 'green';
  }

  strengthFill.style.width = width;
  strengthFill.style.backgroundColor = color;
  showMessage(`Password Strength: ${strength}`);
}


function showMessage(msg, isError = false) {
  messageBox.textContent = msg;
  messageBox.style.color = isError ? "#ff4d4d" : "#00ff9d";
}
