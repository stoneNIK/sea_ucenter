<template>
  <transition>
    <div class="modal">
      <div class="modal-wrapper" v-if="visible != ''">
        <div class="modal-content">
          <div class="modal-header" v-if="title">
            <div class="modal-title" v-html="title"></div>
          </div>
          <div class="modal-body">
            <a href="javascript:;" class="exit" @click="close">&times;</a>
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
        <div class="modal-backdrop" @click="close"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      title: String,
      visible: {
        type: String,
        default: 'Dialog'
      }
    },
    methods: {
      close () {
        this.$emit('close', false) // 传递关闭事件
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    .modal-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      z-index: -1;
    }
    .modal-content {
      position: absolute;
      top: 100px;
      left: 50%;
      padding-bottom: 30px;
      width: 500px;
      margin-left: -250px;
      background-color: #000;
      color: #fff;
      .modal-body {
        .exit {
          position: absolute;
          z-index: 2;
          top: 10px; right: 10px;
          color: #ffffff;
          font-size: 30px;
          line-height: 20px;
          &:hover {
            color: #aaa;
          }
        }
      }
      .modal-header {
        padding: 10px;
        .modal-title {
          text-align: center;
          font-size: 1.2em;
          line-height: 1.5;
        }
      }
    }
  }
</style>
