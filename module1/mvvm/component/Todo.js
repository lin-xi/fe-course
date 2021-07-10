export default {
    data() {
        let events = [];
        for (let i = 0; i < 20; i++) {
            events.push({ id: i, todo: `JSX编译库-${i}`, state: i % 2 ? 1 : 2 })
        }
        return {
            events: events,
        }
    },
    render() {
        return `
            <div class="container">
                <h2>{this.dateTime} - todo</h2>
                <ul class="todo-items">
                    {
                        if(this.events.length > 0){
                            this.events.map(item => {
                                if(item.state == 2){
                                    return <li class='todo-item'><input type="checkbox"></input><span>{item.todo}</span></li>
                                } else {
                                    return <li class='todo-item completed'><input type="checkbox" checked disabled></input><span>{item.todo}</span></li>
                                }
                            })
                        } else if(this.events.length == 0){
                            return '暂无数据';
                        }
                    }
                </ul>
                <h2>目前问题</h2>
                <ul class="todo-items">
                    <li>标签属性没有动态绑定</li>
                    <li>标签事件没有动态绑定</li>
                    <li>还不支持自定义标签</li>
                    <li>还不支持Map嵌套</li>
                </ul>
            </div>
        `
    },
    created() {

    },
    mounted() {

    },
    methods: {
        itemClick(e) {

        }
    }
}