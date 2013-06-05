describe('when condition combinator while judging on context',function(){
    var called_flag;

    function be_called(){
        called_flag = true;
    }

    var a_handler = function(){
        condition_a_handle_out_context = "a not null";
    }

    var b_handler = function(){
        condition_b_handle_out_context =  "b not null";
    }

    var condition_a_handle_out_context;
    var condition_b_handle_out_context;

    beforeEach(function(){
        called_flag = false;
        condition_a_handle_out_context = undefined;
        condition_b_handle_out_context = undefined;
    })

    it("should do when given all conditions is true",function(){
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
                .when(all(conditions_in(it)).pass)();
        });


        expect(called_flag).toBe(false);
        expect(condition_a_handle_out_context).toBe("a not null");
        expect(condition_b_handle_out_context).toBe("b not null");
    });
});