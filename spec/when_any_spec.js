describe('when condition combinator is any',function(){

    beforeEach(function(){
        called_flag = false;
    })

    it("should do when rule is pass and given one of conditions is true",function(){
        var condition_a_is_true = function(){
            return true;
        };
        var condition_b_is_true = function(){
            return false;
        };
        would(be_called)
            .when(any(condition_a_is_true,condition_b_is_true)).pass();
        expect(called_flag).toBe(true);

    });




});