
describe('Logic Would',function(){
    var called_flag;
    function be_called(){
        called_flag = true;
    }

    function condition_is_true(){
        return true;
    }

    function condition_is_false() {
        return false;
    }
    beforeEach(function(){
        called_flag = false;
    })

    it("should do when only call would",function(){
      would(be_called)();
      expect(called_flag).toBe(true);

    });

    it("should do when given condition is true",function(){
        would(be_called)
            .when(condition_is_true)();
        expect(called_flag).toBe(true);

    });

    it("should not do when given condition is false",function(){
        would(be_called)
            .when(condition_is_false)();
        expect(called_flag).toBe(false);

    });



    describe('when condition combinator',function(){
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


    });


})
