cc.Class({
    extends: cc.Component,

    properties: {
        //ジャンプ力
        jump: 10,
        //前進する大きさ
        attack: 3,
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
        //飛べないフラグ
        this.stop = false;
        //初期位置保存
        this.firstPos = this.node.position;
        //animation
        this.anim = this.node.getComponent(cc.Animation);
        //初期ジャン力保存
        this.j = this.jump;        
        //サウンドスイッチ
        this.sound = true;
    },
    
    onCollisionEnter: function(other, self) {
        //playerとぶつかるとゲームオーバー
        if(other.node.group === 'Player'){
            this.game.gameOver();   
        }
    },
    
    jumping: function() {
        //グループがcatのとき
        if(this.node.group === 'cat') {
            //playerが左側にいたら
            if(this.game.node.x < this.node.x) {
                //左にとびかかる
                this.node.x -= this.attack;
                this.anim.play('CatAction');
            //右にいたら
            }else if (this.game.node.x > this.node.x){
                //右にとびかかる
                this.node.x += this.attack;  
                this.anim.play('CatAction');
                this.node.width = -20;
            }
        //グループがdogのとき
        }else if(this.node.group === 'dog') {
            //playerが左側にいたら
            if(this.game.node.x < this.node.x) {
                //左にとびかかる
                this.node.x -= this.attack;
                this.anim.play('DogAction');
            //右にいたら
            }else if (this.game.node.x > this.node.x){
                //右にとびかかる
                this.node.x += this.attack;  
                this.anim.play('DogAction');
                this.node.width = -15;
            }
        }
        //ジャンプ
        this.node.y += this.jump;
        //重力
        this.jump -= 1;   
        //一定のy座標より下にはいかないようにする
        if(this.node.y < 10) {
            this.node.y = 10;
            this.jump = this.j;
            //飛べないフラグをtrueに
            this.stop = true;
        }
    },
    
    update: function (dt) {
        //playerとcatの距離をはかる
        var dist = cc.pDistance(this.node.position, this.game.node.position);
        if(dist < 120 && this.stop === false) {
            //playerとcatの距離が縮まったらjumping
            this.jumping();
            //サウンドスイッチがオンのとき
            if(this.sound) {
                //サウンドを鳴らす
                cc.audioEngine.playEffect(this.audio, false);
                //サウンドスイッチオフ
                this.sound = false;
            }
        }
        //一定の距離が離れたら初期位置へ
        if(dist > 300) {
            //飛べないフラグをfalseに
            this.stop = false;
            //初期状態へに
            this.node.position = this.firstPos;
            //グループがcatのとき
            if(this.node.group === 'cat') {
                //左にいたら
                if(this.game.node.x < this.node.x) {
                    this.anim.play('CatNormal');
                //右にいたら
                }else if (this.game.node.x > this.node.x){
                    this.anim.play('CatNormal');
                    this.node.width = -20;
                }            
            //グループがdogのとき
            }else if(this.node.group === 'dog') {
                //左にいたら
                if(this.game.node.x < this.node.x) {
                    this.anim.play('DogNormal');
                //右にいたら
                }else if (this.game.node.x > this.node.x){
                    this.anim.play('DogNormal');
                    this.node.width = -15;
                }            
            }
            //サウンドスイッチオン
            this.sound = true;        
        }
    },
});
