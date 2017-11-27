cc.Class({
    extends: cc.Component,

    update: function (dt) {
        //下に落ちる
        this.node.y -= 60 * dt;
        //画面外にでたら破壊
        if(this.node.y < -495) {
            this.node.destroy();
        }
        
    },
});
