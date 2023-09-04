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
                <td class="api-data-center">${item.id}</td>
                <td class="editable api-data-left" data-index="${index}">${item.title}</td>
                <td class="editable api-data-center completed">${item.completed ? 'Yes' : 'No'}</td>
                <td class="api-data-center">
                    <button class="btn-edit" data-index="${index}">Edit</button>
                    <button class="btn-delete" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        const editableCells = document.querySelectorAll('.editable');
        let len = editableCells.length;
        for (let i = 0; i < len; i++) {
            const cell = editableCells[i];
            cell.addEventListener('click', () => {
                makeCellEditable(cell);
            });
        }

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

    function makeCellEditable(cell) {
        const currentValue = cell.textContent;
        const input = document.createElement('input');
        input.value = currentValue;
        cell.textContent = '';
        cell.appendChild(input);

        input.focus();
        input.select();

        input.addEventListener('blur', () => {
            const newValue = input.value;
            cell.textContent = newValue;
        });
    }

    function editRow(index) {
        let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;

        const titleCell = document.querySelector(`.editable[data-index="${index}"]`);
        const newValue = titleCell.textContent;

        storedDatas[index].title = newValue;

        localStorage.setItem('responseData', JSON.stringify(storedDatas));
    }

    function deleteRow(index) {
        let storedDatas = JSON.parse(localStorage.getItem('responseData')) || apiData;

        storedDatas.splice(index, 1);

        localStorage.setItem('responseData', JSON.stringify(storedDatas));

        displayApiData();
    }
    displayApiData();

    // const tableBody = document.querySelector('#api-table tbody');

    // tableBody.innerHTML = '';

    // let len = storedDatas.length; 
    // for(let item = 0; item < len; item++){
    //     const row = document.createElement('tr');
    //     row.innerHTML = `
    //         <td class="api-data-center">${storedDatas[item].id}</td>
    //         <td class="editable api-data-left">${storedDatas[item].title}</td>
    //         <td class="editable api-data-center">${storedDatas[item].completed ? 'Yes' : 'No'}</td>
    //         <td class = "api-data-center"> <button>edit</button><button>Delete</button></td>
    //     `;
    //     tableBody.appendChild(row);
    // }
    
    // const editableCells = document.querySelectorAll('.editable');

    // for( let i = 0; i < editableCells.length ; i++) {
    //     cell = editableCells[i];
    //     cell.addEventListener('click', makeCellEditable);
    //     function makeCellEditable(event) {
            // const cell = event.target;
            // const index = event.target.parentNode.cells[0].innerHTML;
            // const currentValue = cell.textContent;
            // const input = document.createElement('input');
            // input.value = currentValue;
            // cell.textContent = '';
            // cell.appendChild(input);
    
            // input.focus();
            // input.select();
    
    //         input.addEventListener('blur', () => {
    //             const newValue = input.value;
    //             cell.textContent = newValue;
    //             storedDatas[index-1].title = newValue;
    //             localStorage.setItem('responseData', JSON.stringify(storedDatas));
    //         });
    //     }
    // }
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

        oldPassword.value = '';
        newPassword.value = '';

        let change = document.getElementById('change-password-hide');
        change.style.visibility = 'hidden';
    } else {
        alert('Enter correct Password');
    }

}
