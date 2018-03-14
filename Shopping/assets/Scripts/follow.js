cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        if(!this.target) {
            return;
        }
        //画面スクロール機能
        var follow = cc.follow(this.target, cc.rect(0,0,2048,1242));
        this.node.runAction(follow);
    },
});
