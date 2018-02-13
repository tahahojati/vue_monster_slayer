const v = new Vue({
	el: '#app',
	data: {
		your_health:100,
		enemy_health:100,
		game_off:true

	},
	methods: {

	},
	computed: {
		your_health_style: function(){return {width: `${this.your_health}%`}},
		enemy_health_style: function(){return {width: `${this.enemy_health}%`}},
	}
});