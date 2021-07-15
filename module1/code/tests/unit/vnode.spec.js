import { shallowMount } from "@vue/test-utils";
import Engine from "@/components/FishTemplate/engine.js";
import Vnode from "@/components/FishTemplate/vnode.js";

describe("engine.js", () => {
  it("engine render", () => {
    const engine = new Engine();
    let nodes = engine.render(
      "<div class='list'><div for='item in newslist'>{{ item.name }}</div></div>",
      {
        newslist: [{ name: "Google" }, { name: "Apple" }, { name: "Oracle" }],
      }
    );
    console.log(nodes);
  });
});

describe("engine.js", () => {
  it("engine render2", () => {
    const engine = new Engine();
    let nodes = engine.render(
      `<div class="newslist">
        <div class="news-item" for="item in newslist">
          <div class="img"><img src="{{item.img}}"/></div>
          <div class="title">{{item.title}}</div>
        </div>
      </div>`,
      {
        newslist: [
          { title: "Google", img: "img1" },
          { title: "Apple", img: "img2" },
          { title: "Oracle", img: "img3" },
        ],
      }
    );
    console.log(nodes);
  });
});
