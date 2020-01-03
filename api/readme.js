const fs = require('fs')
const { join } = require('path')
const { tmpdir } = require('os')
const LRU = require('lru-cache')
const ipfsClient = require('ipfs-http-client')
const tar = require('tar')
const MarkdownIt = require('markdown-it')

const md = new MarkdownIt()
const IPFS = ipfsClient('http://ipfs.app.mesg.com:5001')
const readme = new LRU({})

const REGEXP = /^readme.md$/i

const download = async (hash) => {
  const tarball = await IPFS.get(hash)
  if (tarball.length !== 1) throw new Error('invalid fetch')
  return tarball[0].content
}

const extract = async (content, hash) => {
  const tarFile = join(tmpdir(), `${hash}.tar`)
  fs.writeFileSync(tarFile, content)
  const target = join(tmpdir(), hash)
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }
  await new Promise((resolve, reject) => {
    fs.createReadStream(tarFile)
      .pipe(
        tar.extract({
          cwd: target,
          filter: (path) => path.match(REGEXP)
        })
      )
      .on('finish', resolve)
      .on('error', reject)
  })
  fs.unlinkSync(tarFile)
  return target
}

const parseReadme = (path) => {
  const readmeFile = fs.readdirSync(path).find((x) => x.match(REGEXP))
  if (!readmeFile) return '<p>No readme</p>'
  const html = md.render(fs.readFileSync(join(path, readmeFile)).toString())
  return html
}

const getReadme = async (hash) => {
  if (readme.has(hash)) {
    return readme.get(hash)
  }
  const content = await download(hash)
  const path = await extract(content, hash)
  const html = await parseReadme(path)
  readme.set(hash, html)
  return html
}

export default () => [
  {
    method: 'GET',
    path: '/readme/:hash',
    handler: async (req, res) => res.send(await getReadme(req.params.hash))
  }
]
