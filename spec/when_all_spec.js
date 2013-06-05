describe('when condition combinator',function(){
    var called_flag;
    function be_called(){
        called_flag = true;
    }

    function not_be_called(){
        called_flag = true;
    }

    beforeEach(function(){
        called_flag = false;
    })

    it("should do when given all conditions is true",function(){
        var condition_a_is_true = function(){
            return true;
        };
        var condition_b_is_true = function(){
            return true;
        };
        would(be_called)
            .when(all(condition_a_is_true,condition_b_is_true).pass)();
        expect(called_flag).toBe(true);

    });

    it("should not do when given one of conditions is false",function(){
        var condition_a_is_true = function(){
            return true;
        };
        var condition_b_is_false = function(){
            return false;
        };
        would(not_be_called)
            .when(all(condition_a_is_true,condition_b_is_false).pass)();
        expect(called_flag).toBe(false);

    });




});