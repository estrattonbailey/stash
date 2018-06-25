const { promisify } = require('util')
const server = require('connect')()
const router = require('router')()
const serve = require('serve-static')
const ms = require('ms')
const uid = require('uid')
const { json } = require('body-parser')
const admin = require('firebase-admin')
const marked = require('marked')
const serviceAccount = require('./serviceAccountKey.json')

const { NODE_ENV } = process.env

const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}).firestore()

function handler (req, res) {
  const { id } = req.params

  if (id) {
    db.collection('entries')
      .doc(id)
      .get()
      .then(doc => {
        res.setHeader('Content-Type', 'text/html')
        res.statusCode = 200

        const content = doc.data().content

        res.write(template({
          id,
          content
        }))
        res.end()
      })
      .catch(e => {
        console.log(e)

        res.writeHead(500, {
          'Content-Type': 'text/html'
        })

        res.write(template({}))
        res.end()
      })
  } else {
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 200

    res.write(template({}))
    res.end()
  }
}

server.use(json())
server.use(serve('public', {
  maxAge: NODE_ENV === 'production' ? ms('1d') : 0
}))

router.get('/', handler)
router.get('/:id', handler)

router.post('/share', (req, res) => {
  const { content } = req.body

  const id = uid(16)

  return db.collection('entries')
    .doc(id)
    .set({ content })
    .then(() => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.write(JSON.stringify({
        id
      }))
      res.end()
    })
    .catch(e => {
      console.log(e)
    })

})

server.use(router)

server.listen(3000, () => {
  console.log('listening on 3000')
})

function template ({ id, content }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="icon" type="image/x-icon" href="/favicon.png" />
    <title>stash</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/svbstrate" />
    <link rel="stylesheet" type="text/css" href="/main.css" />
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://unpkg.com/unfetch@3.0.0/dist/unfetch.umd.js"></script>
    <script src="/index.js"></script>
  </head>
  <body>
    <div class='rel f aic fw x mxa'>
      ${!id ? (
        `<input id='editToggle' type='radio' name='view' value='edit' checked />
        <label for='editToggle' class='nav-link inline-block mr1 caps'>Edit</label>
        <input id='previewToggle' type='radio' name='view' value='preview' />
        <label for='previewToggle' class='nav-link inline-block mr1 caps'>Preview</label>

        <button id='share' class='nav-link abs top right caps'>SHARE</button>
        <button id='copy' class='nav-link abs top right'>⇢ CLICK TO COPY</button>

        <div class='x'></div>

        <textarea id='edit' class='nav-link block x y'>${content || 'Write something'}</textarea>`
      ) : (
        `<a href='?edit' class='caps nav-link'>Edit this stash</a>`
      )}

      <div class='x'></div>

      <div id='preview' class='block x y${id ? ' is-static': ''}'>
        ${content ? marked(content) : 'Write something'}
      </div>
    </div>
  </body>
</html>`
}
