import request from '@/utils/request'

export function getWhiteipsList(params) {
  return request({
    url: '/whiteips',
    method: 'get',
    params
  })
}
export function whiteipActive(params) {
  return request({
    url: '/whiteips/' + params.id + '/active',
    method: 'put'
  })
}
export function whiteipFrozen(params) {
  return request({
    url: '/whiteips/' + params.id + '/frozen',
    method: 'put'
  })
}

export function getWhiteipsOfProviderList({ params, parentid }) {
  return request({
    url: '/providers/' + parentid + '/ips',
    method: 'get',
    params
  })
}
