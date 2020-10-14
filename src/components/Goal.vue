<template>
  <div>
    <div class="goal" >
      <div class="row">
        <div class="col-3">
          <div class="goals" >
            <div class="form-group">
              <label><strong>{{goal.name}} $ <i class="fas fa-caret-down"></i></strong></label> <br>
              <input class="form-control" v-model="goal.goal_num">
              <small><em>For ex. 100000000</em></small>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="goal-progress">
            <div class="progress">
              <div class="progress-bar t3" role="progressbar" :style=" `width: ${prog}%`"></div>
            </div>
            <span><em>Progress</em></span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import * as OseeyoFireBase from '../OseeyoFirebase'


export default {
  name: 'Goal',
  props: ['goal', 'dataset'],
  data() {
    return {
      opacity: 1,
      prog: 0,
      min: 0,
      goal_num: 0
    }
  },
  created(){
    this.progress()
  },
  methods: {
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
