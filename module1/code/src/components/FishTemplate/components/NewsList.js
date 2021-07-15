export default {
  render() {
    return `
        <div class="newslist">
            <div class="news-item" for="item in newslist">
                <div class="img"><img src="{{item.image}}"/></div>
                <div class="title">{{item.title}}</div>
            </div>
        </div>
    `;
  },
};
