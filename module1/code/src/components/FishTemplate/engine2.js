import Vnode from "./vnode";
export default class Engine2 {
  render(tmpl, data) {
    let re = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm;
    while (re.test(tmpl)) {
      tmpl = tmpl.replace(re, (s0, s1, s2, s3) => {
        let node = new Vnode(s1, s2, [], null, s3);
        return `(node.uuid)`;
      });
    }
    console.log("result result>>", tmpl);
  }
}
