(function($, document, window, viewport){

	$(document).ready(function() {
		$('body').mousemove(function(e){
			var amountMovedX = (e.pageX * 1 / 6);
			var amountMovedY = (e.pageY * -1 / 6);
			var amountMovedX2 = (e.pageX * 1 / 6);
			var amountMovedY2 = (e.pageY * 1 / 6);
			//$('body').css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
		});
		
		$('.enlarged_size').click(function(e) {
			e.preventDefault();
			
			if (!$(this).hasClass('active')) {
				
				$('.size_button').removeClass('active');
				$(this).addClass('active');
				
				$('.wantcall_button').addClass('enlarged');
				$('.icon').addClass('enlarged');
				$('.pulse1').addClass('enlarged');
				$('.pulse2').addClass('enlarged');
				$('.icon.active').addClass('enlarged');
				
			}
			
		});
		
		$('.standart_size').click(function(e) {
			e.preventDefault();
			
			if (!$(this).hasClass('active')) {
				
				$('.size_button').removeClass('active');
				$(this).addClass('active');
				
				$('.wantcall_button').removeClass('enlarged');
				$('.icon').removeClass('enlarged');
				$('.pulse1').removeClass('enlarged');
				$('.pulse2').removeClass('enlarged');
				$('.icon.active').removeClass('enlarged')
				
			}
			
		});
		
		
		$('.star').click(function(e) {
			e.preventDefault();
			
				$('.star').removeClass('selected');
				$(this).addClass('selected');
				$(this).prevAll(".star").addClass('selected');
			
		});
		
		$('.submit_wantcall').click(function() {
			
			var Number = $(this).parent().children('.input_wantcall').val();
			var When = $(this).parent().parent().children('.when_tocall_form').children('.input_wantcall_when').val();
			var ThisElem = $(this);
			
			if (Number=='' || Number.length < 6 || Number.length > 18) {
				
				var ThisBackgroundColor = $(this).parent().children('.input_wantcall').css('backgroundColor');
				var ThisFontColor = $(this).parent().children('.input_wantcall').css('color');
				
				$(this).parent().children('.input_wantcall').css('border','1px solid red').css('background','rgba(255, 0, 0, 0.5)').css('color','#fff').delay(2000).queue(function (next) {
					
					$(this).parent().children('.input_wantcall').animate({"background-color":ThisBackgroundColor,'color':ThisFontColor}, 600).css('border','none');
					next(); 
				  
				});
				//$(this).parent().children('.input_wantcall').css('background-color',ThisBackgroundColor).css('border','none');
				
			}
			else {
				
				$(this).parent().children('.input_wantcall').css('border','none').css('background','#fff');
				
				$.ajax({
		
					url: '/ajax/wanttocall.php',
					type: 'POST',
					data: {Number:Number,When:When},
					success:function(data){
						$('.wanttocall_result').html(data);
						
						
						if ($('.wantcall_button').hasClass('active')) {
							
							$('.wantcall_button').children('.close_wantcall').hide();
							$('.wantcall_button').children('.icon').children('.wantcall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100,  function() {
								$(this).hide();
								$(this).parent().children('.when_tocall').hide();
								$('.wantcall_button').removeClass('active');
								$('.wantcall_button').children('.icon').removeClass('active');
								$('.wantcall_button').children('.icon').children('i').removeClass('fa-phone').addClass('fa-check').css('margin','50% 0 0 50%').css('top','-33%').css('left','-30%');
								$('.wantcall_button').addClass('asked');
							});
						}
						
					}
				});
				
			}
		});
		
		$('.cancel_tocall').click(function(e) {
			e.preventDefault;
			
			$('.cancel_tocall').addClass('active');
			$('.wantcall_button').addClass('cancel');
			
		});
		
		
		$('.cancel_wantcall_when').click(function() {
			
			var NormalBCG = $('.icon_normal_background').val();
			console.log(NormalBCG);
			$('.icon').animate({"background-color":NormalBCG}, 200);
			$('.close_wantcall').css('color',NormalBCG);
			$('.wantcall_guidephone').children('a').css('color',NormalBCG);
			console.log(NormalBCG);
			
			if ($('.wantcall_button').hasClass('cancel')) {
				
				$('.wantcall_button').children('.close_wantcall').hide();
				$('.wantcall_button').children('.icon').children('.cancel_tocall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100,  function() {
					$(this).hide();
					$(this).parent().children('.when_tocall').hide();
					$('.wantcall_button').removeClass('active');
					$('.wantcall_button').removeClass('cancel');
					$('.wantcall_button').children('.icon').removeClass('active');
					$('.wantcall_button').children('.icon').children('i').removeClass('fa-phone').addClass('fa-check').css('margin','50% 0 0 50%').css('top','-33%').css('left','-30%');
					$('.wantcall_button').addClass('asked');
				});
			}
			
		});
		
		$('.icon').click(function() {
			
			if ($(this).parent().hasClass('cancel')) {
				
				var CancelColor = $('.cancel_background').val();
				var CurrentIconBCG = $('.icon_normal_background').css('backgroundColor');
				
				$('.cancel_wantcall_when_label').show(300);
				if (CurrentIconBCG!=CancelColor) {
					$(this).delay(500).queue(function (next) {
						
						$(this).children('.cancel_tocall_form').children('.cancel_wantcall_when').animate({"color":CancelColor,"border-color":CancelColor}, 600).hover(function(){
							var ThisColorFont = $('.icon').children('i').css('color');
				    		$(this).css('color',ThisColorFont).css('border','2px solid '+ThisColorFont);
				    	}, function(){
				    		var ThisColor = $('.icon').css('backgroundColor');
				    		
				    		$(this).css('color',ThisColor).css('border','2px solid '+ThisColor);
				    	});
						$(this).animate({"background-color":CancelColor}, 600);
						$('.close_wantcall').animate({"color":CancelColor}, 600);
						$('.wantcall_guidephone').children('a').animate({"color":CancelColor}, 600);
						
						next(); 
					  
					});
				}
			}
			
			if (!$(this).hasClass('active')) {
				$(this).parent().children('.pulse1').hide();
				$(this).parent().children('.pulse2').hide();
				$(this).parent().children('.icon').children('i').css('margin',0);
				$(this).addClass('active');
				$(this).parent().addClass('active');
				$(this).children('.wantcall_form').show();
				$(this).children('.when_tocall').show();
				$(this).children('.wantcall_form').animate({"opacity": 1, right: "8px", easing: 'easeInCirc'}, 350);
				$(this).parent().children('.close_wantcall').show();
			}
			
		}).children('i').click(function(e) {
			if ($('.icon').hasClass('active')) {
				if ($('.icon').children('i').hasClass('fa-check')) {
					console.log('zzz');
					var ThisElem = $('.close_wantcall');
					
					$(ThisElem).parent().children('.close_wantcall').hide();
					$(ThisElem).parent().children('.icon').children('.when_tocall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100, function() {
						$(this).hide();
					});
					$(ThisElem).parent().children('.icon').children('.wantcall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100, function() {
						$(this).hide();
						$(this).parent().children('.when_tocall').hide();
						$('.wantcall_button').removeClass('active');
						$('.icon').removeClass('active');
						$('.icon').children('i').css('margin','50% 0 0 50%');
						$('.pulse1').show();
						$('.pulse2').show();
					});
					
				}
			}
		});
		
		
		$('.close_wantcall').click(function() {
			 
			var ThisElem = $(this);
			var NormalBCG = $('.icon_normal_background').val();
			$('.icon').animate({"background-color":NormalBCG}, 200);
			$('.close_wantcall').css('color',NormalBCG);
			$('.wantcall_guidephone').children('a').css('color',NormalBCG);
			
			if ($('.wantcall_button').hasClass('cancel')) {
				
				$('.wantcall_button').children('.close_wantcall').hide();
				
				$('.wantcall_button').children('.icon').children('.cancel_tocall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100,  function() {
					$(this).hide();
					$(this).parent().children('.when_tocall').hide();
					$('.wantcall_button').removeClass('active');
					$('.wantcall_button').removeClass('cancel');
					$('.wantcall_button').children('.icon').removeClass('active');
					$('.wantcall_button').children('.icon').children('i').removeClass('fa-phone').addClass('fa-check').css('margin','50% 0 0 50%').css('top','-33%').css('left','-30%');
					$('.wantcall_button').addClass('asked');
				});
			}
			else if ($(this).parent().hasClass('active')) {
				$(this).parent().children('.close_wantcall').hide();
				$(this).parent().children('.icon').children('.when_tocall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100, function() {
					$(this).hide();
				});
				$(this).parent().children('.icon').children('.wantcall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100, function() {
					$(this).hide();
					$(this).parent().children('.when_tocall').hide();
					$(ThisElem).parent().removeClass('active');
					$(ThisElem).parent().children('.icon').removeClass('active');
					$(ThisElem).parent().children('.icon').children('i').css('margin','50% 0 0 50%');
					$(ThisElem).parent().children('.pulse1').show();
					$(ThisElem).parent().children('.pulse2').show();
				});
			}
			
		});
		
		$(document).on('click',function(){
			$('.feed_now_h').removeClass('active');
		});
		
		$('.feed_text_now').click(function(e) {
			e.stopPropagation();
			$('.feed_now_h').addClass('active');
		});
		$('.feed_now_h_send').on('click',function(e){ 
			e.preventDefault();
			var Message = 	$('.feed_text_now').val();
			
			if (Message=='' || Message.length < 6) {
				
				var ThisBackgroundColor = '#fff';
				var ThisFontColor = 'rgb(0, 0, 0)';
				
				$('.feed_text_now').css('border','1px solid red').css('background','rgba(255, 0, 0, 0.5)').css('color','#fff').delay(2000).queue(function (next) {
					
					$('.feed_text_now').animate({"background-color":ThisBackgroundColor,'color':ThisFontColor}, 600).css('border','none');
					next(); 
				  
				});
				//$(this).parent().children('.input_wantcall').css('background-color',ThisBackgroundColor).css('border','none');
				
			}
			else {
			
					$.ajax({
			
						url: '/ajax/feed_now.php',
						type: 'POST',
						data: {Message:Message},
						success:function(data){
							
							$('.feed_text_now').val(data);
							
						}
					});	
				
				}
		});
		
		$('.when_tocall').click(function() {
			var ThisElem = $(this);
			
			$(this).hide();
			$(this).parent().children('.wantcall_form').animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100,  function() {
				$(ThisElem).parent().children('.when_tocall_form').show();
				$(ThisElem).parent().children('.when_tocall_form').animate({"opacity": 1, right: "8px", easing: 'easeInCirc'}, 350);
			});
		});
		
		$('.submit_wantcall_when').click(function() {
			var ThisElem = $(this);
			
			$(this).parent().animate({"opacity": 0, right: "-50px", easing: 'easeInCirc'}, 100,  function() {
				$(ThisElem).parent().hide();
				$(ThisElem).parent().parent().children('.wantcall_form').animate({"opacity": 1, right: "8px", easing: 'easeInCirc'}, 350);
				$(ThisElem).parent().parent().children('.when_tocall').show();
			});
		});
		
		$('a[href^="#"]').click(function () { 
		     elementClick = $(this).attr("href");
		     destination = $(elementClick).offset().top;
		     console.log(destination);
		     
		     $('body').animate( { scrollTop: destination }, 1100 );
		     
		     return false;
		   });
		
		//console.log(viewport.current());
		$('.menu_button').click(function() {
			 
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			}
			else {
				$(this).addClass('active');
			}
			
		});
		
		$('.block-menu').children('li').children('a').click(function() {
			
			$('.block-menu').children('li').children('a').removeClass('active');
			
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			}
			else {
				$(this).addClass('active');
			}
			
		});
		
		$( ".portfolio_element" ).mouseenter(function() {
			  if (viewport.current()!='xs') {
			  $('.portfolio_handler').removeClass('active');
			   $('.portfolio_element').addClass('transparent');
			  $(this).children('.description_element_right').queue("fx", []);
			  $(this).children('.description_element_left').queue("fx", []);
			  $(this).removeClass('transparent');
			  $(this).children('.description_element_right').animate({"opacity": 1, right: "-250px", duration: 200, easing: 'easeInCirc'});
			  $(this).children('.description_element_left').animate({"opacity": 1, left: "-250px", duration: 200, easing: 'easeInCirc'});
			  
			  }
		  })
		  .mouseleave(function() {
			  if (viewport.current()!='xs') {
				  if (!$('.portfolio_handler').hasClass('active')) {
					   $('.portfolio_element').addClass('transparent');
				  }
			  $(this).children('.description_element_right').queue("fx", []);
			  $(this).children('.description_element_left').queue("fx", []);
			  $(this).children('.description_element_right').animate({"opacity": 0, right: "0px", duration: 100, easing: 'easeInCirc'});
			  $(this).children('.description_element_left').animate({"opacity": 0, left: "0px", duration: 100, easing: 'easeInCirc'});
				
		  $('.portfolio_element').removeClass('transparent');
			  }
		  });
	    
		if (viewport.current()=='xs') {
			 $('.input_wantcall_when').css('width','82%');
		}
		
		$( window ).scroll(function() {
			
			if (viewport.current()!='xs') {
				
				var s = $(document).scrollTop();
				
				if (s>96) {
					if (!$('.go_to_top').hasClass('active')) {
						$('.go_to_top').addClass('active');
					}
				}
				else {
					if ($('.go_to_top').hasClass('active')) {
						$('.go_to_top').removeClass('active');
					}
				}
				
			}
			
		});
		
	});

	$(window).resize(
        viewport.changed(function(){
           // console.log('Current breakpoint:', viewport.current());
        })
    );

})(jQuery, document, window, ResponsiveBootstrapToolkit);