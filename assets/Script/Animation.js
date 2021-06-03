
cc.Class({
    extends: cc.Component,

    properties: {

        lupin: {
            type: sp.Skeleton,
            default: null,
        },

        dog: {
            type: sp.Skeleton,
            default: null,
        },

        police: {
            type: sp.Skeleton,
            default: null,
        },

        bg: cc.Node,
        verticalCam: cc.Node,
        horizontalCam: cc.Node,

        // Mode dọc
        trueScreenVertical: cc.Node,
        failScreenVertical: cc.Node,

        chooseOptionVertical: cc.Node,
        xFailOp1Vertical: cc.Node,
        xFailOp2Vertical: cc.Node,
        xTrueOp3Vertical: cc.Node,

        // Mode ngang
        trueScreenHorizontal: cc.Node,
        failScreenHorizontal: cc.Node,

        chooseOptionHorizontal: cc.Node,
        xFailOp1Horizontal: cc.Node,
        xFailOp2Horizontal: cc.Node,
        xTrueOp3Horizontal: cc.Node,


        screenVertical: false,
        screenHorizontal: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // Giám sát để gọi làm mỗi khi kích thước màn hình thay đổi, và tự động thay đổi mỗi khi màn hình thay đổi
        cc.view.setResizeCallback(() => {
            this.screenAdapter();
            this.showOption();
        });
        this.screenAdapter();
    },

    //  Fit Height Mode: phù hợp cho màn hình có chiều cao lớn hơn chiều rộng (màn hình dọc)
    //  Fit Width Mode: phù hợp cho màn hình có chiều rộng lớn hơn chiều cao (màn hình ngang)

    start() {
        this.newGame();
        // this.bgMove();
    },

    screenAdapter() {
        // Tỷ lệ hiện tại của màn hình
        let screenRatio = cc.winSize.width / cc.winSize.height;
        // Tỷ lệ của màn hình thiết kế
        let designRatio = cc.Canvas.instance.designResolution.width / cc.Canvas.instance.designResolution.height;

        if (screenRatio <= 1) {
            // Nếu chiều cao màn hình lớn hơn chiều rộng -> màn hình dọc
            if (screenRatio <= designRatio) {
                this.setFitHeight();
                this.screenVertical = true;
                this.screenHorizontal = false;
            } else {
                //Nếu tỉ lệ màn hình lớn hơn tỉ lệ thiết kế
                // Để có thể đảm bảo tỷ lệ nếu màn hình dọc ko gọi được, màn hình ngang nên đc sử dụng
                this.setFitWidth();
                this.screenVertical = false;
                this.screenHorizontal = true;
            }
        } else {
            // Nếu chiều rộng màn hình lớn hơn chiều cao -> màn hình ngang
            this.setFitWidth();
            this.screenVertical = false;
            this.screenHorizontal = true;
        }
    },

    setFitWidth() {
        cc.Canvas.instance.fitHeight = false;
        cc.Canvas.instance.fitWidth = true;

        this.bg.setPosition(0, 0);
        this.verticalCam.active = false;
        this.horizontalCam.active = true;
    },

    setFitHeight() {
        cc.Canvas.instance.fitHeight = true;
        cc.Canvas.instance.fitWidth = false;

        this.bg.setPosition(420, 0);
        this.verticalCam.active = true;
        this.horizontalCam.active = false;
    },

    newGame() {
        // Mode dọc
        this.xFailOp1Vertical.active = false;
        this.xFailOp2Vertical.active = false;
        this.xTrueOp3Vertical.active = false;

        this.chooseOptionVertical.active = false;

        this.failScreenVertical.active = false;
        this.trueScreenVertical.active = false;

        // Mode ngang
        this.xFailOp1Horizontal.active = false;
        this.xFailOp2Horizontal.active = false;
        this.xTrueOp3Horizontal.active = false;

        this.chooseOptionHorizontal.active = false;

        this.failScreenHorizontal.active = false;
        this.trueScreenHorizontal.active = false;

        this.police.node.active = false;

        this.verticalCam.setPosition(0, 0);

        this.lupinStandStart();
        this.dogRunStart();
    },

    lupinStandStart() {
        this.lupin.node.setPosition(-880, -470);
        this.lupin = this.lupin.getComponent('sp.Skeleton');
        this.lupin.setAnimation(0, 'general/stand_thinking', true);
        // this.lupin.setAnimation(1, 'emotion/thinking', true);
    },

    dogRunStart() {
        this.dog = this.dog.getComponent('sp.Skeleton');
        if (this.screenVertical == true) {
            cc.tween(this.dog.node)
                .call(() => {
                    this.dog.setAnimation(0, 'run', true);
                    this.dog.node.setPosition(400, -560);
                })
                .to(1.5, { position: cc.v2(-360, -560) })
                .call(() => {
                    this.dog.setAnimation(0, 'stand_angry', true);
                    this.lupin.setAnimation(0, 'emotion/worry', true);

                    this.showOption();
                })
                .start()
        }

        if (this.screenHorizontal == true) {
            cc.tween(this.dog.node)
                .call(() => {
                    this.dog.setAnimation(0, 'run', true);
                    this.dog.node.setPosition(1300, -560);

                })
                .to(3, { position: cc.v2(-360, -560) })
                .call(() => {
                    this.dog.setAnimation(0, 'stand_angry', true);
                    this.lupin.setAnimation(0, 'emotion/worry', true);

                    this.showOption();
                })
                .start()
        }
    },

    showOption() {
        if (this.screenHorizontal == true) {
            this.showOptionHorizontal();
        }

        if (this.screenVertical == true) {
            this.showOptionVertical();
        }
    },

    showOptionVertical() {
        cc.tween(this.chooseOptionVertical)
            .call(() => {
                this.chooseOptionVertical.active = true;
            })
            .to(0.2, { scale: 0.8 })
            .to(0.2, { scale: 1 })
            .start()
    },

    showOptionHorizontal() {
        cc.tween(this.chooseOptionHorizontal)
            .call(() => {
                this.chooseOptionHorizontal.active = true;
            })
            .to(0.2, { scale: 0.8 })
            .to(0.2, { scale: 1 })
            .start()
    },

    chooseOption1() {
        // hàm mix sự kiện(sk1, sk2, thời gian đổi 2sk)
        // this.lupin.setMix("level_2/lv2_stg1_potato", "emotion/fear_1", 0.2);
        this.lupin.setAnimation(0, 'level_2/lv2_stg1_potato', true);

        cc.tween(this.dog)
            .delay(2.5)
            .call(() => {
                this.dog.addAnimation(0, 'shout', true);
                this.lupin.addAnimation(0, 'emotion/fear_1', true);
            })
            .start()

        var self = this;
        // ở hàm setTimeout không thể gọi 'this' trực tiếp mà cần thay thế bằng self.this
        setTimeout(function () {
            self.policeRun();
        }, 3000); // đơn vị ms

    },

    chooseOption2() {
        this.lupin.setAnimation(0, 'level_2/lv2_stg1_meat', false);
        this.dogEat();
    },

    chooseOption3() {
        this.lupin.setAnimation(0, 'level_2/lv2_stg1_bone', true);
        this.dogRun();
        this.bgMove();
        this.lupinWalk();

    },

    policeRun() {
        this.police = this.police.getComponent('sp.Skeleton');

        if (this.screenVertical == true) {
            cc.tween(this.police.node)
                .delay(0.5)
                .call(() => {
                    this.police.node.active = true;
                    this.police.node.setPosition(500, -560);
                    this.police.setAnimation(0, 'police/general/run', true);
                })
                .to(1, { position: cc.v2(-300, -465) })
                .call(() => {
                    this.police.setAnimation(0, 'police/general/gun_raise', true);
                    this.lupin.setAnimation(0, 'emotion/fear_2', true);
                })
                .delay(0.5)
                .call(() => {
                    this.xFailOp1Vertical.active = true;
                    this.xFailOp1Horizontal.active = true;
                    this.failScr();
                })
                .delay(2)
                .call(() => {
                    this.newGame();

                    if (this.screenVertical == true) {
                        this.setFitHeight();
                    }

                    if (this.screenHorizontal == true) {
                        this.setFitWidth();
                    }

                })
                .start()
        }

        if (this.screenHorizontal == true) {
            cc.tween(this.police.node)
                .delay(0.5)
                .call(() => {
                    this.police.node.active = true;
                    this.police.node.setPosition(1300, -560);
                    this.police.setAnimation(0, 'police/general/run', true);
                })
                .to(3, { position: cc.v2(-300, -465) })
                .call(() => {
                    this.police.setAnimation(0, 'police/general/gun_raise', true);
                    this.lupin.setAnimation(0, 'emotion/fear_2', true);
                })
                .delay(0.5)
                .call(() => {
                    this.xFailOp1Vertical.active = true;
                    this.xFailOp1Horizontal.active = true;
                    this.failScr();
                })
                .delay(1.3)
                .call(() => {
                    this.newGame();

                    if (this.screenVertical == true) {
                        this.setFitHeight();
                    }

                    if (this.screenHorizontal == true) {
                        this.setFitWidth();
                    }

                })
                .start()
        }
    },

    dogEat() {
        cc.tween(this.dog.node)
            .delay(1.8)

            .call(() => {
                this.dog.setAnimation(0, 'catch_eat', true);
                this.lupin.setAnimation(0, 'emotion/excited', true);
            })
            .delay(4)

            .call(() => {
                this.dog.setAnimation(0, 'stand_angry', true);
                this.lupin.setAnimation(0, 'emotion/fear_1', true);
            })
            .delay(0.5)

            .call(() => {
                this.xFailOp2Vertical.active = true;
                this.xFailOp2Horizontal.active = true;
                this.failScr();
            })
            .delay(1.3)

            .call(() => {
                this.newGame();

                if (this.screenVertical == true) {
                    this.setFitHeight();
                }

                if (this.screenHorizontal == true) {
                    this.setFitWidth();
                }

            })
            .start()
    },

    dogRun() {
        cc.tween(this.dog.node)
            .delay(3.2)
            .call(() => {
                this.dog.setAnimation(0, 'run', true);
                this.lupin.setAnimation(0, 'emotion/sinister', true);
            })
            .to(2, { x: -1300 })
            .start()
    },

    bgMove() {
        cc.tween(this.verticalCam)
            .delay(4.2)
            .to(4.2, { x: 840 })
            .start()
    },

    lupinWalk() {
        cc.tween(this.lupin.node)
            .delay(4)

            .call(() => {
                this.lupin.setAnimation(0, 'general/walk', true);
                // this.lupin.scheduleOne(this.lupin.setAnimation(1, 'emotion/whistle', true), 7, 0, 0);
            })
            .to(5, { position: cc.v2(540, -430) })

            .call(() => {
                this.lupin.setAnimation(0, 'general/walk_upstairs', true);
            })
            .to(2, { position: cc.v2(945, -185) })
            .call(() => {
                this.xTrueOp3Horizontal.active = true;
                this.xTrueOp3Vertical.active = true;
                this.trueScr();
            })
            .delay(1.2)
            .call(() => {
                this.newGame();

                if (this.screenVertical == true) {
                    this.setFitHeight();
                }

                if (this.screenHorizontal == true) {
                    this.setFitWidth();
                }

            })
            .start()
    },

    failScr() {
        this.failScrVertical();
        this.failScrHorizontal();
    },

    failScrVertical() {
        this.failScreenVertical.active = true;
        this.failScreenVertical.setPosition(0, 0);
    },

    failScrHorizontal() {
        this.failScreenHorizontal.active = true;
        this.failScreenHorizontal.setPosition(0, 0);
    },

    trueScr() {
        this.trueScrVertical();
        this.trueScrHorizontal();
    },

    trueScrVertical() {
        this.trueScreenVertical.active = true;
        this.trueScreenVertical.setPosition(840, 0);
    },

    trueScrHorizontal() {
        this.trueScreenHorizontal.active = true;
        this.trueScreenHorizontal.setPosition(0, 0);
    },

    update(dt) {
    }
});
