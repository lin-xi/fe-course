<template>
  <div class="shortURL">
    <section class="tool">
      <a @click="showAllData">索引数据</a>
    </section>
    <section class="input">
      <input v-model="longUrl" /><a class="btn" @click="doShort">生成短网址</a>
    </section>

    <section>{{ shortUrl }}</section>

    <section class="indexData">
      <div v-for="item in values" class="url-item" :key="item.id">
        {{ item.urlKey }}, {{ item.url }}
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
const SIGNS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+".split("");
export default {
  name: "shortURL",
  data() {
    return {
      db: null,
      longUrl: "",
      shortUrl: "",
      values: [],
    };
  },
  created() {
    this.createDB();
    console.log(this.to64(64));
  },
  methods: {
    createDB() {
      let request = window.indexedDB.open("shortURL", 1);
      request.onerror = (err) => {
        console.log(err);
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
      };

      request.onupgradeneeded = (e) => {
        this.db = e.target.result;
        let objectStore = this.db.createObjectStore("shortURLs", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("url", "url", { unique: false });
        objectStore.createIndex("urlKey", "urlKey", { unique: false });
        console.log("Database setup complete");
      };
    },

    async doShort() {
      if (!this.longUrl) return;

      if (this.db) {
        let objectStore = this.getObjectStore();
        objectStore.add({
          url: this.longUrl,
        }).onsuccess = async (evt) => {
          let id = evt.target.result;
          console.log("add sucess>>", id);

          this.shortUrl = await this.shorten(id);
          this.shortUrl = "https://a.b/" + this.shortUrl;
        };
      } else {
        console.log("error");
      }
    },

    getObjectStore() {
      return this.db
        .transaction(["shortURLs"], "readwrite")
        .objectStore("shortURLs");
    },

    async shorten(id) {
      let obj = await this.query(id);
      obj.urlKey = this.to64(id);
      this.update(obj);
      return obj.urlKey;
    },

    to64(num) {
      let result = [];
      let div = num;
      while (div) {
        result.push(SIGNS[div % 64]);
        div = Math.floor(div / 64);
      }
      return result.reverse().join("");
    },

    async add(obj) {
      let objectStore = this.getObjectStore();
      let record = objectStore.add(obj);
      record.onsuccess = () => {
        console.log(`数据写入成功!`);
        return true;
      };
      record.onerror = () => {
        console.log("数据写入失败!");
      };
    },

    // 修改记录 put
    async update(obj) {
      let objectStore = this.getObjectStore();
      let record = objectStore.put(obj);
      record.onsuccess = () => {
        console.log(`数据更新成功!`);
      };
      record.onerror = () => {
        console.log(`数据更新失败!`);
      };
    },

    // 删除记录 delete
    async remove(id) {
      let objectStore = this.getObjectStore();
      let record = objectStore.delete(id);
      record.onsuccess = () => {
        console.log(`数据删除成功!`);
      };
      record.onerror = () => {
        console.log(`数据删除失败!`);
      };
    },

    // 查询记录
    async query(id) {
      return new Promise((resolve, reject) => {
        let objectStore = this.getObjectStore();
        let records = objectStore.get(id);
        records.onsuccess = (evt) => {
          console.log(evt);
          resolve(evt.target.result);
        };
        records.onerror = (evt) => {
          console.log(evt);
          console.log(`数据查询失败!`);
          reject(evt);
        };
      });
    },

    // 查询全部
    async queryAll() {
      return new Promise((resolve) => {
        let objectStore = this.getObjectStore();
        let list = [];
        objectStore.openCursor().onsuccess = (event) => {
          let s = event.target.result;
          if (s) {
            list.push(s.value);
            s.continue();
          } else {
            console.log("done", list);
            resolve(list);
          }
        };
      });
    },

    async showAllData() {
      this.values = await this.queryAll();
    },
  },
};
</script>

<style lang="less" scoped>
.shortURL {
  width: 100%;

  .tool {
    text-align: right;
    padding: 10px 20px;
  }

  .input {
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;

    input {
      width: 400px;
      height: 60px;
      font-size: 24px;
      text-indent: 10px;
    }
  }
}
</style>
