<template>
  <div id="LoginRegister">
    <div class="ctr-logo">
      <h1><span>Val</span>Cal</h1>
      <em>Visualize <i class="fas fa-caret-right" aria-hidden="true"></i> Actualize.</em>
      <hr>
    </div>
    <div class="ctr-form">
      <form>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" id="vc-email" v-model="email" @input="validate" placeholder="name@example.com">
          <label>Password</label>
          <input class="form-control" id="vc-password" type="password" v-model="password" placeholder="password">
        </div>
      </form>
      <button @click="login" class="btn btn-lg login-btn">Login</button>
      <small>
          <span class="login-help">Not a member? <router-link to="/Register"><strong>Register here.</strong></router-link></span>
      </small>
    </div>
    <div class="ctr-feedback">
      <div v-if="error" class="alert alert-warning">
        {{error}}
      </div>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase'
  import db from './firebaseInit'
  import * as OseeyoFireBase from '../OseeyoFirebase'
  import uuid from 'uuid'
  import { v4 as uuidv4 } from 'uuid'
  import * as bootstrapValidate from 'bootstrap-validate';

  export default {
    name: 'Login',
    components: {
    },
    data() {
      return {
        opacity: 1,
        email: "",
        password: "",
        error: false
      }
    },
    created() {
    },
    methods: {
      login(e){
        e.preventDefault()
        let thisObj = this
        firebase.auth().signInWithEmailAndPassword(thisObj.email, thisObj.password)
          .then(user => {
            // alert(`You are logged in as ${user.user.email}`)
            this.$router.push('/')
            // thisObj.$router.go({path: thisObj.$router.path})
          }, err => {
            console.log(err.message)
            thisObj.error = err.message
          })
      },
      logout(e) {
        e.preventDefault()
        let thisObj = this
        firebase.auth().signOut()
          .then(()=>{
            this.$router.push('/login')
            // thisObj.$router.go({path: thisObj.$router.path})
          })
      },
      validate(){
        bootstrapValidate('#vc-email', 'email:Please enter a valid email.')
        bootstrapValidate('#vc-password', 'min:10:Password must be at least 10 characters.')
      },
    },
    watch(){
    },
    updated(){
    },
  }

</script>

<style lang="scss">
  @import "../sass/global.scss";
</style>
