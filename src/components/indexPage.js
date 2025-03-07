const navBar = (data) => {
    const nav = document.getElementById('navBar')
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.textContent = data
    li.appendChild(a)

    nav.appendChild(li)
}

export { navBar }