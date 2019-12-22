<template>
  <div class="xinwenList">

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path:'/index/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格部分 -->
    <el-table :data="xinwenList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" ></el-table-column>
      <el-table-column prop="create_date" label="日期" width="180">
          <template slot-scope="scope">
              {{scope.row.create_date|dataFormat()}}
          </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="88">
          <template slot-scope="scope">
              {{scope.row.type===1?'文章':'视频'}}
          </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="180"></el-table-column>

      <!-- 操作栏按钮 -->
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" @click="dianji(scope.row)" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" @click="dianji(scope.row)" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页部分
    current-change页码
    size-change 每页条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getXinwen } from '@/api/xinwen.js'
import { dataFormat } from '@/utils/myfilers.js'
export default {
  data () {
    return {
      xinwenList: [],
      pageIndex: 1,
      pageSize: 4,
      currentPage1: 1,
      total: 1
    }
  },
  async mounted () {
    this.init()
  },
  methods: {
    //  封装获取新闻详情数据的函数
    async init () {
      let res = await getXinwen({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      if (res.status === 200) {
        // 获取新闻详情数据
        this.xinwenList = res.data.data
        // 获取新闻总数量
        this.total = res.data.total
      }
    },
    dianji (v) {
      console.log(v)
    },
    handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.init()
    }
  },
  //  过滤器
  filters: {
    dataFormat
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
</style>
