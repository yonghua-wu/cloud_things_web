import Vue from 'vue'
import moment from 'moment'
Vue.filter('format', function (value) {
  if (isNaN(Number(value))) {
    return ''
  } else {
    return moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss')
  }
})
