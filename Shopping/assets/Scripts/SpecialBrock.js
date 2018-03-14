cc.Class({
    extends: cc.Component,

    properties: {
        rl: 0,
        tb: 0,
        time: 0,
    },

    onLoad: function () {
        //当たり判定を有効にする
        cc.director.getCollisionManager().enabled = true;
        //当たり範囲を目で見えるようにするか
        cc.director.getCollisionManager().enabledDebugDraw = false; 
        //発進スイッチ
        this.go = true;
    },
    
    onCollisionEnter: function(other, self) {
        //指定の位置まで移動
        var move = cc.moveTo(this.time, cc.p(this.rl, this.tb));
        if(other.node.group === 'Player' && this.go) {
            this.node.runAction(move);
        }
        //発進スイッチ
        this.go = false;
    },
});
