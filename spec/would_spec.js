
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


        describe('when condition combinator while judging',function(){
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

                var a_handler = function(){
                    condition_a_handle = "a not null";
                }

                var b_handler = function(){
                    condition_b_handle = "b not null";
                }

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

                var a_handler = function(){
                    condition_a_handle = "a not null";
                }

                var b_handler = function(){
                    condition_b_handle = "b not null";
                }

                var condition_a = condition(a).when_pass_call(a_handler);
                var condition_b = condition(b).when_pass_call(b_handler);

                would(be_called)
                    .when(all(condition_a,condition_b).pass)();

                expect(called_flag).toBe(false);
                expect(condition_a_handle).toBeUndefined();
                expect(condition_b_handle).toBe("b not null");
            });

            describe('when condition combinator while judging on context',function(){
                var condition_a_handle_out_context;
                var condition_b_handle_out_context;



                it("should do when given all conditions is true",function(){
                    var a = function(){
                        return false;
                    };
                    var b = function(){
                        return false;
                    };

                    var a_handler = function(){
                        condition_a_handle_out_context = "a not null";
                    }

                    var b_handler = function(){
                        condition_b_handle_out_context =  "b not null";
                    }
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
        });

    });



})

//pass_handler
//