import request from '@/utils/request'

export function getReceptionsList(params) {
  return request({
    url: '/receptions',
    method: 'get',
    params
  })
}
