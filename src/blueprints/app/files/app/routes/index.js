import express from 'express'
import path from 'path'

export default function(app) {

  const router = express.Router()

  router.get('/', function(req, res) {
    res.redirect('/v1/docs')
  })

  /**
   * @api {get} /ping Verify API status
   * @apiDescription You can use this endpoint to verify the API status and
   * response time.
   * @apiVersion 2.0.0
   * @apiName Ping
   * @apiGroup Utils
   * @apiSuccessExample {http} Success-Response
   *  HTTP/1.1 204 OK
   */
  router.get('/ping', function(req, res) {
    res
      .status(204)
      .send()
  })

  /**
   * @api {get} /datetime Get server date and time
   * @apiDescription You can use this endpoint for date and time reference. The
   * returned datetime is in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   * @apiVersion 2.0.0
   * @apiName DateTime
   * @apiGroup Utils
   * @apiSuccessExample {http} Success-Response
   *  HTTP/1.1 200 OK
   *  2016-09-02T17:52:25.888Z
   */
  router.get('/datetime', function(req, res) {
    const date = new Date()
    res
      .status(200)
      .send(date.toISOString())
  })

  // TODO Your routes go here

  router.use('/docs', express.static(path.join(__dirname, '/../docs/apidoc')))

  app.use('/v1', router)
  app.get('/', (req, res) => res.redirect('/v1/docs'))

}
