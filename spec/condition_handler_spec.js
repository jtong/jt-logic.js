describe('When condition combinator while judging',function(){

    beforeEach(function(){
        called_flag = false;
        condition_a_handled = undefined;
        condition_b_handled = undefined;
    })

    it("should not do when given any conditions is false and for the false one its handler was called",function(){
        var a = function(){
            return true;
        };
        var b = function(){
            return false;
        };

        var condition_a = condition(a).when_not_pass_call(a_handler);
        var condition_b = condition(b).when_not_pass_call(b_handler);

        would(be_called)
            .when(all(condition_a,condition_b)).pass();

        expect(called_flag).toBe(false);
        expect(condition_a_handled).toBeUndefined();
        expect(condition_b_handled).toBe("b not null");
    });

    it("should not do when given any conditions is false and for the true one its handler was called",function(){
        var a = function(){
            return false;
        };
        var b = function(){
            return true;
        };

        var condition_a = condition(a).when_pass_call(a_handler);
        var condition_b = condition(b).when_pass_call(b_handler);

        would(be_called)
            .when(all(condition_a,condition_b)).pass();

        expect(called_flag).toBe(false);
        expect(condition_a_handled).toBeUndefined();
        expect(condition_b_handled).toBe("b not null");
    });


});