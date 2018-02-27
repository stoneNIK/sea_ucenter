<template>
  <div class="wrapper">
    <div class="profile-wrapper">
      <div class="profile-sidebox">
        <div class="profile-stiky">
          <div class="user-info">
            <div class="avatar">
              <img :src="user.avatar || avatar_default">
              <a class="to-avatar" href="javascript:;" @click="showAvatarUpload = true">{{ $t('change_avatar') }}</a>
            </div>
            <div class="user-info-name">
              <div class="name" v-html="user.nickname || user.username"></div>
              <div class="level" v-if="user.level">
                <p class="level-progress"><i :style="{width: 100 * user.level.exp / user.level.need + 'px'}"></i></p>
                <p class="level-txt"><span v-html="user.level.exp"></span> / <span v-html="user.level.need"></span></p>
              </div>
            </div>
            <div class="user-info-section" v-if="user.signature">
              <p class="signature" v-html="user.signature"></p>
            </div>
            <div class="user-info-section" v-if="user.id && !user.confirmed">
              <a href="javascript:;" class="btn btn-lg">{{ $t('confirm_email') }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-contentbox">
        <div class="profile-content">
          <div class="profile-view-title">
            <div>{{ $t('PROFILE') }}</div>
          </div>
          <div class="profile-view-box">
            <div class="profile-view-section">
              <div class="view-section-label">{{ $t('account') }}</div>
              <div class="view-section-col">
                <a href="javascript:;" class="view-section-edit" v-if="!edit_nickname"
                   @click="edit_nickname = true;">{{ $t('EDIT') }}</a>
                <a href="javascript:;" class="view-section-cancel" v-if="edit_nickname" @click="edit_nickname = false;">{{ $t('CANCEL')
                  }}</a>
                <div class="view-section-item" v-if="!edit_nickname">
                  <div class="view-label">{{ $t('NICKNAME') }}</div>
                  <div class="view-field">
                    <span v-html="user.nickname || user.username"></span>
                  </div>
                </div>
                <div class="view-section-item" v-if="edit_nickname">
                  <form @submit.prevent="submitForm('editform1')" data-vv-scope="editform1">
                    <div class="view-label">{{ $t('NICKNAME') }}</div>
                    <div class="view-field edit-field">
                      <input type="text" name="nickname" placeholder="Your New Nickname"
                             v-validate="'required'"
                             :class="{'profile-view-input': true, 'is-danger': errors.has('editform1.nickname') }">
                      <p class="help is-danger" v-show="errors.has('editform1.nickname')">This feild is Required</p>
                    </div>
                    <div class="sub-field">
                      <button class="btn btn-sm" type="submit">{{ $t('SUBMIT') }}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="profile-view-section">
              <div class="view-section-label">{{ $t('security') }}</div>
              <div class="view-section-col">
                <a href="javascript:;" class="view-section-edit" v-if="!edit_pass"
                   @click="edit_pass = true;">{{ $t('EDIT') }}</a>
                <a href="javascript:;" class="view-section-cancel" v-if="edit_pass"
                   @click="edit_pass = false;">{{ $t('CANCEL') }}</a>
                <div class="view-section-item" v-if="!edit_pass">
                  <div class="view-label">{{ $t('PASSWORD') }}</div>
                  <div class="view-field">
                    ********
                  </div>
                </div>
                <div class="view-section-item" v-if="edit_pass">
                  <form @submit.prevent="submitForm('editform2')" data-vv-scope="editform2">
                    <div class="view-label">{{ $t('PASSWORD') }}</div>
                    <div class="view-field edit-field">
                      <input type="password" name="old_pass" placeholder="Old Password"
                             v-validate="'required|min:6|max:40'"
                             :class="{'profile-view-input': true, 'is-danger': errors.has('editform2.old_pass') }">
                      <p class="help is-danger" v-show="errors.has('editform2.old_pass')">6-40 charactor words</p>
                    </div>
                    <div class="view-field edit-field">
                      <input type="password" name="new_pass" placeholder="New Password"
                             v-validate="'required|min:6|max:40'"
                             :class="{'profile-view-input': true, 'is-danger': errors.has('editform2.new_pass') }">
                      <p class="help is-danger" v-show="errors.has('editform2.new_pass')">6-40 charactor words</p>
                    </div>
                    <div class="view-field edit-field">
                      <input type="password" name="new_pass2" placeholder="Confirm Password"
                             v-validate="'required|min:6|max:40'"
                             :class="{'profile-view-input': true, 'is-danger': errors.has('editform2.new_pass2') }">
                      <p class="help is-danger" v-show="errors.has('editform2.new_pass2')">6-40 charactor words</p>
                    </div>
                    <div class="sub-field">
                      <button class="btn btn-sm" type="submit">{{ $t('SUBMIT') }}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="profile-view-section">
              <div class="view-section-label">{{ $t('personal') }}</div>
              <div class="view-section-col">
                <a href="javascript:;" class="view-section-edit" v-if="!edit_email"
                   @click="edit_email = true;">{{ $t('EDIT') }}</a>
                <a href="javascript:;" class="view-section-cancel" v-if="edit_email"
                   @click="edit_email = false;">{{ $t('CANCEL') }}</a>
                <div class="view-section-item" v-if="!edit_email">
                  <div class="view-label">{{ $t('EMAIL') }}</div>
                  <div class="view-field">
                    emailtest@qq.com
                  </div>
                </div>
                <div class="view-section-item" v-if="edit_email">
                  <form @submit.prevent="submitForm('editform3')" data-vv-scope="editform3">
                    <div class="view-label">{{ $t('EMAIL') }}</div>
                    <div class="view-field edit-field">
                      <input type="email" name="old_pass" placeholder="Current Email" class="profile-view-input"
                             readonly :value="user.email">
                    </div>
                    <div class="view-field edit-field">
                      <input type="email" name="new_email" placeholder="New Email"
                             v-validate="'required|email'"
                             :class="{'profile-view-input': true, 'is-danger': errors.has('editform3.new_email') }">
                      <p class="help is-danger" v-show="errors.has('editform3.new_email')">Email feild is Invalid</p>
                    </div>
                    <div class="view-field edit-field">
                      <input type="password" name="current_pass" placeholder="Current Password"
                             v-validate="'required|min:6|max:40'"
                             :class="{'profile-view-input': true, 'is-danger': errors.has('editform3.current_pass') }">
                      <p class="help is-danger" v-show="errors.has('editform3.current_pass')">6-40 charactor words</p>
                    </div>
                    <div class="sub-field">
                      <button class="btn btn-sm" type="submit">{{ $t('SUBMIT') }}</button>
                    </div>
                  </form>
                </div>
                <div class="view-section-item">
                  <div class="view-label">Member since: 09/13/2017</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-upload field="img"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="showAvatarUpload"
               :width="300"
               :height="300"
               url="/upload"
               langType="en"
               :params="avatar_params"
               :headers="avatar_headers"
               img-format="png"></my-upload>
  </div>
</template>
<i18n>
  {
  "en": {
  "confirm_email": "Confirm EMAIL",
  "account": "Account",
  "security": "Security",
  "personal": "Profile",
  "change_avatar": "Change Avatar"
  },
  "zh-cn": {
  "confirm_email": "验证邮箱",
  "account": "帐户",
  "security": "安全",
  "personal": "个人信息",
  "change_avatar": "更换头像"
  },
  "tr": {
  "confirm_email": "Email Doğrulaması",
  "account": "Hesap",
  "security": "Güvenlik",
  "personal": "Profil",
  "change_avatar": "Resmi değiştir"
  }
  }
</i18n>
<script>
  import avatarDefault from '../Header/avatar_default.png'
  import myUpload from 'vue-image-crop-upload'

  export default {
    name: 'profile',
    components: {
      'my-upload': myUpload
    },
    data () {
      return {
        user: {},
        edit_nickname: false,
        edit_pass: false,
        edit_email: false,
        avatar_default: avatarDefault,
        showAvatarUpload: false,
        avatar_params: {
          'a': 1,
          'b': 2
        },
        avatar_headers: {
          smail: '*_~'
        }
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
      }
    },
    methods: {
      submitForm (scope) {
        this.$validator.validateAll(scope).then((result) => {
          // TODO
          console.log(scope)
        })
      },
      cropSuccess (imgDataUrl, field) {
        console.log('-------- crop success --------')
        this.user.avatar = imgDataUrl
      },
      cropUploadSuccess (jsonData, field) {
        console.log('-------- upload success --------')
        console.log(jsonData)
        console.log('field: ' + field)
      },
      cropUploadFail (status, field) {
        console.log('-------- upload fail --------')
        console.log(status)
        console.log('field: ' + field)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/common.scss';

  .profile-wrapper {
    display: -webkit-flex;
    display: flex;
    padding: 20px 0 10px;
    width: 100%;
    .profile-sidebox {
      width: 25%;
      .profile-stiky {
        margin-right: 20px;
        .user-info {
          padding: 1.5rem 1rem 2rem;
          background-color: rgba(7, 4, 4, 0.5);
          border-radius: 2px;
          .avatar {
            $avatarHeight: 150px;
            margin: 0 auto 1rem;
            position: relative;
            width: $avatarHeight;
            height: $avatarHeight;
            img {
              display: block;
              width: $avatarHeight;
              height: $avatarHeight;
              -webkit-border-radius: 50%;
              border-radius: 50%;
              animation: avatarAnimation 1s;
            }
            .to-avatar {
              position: absolute;
              display: none;
              left: 0;
              top: 0;
              width: $avatarHeight;
              height: $avatarHeight;
              line-height: $avatarHeight;
              text-align: center;
              font-size: .8rem;
              color: #e9e9e9;
              background: rgba(0, 0, 0, .8);
              border-radius: 50%;
            }
            &:hover .to-avatar {
              display: block;
            }
          }
          .user-info-name {
            margin: 0 auto 1rem;
            .name {
              font-size: 1.1rem;
              text-align: center;
            }
            .level {
              margin: .8rem auto;
              font-size: 18px;
              .level-progress {
                display: block;
                position: relative;
                margin: 0 1.9rem;
                height: 6px;
                background: #4c4c4c;
                border-radius: 2px;
                overflow: hidden;
                i {
                  display: block;
                  width: 0%;
                  height: 100%;
                  background-image: linear-gradient(to left, #f6cc2e, #e89c15);
                }
              }
              .level-txt {
                margin-top: .25rem;
                text-align: center;
              }
            }
          }
          .user-info-section {
            padding: 1rem 0;
            border-top: 1px solid #404040;
            text-align: center;
            .signature {
              color: #e9e9e9;
              font-size: 12px;
              line-height: 1.5;
            }
          }
        }
      }
    }
    .profile-contentbox {
      width: 75%;
      .profile-content {
        padding: 1px 15px;
        background-color: rgba(7, 4, 4, 0.5);
        border-radius: 2px;
        .profile-view-title {
          width: 88%;
          margin: 1rem auto 0;
        }
        .profile-view-box {
          padding: 1rem 0;
          margin: 0 auto;
          .profile-view-section {
            display: flex;
            position: relative;
            border-top: 1px solid #3e3e3e;
            margin: 0 auto;
            margin-bottom: 1rem;
            width: 88%;
            .view-section-label {
              width: 20%;
              line-height: 1rem;
              font-size: 24px;
              font-weight: 300;
              color: #3e3e3e;
              word-break: break-all;
              padding-top: .7rem;
            }
            .view-section-col {
              width: 60%;
              .view-section-edit {
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                color: #8a8a8a;
                font-size: 16px;
                font-weight: 300;
                line-height: 1.5rem;
                margin: .5rem 0;
                cursor: pointer;
                &:hover {
                  color: $yellowColor;
                }
              }
              .view-section-cancel {
                display: inline-block;
                position: absolute;
                top: .55rem;
                right: 0;
                margin: 0 auto;
                padding: 0 .5rem;
                border-radius: 4px;
                border: 0;
                outline: 0;
                opacity: 1;
                visibility: visible;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.25rem;
                text-align: center;
                text-transform: uppercase;
                color: #fff;
                transition: background-color .25s;
                background-color: #2E2E2E;
                cursor: pointer;
                &:hover {
                  background-color: #404040;
                }
              }
              .view-section-item {
                flex-wrap: wrap;
                margin-top: 0.5rem;
                margin-bottom: 1rem;
                .view-label {
                  line-height: 1.5rem;
                  font-size: 18px;
                  font-weight: 300;
                  color: #848484;
                  display: block;
                }
                .view-field {
                  display: block;
                  position: relative;
                  outline: 0;
                  width: 100%;
                  line-height: 1rem;
                  color: #fff;
                  font-size: 18px;
                  font-weight: 300;
                  word-wrap: break-word;
                  .profile-view-input {
                    display: block;
                    margin-bottom: .5rem;
                    position: relative;
                    border: 1px solid #737373;
                    border-radius: 2px;
                    color: #fff;
                    line-height: 1.5rem;
                    height: 1.5rem;
                    text-indent: .5rem;
                    background: none;
                    width: 100%;
                    font-size: 16px;
                    outline: none;
                  }
                  .profile-view-input.is-danger {
                    border-color: #f30;
                  }
                  .help {
                    position: absolute;
                    top: 6px;
                    left: 110%;
                    width: 250px;
                    color: #e9e9e9;
                    font-size: 12px;
                    line-height: 2;
                  }
                  .help.is-danger {
                    color: #ff3300;
                  }
                }
                .view-field.edit-field {
                  width: 280px;
                }
                .sub-field {
                  margin-top: .6rem;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes avatarAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
