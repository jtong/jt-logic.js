describe('Logic With',function(){
    var param_handle1;
    var param_handle2;

    function be_called_need_params(param1, param2){
        if(param1){
           param_handle1 = param1;
        }
        if(param2){
            param_handle2 = param2;
        }
    }

    function condition_is_true(){
        return true;
    }

    function condition_is_false() {
        return false;
    }

    beforeEach(function(){
        called_flag = false;
        param_handle1 = undefined;
        param_handle2 = undefined;
    })

    it("should do when only call would with params",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";
        would(be_called_need_params)
            .with(param1_flag, param2_flag).go();
        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });

    it("should do when only call would with params given condition is true",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";
        would(be_called_need_params)
            .with(param1_flag, param2_flag)
            .when(condition_is_true).pass();
        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });

    it("should do with params when rule is not pass given all condition is true",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";
        would(be_called_need_params)
            .with(param1_flag, param2_flag)
            .when(all(condition_is_true, condition_is_true)).pass();
        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });
    it("should do with params when rule is not pass given all condition is true",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";
        would(be_called_need_params)
            .with(param1_flag, param2_flag)
            .when(all(condition_is_true, condition_is_false)).pass();
        expect(param_handle1).toBeUndefined();
        expect(param_handle2).toBeUndefined();

    });

    it("should do with params when rule is not pass for all given all condition is false",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";
        would(be_called_need_params)
            .with(param1_flag, param2_flag)
            .when(all(condition_is_false, condition_is_false)).not_pass();
        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });


})

//pass_handler
//