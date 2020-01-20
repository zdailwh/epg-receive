import request from '@/utils/request'

export function getEpgsList(params) {
  return request({
    url: '/epgs',
    method: 'get',
    params
  })
}
