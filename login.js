//  for rotation from one side to another
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
container.classList.remove("active");
});

// login &signup//


//  USER STORAGE
let registeredUser = null; 

// ERROR FUNCTIONS 
function showError(input, message) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error-msg")) {
        error = document.createElement("div");
        error.className = "error-msg";
        error.style.color = "red";
        error.style.fontSize = "12px";
        error.style.marginTop = "3px";
        input.insertAdjacentElement("afterend", error);
    }

    error.textContent = message;
}

function clearError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error-msg")) {
        error.textContent = "";
    }
}

// NAME VALIDATION
function validateName(nameInput) {
    const name = nameInput.value.trim();
    const nameRegex = /^[A-Z][a-z]+$/;

    if (!nameRegex.test(name)) {
        showError(nameInput,
            "Name must be one word, start with a capital letter, and contain only lowercase letters after."
        );
        return false;
    }

    clearError(nameInput);
    return true;
}

//  EMAIL VALIDATION 
function validateEmail(emailInput) {
    const email = emailInput.value.trim();
    const emailRegex = /^[a-z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.com$/;

    if (!emailRegex.test(email)) {
        showError(emailInput,
            "Email must start with a lowercase letter, contain '@', and end with '.com'."
        );
        return false;
    }

    clearError(emailInput);
    return true;
}

//PASSWORD VALIDATION 
function validatePassword(passInput) {
    const password = passInput.value.trim();
    const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[\W_]).{7,}$/;

    if (!passwordRegex.test(password)) {
        showError(passInput,
            "Password must start with a capital letter, include a number, a special character, and be 8+ characters long."
        );
        return false;
    }

    clearError(passInput);
    return true;
}

//  FORM VALIDATION 
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function (e) {
        let valid = true;

        const nameInput = this.querySelector("input[placeholder='Name']");
        const emailInput = this.querySelector("input[type='email']");
        const passInput = this.querySelector("input[type='password']");   
        if (nameInput) valid = validateName(nameInput) && valid;
        valid = validateEmail(emailInput) && valid;
        valid = validatePassword(passInput) && valid;

        if (!valid) {
            e.preventDefault();
            return;
        }

        //  REGISTRATION LOGIC 
        if (nameInput) {
            e.preventDefault();

            // Save user data
            registeredUser = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passInput.value.trim()
            };

            alert("Registration successful! Please sign in.");
            document.getElementById("login").click(); 
            return;
        }

        //SIGN IN LOGIC 
        if (!registeredUser) {
            e.preventDefault();
            alert("Please register before signing in.");
            return;
        }

        // Check matching email and password
        if (
            registeredUser.email !== emailInput.value.trim() ||
            registeredUser.password !== passInput.value.trim()
        ) {
            e.preventDefault();
            alert("Incorrect email or password!");
            return;
        }

        alert("Login Successful!");
    });
});
