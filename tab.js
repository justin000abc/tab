function Tab(args){
    var _ = this;
    _.html = $('html');
    _.body = is_ios?$('body'):$('html');
    _.w = $(window);
    _.offset = new _public(window);
    _.document = $(document);
    _.scroll_top = 0;
    _.args = args;
    _.o = $(_.args.tab);
    _.is_scroll = _.args.scroll||false;
    _.title = $(args.title);
    _.option = $('.option',_.o);
    _.init_idx = (_.args.init_item-1)||0;
    _.tab_item = new Array();
    _.t_item = new Array();
    _.option_max = $.proxy(_.option_max,_);
    _.init = $.proxy(_.init,_);
    _.init();
    $(_.o_item_tag,_.o).each(function(idx,item){
        _.tab_item.push($(item));
        _.t_item.push($(_.t).eq(idx));
    });
    if(_.title) {
        _.title_txt(_.init_idx);
        _.title.on('click',function(){
            _.option.slideToggle();
            if(!this.classList.contains('active')){
                if(_.args.scroll_fixed) {
                    _.body.animate({scrollTop: _.title.offset().top - _.offset.header_height()}, 500,'',function(){
                        _.scroll_top = _.w.scrollTop();
                        _.html.addClass('tab_open').css("top",-_.scroll_top);
                        _.title.addClass('active');
                    });
                }else
                    _.title.addClass('active');
            }else{
                _.remove_tab_open();
            }
        });
        _.document.imagesLoaded(_.option_max);
    }    
    _.is_scroll ? _.scroll_offset(_.w.scrollTop(),0):_.click(_.init_idx);
    _.tab_item.forEach(function(item,idx){
        item.on('click',function(e){
            if(!_.args.link_enable) {
                e.preventDefault();
                _.remove_tab_open();
                _.click(idx);
            }
        });
    });
    if(_.is_scroll){
        _.w.on('scroll',function(){_.scroll_offset(_.w.scrollTop(),0);});
        win_resize.call(_,function(){_.scroll_offset(_.w.scrollTop(),0);});
    }
    _.option_max = $.proxy(_.option_max,_);
    _.w.on('scroll resize',_.option_max);
    _.option.on('touchstart',function(e){
        e.stopPropagation();
        _.body.unbind('touchmove');
        _.option.one('touchend',function(){
            _.body.on('touchmove');
        });
    });
}
Tab.prototype.init = function(){
    var _ = this;
    _.o_item_tag = _.args.tab_item;
    _.t_item_tag = _.args.container_item;
    _.t = _.is_scroll?$(_.t_item_tag):$(_.t_item_tag,$(_.args.container));
    _.option_max();
}
Tab.prototype.remove_tab_open = function(){
    var _ = this;
    if(_.args.scroll_fixed) {
        _.scroll_top = Math.abs(parseInt(_.html.css("top")));
        _.html.css("top","auto").removeClass('tab_open');
        _.w.scrollTop(_.scroll_top);
    }
    _.title.removeClass('active');
}
Tab.prototype.option_max = function(){
    var _ = this;
    _.option.css("max-height", window.innerHeight - _.offset.header_height() - _.title.innerHeight());
}
Tab.prototype.click = function(x){
    var _ = this;
    _.tab_item[x].addClass('active');
    _.t_item.forEach(function(item,idx){
        if(idx!=x){
            _.is_scroll||item.hide();
            _.tab_item[idx].removeClass('active');
        }
    });
    if(_.title) {
        _.title_txt(x);
        _.option.slideUp();
    }
    if(_.is_scroll){
        var h = window.innerWidth>767?0:72;
        _.body.animate({scrollTop: _.t_item[x].offset().top - _.offset.header_height() - h}, 500);
        _.title.removeClass('active');
    }else{
        _.t_item[x].fadeIn().css('display',(_.args.display||'block'));
    }
    (_.args.callback && typeof(_.args.callback) === "function") && _.args.callback(_.t_item[x],x);
}
Tab.prototype.scroll_offset = function(w_top,cou){
    var _ = this;
    var h = _.t_item[cou].offset().top + _.t_item[cou].outerHeight() - (window.innerHeight / 4) - _.offset.header_height();
    if(w_top <= h || cou>=(_.t_item.length-1)){
        _.tab_item[cou].addClass('active');
        _.title && _.title_txt(cou);
        _.tab_item.forEach(function(item,i){
            (i!=cou&&item.hasClass('active')) && item.removeClass('active');
        });
        (_.args.scroll_callback && typeof(_.args.scroll_callback) === "function") && _.args.scroll_callback(cou);
    }else{
        _.scroll_offset(w_top,++cou);
    }
}
Tab.prototype.title_txt = function(i){
    // var _ = this;
    // _.title.text(_.tab_item[i].text());
}