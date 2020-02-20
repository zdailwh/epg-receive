<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="机构ID" prop="provider_id">
        <el-input v-model="formSearch.provider_id" placeholder="机构ID" />
      </el-form-item>
      <el-form-item label="平台订单号" prop="serialno">
        <el-input v-model="formSearch.serialno" placeholder="平台订单号" />
      </el-form-item>
      <el-form-item label="机构流水号" prop="transno">
        <el-input v-model="formSearch.transno" placeholder="机构流水号" />
      </el-form-item>
      <el-form-item label="频道ID" prop="channelid">
        <el-input v-model="formSearch.channelid" placeholder="频道ID" />
      </el-form-item>
      <el-form-item label="频道名称" prop="channelname">
        <el-input v-model="formSearch.channelname" placeholder="频道名称" />
      </el-form-item>
      <el-form-item label="频道日期" prop="programdate">
        <el-date-picker v-model="formSearch.programdate" type="date" placeholder="选择频道日期" value-format="yyyyMMdd" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formSearch.status" placeholder="状态">
          <el-option v-for="(item, k) in statusArr" :key="k" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间范围" prop="create_time_range">
        <el-date-picker
          v-model="formSearch.create_time_range"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="更新时间范围" prop="update_time_range">
        <el-date-picker
          v-model="formSearch.update_time_range"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('formSearch')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中"
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="平台订单号">
        <template slot-scope="scope">
          {{ scope.row.serialno }}
        </template>
      </el-table-column>
      <el-table-column label="机构流水号">
        <template slot-scope="scope">
          {{ scope.row.transno }}
        </template>
      </el-table-column>
      <el-table-column label="数据生成时间">
        <template slot-scope="scope">
          {{ scope.row.creationtime }}
        </template>
      </el-table-column>
      <el-table-column label="频道ID">
        <template slot-scope="scope">
          {{ scope.row.channelid }}
        </template>
      </el-table-column>
      <el-table-column label="频道名称">
        <template slot-scope="scope">
          {{ scope.row.channelname }}
        </template>
      </el-table-column>
      <el-table-column label="频道日期">
        <template slot-scope="scope">
          {{ scope.row.programdate }}
        </template>
      </el-table-column>
      <el-table-column label="文件路径">
        <template slot-scope="scope">
          {{ scope.row.realpath }}
        </template>
      </el-table-column>
      <el-table-column label="文件扩展名">
        <template slot-scope="scope">
          {{ scope.row.ext }}
        </template>
      </el-table-column>
      <el-table-column label="文件大小">
        <template slot-scope="scope">
          {{ scope.row.filesize }}
        </template>
      </el-table-column>
      <el-table-column label="文件MD5值">
        <template slot-scope="scope">
          {{ scope.row.filemd5 }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件名称">
        <template slot-scope="scope">
          {{ scope.row.cmprsname }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件路径">
        <template slot-scope="scope">
          {{ scope.row.cmprspath }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件扩展名">
        <template slot-scope="scope">
          {{ scope.row.cmprsext }}
        </template>
      </el-table-column>
      <el-table-column label="压缩文件大小">
        <template slot-scope="scope">
          {{ scope.row.cmpresize }}
        </template>
      </el-table-column>
      <el-table-column label="日志">
        <template slot-scope="scope">
          {{ scope.row.log }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.statusstr }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <el-table-column type="expand" label="关联项详情" width="56">
        <template slot-scope="scope">
          <p>提供商：{{ scope.row.provider }}</p>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageContainer">
      <el-pagination
        :total="listTotal"
        layout="total, prev, pager, next"
        :current-page.sync="page"
        background
        :page-size="per_page"
        @size-change="fetchData"
        @current-change="fetchData"
      />
    </div>
  </div>
</template>

<script>
import { getEpgsList } from '@/api/epgs'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      page: 1,
      per_page: 20,
      formSearch: {
        provider_id: '',
        serialno: '',
        transno: '',
        channelid: '',
        channelname: '',
        programdate: '',
        status: '',
        create_time_range: [],
        update_time_range: []
      },
      statusArr: [
        { label: '已创建', value: 0 }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.listLoading) return
      var params = {
        page: this.page - 1,
        per_page: this.per_page
      }
      if (this.formSearch.provider_id !== '') {
        params.provider_id = this.formSearch.provider_id
      }
      if (this.formSearch.serialno !== '') {
        params.serialno = this.formSearch.serialno
      }
      if (this.formSearch.transno !== '') {
        params.transno = this.formSearch.transno
      }
      if (this.formSearch.channelid !== '') {
        params.channelid = this.formSearch.channelid
      }
      if (this.formSearch.channelname !== '') {
        params.channelname = this.formSearch.channelname
      }
      if (this.formSearch.programdate !== '') {
        params.programdate = this.formSearch.programdate
      }
      if (this.formSearch.status !== '') {
        params.status = this.formSearch.status
      }
      if (this.formSearch.create_time_range.length) {
        params.create_time_range = this.formSearch.create_time_range
      }
      if (this.formSearch.update_time_range.length) {
        params.update_time_range = this.formSearch.update_time_range
      }
      this.listLoading = true
      getEpgsList(params).then(response => {
        this.list = response.data.items || []
        this.listTotal = response.data.total || 0
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.pageContainer {
  margin: 15px 0;
}
.demo-form-inline {
  padding: 20px 15px 0;
  background-color: #f2f2f2;
}
.handler-wrap .el-button {
  margin-bottom: 5px;
}
</style>
