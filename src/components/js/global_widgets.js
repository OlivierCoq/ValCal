console.log("Importing global JamVault widgets.")
import Vue from 'vue'
import * as Dropzone from '../../libraries/js/dropzone-5.7.0/dist/min/dropzone.min.js'

  //Search Filter Tool
Vue.component('search-filter', {
  data(){
    return {}
  },
  template: `
    <div><span>Filter</span></div>
  `
})

  //Player
Vue.component('music-player', {
  data(){
    return {}
  },
  template: `
    <div><span>Music Player</span></div>
  `
})

    //Tagging:
import VueTags from 'vue-tags'
Vue.component('input-tags', VueTags)
