function keyUpFunction() {
    const emailInput1 = document.getElementById('input-username');
    const passwordInput = document.getElementById('input_password');
    const emailAlert1 = document.getElementById('email-alert');
    const passwordAlert = document.getElementById('password-alert');
    const invalidEmail = document.getElementById('invalid-email');
    const invalidPassword = document.getElementById('invalid-password');

    invalidEmail.innerHTML = "";
    invalidPassword.innerHTML = "";
    emailAlert1.style.display = 'none';
    emailInput1.style.borderColor = "rgb(160, 160, 160)";
}
function validate() {
    const emailInput = document.getElementById('input-username');
    const passwordInput = document.getElementById('input-password');
    const emailAlert = document.getElementById('email-alert');
    const passwordAlert = document.getElementById('password-alert');
    const invalidEmail = document.getElementById('invalid-email');
    const invalidPassword = document.getElementById('invalid-password');

    let email = ['tamil@gmail.com','vijay@gmail.com','harish@gmail.com'];
    let password = ['tamil','vijay','12345']

    if (!emailInput.value) {
        emailAlert.style.display = 'inline';
        emailInput.style.borderColor = "red";
        invalidEmail.innerHTML = "*enter the email";
        return;
    }
    
    else {         
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value)) {
            emailAlert.style.display = 'inline';
            emailInput.style.borderColor = "red";
            invalidEmail.innerHTML = "*enter valid email";
            return;
        }
        else {
            emailAlert.style.display = 'none';
            emailInput.style.borderColor = "rgb(160, 160, 160)";
            invalidEmail.innerHTML = "";
        }
    }

    if (passwordInput.value.length < 5) {
        passwordAlert.style.display = 'inline';
        passwordInput.style.borderColor = "red";
        invalidPassword.innerHTML = "*enter atleast 5 characters";
        return;
    } 
    
    else {
        passwordAlert.style.display = 'none';
        passwordInput.style.borderColor = "rgb(160, 160, 160)";
        invalidPassword.innerHTML = "";
    }
    
    let j=0;

    for (let i=0 ; i<email.length ; i++) {
        if(email[i]==emailInput.value && password[i] == passwordInput.value) {
            j=1;
            window.location.href = "home.html";
        }
    }
    if (j==0) {
        alert('Enter valid login credentials');
    }
}