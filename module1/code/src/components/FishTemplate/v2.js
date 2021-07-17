import Engine from "./engine2";
export default class Template {
  constructor() {
    this.root = null;
    this.engine = new Engine();
  }

  render(template, data) {
    let dom = this.engine.render(template, data);
    console.log(dom);
    this.root.appendChild(dom);
  }

  mounted(dom) {
    this.root = dom;
    return this;
  }
}
