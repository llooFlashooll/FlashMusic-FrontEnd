<template>
  <div class="footer">
    <div class="copyright">
      <div class="container flex-column">
        <p>
          <span class="mr5">Copyright © 2021</span>
          <a href="https://space.bilibili.com/383431110">flashmusic</a>
          <span>. Designed by</span>
          <a href="https://github.com/llooFlashooll" target="_blank">llooFlashooll</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.footer {
  width: 100%;
  .copyright {
    padding: 1.3rem 0;
    .container {
      padding: 0;
      color: #6D7685;
      font-size: 0.8125rem;
      a {
        color: #6D7685;
        margin-left: 5px;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #333;
        }
      }
    }
  }
}
</style>
