import Mock from 'mockjs'

const provider = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '内容导入',
  'model_name': '内容导入',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 2,
  'statusstr': '暂停',
  'path': '/api/admin/epg/client/v1/providers/1',
  'name': '测试机构',
  'code': '1234567890abcdef',
  'appkey': '1234567890abcdefghigklmnopqrstst1234567890abcdefghigklmnopqrstst'
}
const epg = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '内容导入',
  'model_name': '内容导入',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '无效',
  'path': '/data/video/',
  'provider': provider,
  'serialno': 'string',
  'transno': 'string',
  'creationtime': 'string',
  'channelid': 'string',
  'channelname': 'string',
  'programdate': 'string',
  'realpath': 'string',
  'ext': 'string',
  'filesize': 'int',
  'filemd5': 'string',
  'cmprsname': 'string',
  'cmprspath': 'string',
  'cmprsext': 'string',
  'cmpresize': 'int',
  'log': 'string'
}

const epgs = Mock.mock({
  'items|30': [epg]
})

export default [
  {
    url: '/epgs',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = epgs.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  }
]

