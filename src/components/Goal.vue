<template>
  <div>
    <div class="goal">
      <div class="row">
        <div class="col-12" style="display: flex; flex-direction: row;">
          <h4>{{goal.name}}</h4>
          <button class="btn edit-goal-btn" @click="goal.editing = !goal.editing"><i class="fas fa-pen"></i></button>
        </div>
      </div>
      <div class="row">
        <div class="goal-progress" style="width:100%; padding: 0 1em;">
          <div class="progress">
            <div class="progress-bar t3" role="progressbar" :style=" `width: ${dataset_prog[0].prog}%`"></div>
          </div>
          <span><em>$ {{goal.goal_num}}</em></span>
        </div>
      </div>

      <div v-if="goal.editing" class="row edit-goal">
        <div class="col-12">
          <h5>Edit Goal</h5> <hr><br>
        </div>

        <div class="col-12">
          <form>
            <div class="form-group row">
              <label class="col-sm-12 col-md-2 col-form-label">
                <strong>Edit Name</strong>
              </label>
              <div class="col-sm-12 col-md-10">
                  <input class="form-control" v-model="goal.name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-12 col-md-2 col-form-label">
                <strong>Edit Metric</strong><br>
                <small><em>(For ex. 1000000000)</em></small>
              </label>
              <div class="col-sm-12 col-md-10">
                  <input class="form-control" v-model="goal.goal_num">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
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
      uid: false
    }
  },
  created(){
    this.goal.editing = false
    this.updateProg()
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
    progress(){

      this.goal_num = Number(this.goal.goal_num)
      // console.log("max", this.goal_num)
      // console.log("dataset", this.dataset)
      // console.log("goal", this.goal)

      //Earnings
      this.dataset.forEach((endpoint) => {
        this.min += endpoint.earnings.total
      })

      this.prog = (this.min / this.goal_num) * 100
      this.goal.prog = this.prog
      // console.log("progress:", this.prog)
      OseeyoFireBase.OseeyoUpdate("goals", "id", this.goal.id, this.goal)
      this.updateProg()
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
