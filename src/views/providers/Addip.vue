<template>
  <el-dialog
    title="创建白名单"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-body">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="formData.ip" placeholder="15位，如：127.0.0.0" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">创 建</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addIp } from '@/api/providers'
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      providerId: '',
      formData: {
        ip: ''
      },
      rules: {
        ip: [
          { required: true, message: '请输入IP地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.providerId) {
        this.$message({
          message: '无效providerId',
          type: 'error'
        })
      }
      console.log(this.providerId)
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.listLoading) return
          var params = this.formData
          params.providerId = this.providerId
          this.listLoading = true
          addIp(params).then(response => {
            this.dialogVisible = false
            this.listLoading = false
            // this.$emit('getlist')
            this.$message({
              message: '创建成功！',
              type: 'success'
            })
          }).catch(error => {
            console.log(error)
            this.listLoading = false
          })
        }
      })
    },
    handleClose() {
      this.$refs.formData.resetFields()
      this.dialogVisible = false
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    }
  }
}
</script>
