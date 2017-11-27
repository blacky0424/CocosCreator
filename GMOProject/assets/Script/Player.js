cc.Class({
    extends: cc.Component,

    properties: {
        //プレイヤーの現在の移動速度
        speed: cc.v2(0, 0),        
        //プレイヤーの最大移動速度
        maxSpeed: cc.v2(2000, 2000),
        //重力加速度
        g: -1000,
        //向き
        drag: 1000,
        direction: 0,
        //プレイヤーのジャンプ初速度
        jumpSpeed: 300,
        //家
        home: {
            default: null,
            type: cc.Node
        },
        //アイテム
        item1: {
            default: null,
            type: cc.Node
        },
        item2: {
            default: null,
            type: cc.Node
        },   
        item3: {
            default: null,
            type: cc.Node
        },        
        item4: {
            default: null,
            type: cc.Node
        },       
        item5: {
            default: null,
            type: cc.Node
        },   
        item6: {
            default: null,
            type: cc.Node
        }, 
        item7: {
            default: null,
            type: cc.Node
        }, 
        item8: {
            default: null,
            type: cc.Node
        }, 
        //動物
        animal1: {
            default: null,
            type: cc.Node
        },
        animal2: {
            default: null,
            type: cc.Node
        }, 
        animal3: {
            default: null,
            type: cc.Node
        },           
        //鳥
        bird1: {
            default: null,
            type: cc.Node
        },
        bird2: {
            default: null,
            type: cc.Node
        },
        bird3: {
            default: null,
            type: cc.Node
        },
        bird4: {
            default: null,
            type: cc.Node
        },
        bird5: {
            default: null,
            type: cc.Node
        },
        bird6: {
            default: null,
            type: cc.Node
        },
        bird7: {
            default: null,
            type: cc.Node
        },
        bird8: {
            default: null,
            type: cc.Node
        },        
        //乗り物
        transport1: {
            default: null,
            type: cc.Node
        },
        transport2: {
            default: null,
            type: cc.Node
        },
        transport3: {
            default: null,
            type: cc.Node
        },    
        //左矢印
        arrowLeft: {
            default: null,
            type: cc.Button
        },
        //右矢印
        arrowRight: {
            default: null,
            type: cc.Button
        },        
        //ジャンプボタン
        arrowTop: {
            default: null,
            type: cc.Button
        },
        //ストップウォッチ
        time: {
            default: null,
            type: cc.Label            
        },
        //サウンド
        audio: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function () {
        //サウンドを鳴らす
        cc.audioEngine.playMusic(this.audio, true);
        //当たり判定を有効にする
        cc.director.getCollisionManager().enabled = true;
        //当たり範囲を目で見えるようにするか
        cc.director.getCollisionManager().enabledDebugDraw = false;
        //キーボードコントロール
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:
            this.onKeyPressed.bind(this),
            onKeyReleased:
            this.onKeyReleased.bind(this),
        }, this.node);
        var self = this;
        //タッチ機能追加
        //左矢印タッチで左に移動
        self.arrowLeft.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.walking = true;
            self.direction = -1;
            self.node.width = -10;
        });
        self.arrowLeft.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.walking = false;
            self.walk = 0;
            self.direction = 0;
        });    
        //右矢印タッチで右に移動
        self.arrowRight.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.walking = true;
            self.direction = 1;
            self.node.width = 10;
        });
        self.arrowRight.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.walking = false;
            self.walk = 0;
            self.direction = 0;
        }); 
        //ジャンプボタンタッチでジャンプ
        self.arrowTop.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        //現在ジャンプ中でない場合ジャンプ処理
            if(!self.jumping) {
                //ジャンプフラグをtrueに
                self.jumping = true;
                //上方向の移動スピードをジャンプスピードに設定
                self.speed.y = self.jumpSpeed;
            }
        });
         //アニメーションの使用
        this.anim = this.node.getComponent(cc.Animation);        
        //歩数計
        this.walk = 0;  
        //歩行中かどうか
        this.walking = false;
        //当たり判定時に使用する移動補助変数
        this.collisionX = 0;
        this.collisionY = 0;
        //初期プレイヤー座標
        this.prePosition = cc.v2();
        this.preStep = cc.v2();
    	//	タッチ情報（接触すると＋１、離れるとー１される）０または１の値をとる
    	this.touchingNumber = 0;
    	//アイテム確保判定
    	this.get1 = false;
    	this.get2 = false;
    	this.get3 = false;
    	this.get4 = false;
    	this.get5 = false;
    	this.get6 = false;
    	this.get7 = false;
    	this.get8 = false;
    	//取得アイテム判定箱
    	this.getBox = [this.get1, this.get2, this.get3, this.get4, this.get5, this.get6, this.get7, this.get8];
    	//取得アイテムの保存箱
    	this.item = [null, null, null, null, null, null, null, null];
    	//propertiesBox
    	var itemBox = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7, this.item8];
    	var animalBox = [this.animal1, this.animal2];
    	var birdBox = [this.bird1, this.bird2, this.bird3, this.bird4, this.bird5, this.bird6, this.bird7, this.bird8];
    	var transportBox = [this.transport1, this.transport2, this.transport3];
    	//item1にPlayerをコンポネント
    	for(var i = 0;i < itemBox.length;i++) {
    	    if(itemBox[i] !== null) {
    	        itemBox[i].getComponent('Item').game = this;
    	    }
    	}
    	//animalにPlayerをコンポネント
    	for(var i = 0;i < animalBox.length;i++) {
    	    if(animalBox[i] !== null) {
    	        animalBox[i].getComponent('Animal').game = this;
    	    }
    	}
    	//birdにPlayerをコンポネント
    	for(var i = 0;i < birdBox.length;i++) {
    	    if(birdBox[i] !== null) {
    	        birdBox[i].getComponent('Bird').game = this;
    	    }else{
    	        break;
    	    }
    	}
    	//transportにPlayerをコンポネント
    	for(var i = 0;i < transportBox.length;i++) {
    	    if(transportBox[i] !== null) {
    	        transportBox[i].getComponent('Transport').game = this;
    	    }
    	}
    	//arrowにPlayerをコンポネント
    	this.arrowRight.getComponent('Arrow').game = this;  
    	this.arrowLeft.getComponent('Arrow').game = this;
    	//timeにPlayerをコンポネント
    	this.time.getComponent('Time').game = this;
    },
    
    onKeyPressed: function(keyCode, event) {
        switch(keyCode) {
            //←を押したら移動向きを左に
            case cc.KEY.left:
                this.walking = true;
                this.direction = -1;
                this.node.width = -10;
                break;
            //→を押したら移動向きを右に
            case cc.KEY.right:
                this.walking = true;
                this.direction = 1;
                this.node.width = 10;
                break;
            //↑を押したらジャンプ
            case cc.KEY.up:
                //現在ジャンプ中でない場合ジャンプ処理
                if(!this.jumping) {
                    //ジャンプフラグをtrueに
                    this.jumping = true;
                    //上方向の移動スピードをジャンプスピードに設定
                    this.speed.y = this.jumpSpeed;
                }
                break;
        }
    },
    
    onKeyReleased: function(keyCode, event) {
        switch(keyCode) {
            //キーボードを離したとき向きを元に戻す
            case cc.KEY.left:
            case cc.KEY.right:
                this.walking = false;
                this.walk = 0;
                this.direction = 0;
                break;
        }
    },
    
    onCollisionEnter: function(other, self) {
        //オブジェクトのグループがBrockもしくはWallの場合
        if(other.node.group === 'Brock' || other.node.group === 'Wall') {
            //タッチナンバーを加算
            this.touchingNumber ++;
            //最初の処理
            //当たったオブジェクトのワールド座標のバウンディングボックス取得
            var otherAabb = other.world.aabb;
            //ワールド座標のバウンディング情報をコピー
            var otherPreAabb = other.world.preAabb.clone();
            //自分のバウンディングボックス取得
            var selfAabb = self.world.aabb;
            //自分のバウンディングボックスの情報をコピー 
            var selfPreAabb = self.world.preAabb.clone();
            
            //次の処理
            //x座標をコピー情報と同じにする
            selfPreAabb.x = selfAabb.x;
            otherPreAabb.x = otherAabb.x;
            //もしも自分のバウンディングボックスと
            //オブジェクトのバウンディングボックスが当たったら
            if(cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                //右に加速していてなおかつ自分のx座標最大値が
                //相手のx座標最大値より大きければ            
                if(this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                    //自分のx座標を相手の最大x座標から
                    //親のx座標を引いたものに変更
                    this.node.x = otherPreAabb.xMax - this.node.parent.x;
                    //左方向に補助変数を設定
                    this.collisionX = -1;
                }
                //左に加速していてなおかつ自分のx座標最小値が
                //相手のx座標最小値より小さければ
                else if(this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                    //自分のx座標を相手の最小値から自分のバウンディングボックスの幅を引いて
                    //自分の親のx座標を引いたものに変更
                    this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
                    //右方向に補助変数を設定
                    this.collisionX = 1;
                }
                //左右への移動速度を0に
                this.speed.x = 0;
                //オブジェクトの横に当たったフラグをtrueに
                other.touchingX = true;
                return;
            }
            
            //三番目の処理
            //Y座標をコピー情報と同じにする
            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;
            //もしも自分のバウンディングボックスと
            //オブジェクトのバウンディングボックスが当たったら
            if(cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                if(this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                    this.node.y = otherPreAabb.yMax - this.node.parent.y;
                    this.jumping = false;
                    this.collisionY = -1;
                }
                //上下への移動速度を0に設定
                this.speed.y = 0;
                //オブジェクトの縦に当たったらフラグをtrueに
                other.touchingY = true;
            }
        }
        //ステージ更新
        if(other.node.group === 'stage1') {
            if(this.getBox[0]) {
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear1');
            }
        }else if(other.node.group === 'stage2') {
            if(this.getBox[0] && this.getBox[1] && this.getBox[2] === false) {
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear2');
            }
        }else if(other.node.group === 'stage3') {
            if(this.getBox[0] === false && this.getBox[1]) {
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear3');
            }
        }else if(other.node.group === 'stage4') {
            if(this.getBox[0] && this.getBox[1] === false && this.getBox[2]) {
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear4');
            }
        }else if(other.node.group === 'stage5'){
            if(this.getBox[0] === false && this.getBox[1] === false && this.getBox[2] === false && this.getBox[3] === false 
            && this.getBox[4] === false && this.getBox[5] && this.getBox[6] && this.getBox[7]) {
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear5');
            }
        }else if(other.node.group === 'stage6') {
            if(this.getBox[0] === false && this.getBox[1] && this.getBox[2]){
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear6');
            }
        }else if(other.node.group === 'stage7') {
            if(this.getBox[0] && this.getBox[1] === false && this.getBox[2]) {
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear7');
            }
        }else if(other.node.group === 'stage8') {
            if(this.getBox[0] && this.getBox[1] === false && this.getBox[2] && this.getBox[3] && this.getBox[4] === false) {
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear8');
            }
        }else if(other.node.group === 'stage9') {
            if(this.getBox[0] === false && this.getBox[1] === false && this.getBox[2] && this.getBox[3]){
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('stageclear9');
            }
        }else if(other.node.group === 'stage10') {
            if(this.getBox[0]　&& this.getBox[1] === false && this.getBox[2] === false && this.getBox[3]){
                //サウンドストップ
                cc.audioEngine.stopMusic();                
                cc.director.loadScene('gameclear');
            }
        }
    },
    
    //	当たり判定内にとどまっている場合
	onCollisionStay: function (other, self) {
		//	下方向のあたりで
		if (this.collisionY === -1) {
			//	オブジェクトのグループが「Brock」の場合
			if (other.node.group === 'Brock') {
				//	PlatformMotionを実行
				var motion1 = other.node.getComponent('PlatformMotion1');
				var motion2 = other.node.getComponent('PlatformMotion2');
				var motion3 = other.node.getComponent('Fall');
				if (motion1) {
					this.node.x += motion1._movedDiff;
				}
				if (motion2) {
					this.node.y += motion2._movedDiff;
				}				
				if(motion3) {
				    this.node.y += motion3._movedDiff;
				}
			}
		}
	},
    
    //当たり判定外に出た場合
    onCollisionExit: function(other) {
        //タッチナンバーを減算
        this.touchingNumber --;
        //オブジェクトに触れていなければカラーを白に戻す
        if(this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
        //x方向に接触していればXのあたりを0に
        if(other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        //y方向に接触していればyのあたりを0にする
        //ジャンプフラグをtrueに
        else if(other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
            this.jumping = true;
        }
    },
    
     update: function (dt) {
         //yのあたり判定が0ならば
         if(this.collisionY === 0) {
            //重力を現在の速度に加算する
            this.speed.y += this.g * dt;
            //現在の速度が上昇・下降いずれにせよ設定した最大スピードを超えていたら
            if(Math.abs(this.speed.y) > this.maxSpeed.y) {
                //加速の向きに従って最大値にまるめる
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
         }
         //移動方向がどちらでもない場合
         if(this.direction === 0) {
            if(this.speed.x > 0) {
                this.speed.x -= this.drag * dt;
                if(this.speed.x <= 0) this.speed.x = 0;
            }else if(this.speed.x < 0) {
                this.speed.x += this.drag * dt;
                if(this.speed.x >= 0) this.speed.x = 0;
            }
         }
         //移動方向に応じた分速度が加算される(左右のみ対象)
         else{
			this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
			//	速度の最大値を超えないように設定
			if (Math.abs(this.speed.x) > this.maxSpeed.x) {
				this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
			}
         }
         //移動方向とあたり方向が一致していたら移動速度を0にする
         if(this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
         }
         this.prePosition.x = this.node.x;
         this.prePosition.y = this.node.y;
         this.preStep.x = this.speed.x * dt;
         this.preStep.y = this.speed.y * dt;
         this.node.x += this.speed.x * dt;
         this.node.y += this.speed.y * dt;
         
        //歩いていたら歩数計＋１
         if(this.walking) {
             this.walk += 1;
         }
         //歩いていなければ立ち止まっている画像
         if(this.walking === false) {
             this.anim.play('PlayerMotion1');
        //歩くアニメーション
         }else if(this.walk % 10 === 0) {
             this.anim.play('PlayerMotion2'); 
         }else if(this.walk % 10 === 5) {
             this.anim.play('PlayerMotion3'); 
         }
         //ジャンプアニメーション
         if(this.jumping) {
             this.anim.play('PlayerMotion4');  
         }
     },
     
     //ゲームオーバー
     gameOver: function() {
         this.anim.play('PlayerMotion5');
    	//ステージボックス
        var stageBox = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8', 'stage9', 'stage10'];
        //ゲームオーバーボックス
        var gameOverBox = ['gameOver1', 'gameOver2', 'gameOver3', 'gameOver4', 'gameOver5', 'gameOver6', 'gameOver7', 'gameOver8', 'gameOver9', 'gameOver10'];    	         
         //gameOverSceneに移行
         for(var i = 0;i < stageBox.length;i++) {
             if(this.home.group === stageBox[i]) {
                 cc.director.loadScene(gameOverBox[i]);
                 break;
             }
         }
         
     }
});
