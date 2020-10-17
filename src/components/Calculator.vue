<template>
  <div>
    <Navbar></Navbar>
    <div id="ValCal">
      <div class="container ctr-body">
        <div class="row title">
          <div class="col-12">
            <h1><span>Val</span>Cal</h1>
            <em>Visualize <i class="fas fa-caret-right"></i> Actualize.</em>
            <hr>
          </div>
        </div>
        <div class="row goals">
          <div class="col-12">
            <h3><i class="fas fa-caret-right"></i> Goals (BETA):</h3>
            <div class="row">
              <div class="col-12">
                <div class="ctr-goals">
                  <span v-if="goals && goals.length < 1 && !editing && !deleting">You have no saved goals. Let's get started by adding a goal!</span>
                  <button class="btn btn-lg new-goal-btn" @click="createGoal"><i class="fas fa-plus"></i> Add New Goal</button>
                </div>
              </div>
            </div>
              <!-- New Goal modal -->
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
              <!-- All Goals loop -->
            <div class="row all_goals">
              <div class="col-12">
                <div v-if="!goals" class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>

                    <!-- Individual Goal: -->
                <div v-for="(goal, i) in goals" :key="i" class="goal">
                  <div class="row">
                    <div class="col-12" style="display: flex; flex-direction: row;">
                      <h4>{{goal.name}}</h4>
                      <button class="btn edit-goal-btn" @click="goal.editing = !goal.editing">
                        <i class="fas fa-pen"></i>
                      </button>
                      <button class="btn delete-goal-btn" @click="goal.deleting = true">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="goal-progress" style="width:100%; padding: 0 1em;">
                      <div class="progress">
                        <div class="progress-bar t3" :class="goal.deleted ? 'deleted' : '' " role="progressbar" :style=" `width: ${goal.prog}%`"></div>
                      </div>
                      <span><em>$ {{goal.goal_num}}</em></span>
                    </div>
                  </div>
                    <!-- Edit goal modal -->
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
                    <!-- Delete goal modal -->
                  <div v-if="goal.deleting" class="delete-goal-modal">
                    <div class="row">
                      <div class="col-12">
                        <form class="row">
                          <label class="col-sm-12 col-md-4 col-form-label"><span>Are you sure you want to delete this Goal? This <strong>cannot</strong> be undone.</span></label>
                          <div class="col-sm-12 col-md-8">
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
            </div>
          </div>
        </div>
          <!-- Sales Tiers table -->
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
                  </tr>
                </thead>
                <tbody>
                  <tr class="t1">
                    <th scope="row">
                      <strong> Tier 1 | (1 - 24) </strong>
                    </th>
                      <td>$50</td>
                      <td>$1,200</td>
                  </tr>
                  <tr class="t2">
                    <th scope="row">
                      <strong> Tier 2 | (25-40) </strong>
                    </th>
                      <td>$70</td>
                      <td>$2,320</td>
                  </tr>
                  <tr class="t3">
                    <th scope="row">
                      <strong> Tier 3 | (41-56) </strong>
                    </th>
                      <td>$90</td>
                      <td>$3,760</td>
                  </tr>
                  <tr class="t4">
                    <th scope="row">
                      <strong> Tier 4 | (57 +) </strong>
                    </th>
                      <td>$125</td>
                      <td><i class="fas fa-infinity"></i></td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
          <!-- Cycles Loop: -->
        <div class="row cycles">
          <h2><i class="fas fa-caret-right"></i> Cycles</h2>
        </div>
        <hr>
            <!-- No Saved Cycle default: -->
        <div class="row">
          <div class="col-12">
            <span v-if="cycles.length < 1">You have no saved cycles. Click the blue "Create Cycle" button to get started. <i class="fas fa-caret-right"></i></span>
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
            <!-- Loading cycles spinner: -->
        <div v-if="!cycles" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        <div v-if="cycles" class="row cycles">
          <div class="cycle" v-for="(cycle, i) in cycles" :key="i">
            <div class="row blurb">
              <h4>{{cycle.title}}</h4>
              <div class="col-xs-12 col-md-8">
                <div class="ctr-user_edit">
                  <span class="current_tier t1">
                    {{cycle.current_tier}}
                  </span>
                  <button class="btn edit-btn" @click="editCycle(cycle)"  data-toggle="tooltip" data-placement="top" title="Edit Sales Cycle"><i class="fas fa-pen"></i></button>
                </div>
              </div>
              <div class="col-xs-12 col-md-6"></div>
            </div>

              <!-- Editing Cycle: -->
            <div v-if="cycle.editing" class="row edit-cycle">
              <div class="col-md-12">
                <form>
                  <div class="form-group row">
                    <label class="col-sm-12 col-md-2 col-form-label"><strong>Edit Title</strong></label>
                    <div class="col-sm-12 col-md-8">
                      <input class="form-control" type="text" v-model="cycle.title">
                    </div>
                    <div class="col-sm-12 col-md-2">
                      <button class="btn delete-btn" @click="deleting = true"><i class="fas fa-trash"></i></button>
                    </div>
                  </div>
                </form>
              </div>
                <!-- Deleting Cycle: -->
              <div v-if="deleting" class="delete-modal">
                <div class="row">
                  <div class="col-12">
                    <form class="row">
                      <label class="col-sm-12 col-md-6 col-form-label"><span>Are you sure you want to delete this cycle? This <strong>cannot</strong> be undone.</span></label>
                      <div class="col-sm-12 col-md-6">
                        <div class="ctr-actions">
                          <button class="btn delete-final-btn" @click="deleteCycle(cycle)">Yes, delete it please.</button>
                          <button class="btn delete-cancel-btn" @click="deleting = false">Nope, nevermind!</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <hr>
                <!-- Cycle Table: -->
            <table class="table table-responsive">
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
            <button class="btn btn-lg clone-btn" @click="createCycle"><i class="fas fa-plus"></i> Create Cycle</button>
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
  // import Goal from './Goal'
  import Navbar from './Navbar'


  /* DEVELOPMENT TO-DO LIST:

    - change name of cycle
    - delete cycle

  */


  export default {
    name: 'Calculator',
    components: {
      Navbar,
    },
    data() {
      return {
        opacity: 1,
        saving: "Save Changes",
        editing: false,
        edit: false,
          //Goals
        goals: false,
        new_goal: false,

          //Cycles
        cycles: false,
        new_cycle: false,
        deleting: false,
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
      this.initTooltips()
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
        // Cycle CRUD functions
      getCycles(){
        this.cycles = []
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
      editCycle(cycle){
        let thisObj = this
        thisObj.editing = !thisObj.editing
        cycle.editing = !cycle.editing
      },
      deleteCycle(cycle){
        console.log("Deleting:", cycle.title)
        let thisObj = this
        db.collection("cycles").where('id', '==', cycle.id).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete()
            })
          })
          .then(() => {
            thisObj.deleting = false
            thisObj.cycles = false
          })
          setTimeout(()=>{thisObj.saveChanges()}, 900)
      },
        // Goal CRUD functions
      getGoals(){
        this.goals = []
        let thisObj = this

        db.collection("goals").where("uid", '==', thisObj.uid).get().then((querySnapshot) => {
          // Add each project to dataset:
          querySnapshot.forEach((doc) => {
            thisObj.goals.push(doc.data())
          })
        })
        thisObj.goals.forEach((goal) => {
          goal.deleting = false
        })
      },
      createGoal(){
        let thisObj = this
        thisObj.new_goal = {
          id: uuidv4(),
          uid: thisObj.uid,
          name: "",
          min: 0,
          prog: 0,
          goal_num: 0,
          editing: false,
          deleting: false
        }
      },
      progress(goal){
        let thisObj = this
        goal.goal_num = Number(goal.goal_num)
        goal.min = 0


        // Adds up earnings
        const totalEarnings = () => {
          thisObj.cycles.forEach((cycle) => {
            goal.min += cycle.earnings.total
          })
        }

        // Calculates percentage
        const progressPercentage = () => {
          goal.prog = (goal.min / goal.goal_num) * 100
          // console.log("progress:", goal.prog)
        }

        totalEarnings()
        progressPercentage()

        OseeyoFireBase.OseeyoUpdate("goals", "id", goal.id, goal)
        // this.updateProg()
      },
      deleteGoal(goal){
        console.log("Deleting:", goal.name)
        let thisObj = this
        thisObj.editing = true
        db.collection("goals").where('id', '==', goal.id).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete()
            })
          })
          .then(() => {
            thisObj.deleting = false
            thisObj.goals = false
          })
          setTimeout(()=>{thisObj.saveChanges()}, 900)
      },

      editObj(obj) {
        this.editing = true
        this.edit = obj
        console.log("editing:", this.editing)
      },
      initTooltips(){
        $('[data-toggle="tooltip"]').tooltip()
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
          let all = Number(cycle.cycle_total), earned = 0, t1 = 1200, t2 = 2320, t3 = 3760

          if ((all > 24) && (all < 41)) {
            let diff_2
                earned += t1
                diff_2 = (all - 24 ) * 70
                earned += diff_2
          }
          else if ((all > 40) && (all < 57)) {
            let diff_3
              earned += t2
              diff_3 = (all - 40) * 90
              earned += diff_3
          }
          else if (all > 56) {
            let diff_4
              earned += t3
              diff_4 = (all - 56) * 125
              earned += diff_4
          } else {
              earned += (all * 50)
          }

          // switch(all) {
          //   // Tier 2
          //   case ((all > 24) && (all < 41)):
          //     let diff_2
          //         earned += t1
          //         diff_2 = (all - 24 ) * 70
          //         console.log(diff)
          //         earned += diff_2
          //     break;
          //     // Tier 3
          //     case ((all > 40) && (all < 57)):
          //       let diff_3
          //         earned += ( t1 + t2 )
          //         diff_3 = (all - 40) * 90
          //         earned += diff_3
          //     break;
          //     // Tier 4
          //     case (all > 56):
          //       let diff_4
          //         earned += ( t1 + t2 + t3 )
          //         diff_4 = (all - 56) * 125
          //         earned += diff_4
          //       break;
          //   default:
          //         // All sales default to Tier 1 at first:
          //     earned += (all * 50)
          // }

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

        if(!thisObj.cycles) thisObj.getCycles()
        if(!thisObj.goals) thisObj.getGoals()

      // Pre-Database Actions

        //Goals:
        this.goals.forEach((goal) => {
          this.progress(goal)
        })
        // Cycles:
        this.cycles.forEach((cycle) => {
          cycle.week_1_total = week_total(cycle.week_1)
          cycle.week_2_total = week_total(cycle.week_2)
          cycle.cycle_total = cycle_total(cycle)
          cycle.earnings.total = earnings(cycle)
          cycle.current_tier = getTier(cycle.cycle_total)
          cycle.editing = false
        })

      // Update data in FireBase:
          this.cycles.forEach((cycle) => {
            this.sendToFireBase(cycle, "cycles")
            cycle.editing = false
            cycle.deleting = false
          })
          this.goals.forEach((goal) => {
            this.sendToFireBase(goal, "goals")
            goal.editing = false
            goal.deleting = false
          })
          if(thisObj.new_cycle && (thisObj.new_cycle.title !== "")){
            OseeyoFireBase.OsseeyoFirePush("cycles", thisObj.new_cycle)
            thisObj.new_cycle = !thisObj.new_cycle
            thisObj.cycles = false
            this.getCycles()
            thisObj.saving = "Save Changes"
          }
          if(thisObj.new_goal && (thisObj.new_goal.name !== "")){
            OseeyoFireBase.OsseeyoFirePush("goals", thisObj.new_goal)
            thisObj.new_goal = !thisObj.new_goal
            thisObj.goals = false
            thisObj.saving = "Save Changes"
            thisObj.getGoals()
          }
          thisObj.saving = "Save Changes"
      },
      sendToFireBase(obj, collection){
        let thisObj = this
        // OseeyoFireBase.OseeyoUpdate("jv-members", "uid", thisObj.uid, newUserObj)
        OseeyoFireBase.OseeyoUpdate(collection, "id", obj.id, obj)

      },
      cloneWeek(){
        this.edit = this.cycles[0]
        let postObj = this.edit
        // postObj.id = uuidv4()
        console.log(postObj)
        // return false
        OseeyoFireBase.OsseeyoFirePush("cycles", postObj)
      },
    },
  }
</script>

<style lang="scss">
  @import "../sass/global.scss";
</style>
