describe('Logic Not',function(){

    function condition_is_true(){
        return true;
    }

    function condition_is_false() {
        return false;
    }

    beforeEach(function(){
        called_flag = false;
    })

    it("should not do when condition with not and rule is pass and given condition is true",function(){
        would(not_be_called)
            .when(not(condition_is_true)).pass();
        expect(called_flag).toBe(false);

    });
})

//pass_handler
//