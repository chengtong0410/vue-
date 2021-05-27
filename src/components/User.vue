<template>
  <el-card class="box-card">
    <div class="search-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input
            v-model="formInline.user"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input
            v-model="formInline.email"
            placeholder="请输入用户邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.role" placeholder="请选择">
            <el-option
              :label="val"
              value="val"
              :key="key"
              v-for="(val, key) in roleObj"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onClear">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="onAddUser"
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>

      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <div>{{ scope.row.username }}</div>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="180">
        <template slot-scope="scope">
          <div>{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <div>{{ scope.row.email }}</div>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <div>{{ scope.row.role }}</div>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180">
        <template slot-scope="scope">
          <div>{{ scope.row.remark }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? '启用' : '禁用' }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import {
  getUserList,
  setUserListStatus,
  addUserList,
  editUserList,
  delUserList,
} from '../api/user';
export default {
  mounted() {
    this.hasUserList();
  },
  data() {
    return {
      formInline: {
        username: '',
        email: '',
        role_id: '',
      },
      pagination: {
        currentPage: 1, //页码
        pageSize: 1, //页容量
        total: 100,
      },
      roleObj: {
        1: '超级管理员',
        2: '管理员',
        3: '老师',
        4: '学生',
      },
      tableData: [],
    };
  },
  methods: {
    onSubmit() {},
    onClear() {},
    onAddUser() {},
    async hasUserList() {
      const listData = await getUserList({
        ...this.formInline,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
      });

      const { data } = listData.data;
      this.tableData = data.items;
      console.log(data);
      this.pagination.total = data.pagination.total;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.hasUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.hasUserList();
    },
    handleEdit(index, val) {
      console.log(index);
    },
    handleDelete(index, val) {
      console.log(index);
    },
  },
};
</script>

<style lang="less">
.el-card {
  height: 100%;
  .search-header {
  }
}
</style>
