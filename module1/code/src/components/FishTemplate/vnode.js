export default class Vnode {
  constructor(tag, attr, children, parent, childrenTemplate) {
    this.tag = tag;
    this.attr = attr;
    this.children = children;
    this.parent = parent;
    this.childrenTemplate = childrenTemplate;
    this.uuid = this.uuid();
  }

  uuid() {
    return (
      Math.random() * 10000000000 +
      Math.random() * 100000 +
      Date.now()
    ).toString(36);
  }
}
