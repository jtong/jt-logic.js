describe('Break first',function(){

    beforeEach(function(){
        called_flag = false;
        condition_a_handled = undefined;
        condition_b_handled = undefined;
    })

    it("should not do when rule is all pass and break first on given all conditions is false",function(){
        var a = function(){
            return false;
        };
        var b = function(){
            return false;
        };
        on_context(function(it){
            it.has_condition(a).when_not_pass_call(a_handler);
            it.has_condition(b).when_not_pass_call(b_handler);
            would(be_called)
                .when(all(conditions_in(it))).pass_and_break_first();
        });


        expect(called_flag).toBe(false);
        expect(condition_a_handled).toBe("a not null");
        expect(condition_b_handled).toBeUndefined();

    });

    it("should not do and only first handler was called when rule is all not pass and break first on given all conditions is true",function(){
        var a = function(){
            return true;
        };
        var b = function(){
            return true;
        };
        on_context(function(it){
            it.has_condition(a).when_pass_call(a_handler);
            it.has_condition(b).when_pass_call(b_handler);
            would(be_called)
                .when(all(conditions_in(it))).not_pass_and_break_first();
        });


        expect(called_flag).toBe(false);
        expect(condition_a_handled).toBe("a not null");
        expect(condition_b_handled).toBeUndefined();

    });


    it("should  do and only first handler was called when rule is any not pass and break first on given all conditions is true",function(){
        var a = function(){
            return true;
        };
        var b = function(){
            return true;
        };
        on_context(function(it){
            it.has_condition(a).when_pass_call(a_handler);
            it.has_condition(b).when_pass_call(b_handler);
            would(be_called)
                .when(any(conditions_in(it))).not_pass_and_break_first();
        });

        expect(called_flag).toBe(false);
        expect(condition_a_handled).toBe("a not null");
        expect(condition_b_handled).toBeUndefined();

    });


    it("should  do and only first handler was called when rule is any pass and break first on given all conditions is false",function(){
        var a = function(){
            return false;
        };
        var b = function(){
            return false;
        };
        on_context(function(it){
            it.has_condition(a).when_not_pass_call(a_handler);
            it.has_condition(b).when_not_pass_call(b_handler);
            would(be_called)
                .when(any(conditions_in(it))).pass_and_break_first();
        });

        expect(called_flag).toBe(false);
        expect(condition_a_handled).toBe("a not null");
        expect(condition_b_handled).toBeUndefined();

    });


});