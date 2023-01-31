const form_del = document.getElementById('formForDeleting');
const id_del = document.getElementById('id_del');
const username_del = document.getElementById('username_del');
const lastname_del = document.getElementById('lastname_del');
const email_del = document.getElementById('email_del');
const password_del = document.getElementById('password_del');
const role_del = document.getElementById('role_del');


async function deleteModalData(id) {
    const urlForDel = 'http://localhost:8080/api/admin/users/' + id;
    let usersPageDel = await fetch(urlForDel);

    let roles = ''
    if (usersPageDel.ok) {
        let userData =
            await usersPageDel.json().then(user => {
                user.roles.forEach(role => {
                    roles += ' '
                    roles += role.name
                })
                id_del.value = `${user.id}`;
                username_del.value = `${user.username}`;
                lastname_del.value = `${user.lastname}`;
                email_del.value = `${user.email}`;
                password_del.value = `${user.password}`;
                role_del.value = `${roles}`;
            })
    } else {
        alert(`Error, ${usersPageDel.status}`)
    }
}

form_del.addEventListener('submit', deletingUser);

function deletingUser() {
    let url = 'http://localhost:8080/api/admin/users/' + id_del.value
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(url, method).then(() => {
        $('#deleteCloseBtn').click();
    })
}