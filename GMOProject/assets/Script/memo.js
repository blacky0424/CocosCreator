cc.Class({
    extends: cc.Component,

    onLoad: function () {
        var slide = cc.moveTo(3, cc.p(0, 0)).easing(cc.easeCubicActionOut());
        this.node.runAction(slide);
    },
});
