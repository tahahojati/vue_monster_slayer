const v = new Vue({
	el: '#app',
	data: {
		your_health:100,
		enemy_health:100,
		game_off:true,
		log: [],
		activate_ui: true,
	},
	methods: {
		attack: function(max_dmg = 20){
			this.activate_ui = false;
			let damage = Math.floor(Math.random() * max_dmg); 
			damage = Math.min(this.enemy_health, damage);
			this.enemy_health -= damage; 
			if(this.enemy_health == 0 )
				this.declare_victory('palyer'); 
			this.log.push({type:'attack', turn:1, damage: damage});
			this.enemy_attack(); 
		},
		declare_victory: function(winner = 'player'){
			this.give_up(); 
		},
		heal: function(max_heal = 15){
			this.activate_ui = false;
			let heal = Math.floor(Math.random
			() * max_heal); 
			heal = Math.min(100 - this.your_health, heal);
			this.your_health += heal; 
			this.log.push({type: 'heal', turn:1, heal:heal});
			this.enemy_attack();
		},
		give_up: function(){
			this.your_health = this.enemy_health = 100;
			this.game_off = true; 
			this.log = []; 
		},
		enemy_attack: function(){
			const vu = this; 
			this.activate_ui = false; 
			setTimeout(() => {
				let damage = Math.floor(Math.random() * 20);
				damage = Math.min(this.your_health, damage);
				vu.your_health -= damage;
				if(this.your_health == 0 )
					this.declare_victory('enemy'); 
				vu.log.push({type:'attack', turn:0, damage:damage});
				vu.activate_ui = true; 
			}, 1000);
		}, 
		log_txt: function(log_row){
			let word1 = 'PLAYER';
			let word2 = ' HITS MONSTER FOR ';
			let amount = 0 ;
			if(log_row.turn == 0){
				word1 = 'MONSTER'; 
				word2 = ' HITS PLAYER FOR '
			}
			if(log_row.type == 'heal'){
				word2 = ' HEALS FOR ';
				amount = log_row.heal; 
			} else {
				amount = log_row.damage; 
			}
			return word1+word2+amount; 

		}
	},
	computed: { 
		show_log: function(){return (!this.game_off) && (this.log.length != 0) ; },
		your_health_style: function(){return {width: `${this.your_health}%`}},
		enemy_health_style: function(){return {width: `${this.enemy_health}%`}},
	}
});