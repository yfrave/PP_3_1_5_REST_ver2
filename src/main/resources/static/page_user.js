const urlUser = '/api/userTest';

const currentUser = fetch(urlUser).then(response => response.json())

// Заполнение шапки
currentUser.then(user => {
        let roles = ''
        user.roles.forEach(role => {
            roles += ' '
            roles += role.name
        })
        document.getElementById("navbar-email").innerHTML = user.email
        document.getElementById("navbar-roles").innerHTML = roles
    }
)

// Заполнение информации о пользователе
currentUser.then(user => {
        let roles = ''
        user.roles.forEach(role => {
            roles += ' '
            roles += role.name
        })

        let result = ''
        result += `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>
                   </tr>`
        document.getElementById("user-info-table").innerHTML = result
    }
)