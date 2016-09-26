import debounce from 'lodash.debounce'
import hash from 'shortid'
import Stockpile from 'stockpile.js'
import Remarkable from 'remarkable/dist/remarkable.min.js'
import { highlight, languages } from 'prismjs'

const md = new Remarkable({ 
  highlight: (str, lang) => {
    if (lang && languages[lang]) {
      try {
        return highlight(str, languages[lang])
      } catch (err) {}
    }

    try {
      return highlight(str)
    } catch (err) {}

    return ''
  }
})

const __NS__ = 'stash'

const storage = Stockpile(__NS__)
window.storage = storage

let ID = storage.get('id') || hash.generate()

const input = document.getElementById('input')
const output = document.getElementById('output')
const editor = document.getElementById('editor')
const preview = document.getElementById('preview')
const toggle = document.getElementById('toggle')

const renderEditor = data => input.innerHTML = data

const setURL = id => window.location.hash = `#${id}`

input.addEventListener('keyup', debounce(e => {
  storage.set('doc', e.target.value) 
}, 1000))

input.addEventListener('keydown', e => {
  if (e.keyCode == 9 || e.which == 9){
    e.preventDefault()
    let s = input.selectionStart
    input.value = input.value.substring(0, input.selectionStart) + "\t" + input.value.substring(input.selectionEnd)
    input.selectionEnd = s+1
  }
})

toggle.addEventListener('click', e => {
  e.preventDefault()

  if (preview.classList.contains('is-visible')){
    preview.classList.remove('is-visible') 
  } else {
    output.innerHTML = md.render(input.value)
    preview.classList.add('is-visible')
  }
})

!!localStorage.getItem(__NS__) ? input.innerHTML = storage.get('doc') : null

setURL(ID)
storage.set('id', ID)
