<template>
  <div>
    <div class="goal" :class=" deleted ? 'deleted' : '' ">
      <div class="row">
        <div class="col-12" style="display: flex; flex-direction: row;">
          <h4>{{goal.name}}</h4>
          <button class="btn edit-goal-btn" :class=" deleted ? 'deleted' : '' " :disabled="deleted ? true : false" @click="goal.editing = !goal.editing">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn delete-goal-btn" :class=" deleted ? 'deleted' : '' " :disabled="deleted ?  true : false" @click="goal.deleting = true">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="goal-progress" style="width:100%; padding: 0 1em;">
          <div class="progress">
            <div class="progress-bar t3" :class=" deleted ? 'deleted' : '' " role="progressbar" :style=" `width: ${prog}%`"></div>
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

      <div v-if="goal.deleting" class="delete-goal-modal">
        <div class="row">
          <div class="col-12">
            <form class="row">
              <label class="col-sm-12 col-md-6 col-form-label"><span>Are you sure you want to delete this Goal? This <strong>cannot</strong> be undone.</span></label>
              <div class="col-sm-12 col-md-6">
                <div class="ctr-actions">
                  <button class="btn delete-final-btn" @click="deleteGoal(goal)">Yes, delete it please.</button>
                  <button class="btn delete-cancel-btn" @click="goal.deleting = false">Nope, nevermind!</button>
                </div>
              </div>
            </form>
          </div>
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
      // this.updateProg()
    },
    deleteGoal(goal){
      console.log("Deleting:", goal.name)
      let thisObj = this
      thisObj.editing = true
      db.collection("goals").where('id', '==', goal.id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete()

          })
        })
        goal.deleting = false
        goal.editing = false
        thisObj.deleted = true
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
