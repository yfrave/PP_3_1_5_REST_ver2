const url = 'http://localhost:8080/api/userTest';

const currentUser = fetch(url).then(response => response.json())

currentUser.then(user => {
    let roles = '';
    user.roles.forEach(role => {
        roles += ' '
        roles += role.name
    })

        let result = '';
        result += `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>`
        document.getElementById("tbody").innerHTML = result
    }
)