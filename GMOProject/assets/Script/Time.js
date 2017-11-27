cc.Class({
    extends: cc.Component,

    properties: {
        timeUp: 0
    },

    onLoad: function () {
        //タイマーの初期化
        this.timer = 0;
        //タイマーの座標
        this.node.x = this.game.node.x + 80;
        this.node.y = 180;
    },

    update: function (dt) {
        //タイマー機能
        this.timer += dt;
        this.game.time.string = "Time: " + Math.round(this.timer * 10,2) / 10;
        //位置固定
        if(this.game.node.y > 100) {
            this.node.y = 80;
        }else if(this.game.node.y < 100) {
            this.node.y = 180 - this.game.node.y;
        }
        if(this.timer > this.timeUp) {
            this.game.gameOver();
        }
    },
});
