import { shallowMount } from "@vue/test-utils";
import Engine2 from "@/components/FishTemplate/engine2.js";
import Vnode from "@/components/FishTemplate/vnode.js";

describe("engine.js", () => {
  it("Engine2 render", () => {
    const engine = new Engine2();
    let nodes = engine.render(
      `<div class= "list">
    {{hello}}
  </div>`,
      { hello: "hello,world" }
    );
    console.log(nodes);
  });
});

describe("engine.js", () => {
  it("Engine2 render", () => {
    const engine = new Engine2();
    let nodes = engine.render(
      `<div class= "list">
        <div class="item-list" for="item in newslist">
            {{item.title}}
        </div>
    </div>`,
      { newslist: [{ title: "a" }, { title: "a" }] }
    );
    console.log(nodes);
  });
});
