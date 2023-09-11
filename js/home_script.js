if (localStorage.getItem('responseData')) {
    var storedData = localStorage.getItem('responseData');
    var storedDatas = JSON.parse(storedData);

    const apiData = storedDatas;

    function displayApiData() {
        const tableBody = document.querySelector('#api-table tbody');

        tableBody.innerHTML = '';

        let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;

        storedDatas.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td >${item.id}</td>
                <td class="editable" data-index="${index}">${item.title}</td>
                <td class="editable" data-index="${index}">${item.completed ? 'Yes' : 'No'}</td>
                <td >
                    <button class="btn-edit" data-index="${index}">Edit</button>
                    <button class="btn-delete" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        const editButtons = document.querySelectorAll('.btn-edit');
        for (let i = 0; i < editButtons.length; i++) {
            const button = editButtons[i];
            button.addEventListener('click', () => {
                editRow(button.getAttribute('data-index'));
            });
        }

        const deleteButtons = document.querySelectorAll('.btn-delete');
        for (let i = 0; i < deleteButtons.length; i++) {
            const button = deleteButtons[i];
            button.addEventListener('click', () => {
                deleteRow(button.getAttribute('data-index'));
            });
        }
    }

    function editRow(index) {
        const titleCell = document.querySelector(`.editable[data-index="${index}"]`);
        const completedCell = document.querySelector(`.editable[data-index="${index}"]`);
    
        let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;
    
        const currentTitleValue = titleCell.textContent;
        const input = document.createElement('input');
        input.value = currentTitleValue;
        titleCell.textContent = '';
        titleCell.appendChild(input);

        input.focus();

        input.addEventListener('blur', () => {
            const newValue = input.value;
            titleCell.textContent = newValue;
            storedDatas[index].title = newValue;
            localStorage.setItem("responseData", JSON.stringify(storedDatas));
        });
    }
    
    function deleteRow(index) {
        let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;

        storedDatas.splice(index, 1);

        localStorage.setItem('responseData', JSON.stringify(storedDatas));

        displayApiData();
    }
    displayApiData();
}

function makeVisible() {
    let change = document.getElementById('change-password-hide');
    if (change.style.display == 'flex') {
        change.style.display = 'none';
    }
    else {
        change.style.display = 'flex';
    }
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

        oldPassword.value = '';
        newPassword.value = '';

        let change = document.getElementById('change-password-hide');
        change.style.visibility = 'hidden';
    } else {
        alert('Enter correct Password');
    }

}

let i = 0;

function deleteAll() {
    const deleteAll = document.getElementById('api-table');
    const errorImg = document.getElementById('error-img');
    deleteAll.style.display = 'none';
    errorImg.style.visibility = 'visible';
    localStorage.setItem("i", 1);

}

window.addEventListener('load', function() {
    i = this.localStorage.getItem("i");
    if(i == 1) {
        updateData();
        localStorage.setItem("i", 0);
    }
});

function updateData() {
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