// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var app = new Vue({
  el: '#app',
  data: {
    title: 'OfficeDASH!',
    statuses: []
  },
  created() {
    this.subscribe()
  },
  methods: {
    subscribe() {
      let pusher = new Pusher('cc900daae41222ea463e', {
        cluster: 'eu',
        encrypted: true
      });
      let channel = pusher.subscribe('statuses');
      channel.bind('new_status', (data) => {
        this.statuses.unshift(data)
      });
    }
  }
})