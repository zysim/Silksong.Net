const $ = document.querySelector.bind(document || document.body)

const footer = $('footer')
footer.removeChild($('footer>noscript'))
footer.innerHTML = `${(new Date()).getFullYear()} ${footer.innerHTML}`
