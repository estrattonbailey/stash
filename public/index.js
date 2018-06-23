function copyToClipboard (msg) {
  try {
    const text = document.createElement('textarea')
    text.innerHTML = msg
    text.style.cssText = 'position: absolute; left: -9999px;'
    document.body.appendChild(text)
    text.select()
    document.execCommand('copy')
    text.blur()
    document.body.removeChild(text)
  } catch (err) {
    window.prompt('Press Cmd+C or Ctrl+C to copy to clipboard.', msg)
  }
}

document.addEventListener('DOMContentLoaded', e => {
  const editToggle = document.getElementById('editToggle')
  const previewToggle = document.getElementById('previewToggle')
  const edit = document.getElementById('edit')
  const preview = document.getElementById('preview')
  const share = document.getElementById('share')
  const copy = document.getElementById('copy')

  let url = null

  const local = localStorage.getItem('stash')

  if (local) {
    edit.value = local
    preview.innerHTML = snarkdown(local)
  }

  edit && edit.addEventListener('change', e => {
    preview.innerHTML = snarkdown(e.target.value)
    localStorage.setItem('stash', e.target.value)
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
