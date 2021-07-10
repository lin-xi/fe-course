<template>
  <div class="todos">
    <div class="menu">
      <input
        class="content-input"
        v-model="content"
        type="text"
        placeholder="content"
      />
      <input class="tag-input" v-model="tags" type="text" placeholder="tags" />
      <div class="menu-item" @click="doAdd">+</div>
    </div>

    <div class="todo-item" v-for="item in todoItems" :key="item.id">
      {{ item.content }}
      <div class="tags">
        <div class="tag-item" v-for="tag in item.tags" :key="tag">
          {{ tag }}
        </div>
        <div class="delete" @click="doDelete(item)">delete</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Keyborad",
  data() {
    return {
      db: null,
      content: "",
      tags: "",
      todoItems: [],
    };
  },
  created() {
    this.createDB();
    var arr = new Uint32Array(2);
    window.crypto.getRandomValues(arr);
    console.log(arr);
  },
  methods: {
    createDB() {
      let request = window.indexedDB.open("todos", 1);
      request.onerror = (err) => {
        console.log(err);
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
        this.query();
      };

      request.onupgradeneeded = (e) => {
        this.db = e.target.result;
        let objectStore = this.db.createObjectStore("todoItems", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("tag", "tag", { unique: false });
        console.log("Database setup complete");
      };
    },

    doAdd() {
      if (this.db) {
        let transaction = this.db.transaction(["todoItems"], "readwrite");
        let objectStore = transaction.objectStore("todoItems");
        console.log("藏进心口的刺", objectStore);

        objectStore.add({
          content: this.content,
          tags: this.tags,
        }).onsuccess = () => {
          console.log("藏进心口的刺");

          this.query();
        };
      } else {
        console.log("error");
      }
    },

    query() {
      if (this.db) {
        var transaction = this.db.transaction(["todoItems"]);
        var objectStore = transaction.objectStore("todoItems");
        objectStore.getAll().onsuccess = (e) => {
          this.todoItems = e.target.result;
          console.log(this.todoItems);
        };
      } else {
        console.log("this.db error");
      }
    },

    doDelete(item) {
      var transaction = this.db.transaction(["todoItems"], "readwrite");
      var objectStore = transaction.objectStore("todoItems");
      objectStore.delete(item.id).onsuccess = () => {
        this.query();
      };
    },
  },
};
</script>

<style lang="less" scoped>
.todos {
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px #ccc solid;
  font-size: 30px;
  .menu {
    display: flex;
    justify-content: flex-end;
    .menu-item {
      background-color: lightcoral;
      cursor: pointer;
      color: #fff;
      width: 50px;
    }
    input {
      border: 1px #ccc solid;
      width: 200px;
      height: 40px;
      font-size: 30px;
    }
  }

  .todo-item {
    border: 1px solid #ddd;
    background: #f3f3f3;
    margin-top: 5px;
    border-radius: 6px;
    text-align: left;
    padding: 4px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .delete {
      background: lightcoral;
      font-size: 14px;
      padding: 4px;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
