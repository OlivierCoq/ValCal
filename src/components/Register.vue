<template>
  <div id="LoginRegister">
    <div class="ctr-logo">
      <h1><span>Val</span>Cal</h1>
      <em>Visualize <i class="fas fa-caret-right" aria-hidden="true"></i> Actualize.</em>
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
      <button @click="register" class="btn btn-lg login-btn">Join!</button>
      <small>
        <span class="login-help">Already a member? <router-link to="/login"><strong>Login.</strong></router-link></span>
      </small>
    </div>
    <div class="ctr-feedback">

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
    name: 'Register',
    components: {
    },
    data() {
      return {
        opacity: 1,
        uid: "",
        email: "",
        password: "",
        error: false
      }
    },
    created() {
    },
    methods: {
      validate(){
        bootstrapValidate('#vc-email', 'email:Please enter a valid email.')
        bootstrapValidate('#vc-password', 'min:10:Password must be at least 10 characters.')
      },
      register(e) {
        e.preventDefault()
        let thisObj = this

        firebase.auth().createUserWithEmailAndPassword(thisObj.email, thisObj.password)
          .then(user => {
              // console.log("New user data:", user)
              thisObj.uid = user.user.uid
              thisObj.oseeyoPush()
          }, err => {
            console.log(err.message)
          })

      },
      oseeyoPush(){
        let newUserObj = {
              email: this.email,
              uid: this.uid
            }
        // console.log(newUserObj)

        OseeyoFireBase.OsseeyoFirePush("users", newUserObj)
        this.$router.push('/')
      }
    },
    watch(){
    },
  }

</script>

<style lang="scss">
  @import "../sass/global.scss";
</style>
