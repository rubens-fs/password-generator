const lengthSlider = document.querySelector(".password-length input"),
options = document.querySelectorAll(".option input"),
showIcon = document.querySelector(".visibility span"),
copyIcon = document.querySelector(".copy_all span"),
passwordInput = document.querySelector(".input-box input");
passIndicator = document.querySelector(".password-indicator");
generateBtn = document.querySelector(".generate-btn");

const characters = { // object of letters, numbers and symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~",
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exclude-duplicate" && option.id !== "include-spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "include-spaces") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}

const updatepassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".password-length span").innerText = lengthSlider.value;
    generatePassword();
    updatepassIndicator();
}

/* Password copy function. */
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all"
    }, 1500);
}

/* Show/hide password function. */
const showPassword = () => {
    const type = passwordInput.getAttribute("type") === "text" ? "password" : "text";
    passwordInput.setAttribute("type", type);

    type === "text" ? showIcon.innerText = "visibility" : showIcon.innerText = "visibility_off";
}

showIcon.addEventListener("click", showPassword);
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);