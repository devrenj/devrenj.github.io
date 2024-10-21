alert('alert.js 4')

const compartilhar = document.querySelector('#compartilhar') 
compartilhar.addEventListener('click', (e) => {
  alert(`click ${e.target}`)
})