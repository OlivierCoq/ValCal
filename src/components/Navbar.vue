<template>
  <div id="Navbar" class="container-fluid">
    <div class="row">
      <div class="col-10"></div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
        <div class="ctr-user_info">
          <span><strong>Logged in <i class="fas fa-caret-right"></i></strong> {{email}}</span>
          <span class="logout" @click="logout"><strong>Logout <i class="fas fa-sign-out-alt"></i></strong></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase'
  import db from './firebaseInit'
  import * as OseeyoFireBase from '../OseeyoFirebase'
  import uuid from 'uuid'
  import {v4 as uuidv4 } from 'uuid'


  export default {
    name: 'Navbar',
    components: {
    },
    data() {
      return {
        opacity: 1,
        uid: "",
        email: ""
      }
    },
    created() {
      let thisObj = this
      //Check if user logged in:
      if(firebase.auth().currentUser) {
        thisObj.isLoggedIn = true
        thisObj.uid = firebase.auth().currentUser.uid
        thisObj.email = firebase.auth().currentUser.email
        thisObj.getUserData()
        // console.log("Logged in as:", thisObj.uid)
        // console.log("Logged in as:", firebase.auth().currentUser)
      } else { console.log("No user") }
      // this.getCycles()
      // this.getGoals()
    },
    methods: {
      getUserData(){
        let thisObj = this
        let postId = thisObj.uid
        db.collection("users").where("uid", '==', postId).get().then((querySnapshot) => {
          let data
          querySnapshot.forEach((doc) => {data = doc.data() })
            thisObj.username = data.username
            thisObj.email = data.email
          })
        },
        logout() {
          let thisObj = this
          firebase.auth().signOut()
            .then(()=>{
            // thisObj.$router.go({path: thisObj.$router.path})
            this.$router.push('/login')
          })
      },
    },
    watch(){
    },
  }

</script>

<style lang="scss">
  @import "../sass/global.scss";
</style>
