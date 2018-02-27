<template>
  <div class="login-modal">
    <div class="tabset clearfix">
      <a href="javascript:;" class="tab" :class="{'on': actForm == 'email'}"
         @click="tabForm('email');errors.clear('regForm');">{{ $t('emailform') }}</a>
      <a href="javascript:;" class="tab" :class="{'on': actForm == 'phone'}"
         @click="tabForm('phone');errors.clear('regForm');">{{ $t('telform') }}</a>
    </div>
    <div class="form-wrapper">
      <form @submit.prevent="submitForm('regForm')" data-vv-scope="regForm" novalidate>
        <div class="form-group" v-if="actForm == 'email'">
          <p class="note">{{ $t('email_note') }}</p>
          <input type="text" name="email" :placeholder="$t('email_holder')" v-model="formData.username"
                 v-validate="'required|email'" autofocus
                 :class="{'ipt': true, 'is-danger': errors.has('regForm.email') }">
          <p class="help is-danger" v-show="errors.has('regForm.email')">{{ $tc('emailErr') }}</p>
        </div>
        <div v-if="actForm == 'phone'">
          <div class="form-group">
            <p class="note">{{ $t('tel_note') }}</p>
            <intlTelInput :countryCode="countryCode" v-on:excountry="setCountryCode"></intlTelInput>
            <input type="text" name="phone" :placeholder="$t('phone_holder')" v-model="phoneIpt"
                   v-validate="'required|min:6|max:20'"
                   :class="{'ipt': true, 'is-danger': errors.has('regForm.phone') }">
            <input type="hidden" name="phone" v-model="formData.username" value="">
            <p class="help is-danger" v-show="errors.has('regForm.phone')">{{ $tc('phoneErr') }}</p>
          </div>
          <div class="form-group">
            <p class="note">{{ $t('captcha_note') }}</p>
            <input type="password" name="pass2" :placeholder="$t('sms_holder')" v-model="formData.sms"
                   v-validate="'required|min:6'"
                   :class="{'ipt sms-ipt': true, 'is-danger': errors.has('regForm.pass2') }">
            <a href="javascript:;" class="sms-btn" @click="sendCode">
              <span v-if="!showCount">{{ $t('send_code') }}</span>
              <span v-if="showCount">{{ showCount }} S</span>
            </a>
            <p class="help is-danger" v-show="errors.has('regForm.pass2')">{{ $t('smsErr') }}</p>
          </div>
        </div>
        <div class="form-group">
          <p class="note">{{ $t('pass_note') }}</p>
          <input type="password" name="pass" :placeholder="$t('pass_holder')" v-model="formData.password"
                 v-validate="'required|min:6|max:40'"
                 :class="{'ipt': true, 'is-danger': errors.has('regForm.pass') }">
          <p class="help is-danger" v-show="errors.has('regForm.pass')">{{ $t('passErr') }}</p>
        </div>
        <div class="agree-group">
          <label class="block clearfix">
            <span :class="{'ckb': true, 'is-danger': errors.has('regForm.agree')}"><i
              :class="{'block': formData.agree }"></i></span>
            <input type="checkbox" class="ckb-ipt" name="agree" v-model="formData.agree"
                   v-validate="'required'">
            <span class="ckb-txt">
              {{ $t('agree') }}
              <a href="#/terms" target="_blank">{{ $t('law1') }}</a>
              {{ $t('and') }}
              <a href="#/policy" target="_blank">{{ $t('law2') }}</a>
            </span>
          </label>
        </div>
        <div class="form-group err-msg" v-if="errorMsg">
          <p class="msg-box" v-if="errorMsg == 'reg1600102001'">{{$t('reg1600102001') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'reg1600102003'">{{$t('reg1600102003') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'reg1600102005'">{{$t('reg1600102005') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'reg1600102006'">{{$t('reg1600102006') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'REQUESTERR'">{{$t('REQUESTERR') }} <i class="sign"></i></p>
          <p class="msg-box" v-if="errorMsg == 'notice'"><span v-html="err_notice"></span> <i class="sign"></i></p>
        </div>
        <div class="form-group">
          <button class="sub-btn" type="submit">
            {{ $t('SIGNUP') }}
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
  "captcha_note": "SMS Code",
  "pass_note": "Password",
  "email_holder": "Email",
  "phone_holder": "Cellphone number",
  "sms_holder": "SMS Code",
  "pass_holder": "6-40 alphanumeric characters",
  "emailErr": "Invalid email address. Please verify your email address and try again.",
  "smsErr": "Please enter 6 digital characters.",
  "phoneErr": "Invalid SMS number.",
  "passErr": "6-40 alphanumeric characters.",
  "send_code": "Send Code",
  "agree": "By signing up, you agree to our ",
  "law1": "terms of use",
  "law2": "privacy and cookie policy",
  "and": "and",
  "reg1600102001": "Register failure",
  "reg1600102003": "account exist",
  "reg1600102005": "captcha error",
  "reg1600102006": "password error"
  },
  "zh-cn": {
  "emailform": "邮箱",
  "telform": "手机号码",
  "email_note": "邮箱地址",
  "tel_note": "手机号码",
  "captcha_note": "短信验证",
  "pass_note": "设置密码",
  "email_holder": "邮箱地址",
  "phone_holder": "手机号码",
  "sms_holder": "6位数字",
  "pass_holder": "6-40位数字或字母",
  "emailErr": "邮箱格式错误",
  "smsErr": "请输入6位数字",
  "phoneErr": "手机号码格式有误",
  "passErr": "密码输入不正确",
  "send_code": "发送验证码",
  "agree": "通过注册，您同意我们的",
  "law1": "使用条款",
  "law2": "隐私权和Cookie政策",
  "and": "和",
  "reg1600102001": "注册失败",
  "reg1600102003": "账号已存在",
  "reg1600102005": "验证码错误",
  "reg1600102006": "密码格式不正确"
  },
  "tr": {
  "emailform": "Email",
  "telform": "Cep Telefonu Numarası",
  "email_note": "Email adresi",
  "tel_note": "Cep Telefonu Numarası",
  "captcha_note": "SMS Kodu",
  "pass_note": "Şifre",
  "email_holder": "Email",
  "phone_holder": "Cep Telefonu Numarası",
  "sms_holder": "SMS Kodu",
  "pass_holder": "6-40 arası alfabetik ve/veya numara içeren karakter giriniz",
  "emailErr": "Geçersiz email adresi. Lütfen geçerli bir email adresi ile tekrar deneyin.",
  "smsErr": "Lütfen 6 haneli şifreyi giriniz.",
  "phoneErr": "Geçersiz SMS numarası.",
  "passErr": "6-40 arası alfabetik ve/veya numara içeren karakter giriniz.",
  "send_code": "Kodu Gönder",
  "agree": "Kabul Et ",
  "law1": "Kullanım Koşulları",
  "law2": "Gizlilik ve Çerez Politikaları",
  "and": "ve",
  "reg1600102001": "Kayıt Hatası",
  "reg1600102003": "Bu hesap mevcut",
  "reg1600102005": "SMS Kodu Hatalı",
  "reg1600102006": "Şifre Hatalı"
  }
  }
</i18n>

<script>
  import intlTelInput from '../intlTelInput/index.vue'
  import Config from '@/config'
  import md5 from 'js-md5'

  export default {
    name: 'Reg',
    components: {
      intlTelInput
    },
    data () {
      return {
        formData: {
          'agree': true
        },
        errorMsg: '',
        actForm: 'email',
        countryCode: 'tr',
        dialCode: '90',
        phoneIpt: '',
        showCount: 0,
        submiting: false,
        err_notice: ''
      }
    },
    methods: {
      sendCode: function () {
        // send code
        if (this.showCount > 0) {
          return
        }
        if (!this.errors.has('regForm.phone')) {
          let phone = this.dialCode + this.phoneIpt
          // send code
          console.log(phone)
          this.countdown()
        }
      },
      countdown () {
        let oThis = this
        let counts = 60
        setInterval(() => {
          counts--
          if (counts >= 0) {
            oThis.showCount = counts
          } else {
            return
          }
        }, 1000)
      },
      setCountryCode: function (item) {
        this.phoneIpt = item.phoneFormat
      },
      tabForm: function (_tab) {
        this.actForm = _tab
        this.formData = {'agree': true}
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
          if (!result) {
            this.errorMsg = 'notice'
            this.err_notice = this.errors.items[0].field + ': ' + this.errors.items[0].msg
            return
          }
          let subData = this.formData
          if (this.actForm == 'phone') {
            subData.username = (this.dialCode + '' + this.phoneIpt).replace(/\s/g, '')
          }
          subData.password = md5(this.formData.password)
          if (this.submiting) { return }
          this.submiting = true
          this.errorMsg = ''
          this.$http.jsonp(Config.uc + '/register/service.html', {params: subData})
            .then(response => {
              this.submiting = false
              if (response.body.status == 200) {
                this.$emit('regSuccess')
              } else {
                switch (response.body.status) {
                  case 1600102001:
                    this.errorMsg = 'reg1600102001'
                    break
                  case 1600102003:
                    this.errorMsg = 'reg1600102003'
                    break
                  case 1600102005:
                    this.errorMsg = 'reg1600102005'
                    break
                  case 1600102006:
                    this.errorMsg = 'reg1600102006'
                    break
                  default:
                    this.errorMsg = 'REQUESTERR'
                    break
                }
              }
            })
            .catch(response => {
              console.log(response)
              this.submiting = false
              this.errorMsg = 'REQUESTERR'
            })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/common.scss";
  @import "../../styles/mform.scss";

  .form-wrapper .agree-group .ckb i {
    background-image: url(../../assets/click.png);
  }
</style>
