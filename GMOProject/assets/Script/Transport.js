cc.Class({
    extends: cc.Component,
    
    properties: {
        //速度
        speed: 20,
        //サウンド
        audio: {
            default: null,
            url: cc.AudioClip
        },          
    },
    
    onLoad: function () {
        //当たり判定を有効にする
        cc.director.getCollisionManager().enabled = true;
        //当たり範囲を目で見えるようにするか
        cc.director.getCollisionManager().enabledDebugDraw = false;        
        //初期位置保存
        this.firstPos = this.node.position;
        //発車判定
        this.go = false;
        //サウンドスイッチ
        this.sound = true;        
    },
    
    onCollisionEnter: function(other, self) {
        if(other.node.group === 'Player') {
            this.game.gameOver();
        }
    },
    
    update: function (dt) {
        //playerとcarの距離をはかる
        var dist = cc.pDistance(this.node.position, this.game.node.position);
        //playerとcarの距離が近ければ発車
        if(dist < 200) {
            this.go = true;
            //サウンドスイッチがオンのとき
            if(this.sound) {
                //サウンドを鳴らす
                cc.audioEngine.playEffect(this.audio, false);                  
            }
            //サウンドスイッチオフ
            this.sound = false;
        }
        if(this.go) {
            this.node.x -= this.speed * dt;
        }
        //グループがObstacle以外なら回転する
        if(this.node.group === 'rockball') {
            this.node.rotation -= 3;
        }
        //一定の距離が離れたらなくなる
        if(dist > 800 && this.go) {
            this.node.destroy();
        }        
    },
});
