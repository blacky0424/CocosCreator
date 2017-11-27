cc.Class({
    extends: cc.Component,

    onLoad: function () {
        //当たり判定を有効にする
        cc.director.getCollisionManager().enabled = true;
        //当たり範囲を目で見えるようにするか
        cc.director.getCollisionManager().enabledDebugDraw = false;
        //アイテム確保フラグ
        this.get = false;
    },
    
    onCollisionEnter: function(other, self) {
        self.node.y = 180;
        self.node.x = this.game.node.x - 120;
        //大きさを半分に
        self.node.width = self.node.width / 2;
        self.node.height = self.node.height / 2;
        //アイテム番号ボックス
        var numBox = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8'];
        //アイテム確保フラグをtrueに
        this.get = true;
        //アイテムの取得判定
        for(var i = 0;i < numBox.length;i++) {
            if(this.node.group === numBox[i]) {
                this.game.getBox[i] = true;
            }
        }
        //取得アイテムの保存
        for(var i = 0;i < 8;i++) {
            if(this.game.item[i] === null) {
                this.game.item[i] = this.node;
                break;
            }
        }
    },
    
    update: function() {
        //アイテムフラグがtrueのとき
        if(this.get) {
            //位置の指定
            //1番に取ったアイテム
            if(this.game.item[0] !== null) {
                this.game.item[0].x = this.game.node.x - 120;
                if(this.game.item[0].x < 20){
                    this.game.item[0].x = 20;
                }
            }
            //2番に取ったアイテム
            if(this.game.item[1] !== null) {            
                this.game.item[1].x = this.game.node.x - 110;            
                if(this.game.item[1].x < 30){
                    this.game.item[1].x = 30;
                }
            }
            //3番に取ったアイテム
            if(this.game.item[2] !== null) {            
                this.game.item[2].x = this.game.node.x - 100;
                if(this.game.item[2].x < 40){
                    this.game.item[2].x = 40;
                }        
            }
            //4番に取ったアイテム
            if(this.game.item[3] !== null) {            
                this.game.item[3].x = this.game.node.x - 90;
                if(this.game.item[3].x < 50){
                    this.game.item[3].x = 50;
                }        
            }
            //5番に取ったアイテム
            if(this.game.item[4] !== null) {            
                this.game.item[4].x = this.game.node.x - 80;
                if(this.game.item[4].x < 60){
                    this.game.item[4].x = 60;
                }        
            }
            //6番に取ったアイテム
            if(this.game.item[5] !== null) {            
                this.game.item[5].x = this.game.node.x - 70;
                if(this.game.item[5].x < 70){
                    this.game.item[5].x = 70;
                }        
            }
            //7番に取ったアイテム
            if(this.game.item[6] !== null) {            
                this.game.item[6].x = this.game.node.x - 60;
                if(this.game.item[6].x < 80){
                    this.game.item[6].x = 80;
                }        
            }
            //8番に取ったアイテム
            if(this.game.item[7] !== null) {            
                this.game.item[7].x = this.game.node.x - 50;
                if(this.game.item[7].x < 90){
                    this.game.item[7].x = 90;
                }        
            }            
            if(this.game.node.y > 100) {
                this.node.y = this.game.node.y + 80;
            }
        }
    },
});
