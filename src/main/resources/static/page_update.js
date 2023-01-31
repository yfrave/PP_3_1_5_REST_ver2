const editUserModal = document.getElementById('formForEditing');
const urlUsers = 'http://localhost:8080/api/admin/users/';
const idEdit = document.getElementById('id_ed')
const firstNameEdit = document.getElementById('username_ed')
const lastNameEdit = document.getElementById('lastname_ed')
const emailEdit = document.getElementById('email_ed')
const passwordEdit = document.getElementById('password_ed')
const rolesEdit = document.getElementById('role_ed')

let rowEdit = null
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e.target)
        }
    })
}

on(document, 'click', '#editUserBtn', e => {
    rowEdit = e.parentNode.parentNode

    idEdit.value = rowEdit.children[0].innerHTML
    firstNameEdit.value = rowEdit.children[1].innerHTML
    lastNameEdit.value = rowEdit.children[2].innerHTML
    emailEdit.value = rowEdit.children[3].innerHTML
    passwordEdit.value = ''
    let roles = '';
    fetch(urlUsers + idEdit).then(response => response.json()).then(user => {
        user.roles.forEach(role => {
            roles += ' '
            roles += role.name
        })
        rolesEdit.innerHTML = roles
    })
    editUserModal.show()
})

document.getElementById('edit_user_form').addEventListener('submit', (e) => {
    e.preventDefault()
    let role = document.getElementById('role_select_update')
    let rolesUserEdit = []
    let rolesUserEditValue = ''
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesUserEdit.push({id: role.options[i].value, name:role.options[i].innerHTML})
            rolesUserEditValue += role.options[i].innerHTML + ' '
        }
    }
    fetch(urlUsers + idEdit, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idEdit.value,
            username: firstNameEdit.value,
            lastname: lastNameEdit.value,
            email: emailEdit.value,
            password: passwordEdit.value,
            roles: rolesUserEdit
        })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
    rowEdit.children[0].innerHTML = idEdit.value
    rowEdit.children[1].innerHTML = firstNameEdit.value
    rowEdit.children[2].innerHTML = lastNameEdit.value
    rowEdit.children[4].innerHTML = emailEdit.value
    rowEdit.children[5].innerHTML = rolesUserEditValue
    editUserModal.hide()
})