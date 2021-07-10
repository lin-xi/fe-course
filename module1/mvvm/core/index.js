import Rv from './Rv.js';

export default {
    render(com, props, dom) {
        let rv = new Rv(com, props, dom);
        rv.render();
    }
}