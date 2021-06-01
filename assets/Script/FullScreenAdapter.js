cc.Class({
    extends: cc.Component,

    onLoad () {
        // Giám sát để gọi làm mỗi khi kích thước màn hình thay đổi, và tự động thay đổi mỗi khi màn hình thay đổi
        cc.view.setResizeCallback(() => this.screenAdapter());
        this.screenAdapter();
    },

    //  Fit Height Mode: phù hợp cho màn hình có chiều cao lớn hơn chiều rộng (màn hình dọc)
    //  Fit Width Mode: phù hợp cho màn hình có chiều rộng lớn hơn chiều cao (màn hình ngang)

    screenAdapter() {
        //Current screen resolution scale
        let screenRatio = cc.winSize.width / cc.winSize.height;
        //Resolution ratio of design draft
        let designRatio = cc.Canvas.instance.designResolution.width / cc.Canvas.instance.designResolution.height;
        
        if (screenRatio <= 1) {
            // Nếu chiều cao màn hình lớn hơn chiều rộng -> màn hình dọc
            if (screenRatio <= designRatio) {
                this.setFitHeight();
            } else {
                //Nếu tỉ lệ màn hình lớn hơn tỉ lệ thiết kế
                // Để có thể đảm bảo tỷ lệ nếu màn hình dọc ko gọi được, màn hình ngang nên đc sử dụng
                this.setFitWidth();
            }
        } else {
            // Nếu chiều rộng màn hình lớn hơn chiều cao -> màn hình ngang
            this.setFitWidth();
        }
    },

    setFitWidth() {
        cc.Canvas.instance.fitHeight = false;
        cc.Canvas.instance.fitWidth = true;
    },

    setFitHeight() {
        cc.Canvas.instance.fitHeight = true;
        cc.Canvas.instance.fitWidth = false;
    }
});