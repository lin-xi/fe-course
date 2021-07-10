import VNode from './Vnode.js';
import Func from './Func.js';
import Render from './render.js';

export default class Rv {

    constructor(com, props, dom) {
        this.root = dom;
        this.props = Object.assign({}, props);
        this.com = com;

        this.nodeStack = [];
        this.funcStack = [];

        this.com.created();
    }

    render() {
        this.state = this.com.data();
        let template = this.com.render();
        let methods = this.com.methods;
        let data = Object.assign(this.state, this.props);
        this.r = new Render(data, methods);
        this.compile(template);
        this.com.mounted();
    }

    compile(template) {
        let me = this;
        template = template.replace(/\s{2,}/mg, ' ');
        let html = me.compileTag(template);
        console.time('render');
        let result = this.r.render(me.nodeStack, me.funcStack, html);
        console.timeEnd('render');
        this.root.innerText = html;
    }

    compileTag(template) {
        let me = this;
        let html = template;

        while (/<(\w+)\s*([^>]*)>([^<]*)<\/\1>/.test(html)) {
            html = html.replace(/<(\w+)\s*([^>]*)>([^<]*)<\/\1>/g, function (s0, s1, s2, s3) {
                let tag = s1;
                let attr = s2;
                let children = me.compileVariables(s3);
                let node = new VNode(tag, attr, children);
                me.nodeStack.push(node);
                return 'this.$create(' + (me.nodeStack.length - 1) + ') ';
            });
        }
        console.log('✈️', me.nodeStack);
        console.log('✈️', me.funcStack);
        return html;
    }

    compileVariables(template) {
        let me = this;
        let html = template.trim();
        if (!html) return '';
        html = html.replace(/\n/mg, '');

        if (!/^this\.\$create\(/.test(html)) {
            html = html.replace("'", "\'");
            html = html.replace('"', '\"');

            if (/\{\s*if\s*\(/.test(html)) {
                // IF
                me.funcStack.push(new Func('$evaluateIf', html));
                html = "this.$evaluateIf(" + (me.funcStack.length - 1) + ")";
            } else if (/\{\s*(.*?)\.map\(([^=]*)=>\s*{/.test(html)) {
                // map
                let mats = /\{(.*?)\.map\(([^=]*)=>\s*{/.exec(html);
                if (mats.length == 3) {
                    me.funcStack.push(new Func('$evaluateMap', html, mats[2].trim()));
                    html = "this.$evaluateMap(" + (me.funcStack.length - 1) + ")";
                }
            } else {
                me.funcStack.push(new Func('$evaluate', html));
                html = "this.$evaluate(" + (me.funcStack.length - 1) + ")";
            }
            return html;
        } else {
            return html;
        }
    }

    getValue(key, data) {
        let newkey = key.replace('this.state', '').replace('this.props', '');
        return newKey.trim().split('.').reduce((last, item) => {
            return last[item];
        }, data);
    }


}

