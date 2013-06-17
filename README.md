这是一个关于逻辑的DSL,使用该DSL,会强迫我们把参与逻辑运算的代码尽量函数化,函数化之后就可以很低成本的扩展或关闭功能.

该DSL以描述性语言风格为主,以命令结尾.附和现实中,人们先描述情况,然后下命令的心智模型.适用于根据客户要求经常修改逻辑的场景.

下面的代码都是在真实的使用场景中抽离出来的,是一个支持报名,投票,现场竞价游戏等互动的的活动支持应用:

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

其实看起来反而更啰嗦了.

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
而且会把某些问题明显的暴露出来,比如很明显的看出所有的函数都依赖message.

如果遇到可能会组合的逻辑时,这些逻辑DSL会使得组合和拆解更加容易,最主要的还是把顶层逻辑都展示出来了,适用于比较重要且需要变化的逻辑.

比如下面的代码,是上面代码中把所有的处理函数inline之后,再重构的结果:

    on_context(function(it,signup){
            it.has_condition(is_apply_message).with(message);

            it.has_condition(is_apply_started)
                .when_not_pass_call(apply_not_started_handler).with(message);

            it.has_condition(not_has_same_phone).with(message)
                .when_not_pass_call(reply_application.repeat).with(message.phone);

            var record_apply = build_action("record_apply").with({message:message, activity_name:activity_name})
                                .notify(save_activity_apply_info, render_apply_info);

            would(record_apply).when(all(conditions_in(it))).pass_and_break_first();
    });

    on_context(function(it, bidding){
        it.has_condition(is_bid).with(message);

        it.has_condition(is_bid_started)
            .when_not_pass_call(bid_not_started_handler).with(message);

        it.has_condition(is_applied).with(message.phone,activity_name)
            .when_not_pass_call(warning_not_applied).with(message.phone);

        it.has_condition(not_has_bidden).with(message.phone, activity_name)
            .when_not_pass_call(warning_repeat_bid).with(message.phone);

        it.has_condition(bigger_than_bottom_smaller_than_top).with(message.phone, activity_name)
            .when_not_pass_call(warning_out_of_range).with(message.phone);

        would(record_bid).when(all(conditions_in(it))).pass_and_break_first();

    });

    on_context(function(it, voting){
        it.has_condition(is_voting).with(message);

        it.has_condition(is_voting_started)
            .when_not_pass_call(voting_not_started_handler).with(message);

        it.has_condition(is_voter_applied).with(message,activity_name)
            .when_not_pass_call(warning_voted_has_not_applied).with(message.phone);

        it.has_condition(not_has_voted).with(message, activity_name)
            .when_not_pass_call(warning_repeat_voting).with(message.phone);

        it.has_condition(is_candidate_exist).with(message, activity_name)
            .when_not_pass_call(warning_candidate_not_exist);

        would(record_vote).when(all(conditions_in(it))).pass_and_break_first();

    })

上面的代码的原始代码我就不贴了,很长,即便使用OO进行了封装也不过是掩盖住了分支之间的关系.

而修改后的代码把原本很深的分支判断给拉平到一级上,这样需要删减条件的时候,可以非常直观得进行操作.
在上面的基础上我可以通过DSL,很低成本的扩展或关闭功能.

* 比如"报名"结束才能"投票"还是随时可以"报名",然后就可以"投票"
* 比如不用"报名"就可以"投票"
* 比如"投过票的"不能参与"竞价游戏"等等.

