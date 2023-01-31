const urls = 'http://localhost:8080/api/admin/users';

async function getAdminGeneralPage() {
    let page = await fetch(urls)

    if (page.ok) {
        let listOfUsers = await page.json();
        loadTableData(listOfUsers)
    } else {
        alert(`Error, ${page.status}`);
    }
}

function loadTableData(listOfUsers) {
    const tableBody = document.getElementById('tbodyUsers');
    let dataHtml = '';

    for (let user of listOfUsers) {
        let roles = [];

        for (let role of user.roles) {
            roles.push(" " + role.name)
        }
        dataHtml += `<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
            <td>${roles}</td>
            <td>
                <button class="btn btn-primary" data-bs-toggle="modal" 
                           data-bs-target="#editUserModal" 
                           onclick="editModalData(${user.id})">
                    Edit
                </button>
            </td>
            <td>
                <button class="btn btn-danger" data-bs-toggle="modal" 
                           data-bs-target="#deleteModal"
                           onclick="deleteModalData(${user.id})">
                    Delete
                </button>
            </td>
            </tr>`
    }
    tableBody.innerHTML = dataHtml;
}

getAdminGeneralPage();