document.getElementById('newUsersForm').addEventListener('submit', (e) => {
    e.preventDefault()
    let role = document.getElementById('role_select')
    let rolesAddUser = []
    let rolesAddUserValue = ''
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesAddUser.push({id: role.options[i].value, name: role.options[i].innerHTML})
            rolesAddUserValue += role.options[i].innerHTML + ' '
        }
    }

    fetch('http://localhost:8080/api/admin/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            roles: rolesAddUser
        })
    })
        .then(response => response.json())
        .then(user => {
            let roles = ''
            user.roles.forEach(role => {
                roles += ' '
                roles += role.name
            })
            let newRow = document.createElement('tr')
            newRow.innerHTML = `<tr>
                           <td>${user.id}</td>
                           <td>${user.username}</td>
                           <td>${user.lastname}</td>
                           <td>${user.email}</td>
                           <td>${roles}</td>
                          <td>
                <button class="btn btn-primary" data-bs-toggle="modal" 
               data-bs-target="#editModal" 
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
            document.getElementById("tbodyUsers").appendChild(newRow)
            document.getElementById('newUsersForm').reset()

        })
    document.getElementById("home-tab").click()
})
