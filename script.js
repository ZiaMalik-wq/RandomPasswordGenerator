const passwordBox = document.getElementById("password");
const lengthInput = document.getElementById("length");
const messageBox = document.getElementById("message");

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

  if (allChars === "") {
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
  } catch (err) {
    showMessage("Failed to copy password.", true);
  }
}

function showMessage(msg, isError = false) {
  messageBox.textContent = msg;
  messageBox.style.color = isError ? "#ff4d4d" : "#00ff9d";
}
