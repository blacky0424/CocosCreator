var arrowType = cc.Enum({
    Left: 0,
    Right: 1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: arrowType.Left,
            type: arrowType
        },
    },
	
	update: function() {
		if(this.type === arrowType.Left) {
		    if(this.game.node.x > 150) {
		        this.node.x = this.game.node.x - 110;
		    }else{
		        this.node.x = 40;
		    }
		}else if(this.type === arrowType.Right) {
		    if(this.game.node.x > 150) {
		        this.node.x = this.game.node.x + 110;
		    }else{
		        this.node.x = 260;
		    }
		}
        //位置固定
        if(this.game.node.y > 100) {
            this.node.y = this.game.node.y - 70;
        }
	},
});
