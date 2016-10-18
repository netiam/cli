import acl from 'netiam-contrib-acl'
import auth from 'netiam-contrib-auth'
import json from 'netiam-contrib-json'
import jsonapi from 'netiam-contrib-jsonapi'
import oauth from 'netiam-contrib-oauth'
import rest from 'netiam-contrib-rest'
import state from 'netiam-contrib-state'
import transform from 'netiam-contrib-transform'

export const plugins = {
  acl,
  auth,
  json,
  jsonapi,
  oauth,
  rest,
  state,
  transform
}

export const config = {
  baseUrl: '/v1'
}
