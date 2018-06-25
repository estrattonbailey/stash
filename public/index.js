function isOS() {
  return navigator.userAgent.match(/ipad|iphone/i);
}

function copyToClipboard (msg) {
  try {
    const text = document.createElement('textarea')
    text.value = msg
    text.style.cssText = 'position: absolute; left: -9999px;'
    document.body.appendChild(text)

    if (isOS()) {
      const range = document.createRange()
      range.selectNodeContents(text)

      const selection = window.getSelection()

      selection.removeAllRanges()
      selection.addRange(range)
      text.setSelectionRange(0, 999999);
    } else {
      text.select();
    }

    document.execCommand('copy')
    text.blur()
    document.body.removeChild(text)
  } catch (err) {
    window.prompt('Press Cmd+C or Ctrl+C to copy to clipboard.', msg)
  }
}

function local () {
  const ls = localStorate

  !ls.getItem('stash') && ls.setItem('stash', JSON.stringify({
    docs: [
      {
        id: 'default',
        content: 'Write something'
      }
    ]
  }))

  function get () {
    return JSON.parse(ls.getItem('stash'))
  }

  function set (data) {
    ls.setItem('stash', JSON.stringify(data))
  }

  return {
    getDoc (id) {
      return get().docs.filter(d => d.id === id)[0]
    },
    setDoc (id, content) {
      docs = get().docs.map(d => {
        if (d.id === id) d.content = content
      })
    }
    get docs () {
      return JSON.parse(get('stash')).docs
    }
  }
}

document.addEventListener('DOMContentLoaded', e => {
  const local = local()

  const editToggle = document.getElementById('editToggle')
  const previewToggle = document.getElementById('previewToggle')
  const edit = document.getElementById('edit')
  const preview = document.getElementById('preview')
  const share = document.getElementById('share')
  const copy = document.getElementById('copy')

  let url = null

  function setEditorHeight () {
    edit.style['min-height'] = ''
    setTimeout(() => {
      edit.style['min-height'] = (edit.scrollHeight + 50) + 'px'
    }, 0)
  }

  if (local) {
    edit.value = local
    preview.innerHTML = marked(local)
  }

  setEditorHeight()

  edit && edit.addEventListener('cut', setEditorHeight)
  edit && edit.addEventListener('paste', setEditorHeight)
  edit && edit.addEventListener('change', setEditorHeight)
  edit && edit.addEventListener('blur', setEditorHeight)

  edit && edit.addEventListener('input', e => {
    setEditorHeight()
    preview.innerHTML = marked(e.target.value)
    localStorage.setItem('stash', e.target.value)
  })

  editToggle && editToggle.addEventListener('click', () => {
    setEditorHeight()
  })

  share && share.addEventListener('click', e => {
    share.innerHTML = 'uploading'

    unfetch('/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: edit.value
      })
    })
      .then(res => res.json())
      .then(({ id }) => {
        url = window.location.origin + '/' + id

        share.style.display = 'none'
        share.innerHTML = 'share'
        copy.style.display = 'block'
      })
  })

  copy && copy.addEventListener('click', e => {
    copyToClipboard(url)
    copy.innerHTML = 'COPIED!'

    setTimeout(() => {
      share.style.display = 'block'
      copy.style.display = 'none'
      copy.innerHTML = '⇢ CLICK TO COPY'
    }, 4000)
  })

  if (window.location.pathname && window.location.pathname !== '/') {
    if (editToggle) editToggle.checked = false
    if (previewToggle) previewToggle.checked = true
  }
})
