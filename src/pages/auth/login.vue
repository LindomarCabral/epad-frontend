<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Login
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-field
                  helper="E-Mail" class="q-mt-lg"
                  :error="$v.form.email.$error"
                  error-label="We need a valid e-mail"
              >
                <q-input
                        v-model.trim="form.email"
                        label="E-mail"
                        lazy-rules
                        type="email"
                        ref="email"                        
                />
              </q-field>

              <q-field
                        helper="Password"
                        class="q-mt-lg"
                        :error="$v.form.password.$error"
                        error-label="Passwords needs to be 8 chars at minimum"
              >
                      <q-input
                        lazy-rules
                        v-model="form.password"
                        type="password"
                        ref="password"
                        @keyup.enter="login"
                      />
              </q-field>

              <q-card-actions align="left">                
                  <q-btn
                          label="Login"
                          :disable="$v.form.$invalid"
                          color="primary"
                          icon="fa-arrow-right"
                          @click="login"
                  />
              
              </q-card-actions>

            </q-form>
            <inner-loading :loading="loading"/>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import InnerLoading from '../../components/InnerLoading'
  import {email, minLength, required} from 'vuelidate/lib/validators'

  export default {
    name: 'Login',
    components: {
      InnerLoading
    },
    data () {
      return {
        loading: false,
        form: {
          email: '',
          password: ''
        }
      }
    },
    validations: {
      form: {
        email: {required, email},
        password: {required, minLength: minLength(6)}
      }
    },
    methods: {
      login () {
        this.$v.form.$touch()
        this.loading = true
        const user = {email:"lindomar.tecno@gmail.com",password:"secret"}
        this.$store.dispatch('session/login', user).then(() => {
          this.loading = false          
          this.$router.push({name: 'news'})
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: 'Login com sucesso',
            icon: 'fa-check-circle'
          })
        }).catch(error => {
          this.loading = false
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: error.response.data.message || 'Your credentials are wrong',
            icon: 'fa-exclamation-triangle'
          })
        })
      }
    },
    mounted () {
      this.$refs.email.focus()
    }
  }
</script>

<style>
  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
