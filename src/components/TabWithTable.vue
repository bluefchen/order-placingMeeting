<template>
  <div class="v_tab-with-table">
    <el-tabs v-model="activeNameUpdate" type="card">
      <el-tab-pane v-for="(tab, index) in tabsListUpdate" :key="index" :label="tab.tabLabel" :name="tab.tabLabel">
        <Table :table-title="tab.tableTitle" :table-data="tab.tableData"/>
        <Pagination :total="tab.total" :pageSize="tab.pageSize" @pageChanged="tab.pageChanged"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Table from '@/components/Table';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'TabWithTable',
    props: {
      activeName: {
        type: String,
        require: true
      },
      tabsList: {
        type: Array,
        require: true
      }
    },
    data() {
      return {}
    },
    computed: {
      activeNameUpdate: {
        get: function () {
          return this.activeName
        },
        set: function () {
        }
      },
      tabsListUpdate: {
        get: function () {
          return this.tabsList
        },
        set: function () {
        }
      }
    },
    components: {
      Table,
      Pagination
    }
  }
</script>

<style lang="less">
  .v_tab-with-table {
    .el-tabs__header {
      position: relative;
      margin: 0;
      padding: 0;
    }

    .el-tabs--card > .el-tabs__header {
      width: 432px;
      margin: 0 auto;
      border: none;
    }

    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      width: 100%;
      border: none;
      border-radius: 0;
    }

    .el-tabs--card > .el-tabs__header .el-tabs__item {
      width: 50%;
      height: 42px;
      background-color: #e4e4e4;
      line-height: 42px;
      font-size: 16px;
      text-align: center;
      border: none;
      font-weight: normal;
    }

    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      background: #fbfbfb;
    }

    .el-tabs__item.is-active {
      position: relative;
      background-color: #fbfbfb;
      color: #ff0404;
    }

    .el-tabs__item.is-active:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #ff0404;
    }

    .el-tabs__item:hover {
      color: #ff0404;
      cursor: pointer;
    }

    .el-tab-pane {
      padding: 30px 0;
      background-color: #fbfbfb;
    }
  }
</style>
