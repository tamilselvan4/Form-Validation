let user = [];

function validate() {

    event.preventDefault();

    const emailInput = document.getElementById('input-username');
    const passwordInput = document.getElementById('input-password');
    const emailAlert = document.getElementById('email-alert');
    const passwordAlert = document.getElementById('password-alert');
    const invalidEmail = document.getElementById('invalid-email');
    const invalidPassword = document.getElementById('invalid-password');
    
    let flag = 0;

    if (!emailInput.value) {
        emailAlert.style.display = 'inline';
        emailInput.style.borderColor = "red";
        invalidEmail.innerHTML = "*enter the email";
    }
    
    else {         
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value)) {
            emailAlert.style.display = 'inline';
            emailInput.style.borderColor = "red";
            invalidEmail.innerHTML = "*enter valid email";
        }

        else {
            emailAlert.style.display = 'none';
            emailInput.style.borderColor = "rgb(160, 160, 160)";
            invalidEmail.innerHTML = "";
        }
    }

    if (!passwordInput.value) {
        passwordAlert.style.display = 'inline';
        passwordInput.style.borderColor = "red";
        invalidPassword.innerHTML = "*enter the password";
        return;
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
        flag = 1;
    }
    
    const existingUsersJSON = localStorage.getItem('users');
    const storedUsers = JSON.parse(existingUsersJSON);

    let existingUser;
    let flag2= -1;
    if (storedUsers && storedUsers.length > 0) {
        localStorage.setItem("flag2", storedUsers.length)
    } else {
        localStorage.setItem("flag2", '0')
    }
    
    
    for (let i in storedUsers) {
        if(storedUsers[i].email == emailInput.value) {
            flag2 = i;
            localStorage.setItem("flag2", i);
            existingUser = storedUsers.find(a => storedUsers[i].email == emailInput.value);
        }
    }

    if (flag == 1) {
        if(existingUser){
            if(storedUsers[flag2].password == passwordInput.value){
                window.location.href = "home.html";
            }
            else {
                invalidPassword.innerHTML = "*enter correct password";
                passwordAlert.style.display = 'inline';
            }
        }
        else {
            const newUser = {
                email: emailInput.value,
                password: passwordInput.value
            };
            
            const existingUsersJSON = localStorage.getItem('users');
            let existingUsers = [];
            
            if (existingUsersJSON) {
                existingUsers = JSON.parse(existingUsersJSON);
            }
            
            if (!Array.isArray(existingUsers)) {
                existingUsers = [];
            }
            
            existingUsers.push(newUser);
            
            const updatedUsersJSON = JSON.stringify(existingUsers);
            localStorage.setItem('users', updatedUsersJSON);

            loaddata();
        }
    }
}

function loaddata() {
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var responseData = this.responseText;
            localStorage.setItem('responseData', responseData);
            window.location.href = 'home.html';                    }
        };
    a.open("GET", "https://jsonplaceholder.typicode.com/todos/", true);
    a.send();
}



function makeVisible() {

    let change = document.getElementById('change-password-hide');
    change.style.visibility = 'visible';
}

function changePassword() {

    const oldPassword = document.getElementById('old-password');
    const newPassword = document.getElementById('new-password');
    flag2 = localStorage.getItem("flag2");

    let storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const enteredPassword = oldPassword.value;

    const matchedUser = storedUsers.find(user => storedUsers[flag2].password === enteredPassword);

    if (matchedUser) {
        storedUsers[flag2].password = newPassword.value;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        alert('Password updated successfully');

        oldPassword.value = ''
        newPassword.value = '';

        let change = document.getElementById('change-password-hide');
        change.style.visibility = 'hidden';
    } else {
        alert('Enter correct Password');
    }

}

function displayData() {
    if (localStorage.getItem('responseData')) {
        var storedData = localStorage.getItem('responseData');
        document.getElementById("displayData").innerHTML = storedData;
    }
}

function keyUpFunctionMail() {

    const emailInput1 = document.getElementById('input-username');
    const emailAlert1 = document.getElementById('email-alert');
    const invalidEmail = document.getElementById('invalid-email');

    invalidEmail.innerHTML = "";
    emailAlert1.style.display = 'none';
    emailInput1.style.borderColor = "rgb(160, 160, 160)";
}

function keyUpFunctionPassword() {

    const passwordInput = document.getElementById('input-password');
    const passwordAlert = document.getElementById('password-alert');
    const invalidPassword = document.getElementById('invalid-password');
    
    invalidPassword.innerHTML = "";
    passwordAlert.style.display = 'none';
    passwordInput.style.borderColor = "rgb(160, 160, 160)";
}

