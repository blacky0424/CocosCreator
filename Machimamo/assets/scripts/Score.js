cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label
        },
    },

    onLoad: function () {
        var score = cc.sys.localStorage.getItem('Score');
        this.scoreLabel.string = 'Score : ' + score.toString();
    },
});