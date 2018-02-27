<template>
  <div class="header">
    <div class="header-wrapper wrapper">
      <ul class="nav-list">
        <li>
          <router-link to="/">{{ $t('HOME')}}</router-link>
        </li>
        <li>
          <router-link to="/profile">{{ $t('PROFILE')}}</router-link>
        </li>
      </ul>
      <div class="user-info">
        <div class="log-before" v-if="!user.uid">
          <a href="javascript:;" @click="openDialog('login')">{{ $t('LOGIN')}}</a>
          <a href="javascript:;" @click="openDialog('reg')">{{ $t('SIGNUP')}}</a>
        </div>
        <div class="log-after" v-if="user.uid">
          <span class="avatar">
            <img :src="user.avatar" v-if="user.avatar">
          </span>
          <router-link to="/profile"><span v-html="user.nickname || user.username || user.uid"></span></router-link>
          <a href="javascript:;" @click="logOut()">{{ $t('LOGOUT') }}</a>
        </div>
      </div>
    </div>
    <Modal name="loginModal" :visible.sync="visible" @close="closeModal">
      <Login v-if="visible == 'login'" v-on:loginSuccess="afterLogin"></Login>
      <Reg v-if="visible == 'reg'" v-on:regSuccess="afterLogin"></Reg>
    </Modal>
  </div>
</template>
<script>
  import Modal from '../Modal/index.vue'
  import Login from '../Login/index.vue'
  import Reg from '../Reg/index.vue'
  import Config from '@/config'

  export default {
    name: 'sea-header',
    components: {
      Modal, Login, Reg
    },
    data () {
      return {
        user: {},
        visible: '',
        modalTitle: ''
      }
    },
    computed: {
      getUserInfo () {
        return this.$store.state.user
      }
    },
    created () {
      this.$store.dispatch('getUserAsync')
    },
    watch: {
      getUserInfo (val) {
        this.user = val
        this.closeModal()
      }
    },
    methods: {
      logOut: function () {
        this.$http.jsonp(Config.uc + '/login/logout.html')
          .then(response => {
            if (response.body.status == 200) {
              this.$store.commit('updateUser', {user: {}})
            }
          })
          .catch(response => {
            console.log(response)
          })
      },
      openDialog (_type) {
        let dialogType = 'Dialog'
        switch (_type) {
          case 'login':
            dialogType = 'LOG IN'
            break
          case 'reg':
            dialogType = 'SIGN UP'
            break
        }
        this.modalTitle = dialogType
        this.visible = _type
      },
      afterLogin () {
        this.$store.dispatch('getUserAsync')
      },
      closeModal () {
        this.visible = ''
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/common.scss";

  .header {
    position: relative;
    padding: 10px 0;
    background-color: #111;
    $height: 40px;
    .header-wrapper {
      position: relative;
      font-size: 18px;
      overflow: hidden;
      .nav-list {
        position: relative;
        float: left;
        overflow: hidden;
        li {
          position: relative;
          float: left;
          margin-right: 25px;
          height: $height;
          line-height: $height;
          -webkit-transition: all .3s;
          transition: all .3s;
          &:hover {
            -webkit-transform: translateY(3px);
            transform: translateY(3px);
          }
        }
      }
      .user-info {
        float: right;
        .log-after,
        .log-before {
          display: -webkit-flex;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        a {
          margin-left: 15px;
          height: $height;
          line-height: $height;
        }
        .avatar {
          display: block;
          margin-right: -5px;
          width: 32px;
          height: 32px;
          background: url(./avatar_default.png) 50% 50% no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
            outline: none;
            -webkit-border-radius: 50%;
            border-radius: 50%;
          }
        }
      }
    }
    a {
      color: #fff;
      text-decoration: none;
      -webkit-transition: all .3s;
      transition: all .3s;
      &:hover {
        color: $yellowColor;
      }
    }
  }
</style>
