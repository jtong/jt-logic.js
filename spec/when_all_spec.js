describe('when condition combinator',function(){

    beforeEach(function(){
        called_flag = false;
    })

    it("should do when rule is pass and given all conditions is true",function(){
        var condition_a_is_true = function(){
            return true;
        };
        var condition_b_is_true = function(){
            return true;
        };
        would(be_called)
            .when(all(condition_a_is_true,condition_b_is_true)).pass();
        expect(called_flag).toBe(true);

    });

    it("should not do when rule is pass but given one of conditions is false",function(){
        var condition_a_is_true = function(){
            return true;
        };
        var condition_b_is_false = function(){
            return false;
        };
        would(not_be_called)
            .when(all(condition_a_is_true,condition_b_is_false)).pass();
        expect(called_flag).toBe(false);

    });

    it("should not do when rule is not pass but given one of conditions is true",function(){
        var condition_a_is_true = function(){
            return true;
        };
        var condition_b_is_false = function(){
            return false;
        };
        would(not_be_called)
            .when(all(condition_a_is_true,condition_b_is_false)).not_pass();
        expect(called_flag).toBe(false);

    });

    it("should  do when rule is not pass and given all conditions is false",function(){
        var condition_a_is_true = function(){
            return false;
        };
        var condition_b_is_false = function(){
            return false;
        };
        would(be_called)
            .when(all(condition_a_is_true,condition_b_is_false)).not_pass();
        expect(called_flag).toBe(true);

    });




});