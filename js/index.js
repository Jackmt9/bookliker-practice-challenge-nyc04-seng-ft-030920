bookList = document.querySelector('#list')

fetch(`http://localhost:3000/books`)
.then(r => r.json())
.then(obj => {
    obj.forEach(getBook)
})

function getBook(bookInfo) {
    let title = bookInfo.title
    let img = bookInfo.img_url
    let description = bookInfo.description
    let likes = bookInfo.users.length
    let id = bookInfo.id
    listBook(title, img, description, likes, bookInfo)
}

function listBook(title, img, description, likes, bookInfo) {
    bookLI = document.createElement('li')
    bookLI.innerText = title

    bookImg = document.createElement('img')
    bookImg.src = img

    bookDesc = document.createElement('p')
    bookDesc.innerText = description

    likeButton = document.createElement('button')
    likeButton.innerText = 'Likes: '

    likeAmount = document.createElement('span')
    likeAmount.innerText = likes
    
    likeButton.append(likeAmount)

    bookLI.append(bookImg, bookDesc, likeButton)

    bookList.append(bookLI)

    liked(likeButton, bookInfo, likeAmount)
}

// error with below function
function liked(likeButton, bookInfo, likeAmount) {
    let likedUsers = bookInfo.users
    // why can't I do !likedUsers below?
    if (!likedUsers.slice(-1) === 'jackmt9') {
        // debugger
        likedUsers.push({username: 'jackmt9', id: 1})

        likeButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/books/${bookInfo.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    users: likedUsers
                }) 
            })
            .then(r => r.json())
            .then(obj => {
                likeAmount.innerText = obj.users.length
            })
        })
    } else {
        let likedUsers = bookInfo.users.slice(0, -1)

        likeButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/books/${bookInfo.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    users: likedUsers
                }) 
            })
            .then(r => r.json())
            .then(obj => {
                likeAmount.innerText = obj.users.length
            })
        })
    }
}