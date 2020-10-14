<template>
  <div id="LoginRegister">
  </div>
</template>

<script>
  import * as firebase from 'firebase'
  import db from './firebaseInit'
  import * as OseeyoFireBase from '../OseeyoFirebase'
  import uuid from 'uuid'
  import {v4 as uuidv4 } from 'uuid'


  export default {
    name: 'Login',
    components: {
    },
    data() {
      return {
        opacity: 1,
      }
    },
    created() {

    },
    methods: {

    },
    watch(){
    },
  }

</script>

<style lang="scss">
  @import "../sass/global.scss";
</style>
