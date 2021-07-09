<template>
  <div>
    <video ref="video"></video>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "userMedia",
  data() {
    return {};
  },
  async mounted() {
    var constraints = { audio: false, video: { width: 1280, height: 720 } };

    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    var video = this.$refs.video;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
    /* use the stream */
  },
  methods: {},
};
</script>
