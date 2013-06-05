describe('when condition combinator while judging',function(){
    var called_flag;

    function be_called(){
        called_flag = true;
    }

    function not_be_called(){
        called_flag = true;
    }

    var a_handler = function(){
        condition_a_handle = "a not null";
    }

    var b_handler = function(){
        condition_b_handle = "b not null";
    }

    var condition_a_handle;
    var condition_b_handle;

    beforeEach(function(){
        called_flag = false;
        condition_a_handle = undefined;
        condition_b_handle = undefined;
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
            .when(all(condition_a,condition_b).pass)();

        expect(called_flag).toBe(false);
        expect(condition_a_handle).toBeUndefined();
        expect(condition_b_handle).toBe("b not null");
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
            .when(all(condition_a,condition_b).pass)();

        expect(called_flag).toBe(false);
        expect(condition_a_handle).toBeUndefined();
        expect(condition_b_handle).toBe("b not null");
    });


});