cc.Class({
    extends: cc.Component,

    properties: {
        //サウンド
        audio: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function () {
        //サウンドを鳴らす
        cc.audioEngine.playMusic(this.audio, false);
    },
});
