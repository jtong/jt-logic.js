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
        var condition_a = condition(condition_is_true)
            .when_pass_call(be_called_need_params)
            .with(param1_flag,param2_flag);

        would(be_called)
            .when(all(condition_a)).pass();
        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });

    it("should do when only call would with params",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";

        var condition_a = condition(condition_is_false)
            .when_not_pass_call(be_called_need_params)
            .with(param1_flag,param2_flag);

        would(be_called)
            .when(all(condition_a)).pass();
        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });

    it("should do when only call would with params in context",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";

        on_context(function(it){
            it.has_condition(condition_is_false)
                .when_not_pass_call(be_called_need_params)
                .with(param1_flag,param2_flag);

            would(be_called)
                .when(all(conditions_in(it))).pass();
        })

        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });

    it("should go through all conditions call pass and not pass one by one",function(){
        var param1_flag = "param 1";
        var param2_flag = "param 2";

        on_context(function(it){
            it.has_condition(condition_is_false)
                .when_not_pass_call(be_called_need_params)
                .with(param1_flag,param2_flag);

            it.go_through();
        })

        expect(param_handle1).toBe(param1_flag);
        expect(param_handle2).toBe(param2_flag);

    });


})

//pass_handler
//