cc.Class({
    extends: cc.Component,

    properties: {
        rl: 0,
        tb: 0,
        time1: 0,
        time2: 0,
        delay: 0,
    },
    
    onLoad: function () {
        this.go = true;
        this.pos = this.node.position;
        this.timer = 0;
    },
    
    update: function (dt) {
        if(this.timer > this.time1 + this.time2 + this.delay) {
            this.go = true;
            this.timer = 0;
        }
        //指定の位置まで移動
        if(this.go) {
            this.fall();
        }
        this.timer += dt;
    },
    
    fall: function() {
        var move1 = cc.moveTo(this.time1, cc.p(this.rl, this.tb)).easing(cc.easeCubicActionIn()); 
        var move2 = cc.moveTo(this.time2, cc.p(this.pos)); 
        var move = cc.sequence(move1, move2);
        this.node.runAction(move);        
        this.go = false;
    },
});