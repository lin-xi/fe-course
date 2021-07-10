import VNode from './Vnode.js';
import Func from './Func.js';

export default class Render {

    constructor(data, methods) {
        this.data = data;
        this.methods = methods;
    }

    $create(index, context, type) {
        let me = this;
        let node = me.nodeStack[index];
        if (node) {
            let children = node.children.split(' ');
            let nodes = [];
            children.map(item => {
                if (item) {
                    if (type == 'value') {
                        me.contextStatck.push(context);
                        item = me.injectContext(me.contextStatck.length - 1, item);
                    } else if (type == 'index') {
                        item = me.injectContext(context, item);
                    }
                    let fn = new Function('return ' + item).bind(me);
                    let result = fn();
                    // console.log('结果：create:', result);
                    if (Array.isArray(result)) {
                        nodes = nodes.concat(result);
                    } else {
                        nodes.push(result);
                    }
                }
            });
            let childrenNodes = nodes.join('');
            return `<${node.tag} ${node.props}>${childrenNodes}</${node.tag}>`;
        }
    }

    $evaluate(index, context, type) {
        let me = this;
        let func = me.funcStack[index];
        if (func) {
            let template = func.params;
            if (/\{(.*?)\}/.test(template)) {
                let contextIndex = context;
                if (type == 'value') {
                    me.contextStatck.push(context);
                    contextIndex = me.contextStatck.length - 1;
                    template = me.injectContext(contextIndex, template);
                } else if (type == 'index') {
                    template = me.injectContext(contextIndex, template);
                }
                template = template.replace(/\{(.*?)\}/g, (s0, s1) => {
                    return '$' + s0;
                })
                template = `\`${template}\``;
                let result = me.doExecute(func, template, contextIndex);
                // console.log('结果：evaluate:', result);
                return result;
            } else {
                return template;
            }
        }
        return 'evaluate error!';
    }

    $evaluateIf(index) {
        let me = this;
        let func = me.funcStack[index];
        if (func) {
            let template = func.params.slice(1, -1);
            //如果if里存在map
            if (/\b(.*?)\.map\(([^=]*)=>\s*{/.test(template)) {
                let mats = /\b(.*?)\.map\(([^=]*)=>\s*{/.exec(template);
                if (mats.length == 3) {
                    template = template.replace(/this\.\$create\((.*?)\)/g, (s0, s1) => {
                        return 'this.$create(' + s1 + ', ' + mats[2] + ', "value")';
                    });
                    template = template.replace(/this\.\$evaluate\((.*?)\)/g, (s0, s1) => {
                        return 'this.$evaluate(' + s1 + ', ' + mats[2] + ', "value")';
                    });
                }
            }
            template = template.replace(/\{\s*((?:.*?)\.map\((?:[^=]*)=>\s*{)/g, (s0, s1) => {
                return '{ return ' + s1;
            });
            let context = Object.assign(me, me.data, me.methods);
            let fn = new Function(template).bind(context);
            let result = fn();
            // console.log('结果：evaluateIf:', result);
            return result;
        }
        return 'evaluateIf error!';
    }

    $evaluateMap(index) {
        let me = this;
        let func = me.funcStack[index];
        if (func) {
            let template = func.params.slice(1, -1);
            if (func.context) {
                template = template.replace(/this\.\$create\((.*?)\)/g, (s0, s1) => {
                    return 'this.$create(' + s1 + ', ' + func.context + ', "value")';
                });
                template = template.replace(/this\.\$evaluate\((.*?)\)/g, (s0, s1) => {
                    return 'this.$evaluate(' + s1 + ', ' + func.context + ', "value")';
                });
            }
            let context = Object.assign(me, me.data, me.methods);
            let fn = new Function('return ' + template).bind(context);
            let result = fn();
            console.log('结果：evaluateMap:', result);
            return result;
        }
        return 'evaluateIf error!';
    }

    injectContext(context, template) {
        let me = this;
        if (context !== undefined) {
            template = template.replace(/this\.\$create\((.*?)\)/g, (s0, s1) => {
                return 'this.$create(' + s1 + ', ' + context + ', "index")';
            });
            template = template.replace(/this\.\$evaluate\((.*?)\)/g, (s0, s1) => {
                return 'this.$evaluate(' + s1 + ', ' + context + ', "index")';
            });
            return template;
        }
        return template;
    }

    doExecute(func, template, context) {
        let me = this;
        if (/\{\s*this\.(.*?)\}/.test(template)) {
            // this.
            let ctx = Object.assign(me, me.data, me.methods);
            let fn = new Function('return ' + template).bind(ctx);
            return fn();
        } else if (/\{((?!this).*?)\.(.*?)\}/.test(template)) {
            let ctx2 = Object.assign(me, me.data, me.methods);
            template = template.replace(/\{((?!this).*?)\.(.*?)\}/g, (s0, s1, s2) => {
                ctx2[s1] = me.contextStatck[context];
                return '{this.' + s1 + '.' + s2 + '}';
            });
            let fn = new Function('return ' + template).bind(ctx2);
            return fn();
        }
    }


    render(nodeStack, funcStack, template) {
        this.nodeStack = nodeStack;
        this.funcStack = funcStack;
        this.contextStatck = [];

        let fn = new Function('return ' + template).bind(this);
        let html = fn();
        document.body.innerHTML = html;
    }


}

