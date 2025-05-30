import http from 'http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  res.writeHead(404).end(
    JSON.stringify({
      message: 'Route not found',
    })
  )
})

server.listen(3333, () => {
  console.log('🐱‍👤 Serve is running on port 3333')
})
