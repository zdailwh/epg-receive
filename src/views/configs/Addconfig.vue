<template>
  <el-dialog
    title="创建配置"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-body">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="压缩文件路径" prop="cmprspath">
          <el-input v-model="formData.cmprspath" placeholder="请填写压缩文件路径" />
        </el-form-item>
        <el-form-item label="临时文件路径" prop="temppath">
          <el-input v-model="formData.temppath" placeholder="请填写临时文件路径" />
        </el-form-item>
        <el-form-item label="xml文件路径" prop="xmlpath">
          <el-input v-model="formData.xmlpath" placeholder="请填写xml文件路径" />
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
import { addConfig } from '@/api/configs'
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      formData: {
        cmprspath: '',
        temppath: '',
        xmlpath: ''
      },
      rules: {
        cmprspath: [
          { required: true, message: '请输入压缩文件路径', trigger: 'blur' }
        ],
        temppath: [
          { required: true, message: '请输入临时文件路径', trigger: 'blur' }
        ],
        xmlpath: [
          { required: true, message: '请输入xml文件路径', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.listLoading) return
          var params = this.formData
          this.listLoading = true
          addConfig(params).then(response => {
            this.dialogVisible = false
            this.listLoading = false
            this.$emit('getlist')
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
