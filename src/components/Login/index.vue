<template>
  <div class="login-modal">
    <div class="tabset clearfix">
      <a href="javascript:;" class="tab" :class="{'on': actForm == 'email'}"
         @click="errors.clear('logForm');tabForm('email');">{{ $t('emailform') }}</a>
      <a href="javascript:;" class="tab" :class="{'on': actForm == 'phone'}"
         @click="errors.clear('logForm');tabForm('phone')">{{ $t('telform') }}</a>
    </div>
    <div class="form-wrapper">
      <form @submit.prevent="submitForm('logForm')" data-vv-scope="logForm">
        <div class="form-group" v-if="actForm == 'email'">
          <p class="note">{{ $t('email_note') }}</p>
          <input type="email" name="email" :placeholder="$t('email_holder')" v-model="formData.username"
                 v-validate="'required|email'" autofocus
                 :class="{'ipt': true, 'is-danger': errors.has('logForm.email') }">
          <p class="help is-danger" v-show="errors.has('logForm.email')">{{ $t('emailErr') }}</p>
        </div>
        <div v-if="actForm == 'phone'">
          <div class="form-group">
            <p class="note">{{ $t('tel_note') }}</p>
            <intlTelInput :countryCode="countryCode" v-on:excountry="setCountryCode"></intlTelInput>
            <input type="text" name="phone" :placeholder="$t('tel_holder')" v-model="phoneIpt"
                   v-validate="'required|min:5'"
                   :class="{'ipt': true, 'is-danger': errors.has('logForm.phone') }">
            <input type="hidden" name="full_phone" v-model="formData.username">
            <p class="help is-danger" v-show="errors.has('logForm.phone')">{{ $t('phoneErr') }}</p>
          </div>
        </div>
        <div class="form-group">
          <p class="note">{{ $t('pass_note') }}</p>
          <input type="password" v-validate="'required|min:6|max:40'"
                 :class="{'ipt': true, 'is-danger': errors.has('logForm.pass') }"
                 name="pass" :placeholder="$t('passErr')" v-model="formData.password">
          <p class="help is-danger" v-show="errors.has('logForm.pass')">{{ $t('passErr') }}</p>
        </div>
        <div class="form-group err-msg" v-if="errorMsg">
          <p class="msg-box" v-if="errorMsg == 'login1600101003'">{{$t('login1600101003') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'login1600101004'">{{$t('login1600101004') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'login1600101005'">{{$t('login1600101005') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'login1600101006'">{{$t('login1600101006') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'login1600101011'">{{$t('login1600101011') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'REQUESTERR'">{{$t('REQUESTERR') }} <i class="sign"></i></p>
        </div>
        <div class="form-group">
          <button class="sub-btn" type="submit">
            {{ $t('LOGIN') }}
            <span class="sk-circle" v-if="submiting">
              <i class="sk-circle1 sk-child"></i>
              <i class="sk-circle2 sk-child"></i>
              <i class="sk-circle3 sk-child"></i>
              <i class="sk-circle4 sk-child"></i>
              <i class="sk-circle5 sk-child"></i>
              <i class="sk-circle6 sk-child"></i>
              <i class="sk-circle7 sk-child"></i>
              <i class="sk-circle8 sk-child"></i>
              <i class="sk-circle9 sk-child"></i>
              <i class="sk-circle10 sk-child"></i>
              <i class="sk-circle11 sk-child"></i>
              <i class="sk-circle12 sk-child"></i>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<i18n>
  {
  "en": {
  "emailform": "Email",
  "telform": "Cellphone Number",
  "email_note": "Email address",
  "tel_note": "Cellphone Number",
  "pass_note": "Password",
  "email_holder": "Email",
  "tel_holder": "Cellphone Number",
  "emailErr": "Invalid email address. Please verify your email address and try again.",
  "passErr": "6-40 alphanumeric characters",
  "phoneErr": "Invalid Cellphone Number",
  "login1600101003": "IP被禁止",
  "login1600101004": "用户名不存在",
  "login1600101005": "用户被禁用",
  "login1600101006": "密码错误",
  "login1600101011": "已经登陆"
  },
  "zh-cn": {
  "emailform": "邮箱",
  "telform": "手机号码",
  "email_note": "邮箱地址",
  "tel_note": "手机号码",
  "pass_note": "输入密码",
  "email_holder": "E-mail",
  "tel_holder": "请输入手机号码",
  "emailErr": "邮箱格式错误",
  "passErr": "6-40个字母或单词",
  "phoneErr": "电话号码错误",
  "login1600101003": "IP被禁止",
  "login1600101004": "用户名不存在",
  "login1600101005": "用户被禁用",
  "login1600101006": "密码错误",
  "login1600101011": "已经登陆"
  },
  "tr": {
  "emailform": "Email",
  "telform": "Cep Telefonu Numarası",
  "email_note": "Email adresi",
  "tel_note": "Cep Telefonu Numarası",
  "pass_note": "Şifre",
  "email_holder": "Email",
  "tel_holder": "Cep Telefonu Numarası",
  "emailErr": "Geçersiz email adresi. Lütfen geçerli bir email adresi girerek tekrar deneyin.",
  "passErr": "6-40 alphanumeric characters",
  "phoneErr": "Geçersiz Telefon Numarası",
  "login1600101003": "IP adresi banlanmıştır.",
  "login1600101004": "Kullanıcı adı bulunmamaktadır",
  "login1600101005": "Kullanıcı banlanmıştır",
  "login1600101006": "Hatalı Şifre",
  "login1600101011": "Hesabınız bir başka oturumda açık gözükmektedir"
  }
  }
</i18n>

<script>
  import intlTelInput from '../intlTelInput/index.vue'
  import Config from '@/config'
  import md5 from 'js-md5'

  export default {
    name: 'Login',
    components: {
      intlTelInput
    },
    data () {
      return {
        formData: {},
        errMsg: '',
        actForm: 'email',
        countryCode: 'tr',
        dialCode: '90',
        phoneIpt: '',
        useSMS: false,
        errorMsg: '',
        submiting: false
      }
    },
    methods: {
      setCountryCode: function (item) {
        this.phoneIpt = item.phoneFormat
      },
      tabForm: function (_tab) {
        this.actForm = _tab
        this.formData = {}
        if (_tab == 'phone') {
          this.$http.get('https://ipinfo.io')
            .then(response => {
              if (response.status == 200) {
                this.$nextTick(function () {
                  this.countryCode = response.data && response.data.country ? response.data.country.toLowerCase() : 'tr'
                })
              }
            })
        }
      },
      submitForm (scope) {
        this.$validator.validateAll(scope).then((result) => {
          if (!result) { return }
          let subData = this.formData
          if (this.actForm == 'phone') {
            subData.username = (this.dialCode + this.phoneIpt).replace(/\s/g, '')
          }
          subData.password = md5(this.formData.password)
          if (this.submiting) { return }
          this.submiting = true
          this.errorMsg = ''
          this.$http.jsonp(Config.uc + '/login/service.html', {params: subData})
            .then(response => {
              this.submiting = false
              if (response.body.status == 200) {
                this.$emit('regSuccess')
              } else {
                switch (response.body.status) {
                  case 1600101003:
                    this.errorMsg = 'login1600101003'
                    break
                  case 1600101004:
                    this.errorMsg = 'login1600101004'
                    break
                  case 1600101005:
                    this.errorMsg = 'login1600101005'
                    break
                  case 1600101006:
                    this.errorMsg = 'login1600101006'
                    break
                  case 1600101011:
                    this.errorMsg = 'login1600101011'
                    break
                  default:
                    this.errorMsg = 'REQUESTERR'
                    break
                }
              }
            })
            .catch(response => {
              console.log(response)
              this.errorMsg = 'REQUESTERR'
              this.submiting = false
            })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/common.scss";
  @import "../../styles/mform.scss";
</style>
