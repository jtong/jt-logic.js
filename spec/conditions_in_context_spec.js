describe('when condition combinator while judging on context',function(){

    beforeEach(function(){
        called_flag = false;
        condition_a_handled = undefined;
        condition_b_handled = undefined;
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
                .when(all(conditions_in(it))).pass();
        });


        expect(called_flag).toBe(false);
        expect(condition_a_handled).toBe("a not null");
        expect(condition_b_handled).toBe("b not null");
    });
});