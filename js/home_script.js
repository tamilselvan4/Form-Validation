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

    // function editRow(index) {
    //     const titleCell = document.querySelector(`.editable[data-index="${index}"]`);
    //     const completedCell = document.querySelector(`.editable[data-index="${index}"]`);
    
    //     let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;
    
    //     const currentTitleValue = titleCell.textContent;
    //     const input = document.createElement('input');
    //     input.value = currentTitleValue;
    //     titleCell.textContent = '';
    //     titleCell.appendChild(input);

    //     input.focus();

    //     input.addEventListener('blur', () => {
    //         const newValue = input.value;
    //         titleCell.textContent = newValue;
    //         storedDatas[index].title = newValue;
    //         localStorage.setItem("responseData", JSON.stringify(storedDatas));
    //     });
    // }
    
    function editRow(index) {
        const titleCell = document.querySelector(`.editable[data-index="${index}"]`);
        const input = titleCell.querySelector('input');
        
        if (!input) {
            let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;
    
            const currentTitleValue = titleCell.textContent;
            const input = document.createElement('input');
            input.value = currentTitleValue;
            titleCell.textContent = '';
            titleCell.appendChild(input);
    
            const editButton = document.querySelector(`.btn-edit[data-index="${index}"]`);
            const deleteButton = document.querySelector(`.btn-delete[data-index="${index}"]`);
            editButton.textContent = 'Save';
            deleteButton.textContent = 'Cancel';
    
            input.focus();
    
            editButton.removeEventListener('click', () => {
                editRow(index);
            });
    
            editButton.addEventListener('click', () => {
                const newValue = input.value;
                titleCell.textContent = newValue;
                storedDatas[index].title = newValue;
                localStorage.setItem("responseData", JSON.stringify(storedDatas));
    
                editButton.textContent = 'Edit';
                deleteButton.textContent = 'Delete'
                editButton.addEventListener('click', () => {
                    editRow(index);
                });
            });

            deleteButton.addEventListener('click', () => {
                if(deleteButton.textContent == 'Cancel') {
                    titleCell.textContent = currentTitleValue;
                    storedDatas[index].title = currentTitleValue;
                    editButton.textContent = 'Edit';
                    deleteButton.textContent = 'Delete';
                }
            });
        }
    }

    function deleteRow(index) {
        const deleteButton = document.querySelector(`.btn-delete[data-index="${index}"]`);
        if(deleteButton.textContent == 'Delete') {
            let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;

            storedDatas.splice(index, 1);

            localStorage.setItem('responseData', JSON.stringify(storedDatas));

            displayApiData();
        }
        
    }
    displayApiData();
}

function makeVisible() {
    let change = document.getElementById('change-password-hide');
    const deleteAllButton = document.getElementById('delete-all');
    const input = document.getElementById('old-password');
    if (change.style.display == 'flex') {
        change.style.display = 'none';
        deleteAllButton.style.display = 'flex';
    }
    else {
        change.style.display = 'flex';
        input.focus();
        deleteAllButton.style.display = 'none';
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
        let change = document.getElementById('change-password-hide');
        change.style.display = 'none';
        storedUsers[flag2].password = newPassword.value;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        alert('Password updated successfully');

        oldPassword.value = '';
        newPassword.value = '';
    } 
    else {
        alert('Enter correct Password');
    }

}

let i = 0;

function deleteAll() {
    const deleteAll = document.getElementById('api-table');
    const errorImg = document.getElementById('error-img');
    const deleteAllButton = document.getElementById('delete-all');
    deleteAll.style.display = 'none';
    errorImg.style.visibility = 'visible';
    localStorage.setItem("i", 1);
    deleteAllButton.style.display = 'none'
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

function logOut() {
    window.location.replace('login.html');
}