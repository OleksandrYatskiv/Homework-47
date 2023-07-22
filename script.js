const wrapp = document.querySelector('.wrapp');

const searchContainer = document.createElement('div');
const input = document.createElement('input');
const searchBtn = document.createElement('button');

searchBtn.innerText = 'Search';

input.setAttribute('type', 'number');
input.setAttribute('placeholder', 'type id:');

searchContainer.classList.add('search-container');
searchBtn.classList.add('search-btn');

searchContainer.appendChild(input);
searchContainer.appendChild(searchBtn);
wrapp.appendChild(searchContainer);

searchBtn.addEventListener('click', () => {
    let id = input.value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            return response.json()
                .then(data => ({ status: response.status, data: data }));
        })
        .then(result => {
            wrapp.innerHTML = '';

            const status = result.status;
            const data = result.data;

            if (status >= 100 && status < 400) {
                const postTitle = document.createElement('p');
                const postBody = document.createElement('p');
                const getCommentsBtn = document.createElement('button');

                getCommentsBtn.innerText = 'See comments';
                postTitle.innerHTML = `<b>Post title :</b> ${data.title}`;
                postBody.innerHTML = `<b>Post body :</b> ${data.body}`;

                getCommentsBtn.classList.add('see-comments-button');

                wrapp.append(postTitle, postBody, getCommentsBtn);

                const reloadBtn = document.createElement('button');
                reloadBtn.innerText = 'Back searching';
                wrapp.append(reloadBtn);

                reloadBtn.addEventListener('click', () => {
                    location.reload();
                });

                getCommentsBtn.addEventListener('click', () => {
                    wrapp.innerHTML = '';

                    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);

                            response.forEach(comment => {
                                const commentWrapp = document.createElement('div');
                                const postId = document.createElement('p');
                                const postName = document.createElement('p');
                                const postEmail = document.createElement('p');
                                const postComment = document.createElement('p');

                                commentWrapp.classList.add('comments-container');

                                postId.innerHTML = `<b>Post id :</b> ${id}`;
                                postName.innerHTML = `<b>Name :</b> ${comment.name}`;
                                postEmail.innerHTML = `<b>Email :</b> ${comment.email}`;
                                postComment.innerHTML = `<b>Comment :</b> ${comment.body}`;

                                commentWrapp.append(postId, postName, postEmail, postComment);
                                wrapp.append(commentWrapp);

                            });

                            const reloadBtn = document.createElement('button');
                            reloadBtn.innerText = 'Back searching';
                            wrapp.append(reloadBtn);

                            reloadBtn.addEventListener('click', () => {
                                location.reload();
                            });
                        })
                });

            } else {
                const err = document.createElement('p');
                const reloadBtn = document.createElement('button');

                reloadBtn.addEventListener('click', () => {
                    location.reload();
                });

                reloadBtn.innerText = 'Back searching';
                err.innerText = `Error. Server response status : ${status}`;

                wrapp.append(err, reloadBtn);
            }
        })
        .catch(error => {
            console.log(error);
        });
});


