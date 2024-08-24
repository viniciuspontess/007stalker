document.getElementById('searchButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const userDataDiv = document.getElementById('userData');

    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Usuário não encontrado');
                }
                return response.json();
            })
            .then(data => {
                userDataDiv.innerHTML = `
                    <div class="user-info">
                        <img src="${data.avatar_url}" alt="${data.login}" width="100" />
                        <div>
                            <h2>${data.name ? data.name : data.login}</h2>
                            <p><strong>Bio:</strong> ${data.bio ? data.bio : 'N/A'}</p>
                            <p><strong>Repositórios Públicos:</strong> ${data.public_repos}</p>
                            <p><strong>Seguidores:</strong> ${data.followers}</p>
                            <p><strong>Seguindo:</strong> ${data.following}</p>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                userDataDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    } else {
        userDataDiv.innerHTML = `<p style="color: red;">Por favor, insira um nome de usuário.</p>`;
    }
});
