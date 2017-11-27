cc.Class({
    extends: cc.Component,

    properties: {
        //最大スピード
        //横
        sideMaxSpeed: 0,
        //縦
        LongitudinalMaxSpeed: 0,
        //加速度
        accel: 0,
        //発射音
        bulletSound: {
            default: null,
            url: cc.AudioClip
        }         
    },

    onLoad: function () {
        //collider機能
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;     
        // 加速方向フラグ
        this.accLeft = false;
        this.accRight = false;
        this.accTop = false
        this.accBottom = false
        //攻撃フラグ
        this.attackFlag = false;
        //攻撃間隔
        this.interval = 1;
        // スピードの初期化
        this.xSpeed = 0;
        this.ySpeed = 0;
        //キーボードイベントリスナー初期化
        this.setInputControl();
    },
    
    onCollisionEnter: function(other, self) {
        other.node.destroy();
        self.node.destroy();
        this.game.gameOver();
    },    
    
     setInputControl: function () {
        var self = this;
        // キーボードイベントリスナー追加
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // キーが押された時に呼ばれ、加速を開始する
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.left:
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.right:
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                    case cc.KEY.up:
                    case cc.KEY.w:
                        self.accTop = true;
                        self.accBottom = false;
                        break;
                    case cc.KEY.down: 
                    case cc.KEY.s:
                        self.accTop = false;
                        self.accBottom = true;
                        break;
                    case cc.KEY.space:    
                    case cc.KEY.enter:
                        self.attackFlag = true;
                        break;
                }
            },
            // キーが離された時に呼ばれ、加速を停止する
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.left:
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.right:    
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                    case cc.KEY.up:    
                    case cc.KEY.w:
                        self.accTop = false;
                        break;
                    case cc.KEY.down:
                    case cc.KEY.s:
                        self.accBottom = false;
                        break;
                    case cc.KEY.space:
                    case cc.KEY.enter:
                        self.attackFlag = false;
                        break; 
                }
            }
        }, self.node);
    },
    
    update: function (dt) {
        // 加速方向に従ってスピードを更新する
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        if (this.accTop) {
            this.ySpeed += this.accel * dt;
        } else if (this.accBottom) {
            this.ySpeed -= this.accel * dt;
        }
        // 最大スピードの制限
        if ( Math.abs(this.xSpeed) > this.sideMaxSpeed) {
            // 最大スピードを超えないように設定
            this.xSpeed = this.sideMaxSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        if(Math.abs(this.ySpeed) > this.LongitudinalMaxSpeed) {
            //最大スピードを超えないよう設定
            this.ySpeed = this.LongitudinalMaxSpeed * this. ySpeed / Math.abs(this.ySpeed);
        }
        //x座標で画面から出ないよう設定
        if(this.node.x < -435) {
            this.node.x = -435;
        }else if(this.node.x > 435) {
            this.node.x = 435;
        }
        //y座標で画面から出ないように設定
        if(this.node.y < -300) {
            this.node.y = -300;
        }else if(this.node.y > 300) {
            this.node.y = 300;
        }
        //攻撃
        if(this.attackFlag && this.interval > 0.6 - this.game.power*0.02) {
            //攻撃間隔の初期化
            this.interval = 0;
            //弾発射
            this.game.fire();
            cc.audioEngine.playEffect(this.bulletSound, false)
        }
        // プレイヤーの位置更新
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
        //攻撃間隔の更新
        this.interval += dt;
        cc.log(this.game.power);
    },
});