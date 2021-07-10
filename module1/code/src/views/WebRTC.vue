<template>
  <div class="chatroom">
    房间地址：<input class="roomUrl" readonly="true" v-model="roomUrl" /><br />
    <video width="640px" height="480px" id="myVideo"></video>
    <video width="240px" height="160px" id="remoteVideo"></video>
  </div>
</template>

<script>
// @ is an alias to /src
let socket;
let pc;

export default {
  name: "userMedia",
  data() {
    return {
      roomUrl: "",
      roomName: "",
    };
  },
  async mounted() {
    /* use the stream */
    this.$nextTick(() => {
      let roomName = this.getUrlParam("room");
      if (!roomName) {
        this.roomName = "observable-" + Date.now();
        this.roomUrl = location.href + `?room=${this.roomName}`;
      } else {
        this.roomName = "observable-" + roomName.split("-")[1];
        this.roomUrl = location.href;
      }
      this.start();
    });
  },
  methods: {
    getUrlParam(name) {
      var reg = new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.href.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    start() {
      // const socket = io('http://localhost:9001');
      socket = new window.ScaleDrone("OXo4HSBTCQ8ehrxI");
      socket.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        let room = socket.subscribe(this.roomName);
        room.on("open", function (error) {
          if (error) {
            this.onError(error);
          }
        });
        room.on("members", (members) => {
          console.log("MEMBERS", members);
          // 如果你是第二个链接到房间的人，就会创建offer
          let isOffer = members.length === 2;
          this.startWebRTC(isOffer);
        });
        // 从Scaledrone监听信令数据
        room.on("data", (message, client) => {
          //不处理自己发送消息
          if (client.id === socket.clientId) {
            return;
          }
          if (message.sdp) {
            // 设置远程sdp, 在offer 或者 answer后
            console.log("sdp消息：", message);
            pc.setRemoteDescription(
              new RTCSessionDescription(message.sdp),
              () => {
                // 当收到offer 后就接听
                console.log("sdp消息类型：", pc.remoteDescription.type);
                if (pc.remoteDescription.type === "offer") {
                  pc.createAnswer()
                    .then((answer) => {
                      pc.setLocalDescription(
                        answer,
                        () => {
                          this.sendMessage({ sdp: pc.localDescription });
                        },
                        this.onError
                      );
                    })
                    .catch(this.onError);
                }
              },
              this.onError
            );
          } else if (message.candidate) {
            console.log("candidate消息：", message);
            // 增加新的 ICE canidatet 到本地的链接中
            pc.addIceCandidate(new RTCIceCandidate(message.candidate));
          }
        });
      });
    },
    startWebRTC(isOffer) {
      const iceServer = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      };
      console.log("startWebRTC, connect to stun server");
      pc = new RTCPeerConnection(iceServer);
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(">>>>onicecandidate");
          this.sendMessage({ candidate: event.candidate });
        }
      };
      if (isOffer) {
        pc.onnegotiationneeded = () => {
          // 创建本地sdp描述 (Session Description Protocol)
          pc.createOffer()
            .then((sdp) => {
              pc.setLocalDescription(
                sdp,
                () => {
                  this.sendMessage({ sdp: pc.localDescription });
                },
                this.onError
              );
            })
            .catch(this.onError);
        };
      }
      pc.onaddstream = function (evt) {
        document.querySelector("#remoteVideo").srcObject = evt.stream;
        let videoEle = document.querySelector("#myVideo");
        videoEle.srcObject = evt.stream;
        videoEle.play();
      };

      window.navigator.getUserMedia(
        { audio: true, video: true },
        (stream) => {
          let videoEle = document.querySelector("#myVideo");
          console.log("start local stream");
          videoEle.srcObject = stream;
          videoEle.play();
          pc.addStream(stream);
        },
        this.onError
      );
    },
    sendMessage(message) {
      socket.publish({
        room: this.roomName,
        message,
      });
    },
    onError(error) {
      console.log(error);
    },
  },
};
</script>

<style lang="less" scoped>
.chatroom {
  position: relative;
  border: 1px #ccc solid;
  width: 650px;

  .roomUrl {
    width: 500px;
  }

  #remoteVideo {
    position: absolute;
    right: 10px;
    top: 20px;
    z-index: 10;
  }
}
</style>
