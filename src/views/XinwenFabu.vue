<template>
  <div class="xinwenfabu">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path:'/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加卡片视图 -->
    <el-card class="box-card" style="margin-top:20px">
      <!-- 添加一个表单 -->
      <el-form ref="postForm" :model="postForm" label-width="80px">

        <!-- 标题 -->
        <el-form-item label="标题:">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>

        <!-- 类型 -->
        <el-form-item label="类型:">
          <el-radio-group v-model="postForm.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 内容 -->
        <el-form-item label="内容:">
          <!-- 富文本编辑器 -->
          <VueEditor :config="config" ref="vueEditor" v-if="postForm.type === 1"></VueEditor>
          <!-- 文件上传 -->
          <el-upload
            v-if="postForm.type === 2"
            class="upload-demo"
            action="http://127.0.0.1:3000/upload"
            :headers="setToken()"
            :before-upload='beforeUpload'
            :on-success="handlerSuccess"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>

        <!-- 栏目 -->
        <el-form-item label="栏目:">
            <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCateChange">
                <el-checkbox v-for="item in cateList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <!-- 封面 -->
        <el-form-item label="封面:">
            <!-- 图片上传 -->
          <el-upload action="http://127.0.0.1:3000/upload"
            :on-success="coverSuccess"
            :limit="3"
            list-type="picture-card"
            :headers="setToken()">
            <i class="el-icon-plus"></i>
          </el-upload>
            <!-- 图片预览 -->
          <el-dialog size="tiny">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
            <el-button type="primary" @click="tijiao">提交</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import { getcateList } from '@/api/cate.js'
export default {
  data () {
    return {
      postForm: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      // 预览图片的路径
      dialogImageUrl: '',
      // 富文本框处理
      config: {
        // 上传图片的配置
        uploadImage: {
          // url:就是处理当前上传图片操作的服务器地址
          url: 'http://localhost:3000/upload',
          // name:后台接口所需要的参数的名称
          name: 'file',
          // 添加请求头对token的设置
          headers: this.setToken(),
          // uploadSuccess：文件上传完成成功之后的回调方法
          // res是结果，insert方法会把内容注入到编辑器中，res.data.data.url是资源地址
          uploadSuccess (res, insert) {
            console.log(res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.setToken(),
          uploadSuccess (res, insert) {
            console.log(res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      },
      // 栏目默认选项
      checkedCities: [],
      // 栏目全选
      isIndeterminate: true,
      checkAll: false,
      // 文件上传
      fileList: [],
      // 所有栏目选项
      cateList: ''
    }
  },
  async mounted () {
    // 获取栏目列表数据
    let res = await getcateList()
    if (res.status === 200) {
      // 将除去关注和头条的栏目赋值给所有栏目选项
      this.cateList = res.data.data.splice(2)
    }
  },
  methods: {
    // 封装的请求头设置令牌token函数
    setToken () {
      // 请求头设置令牌token
      return {
        Authorization: localStorage.getItem('toutiao_back')
      }
    },
    // 视频文件上传操作之前的钩子
    beforeUpload (file) {
      // console.log(file)
      if (file.type.indexOf('video/') !== 0) {
        this.$message.warning('请选择视频文件~')
        return false
      }
    },
    // 视频文件上传操作完成后
    handlerSuccess (res, file, fileList) {
      if (res.message === '文件上传成功') {
        this.postForm.content = res.data.url
      }
    },
    // 封面图片数据
    coverSuccess (res) {
      // console.log(res)
      if (res.message === '文件上传成功') {
        this.postForm.cover.push({ id: res.data.id })
      }
    },
    // 栏目全选
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cateList : []
      this.isIndeterminate = false
    },
    // 栏目单选框选择触发
    handleCheckedCateChange () {

    },
    // 提交按钮
    tijiao () {
      if (this.postForm.type === 1) {
        this.postForm.content = this.$refs.vueEditor.editor.root.innerHTML
      }
      console.log(this.postForm)
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style lang="less" scoped>
</style>
