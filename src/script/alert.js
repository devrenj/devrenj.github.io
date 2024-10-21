alert('alert.js 3')

let vezes = 0;
document.addEventListener('touchstart', () => {
  alert('touchstart', vezes)
})
document.addEventListener('click', () => {
  alert('click', vezes)
})