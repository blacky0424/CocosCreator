cc.Class({
    extends: cc.Component,

    properties: {
        //速度
        speed: 10,
        //移動範囲
        distance: 200
    },

    onLoad: function () {
        this._movedDistance = this.distance / 2;
        this._direction = 1;
        this._movedDiff = 0;
    },

    update: function (dt) {
        var d = this.speed * this._direction * dt;
        
        var movedDistance = this._movedDistance + Math.abs(d);
        this._movedDistance += Math.abs(d);
        
        if (movedDistance > this.distance) {
            d = this.distance - this._movedDistance;
            this._movedDistance = 0;
            this._direction *= -1;
        }
        else {
            this._movedDistance = movedDistance;
        }
        
        this.node.x += d;
        this._movedDiff = d;
    },
});