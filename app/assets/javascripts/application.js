// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.remotipart
//= require turbolinks
//= require_tree .

//= require jquery-3.1.1

//= require bootstrap-sprockets
//= require jquery-ui

function data1(c){
	
		var hash = {};
		var x = 0;
		for (var i = 0; i<c.length/2; i++){
			hash[c[x]]=c[(x+1)]
			x = x+2
		}
		return hash;
}

function ajaxbr(a,b,c){
	var arr = []
	// console.log(a,b,c)
	$.ajax({
		method: a,
		async: false,
		beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		url: b,
		data: c
	}).done(function(response){
		x = response;
		arr.push(x);
	})
	return arr[0]
}

function dis_link(a){
    z = ajaxbr('get', '/like1',data1(['id',a]))
    $('div[id=like_div'+a+']').after('<div id="like_div'+z[1]+'" class="cont1"><a href="javascript:like_link('+z[1]+')"><span class="glyphicon glyphicon-heart-empty"></span> '+z[0]+'</a></div>');
    $('div[bla=like_div'+a+']').remove();
    $('div[id=like_div'+a+']').attr('bla',"like_div"+z[1]);
}
function like_link(a){
    z = ajaxbr('get','/like',data1(['id',a]));
    $('div[id=like_div'+a+']').after('<div id="like_div'+z[1]+'" class="cont1"><a href="javascript:dis_link('+z[1]+')"> <span style="color:red;" class="glyphicon glyphicon-heart"></span> '+z[0]+'</a></div>');
    $('div[bla=like_div'+a+']').remove();
    $('div[id=like_div'+a+']').attr('bla',"like_div"+z[1]);
}
function open_photo(a,b,c){
	$('#photo_modal').remove();
	$('body').append('<div class="modal fade bs-modal-sm" id="photo_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" id="photo_modal1" style="width: 500px;border-radius:10px;"></div></div></div>');
	$('#photo_modal').modal();
	$('#photo_div').remove();
	x = ajaxbr('get','/show2',data1(['user_id', b,'image_id', a]));
	$('#photo_modal1').append('<div id="photo_div" style="text-align: center;"><img style="max-width: 100%; max-height: 100%;" src="'+x[0].avatar.url+'"><br><br><div id="photo_div_footer" style="text-align:left;"></div></div>');
	if (jQuery.inArray(c.toString(),x[0].like) < 0){
    	$('#photo_div_footer').append('<div id="like_div'+x[0].id+'" bla="like_div'+x[0].id+'" class="cont1"><a href="javascript:like_link('+x[0].id+')"> <span class="glyphicon glyphicon-heart-empty"></span> '+x[0].like.length+'</a></div>&nbsp;');
    	}else{$('#photo_div_footer').append('<div id="like_div'+x[0].id+'" bla="like_div'+x[0].id+'" class="cont1"><a href="javascript:dis_link('+x[0].id+')"><span style="color:red;" class="glyphicon glyphicon-heart"></span> '+x[0].like.length+'</a></div>&nbsp;');
    }
    $('#photo_div_footer').append('<div class="cont1" id="comm'+a+'" bla="'+a+'"><a href="javascript:add_comment('+a+')" class="cont1"><span class="glyphicon glyphicon-comment"></span></a></div>&nbsp;<a href="javascript:direct1('+x[0].id+')" class="cont1">&nbsp;<span class="glyphicon glyphicon-share"></span></a>');
    if (b === c){
    	$('#photo_div_footer').append('<a href="javascript:delete_photo('+a+','+"'"+x[0].avatar.thumb.url+"'"+')" style="float:right; margin-right: 10px;" class="cont1"><span class="glyphicon glyphicon-trash"></span></a>');
    }
    $('#photo_div_footer').after('<br><div id="com'+a+'"></div>');
    if (x[0].description === ""){}else{$('div[id=com'+a+']').append('<div style="text-align:left;"><strong>'+x[1].name+'</strong> sayd: '+x[0].description+'</div><div style="text-align:left;">-----</div>');}
    comment1(a);
}
function delete_photo(a,b){
	$('#delete_modal').remove();
	$('body').append('<div class="modal fade bs-modal-sm" id="delete_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" id="delete_content"></div></div></div>');
	$('#delete_modal').modal();
	$('#delete_content').append('<div style="text-align:center;width:300px;height:400px;"><h3>Are you sure you want to delete this photo?</h3><br><br><img src="'+b+'"><br><br><button id="submit_delete" class="btn btn-primary">delete</button></div>');
	$('#submit_delete').click(function(event){
		event.preventDefault();
		ajaxbr('get','/delete', data1(['id',a]));
    	$('#delete_modal').modal('hide');
    	$('#photo_modal').modal('hide');
    	feed();
    	feed2();
    	// $('#delete_modal').remove();
	});
}
function add_comment(a){
	$('div[id=comm'+a+']').children().hide();
	$('div[id=comm'+a+']').children().before('<div class="cont1 new_comment_div"><input type="text" style="outline:none;border-radius:10px;text-align:center;" placeholder="your comment" id="new_comment"></div>');
	$('#new_comment').focus();
	// $('#add_comment_subm').click(function(){
	// 	// event.preventDefault();
	// 	x = ajaxbr('post','/add_comm',data1(['id',a,'comment',$('#new_comment').val()]));
	// 	x = x[0]
	// 	comment1(a);
	// })
	$('#new_comment').keypress(function(event){
		if (event.which == 13){
			event.preventDefault();
			x = ajaxbr('post','/add_comm',data1(['id',a,'comment',$('#new_comment').val()]));
			x = x[0]
			$('.new_comment_div').remove();
			$('div[id=comm'+a+']').children().show();
			comment1(a);
		}
	})
	$('*:not("#new_comment")').click(function(){
		$('.new_comment_div').remove();
		$('div[id=comm'+a+']').children().show();
	})
}
function comment_back(a){
	$('.new_comment_div').remove();
	$('div[id=comm'+a+']').children().show();
}
function comment1(a){
	$('div[id=comments2'+a+']').remove();
	$('div[id=com'+a+']').append('<div id="comments2'+a+'" style="text-align: left;"></div>');
	$.ajax({
      method: 'get',
      async: false,
      url: '/comments',
      data: {'id': a}
    }).done(function(response){
      a5 = response;
      if (a5.length > 0){$('div[id=com'+a+']').attr('style','min-height:50px;padding:10px;border-style:ridge;background-color:white;border-radius:10px;')}
      var o = 0;
      for (var q = 0; q<a5.length; q++){
      	if (o > 1){
      		$('a[id=morecom'+a5[q][0].image_id+']').remove();
      		$('div[id=comments3'+a5[q][0].image_id+']').append('<strong>'+a5[q][1].name+'</strong> sayd: '+a5[q][0].comment+'<br>');
      		$('div[id=comments2'+a5[q][0].image_id+']').append('<a href="javascript:morecomm('+a5[q][0].image_id+')" id="morecom'+a5[q][0].image_id+'" style="color:grey;">more comments</a>');
      	}else{
      		$('div[id=comments2'+a5[q][0].image_id+']').append('<strong>'+a5[q][1].name+'</strong> sayd: '+a5[q][0].comment+'<br>');
      		o = o +1;
      		if (o > 1){$('div[id=comments2'+a+']').append('<div id="comments3'+a+'" style="display:none;"></div>');}
      	}
      	
      }
    });
}
function morecomm(a){
	$('div[id=comments3'+a+']').show();
	$('a[id=morecom'+a+']').hide();
	$('div[id=comments3'+a+']').append('<a href="" id="comment_hide" style="color:grey;">hide</a>');
	$('#comment_hide').click(function(event){
		event.preventDefault();
		$('a[id=morecom'+a+']').show();
		$('div[id=comments3'+a+']').hide();
		$(this).remove();
	})
}
function follow(a){
	ajaxbr('post','/follow',data1(['id',a]));
	$('a[id=follow_link'+a+']').before('<a href="javascript:unfollow('+a+')" id="unfollow_link'+a+'">&nbsp;unfollow</a>');
	$('a[id=follow_link'+a+']').remove();
}
function unfollow(a){
	ajaxbr('post','/unfollow',data1(['id',a]));
	$('a[id=unfollow_link'+a+']').before('<a href="javascript:follow('+a+')" id="follow_link'+a+'">&nbsp;follow</a>');
	$('a[id=unfollow_link'+a+']').remove();
	// if (b === 1){modal_follow()}
}
function modal_follow(){
	$('#you_follow_modal').remove();
	$('body').append('<div class="modal fade bs-modal-sm" id="you_follow_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" id="you_follow_content"></div></div></div>');
	$('#you_follow_modal').modal();
	$('#you_follow_content1').remove();
	$('#you_follow_content').append('<div id="you_follow_content1"></div>');
	a4 = ajaxbr('get','/frendlist',0);
	for (var i = 0; i<a4.length; i++){
		$('#you_follow_content1').append('<div style="margin: 10px;"><a href="/index2/'+a4[i].id+'"><img style="height: 50px; width: 50px; border-radius: 50px; border: 3px solid gray;" src="'+a4[i].avatar.url+'"> '+a4[i].name+'</a>&nbsp;<a href="javascript:unfollow('+a4[i].id+')" id="unfollow_link'+a4[i].id+'"> &nbsp;unfollow</a><a href="javascript:message('+a4[i].id+')"> &nbsp;message</a></div>');
	}
}
function modal_subscribers(){
	$('body').append('<div class="modal fade bs-modal-sm" id="you_subscribers_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" id="you_subscribers_content"></div></div></div>');
	$('#you_subscribers_modal').modal();
	$('#you_subscribers_content1').remove();
	$('#you_subscribers_content').append('<div id="you_subscribers_content1" style="margin: 10px;"></div>');
	a4 = ajaxbr('get','/frendlist1',0);
	for (var i = 0; i<a4.length; i++){
		if (jQuery.inArray($('#current_user_id').text(),a4[i].subscribers) < 0){
			$('#you_subscribers_content1').append('<div style="margin: 10px;"><a href="/index2/'+a4[i].id+'"><img style="height: 50px; width: 50px; border-radius: 50px; border: 3px solid gray;" src="'+a4[i].avatar.url+'"> '+a4[i].name+'</a><a href="javascript:follow('+a4[i].id+')" id="follow_link'+a4[i].id+'"> &nbsp;follow</a><a href="javascript:message('+a4[i].id+')"> &nbsp;message</a></div>');
		}else{
			$('#you_subscribers_content1').append('<div style="margin: 10px;"><a href="/index2/'+a4[i].id+'"><img style="height: 50px; width: 50px; border-radius: 50px; border: 3px solid gray;" src="'+a4[i].avatar.url+'"> '+a4[i].name+'</a><a href="javascript:unfollow('+a4[i].id+')" id="unfollow_link'+a4[i].id+'"> &nbsp;unfollow</a><a href="javascript:message('+a4[i].id+')"> &nbsp;message</a></div>');
		}
	}
}
function message(b,c){
	$('#new_message_modal').modal('hide');
	if (c === undefined){
		$('#message_modal').remove();
		$('body').append('<div class="modal fade bs-modal-sm" id="message_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" id="messge_content"></div></div></div>');
	}
	
	$('#message_modal').modal();
	$('#direct_content3').remove();
	$('#messge_content').append('<div id="direct_content3"></div>');
	$('#direct_content3').append('<div style="width:300px; height:400px; overflow: scroll;" id="direct_content2"></div><div style="margin:5px; text-align:center;"><input type="text" class="message" id="new_messge" style="width:200px;"><a href="" id="send_message"><div class="btn btn-default message" style="width:50px;">&nbsp;send</div></a></div>');
	$('#new_messge').focus();
	$('#new_messge').keypress(function(event){
		if (event.which == 13){
			event.preventDefault();
			ajaxbr('post','/message2',data1(['id',b,'message',$('#new_messge').val()]));
			message(b,1);
		}
	})
	$('#send_message').click(function(event){
		event.preventDefault();
		ajaxbr('post','/message2',data1(['id',b,'message',$('#new_messge').val()]));
		message(b,1);
	})
	a = ajaxbr('get','/message1',data1(['id',b]));
	$('#direct_content3').prepend('<div style="margin:10px; padding:5px; border: 1px solid black; border-radius:10px;"><a href="/index2/'+a[1].id+'"><img style="height: 50px; width: 50px; border-radius: 50px; border: 3px solid gray;" src="'+a[1].avatar.thumb.url+'"> '+a[1].name+'</a><a href="javascript:direct1()"><span style="float:right; margin-top: 10px;" class="glyphicon glyphicon-triangle-left"></span></a></div>');
	for (var i=0; i<a[0].message.length; i++){
		if (a[0].message[i][0].toString() === b.toString()){
			if (a[0].message[i][2] !== "0"){
				$('#direct_content2').prepend('<div class="message_message" style="word-wrap: break-word;padding: 10px; width:150px; border: 1px solid black; border-radius: 10px; margin:10px;"><a href="javascript:open_photo('+a[0].message[i][2]+','+a[0].message[i][3]+','+$('#current_user_id').text()+')"><img style="max-height:100%; max-width:100%" src="'+a[0].message[i][1]+'"></a></div>');
			}else{
				$('#direct_content2').prepend('<div class="message_message" style="word-wrap: break-word;padding: 10px; width:150px; border: 1px solid black; border-radius: 10px; margin:10px;">'+a[0].message[i][1]+'</div>');
			}
		}else{
			if (a[0].message[i][2] !== "0"){
				$('#direct_content2').prepend('<div class="message_message" style="word-wrap: break-word;padding: 10px; width:150px; border: 1px solid black; border-radius: 10px; margin:10px 0px 10px 140px;"><a href="javascript:open_photo('+a[0].message[i][2]+','+a[0].message[i][3]+','+$('#current_user_id').text()+')"><img style="max-height:100%; max-width:100%" src="'+a[0].message[i][1]+'"></a></div>');
			}else{
				$('#direct_content2').prepend('<div class="message_message" style="word-wrap: break-word;margin: 10px 0px 10px 140px; padding:10px; width:150px; border: 1px solid black; border-radius: 10px;">'+a[0].message[i][1]+'</div>');
			}
		}
	}
	message3();
}
function direct1(b){
	var o = "";
	$('#direct_modal').remove();
	$('body').append('<div class="modal fade bs-modal-sm" id="direct_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" id="direct_content"></div></div></div>');
	$('#direct_modal').modal();
	$('#direct_content1').remove();
	$('#direct_content').append('<div id="direct_content1" style="margin:10px;"></div>');
	$('#direct_content').append('<div style="text-align:center;"> ------------ </div><div style="text-align:center;"><a href="javascript:new_message('+"''"+')">new message</a></div><br>');
	a = ajaxbr('get','/direct',0);
	if(a.length === 0){$('#direct_content1').append('<div style="text-align:center;height:300px;"><h3>You have no dialogs yet</h3></div>')}else{
		for (var i = 0; i<a.length; i ++){
			$('#direct_content1').append('<div style="margin:10px;"><a href="javascript:message('+a[i][0][0].id+')" class="message_click" bla="'+a[i][0][0].id+'" id="link_to'+a[i][0][0].id+'"><img style="height: 50px; width: 50px; border-radius: 50px; border: 3px solid gray;" src="'+a[i][0][0].avatar.thumb.url+'"> '+a[i][0][0].name+'&nbsp;&nbsp;</a></div>');
			if (a[i][1] > 0){$('a[id=link_to'+a[i][0][0].id+']').after('<span class="label label-primary notif_sum">'+a[i][1]+'</span>')}
		}
	}
	if (b !== undefined){
		$('.message_click').click(function(){
			ajaxbr('post','/message2',data1(['id',$(this).attr('bla'),'message',"{superduperidofimage:"+b+"}"]));
		})
	}
}
function feed(){
	$('#feed').children().remove();
	a4 = ajaxbr('get','/feed',0);
  	for (var x = 0; x<a4.length; x++){
    	$('#feed').append('<div  style="border-style:ridge;background-color:#f8f8f8;border-radius:10px;margin:20px;max-width:604px;"><div style="height:100px;padding:10px;padding-top:20px;"><a href="/index2/'+a4[x][1].id+'" class="cont2" id="bz'+x+'"><img src='+a4[x][1].avatar.thumb.url+' style="height: 50px; width: 50px; border-radius: 50px; border: 3px solid gray;"> '+a4[x][1].name+'</a></div><div style="width:600px;height:450px;" bla2="'+x+'"><img style="max-width: 100%; max-height: 100%;" src="'+a4[x][0].avatar.url+'"></div><div id="pict'+a4[x][0].id+'" style="height:50px;padding:10px;"></div></div>');
    	$('div[id=pict'+a4[x][0].id+']').append('<div id="like_div'+a4[x][0].id+'" bla="like_div'+a4[x][0].id+'" class="cont1"></div>&nbsp;');
    	if ($('#sessio_nil').text() === ""){}else{
      		$('div[id=pict'+a4[x][0].id+']').append('<div class="cont1" id="comm'+a4[x][0].id+'" bla="'+a4[x][0].id+'"><a href="javascript:add_comment('+a4[x][0].id+')"><span class="glyphicon glyphicon-comment"></span></a></div>&nbsp;<div class="cont1">&nbsp;<a href="javascript:direct1('+a4[x][0].id+')"><span class="glyphicon glyphicon-share"></span></a></div>');
      		if (jQuery.inArray($('#current_user_id').text(),a4[x][0].like) < 0){
        		$('div[id=like_div'+a4[x][0].id+']').append('<a href="javascript:like_link('+a4[x][0].id+')"><span class="glyphicon glyphicon-heart-empty"></span> '+a4[x][0].like.length+'</a>');
      		}else{$('div[id=like_div'+a4[x][0].id+']').append('<a href="javascript:dis_link('+a4[x][0].id+')"><span style=" color:red;" class="glyphicon glyphicon-heart"></span> '+a4[x][0].like.length+'</a>');}
    	}
    	if ($('#current_user_id').text() === a4[x][0].user_id.toString()){
      		$('div[id=pict'+a4[x][0].id+']').append('<a href="javascript:delete_photo('+a4[x][0].id+','+"'"+a4[x][0].avatar.thumb.url+"'"+')" style="float:right; margin-right: 10px;" class="delete_photo cont1" id="'+a4[x][0].id+'"><span class="glyphicon glyphicon-trash"></span></a>');
    	}else if($('#current_user_id').text() !== a4[x][0].user_id.toString() && $('#current_user_id').text() !== ""){$('a[id=bz'+x+']').after('&nbsp;&nbsp;<a href="javascript:message('+a4[x][1].id+')" style="float:right;margin:10px;" class="cont2"><span class="glyphicon glyphicon-envelope"></span></a>')}
    	$('div[id=pict'+a4[x][0].id+']').after('<div id="com'+a4[x][0].id+'"></div>');
    	if (a4[x][0].description === ""){}else{
    		$('div[id=com'+a4[x][0].id+']').attr('style','min-height:50px;padding:10px;border-style:ridge;background-color:white;border-radius:10px;');
    		$('div[id=com'+a4[x][0].id+']').prepend('<div ><strong>'+a4[x][1].name+'</strong> sayd: '+a4[x][0].description+'</div><div> ----- </div>');
    	}
    	
  	}
  	for (var x = 0; x<a4.length; x++){
    	comment1(a4[x][0].id);
  	}
}
function new_message(c,b){
	setTimeout("$('#direct_modal').modal('hide')",1);
	$('#new_message_content1').remove();
	if (b === undefined){
		$('#new_message_modal').remove();
		$('body').append('<div class="modal fade bs-modal-sm" id="new_message_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" id="new_message_content"></div></div></div>');
		$('#new_message_modal').modal();
	}
	$('#new_message_content').append('<div id="new_message_content1"></div>');
	a = ajaxbr('get','/new_message',data1(['bla',c]));
	if(a.length === 0){$('#new_message_content1').append('<div style="text-align:center;height:300px;"><h3>You have no followers and follows yet</h3></div>')}else{
		for (var i = 0; i<a.length; i ++){
			$('#new_message_content1').append('<div style="margin:10px;text-align:center;"><a href="javascript:message('+a[i].id+')"><img style="height: 50px; width: 50px; border-radius: 50px; border: 3px solid gray;" src="'+a[i].avatar.thumb.url+'"> '+a[i].name+'</a></div>');
		}
	}
	$('#new_message_content1').prepend('<div class="input-group" style="margin:10px;"><span class="input-group-addon"><span class="glyphicon glyphicon-search" style="font-size: 15px;"></span></span><input aria-describedby="sizing-addon2" type="text" class="form-control" autocomplete="off" id="new_message_search"></div>');
	if (c !== undefined){$('#new_message_search').focus().val(c);}
	$('#new_message_search').on('input',function(){
		new_message($('#new_message_search').val(),1);
	});
	

}
function message3(){
	var sum = 0;
	$('.notif_sum').remove();
	a = ajaxbr('get','/direct',0);
	for (var i = 0; i<a.length; i ++){
		if (a[i][1] > 0){
			$('a[id=link_to'+a[i][0][0].id+']').after('<span class="label label-primary" class="notif_sum">'+a[i][1]+'</span>');
			sum = sum + a[i][1];
		}
	}
	if (sum > 0){$('.main_link_direct').after('<span class="label label-primary cont1 notif_sum">'+sum+'</span>')};
}
function feed2(){
	$('#photo_container').remove();
	$('#container').append('<div id="photo_container"></div>');
	a1 = ajaxbr('get', '/show1', data1(['id', $('#page_user_id').text()]))
	a1=a1[0];
	for (var x = 0; x<a1.length; x++){
		$('#photo_container').append('<a href="javascript:open_photo('+a1[x].id+','+$('#page_user_id').text()+','+$('#current_user_id').text()+')"><div class="col-sm-4 photo1"><img style="max-height:100%; max-width:100%;border-radius: 10px;" src="'+a1[x].avatar.thumb.url+'"><div></a>');
		// $('#test').append('<img src="'+a1[x].avatar.url+'">')
	}
	$('.photo1').mouseenter(function(){
		$(this).fadeTo('fast', 0.7);
	})
	$('.photo1').mouseleave(function(){
		$(this).fadeTo('fast', 1);
	})
	$('#information_span').remove();
	$('#information_div').append('<span style="margin:20px;" id="information_span">'+a1.length+' posts</span>');
}
function readURL(input) {
	if (input.files && input.files[0]) {
        var reader = new FileReader();
		reader.onload = function (e) {
        	$('#blah').attr('src', e.target.result);
        	$('#blah1').attr('src', e.target.result);
        }
    	reader.readAsDataURL(input.files[0]);
    }
}
function fogot(){
	$('#myTabContent').hide();
	$('#myTabContent').after('<div id="fogot_pass" style="text-align:center;">Enter your email:<br><br><input style="outline:none;border-radius:10px;text-align:center;" type="text" id="fogot_pass_input"><br><br><a href="javascript:fogot1()" style="margin:5px;" class="btn btn-primary">change</a><a href="" style="margin:5px;" class="btn btn-primary" id="fogot_pass_back">back</a></div>');
	$('#fogot_pass_back').click(function(event){
		event.preventDefault();
		$('#fogot_pass').remove();
		$('#myTabContent').show();
	});
}    
function fogot1(){
	a = ajaxbr('post','/fogot_pass',data1(['email',$('#fogot_pass_input').val()]))
	if (a[0] === "ok"){
		$('#fogot_pass').after('<div style="text-align:center;">Your password has changed! <br>We send it to your email.</div>');
		$('#fogot_pass').remove();
		setTimeout("location.reload()",3000);
	}else{
		$('#fogot_pass').hide();
		$('#fogot_pass').after('<div style="text-align:center;" id="flash_message">Something went wrong, try one more time.</div>');
		setTimeout("$('#flash_message').remove()",3000);
		setTimeout("$('#fogot_pass').show()",3005);
	}
}        






