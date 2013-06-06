#样例1

    on_context(function(it){
         it.has_condition(is_apply).with(message)
             .when_pass_call(accept_apply).with(message);
         it.has_condition(is_voting).with(message)
             .when_pass_call(accept_voting).with(message);
         it.has_condition(is_bid).with(message)
             .when_pass_call(accpet_bid).with(message);
         it.go_through();
     })

上面的代码等价于下面的代码:

    if(is_apply(message))
    {
        accept_apply(message);
    }
    if(is_voting(message))
    {
        accept_voting(message);
    }
    if(is_bid(message))
    {
        accpet_bid(message);
    }

其实看起来反而更啰嗦了
不过会强制人们使用函数,所以会避免下面的情况

    if((message.message.substr(0,2)).toUpperCase() == 'BM')
    {
        var apply_response = new ApplyResponse(message);
        apply_response.process_base_on_apply_status();
    }
    if((message.message.substr(0,2)).toUpperCase() == 'TP')
    {
        var voting_response = new VotingResponse(message);
        voting_response.process_base_on_voting_status();
    }
    if((message.message.substr(0,2)).toUpperCase() == 'JJ')
    {
        var bid_response = new BidResponse(message);
        bid_response.process_base_no_bid_status();
    }
而且会把某些问题明显的暴露出来,比如很明显的看出所有的函数都依赖message