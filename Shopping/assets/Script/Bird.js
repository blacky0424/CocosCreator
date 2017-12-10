cc.Class({
    extends: cc.Component,
    
    properties: {
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
        //攻撃判定
        this.go = true;
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
        //playerとcarの距離が近けくて攻撃判定がtrueなら攻撃
        if(dist < 100 && this.go) {
            this.crowAttack();
            //サウンドスイッチがオンのとき
            if(this.sound) {
                //サウンドを鳴らす
                cc.audioEngine.playEffect(this.audio, false);
                //サウンドスイッチオフ
                this.sound = false;
            }            
        }
        if(dist > 100) {
            //距離が離れれば攻撃判定をtrueに
            this.go = true;
            //サウンドスイッチをtrueに
            this.sound = true;
        }
        //プレイヤーのいる方向を向く
        if(this.node.x > this.game.node.x) {
            this.node.width = 20;
        }else if(this.node.x < this.game.node.x) {
            this.node.width = -20;
        }
    },
    
    crowAttack: function() {
        //攻撃判定をfalseに
        this.go = false;
        //playerの位置
        var playerPos = this.game.node.position;
        //現在のプレイヤーの位置へ
        var attack = cc.moveTo(1, playerPos);
        //元の位置へ
        var back = cc.moveTo(2, this.firstPos);
        this.node.runAction(cc.sequence(attack, back));
    },
});
