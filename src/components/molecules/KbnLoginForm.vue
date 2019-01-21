<template>
  <form novalidate>
    <div class="form-item">
      <label for="emai">メールアドレス</label>
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="例:kanban@domain.com"
        @focus="resetError"
      >
      <ul class="validation-errors">
        <li v-if="!validation.email.format">メールアドレスの形式が不正です。</li>
        <li v-if="!validation.email.required">メールアドレスが入力されていません。</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="password">パスワード</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="例: xxxx"
        @focus="resetError"
      >
      <ul class="validation-errors">
        <li v-if="!validation.password.required">パスワードが入力されてません。</li>
      </ul>
    </div>
    <div class="form-actions">
      <KbnButton
        :disabled="disabledLoginAction"
        @click="handleClick">ログイン</KbnButton>
      <p
        v-if="progress"
        class="login-progress">ログイン中...</p>
      <p
        v-if="error"
        class="login-error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton'
const required = val => !val.trim()
const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default {
  name: 'KbnLoginForm',
  components: {
    KbnButton
  },

  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    // emailとpasswordのバリデーション
    validation () {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL(this.email)
        },
        password: {
          required: required(this.password)
        }
      }
    },
    valid () {
      const validation = this.validation
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields; i++) {
        const field = fields[i]
        valid = Object.keys(validation[field]).every(key => validation[field][key])
        if (!valid) { break }
      }
      return valid
    }
  }
}
</script>
