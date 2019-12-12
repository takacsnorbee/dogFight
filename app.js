new Vue({
    el: '#app',
    data: {
        playerName: 'Player',
        playerActive: true,
        gameIsRunning : false,
        playerHpPoint: 100,
        monsterHpPoint: 100,
        turns: []
    },
    methods: {
        randomNum: function(){
            return Math.max(Math.floor(Math.random() * 10) + 1, 3);
        },
        attack: function(num){
            var playerDmg = 0;
            var monsterDmg = 0;
            var level = 2; // here i could change the difficulty of the game

            if(num == -1) {
                if(this.playerHpPoint <= 90) {
                    this.playerHpPoint += 10;
                    monsterDmg = this.randomNum() + level;
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player heals 10 hp points'
                    });
                } else {
                    this.playerHpPoint = 100;
                    monsterDmg = this.randomNum() + level;
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Player heals to 100'
                    });
                }
            } else {
                playerDmg = this.randomNum()*num;
                monsterDmg = this.randomNum() + level;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster for ' + playerDmg
                });
            }

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + monsterDmg
            });

            this.playerHpPoint -= monsterDmg;
            this.monsterHpPoint -= playerDmg;
            this.checkWin();
        },
        changeName: function(event){
            this.playerName = event.target.value;
        },
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHpPoint = 100;
            this.monsterHpPoint = 100;
            this.turns = [];
        },
        checkWin: function() {
            if(this.playerHpPoint <= 0) {
                alert('Monster won!');
                this.gameIsRunning = false;
            } else if(this.monsterHpPoint <= 0) {
                alert(this.playerName + ' won!');
                this.gameIsRunning = false;
            }
        }
        
    }, 
    computed: {
        playerSize: function(){
            return{
                width: this.playerHpPoint * 2 + 'px'
            }
        },
        monsterSize: function(){
            return{
                width: this.monsterHpPoint * 2 + 'px'
            }
        }
    }
});