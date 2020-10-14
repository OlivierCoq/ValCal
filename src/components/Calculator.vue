<template>
  <div>
    <Navbar></Navbar>
    <div id="ValCal">
      <div class="container">
        <div class="row title">
          <div class="col-12">
            <h1><span>Val</span>Cal</h1>
            <em>Visualize <i class="fas fa-caret-right"></i> Actualize.</em>
            <hr>
          </div>
        </div>
        <div class="row goals">
          <div class="col-12">
            <h3><i class="fas fa-caret-right"></i> Goals :</h3>
            <div class="row">
              <div class="col-12">
                <div class="ctr-goals">
                  <span v-if="goals.length < 1">You have no saved goals. Let's get started by adding a goal!</span>
                  <button class="btn btn-lg new-goal-btn" @click="createGoal"><i class="fas fa-plus"></i> Add New Goal</button>
                </div>
              </div>
            </div>
            <div v-if="new_goal" class="row new_goal">
              <div class="col-12">
                <div class="row">
                  <h3>New Goal <span class="cancel" @click="new_goal = false">(<strong>Cancel</strong>)</span></h3>
                  <form>
                    <div class="col-6">
                      <div class="form-group">
                        <label>Name your goal</label>
                        <br>
                        <small>(For Ex. Total sales)</small>
                        <input type="text" class="form-control" v-model="new_goal.name">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label>Metric</label>
                        <small>(For Ex. 1000)</small>
                        <input type="text" class="form-control" v-model="new_goal.goal_num">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="row all_goals">
              <div class="col-12">
                <Goal v-for="(goal, i) in goals" :key="i" :goal="goal" :dataset="cycles"></Goal> <!-- Sending total as metric -->
              </div>
            </div>
          </div>
        </div>
        <div class="row tiers">
          <div class="col-12">
            <h2><i class="fas fa-caret-right"></i> Sales Tiers</h2>
              <hr>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col"><strong>Tier</strong></th>
                    <th scope="col"><strong>Bonus per Sale</strong></th>
                    <th scope="col"><strong>Max earnings per Tier</strong></th>
                    <!-- <th scope="col">Actual Earnings</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr class="t1">
                    <th scope="row">
                      <strong> Tier 1 | (1 - 24) </strong>
                    </th>
                      <td>$50</td>
                      <td>$1,200</td>
                      <!-- <td>{{actual.earnings.t1}}</td> -->
                  </tr>
                  <tr class="t2">
                    <th scope="row">
                      <strong> Tier 2 | (25-40) </strong>
                    </th>
                      <td>$70</td>
                      <td>$2,250</td>
                      <!-- <td>{{actual.earnings.t2}}</td> -->
                  </tr>
                  <tr class="t3">
                    <th scope="row">
                      <strong> Tier 3 | (41-56) </strong>
                    </th>
                      <td>$90</td>
                      <td>$3,600</td>
                      <!-- <td>{{actual.earnings.t3}}</td> -->
                  </tr>
                  <tr class="t4">
                    <th scope="row">
                      <strong> Tier 4 | (57 +) </strong>
                    </th>
                      <td>$125</td>
                      <td><i class="fas fa-infinity"></i></td>
                      <!-- <td>{{actual.earnings.t4}}</td> -->
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        <hr>
        <div class="row cycles">
          <h2><i class="fas fa-caret-right"></i> Cycles</h2>
        </div>
        <div class="row">
          <div class="col-12">
            <span v-if="cycles.length < 1">You have no saved cycles. Click the red "Create Cycle" button to get started. <i class="fas fa-caret-right"></i></span>
          </div>
        </div>

          <!-- Adding a new Cycle: -->
        <div v-if="new_cycle" class="container new_cycle">
          <div class="row">
            <div class="col-12">
              <form>
                <div class="form-group">
                  <label>New Cycle Title  <span class="cancel" @click="new_cycle = false"><strong>(Cancel)</strong></span></label>
                  <input type="text" class="form-control" v-model="new_cycle.title">
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="row cycles">
          <div class="cycle" v-for="(cycle, i) in cycles" :key="i">
            <div class="blurb">
              <h4>&nbsp; {{cycle.title}} &nbsp;
                <span class="current_tier t1">
                  {{cycle.current_tier}}
                </span>
              </h4>
            </div>
              <hr>
              <table class="table">
                <thead class="thead-success">
                  <tr>
                    <th></th>
                    <th scope="col">Sunday</th>
                    <th scope="col">Monday</th>
                    <th scope="col">Tuesday</th>
                    <th scope="col">Wednesday</th>
                    <th scope="col">Thursday</th>
                    <th scope="col">Friday</th>
                    <th scope="col">Saturday</th>
                    <th scope="col"><strong>Week Total</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Week 1
                    </th>
                      <td><input v-model="cycle.week_1.Sunday" /></td>
                      <td><input v-model="cycle.week_1.Monday" /></td>
                      <td><input v-model="cycle.week_1.Tuesday" /></td>
                      <td><input v-model="cycle.week_1.Wednesday" /></td>
                      <td><input v-model="cycle.week_1.Thursday" /></td>
                      <td><input v-model="cycle.week_1.Friday" /></td>
                      <td><input v-model="cycle.week_1.Saturday" /></td>
                      <td><span><strong>{{cycle.week_1_total}}</strong></span></td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Week 2
                    </th>
                      <td><input v-model="cycle.week_2.Sunday" /></td>
                      <td><input v-model="cycle.week_2.Monday" /></td>
                      <td><input v-model="cycle.week_2.Tuesday" /></td>
                      <td><input v-model="cycle.week_2.Wednesday" /></td>
                      <td><input v-model="cycle.week_2.Thursday" /></td>
                      <td><input v-model="cycle.week_2.Friday" /></td>
                      <td><input v-model="cycle.week_2.Saturday" /></td>
                      <td><span><strong>{{cycle.week_2_total}}</strong></span></td>
                  </tr>
                  <tr class="t4">
                    <th scope="row">
                      Cycle Totals
                    </th>

                  </tr>
                  <tr class="t2">
                    <th scope="row">
                      <span class="sub_head">Sales</span>
                    </th>
                      <td class="t1"> <span class="total">{{cycle.cycle_total}}</span> </td>
                  </tr>
                  <tr class="t2">
                    <th scope="row">
                      <span class="sub_head">Earnings</span>
                    </th>
                      <td class="t1"> <span class="total">${{cycle.earnings.total}}</span> </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row saveChanges">
          <div class="col-6 offset-6">
            <button class="btn btn-lg save-btn" @click="saveChanges"><i class="fas fa-check"></i> {{saving}}</button>
            <button class="btn btn-lg btn-danger clone-btn" @click="createCycle"><i class="fas fa-plus"></i> Create Cycle</button>
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
  import uuid from 'uuid'
  import {v4 as uuidv4 } from 'uuid'
  import Goal from './Goal'
  import Navbar from './Navbar'


  export default {
    name: 'Calculator',
    components: {
      Navbar,
      Goal
    },
    data() {
      return {
        opacity: 1,
        saving: "Save Changes",
        editing: false,
        edit: false,
        actual: {
          earnings: {
            t1: 0,
            t2: 0,
            t3: 0,
            t4: 0
          }
        },
        cycles: [],
        goals: [],
        new_cycle: false,
        new_goal: false,
          //User Data:
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
            // console.log("Returned and applied data:", data)
            thisObj.getCycles()
            thisObj.getGoals()
        })

      },
      getCycles(){
        let thisObj = this
        // let cycles = OseeyoFireBase.OseeyoGet("cycles","uid",thisObj.uid)
        // console.log("your cycles", cycles)
        db.collection("cycles").where("uid", '==', thisObj.uid).get().then((querySnapshot) => {
          // Add each project to dataset:
          querySnapshot.forEach((doc) => {
            thisObj.cycles.push(doc.data())
          })
        })
      },
      getGoals(){
        let thisObj = this
        db.collection("goals").where("uid", '==', thisObj.uid).get().then((querySnapshot) => {
          // Add each project to dataset:
          querySnapshot.forEach((doc) => {
            thisObj.goals.push(doc.data())
          })
        })
      },
      editObj(obj) {
        this.editing = true
        this.edit = obj
        console.log("editing:", this.editing)
      },
      saveChanges(){
        this.saving = "Saved!"
        let thisObj = this
      // Calculation Functions:
          // Week Total
        const week_total = (week) => {
          let total = 0
          Object.values(week).forEach((day) => {
            total += Number(day)
          })
          return total
        }
          // Cycle Total
        const cycle_total = (cycle) => {
          let w1, w2
          w1 = week_total(cycle.week_1)
          w2 = week_total(cycle.week_2)
          cycle.cycle_total = w1 + w2
          return cycle.cycle_total
        }
          // Earnings
        const earnings = (cycle) => {
          let all = Number(cycle.cycle_total), earned = 0, t1 = 1200, t2 = 1050, t3 = 1350, t4, diff

          switch(all) {
            // Tier 2
            case ((all > 24) && (all < 41)):
                  earned += t1
                  diff = (all - 24 ) * 70
                  earned += diff
              break;
              // Tier 3
              case ((all > 40) && (all < 57)):
                  earned += t1 + t2
                  diff = (all - 40) * 90
                  earned += diff
              break;
              // Tier 4
              case (all > 56):
                  earned += t1 + t2 + t3
                  diff = (all - 56) * 125
                  earned += diff
                break;
            default:
                  // All sales default to Tier 1 at first:
              earned += (all * 50)
          }
          return earned
        }
          // Tier
        const getTier = (total) => {
          let tier

          if(total > 56) { tier = "Tier 4"}
          else if ((total > 40) && (total < 57)) { tier = "Tier 3" }
          else if ((total > 24) && (total < 41)) {tier = "Tier 2"}
          else {tier = "Tier 1"}


          // switch(total) {
          //   // Tier 2
          //   case total > 24 && total < 41:
          //       tier = "Tier 2"
          //     break;
          //   // Tier 3
          //   case total > 40 && total < 57 :
          //       tier = "Tier 3"
          //     break;
          //   // Tier 4
          //   case total > 56:
          //       tier = "Tier 4"
          //       break;
          //   default:
          //     tier = "Tier spank me"
          // }

          return tier
        }


        this.cycles.forEach((cycle) => {
          cycle.week_1_total = week_total(cycle.week_1)
          cycle.week_2_total = week_total(cycle.week_2)
          cycle.cycle_total = cycle_total(cycle)
          cycle.earnings.total = earnings(cycle)
          cycle.current_tier = getTier(cycle.cycle_total)
        })
        // getTotal()
        //  Update data in FireBase:
          this.cycles.forEach((cycle) => { this.sendToFireBase(cycle, "cycles") })
          if(thisObj.new_cycle && (thisObj.new_cycle.title !== "")){
            OseeyoFireBase.OsseeyoFirePush("cycles", thisObj.new_cycle)
            thisObj.new_cycle = !thisObj.new_cycle
            thisObj.cycles = []
            this.getCycles()
            thisObj.saving = "Save Changes"
          }
          if(thisObj.new_goal && (thisObj.new_goal.name !== "")){
            OseeyoFireBase.OsseeyoFirePush("goals", thisObj.new_goal)
            thisObj.new_goal = !thisObj.new_goal
            thisObj.goals = []
            this.getGoals()
            thisObj.saving = "Save Changes"
          }
      },
      sendToFireBase(obj, collection){
        let thisObj = this
        // OseeyoFireBase.OseeyoUpdate("jv-members", "uid", thisObj.uid, newUserObj)
        OseeyoFireBase.OseeyoUpdate(collection, "id", obj.id, obj)
        thisObj.saving = "Save Changes"
      },
      cloneWeek(){
        this.edit = this.cycles[0]
        let postObj = this.edit
        // postObj.id = uuidv4()
        console.log(postObj)
        // return false
        OseeyoFireBase.OsseeyoFirePush("cycles", postObj)
      },
      createCycle(){
        let thisObj = this
        thisObj.new_cycle = {
          id: uuidv4(),
          uid: thisObj.uid,
          title: "",
          current_tier: "Tier 1",
          cycle_earnings: "0",
          cycle_total: "0",
          earnings: {
            t1: "0",
            t2: "0",
            t3: "0",
            t4: "0",
            total: "0",
          },
          week_1: {
            Sunday: "0",
            Monday: "0",
            Tuesday: "0",
            Wednesday: "0",
            Thursday: "0",
            Friday: "0",
            Saturday: "0",
          },
          week_1_total: "0",
          week_2: {
            Sunday: "0",
            Monday: "0",
            Tuesday: "0",
            Wednesday: "0",
            Thursday: "0",
            Friday: "0",
            Saturday: "0",
          },
          week_2_total: "0",
        }
      },
      createGoal(){
        let thisObj = this
        thisObj.new_goal = {
          id: uuidv4(),
          uid: thisObj.uid,
          name: "",
          min: 0,
          prog: 0,
          goal_num: 0
        }
      },
    },
    watch(){
      this.saveChanges()
    },
    updated(){
      // this.getCycles()
    },
  }

</script>

<style lang="scss">
  @import "../sass/global.scss";
</style>
