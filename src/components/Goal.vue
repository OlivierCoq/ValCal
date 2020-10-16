<template>
  <div>


  </div>
</template>
<script>
  import * as firebase from 'firebase'
  import db from './firebaseInit'
  import * as OseeyoFireBase from '../OseeyoFirebase'


export default {
  name: 'Goal',
  props: ['goal', 'dataset'],
  data() {
    return {
      opacity: 1,
      prog: 0,
      min: 0,
      goal_num: 0,
      dataset_prog: false,
      editing: false,
      deleting: false,
      deleted: false,
      uid: false
    }
  },
  created(){
    this.goal.editing = false
    this.goal.deleting = false
    // this.updateProg()
    this.progress()
  },
  methods: {
    updateProg(){
      let thisObj = this
      thisObj.dataset_prog = []
      db.collection("goals").where("uid", '==', thisObj.goal.uid).get().then((querySnapshot) => {
        // Add each project to dataset:
        querySnapshot.forEach((doc) => {
          thisObj.dataset_prog.push(doc.data())
        })
      })
    },

  },
  watch(){
    this.progress()
  }
}
</script>
<style lang="scss">
  @import "../sass/global.scss";
</style>
