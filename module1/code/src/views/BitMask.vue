<template>
  <div>
    <p>权限：</p>
    <section>
      <label><input v-model="query" type="checkbox" value="" />查询 </label>
      <label><input v-model="insert" type="checkbox" value="" />增加 </label>
      <label><input v-model="remove" type="checkbox" value="" />删除 </label>
      <label><input v-model="update" type="checkbox" value="" />更新 </label>
    </section>

    <section>权限值:{{ permission.flag }}</section>
  </div>
</template>

<script>
// @ is an alias to /src

class Permission {
  // 是否允许查询，二进制第1位，0表示否，1表示是
  static SELECT = 1 << 0; // 0001
  // 是否允许新增，二进制第2位，0表示否，1表示是
  static INSERT = 1 << 1; // 0010
  // 是否允许修改，二进制第3位，0表示否，1表示是
  static UPDATE = 1 << 2; // 0100
  // 是否允许删除，二进制第4位，0表示否，1表示是
  static REMOVE = 1 << 3; // 1000
  // 存储目前的权限状态

  constructor() {
    this.flag = 0;
  }

  /**
   *  重新设置权限
   */
  setPermission(permission) {
    this.flag = permission;
  }

  /**
   *  添加一项或多项权限
   */
  enable(permission) {
    this.flag |= permission;
  }

  /**
   *  删除一项或多项权限
   */
  disable(permission) {
    this.flag &= ~permission;
  }

  /**
   *  是否拥某些权限
   */
  isAllow(permission) {
    return (this.flag & permission) == permission;
  }

  /**
   *  是否禁用了某些权限
   */
  isNotAllow(permission) {
    return (this.flag & permission) == 0;
  }

  /**
   *  是否仅仅拥有某些权限
   */
  isOnlyAllow(permission) {
    return this.flag == permission;
  }
}

export default {
  name: "Lab",
  data() {
    return {
      insert: false,
      update: false,
      remove: false,
      query: false,
      permission: new Permission(),
    };
  },
  created() {
    this.$watch("insert", (val) => {
      if (val) {
        this.permission.enable(Permission.INSERT);
      } else {
        this.permission.disable(Permission.INSERT);
      }
      console.log("INSERT>>>", this.permission.isAllow(Permission.INSERT));
    });
    this.$watch("update", (val) => {
      if (val) {
        this.permission.enable(Permission.UPDATE);
      } else {
        this.permission.disable(Permission.UPDATE);
      }
      console.log("UPDATE>>>", this.permission.isAllow(Permission.UPDATE));
    });
    this.$watch("remove", (val) => {
      if (val) {
        this.permission.enable(Permission.REMOVE);
      } else {
        this.permission.disable(Permission.REMOVE);
      }
      console.log("REMOVE>>>", this.permission.isAllow(Permission.REMOVE));
    });
    this.$watch("query", (val) => {
      if (val) {
        this.permission.enable(Permission.SELECT);
      } else {
        this.permission.disable(Permission.SELECT);
      }
      console.log("SELECT>>>", this.permission.isAllow(Permission.SELECT));
    });
  },
};
</script>
