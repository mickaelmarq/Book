$(window).load(function() {



  $('#wrapper').show();
  $('#site-loader').fadeOut(400);
 
  mobile = false;
  
  topMenu = 300;
  decalMobile = 70;
  decalProject = 0;
  loaderMidle = ($(window).width() - $('#loader').width())/2;
  
  
  $(window).scrollTop(topMenu);

  
  
  
  function calcContactBottom(){
    $('#contact-wrap2').css('top', $(window).height() - topMenu)
    if($(window).height()<=(topMenu*2)){
      $('#wrapper').css('marginBottom','0');
    }else{
      $('#wrapper').css('marginBottom',topMenu);
    }
  }
  
  calcContactBottom();
  

  if(navigator.userAgent.match(/iPhone/i) ||
     navigator.userAgent.match(/iPad/i) ||
     navigator.userAgent.match(/iPod/i) ||
     navigator.userAgent.match(/webOS/i) ||
     navigator.userAgent.match(/Android/i) != null )
  {
    mobile = true;
    decalMobile = 0;
    $('.current').removeClass('current');
  }
  

  
  
  $('.about-link').click(function(){
      
      $('html,body').animate({
        scrollTop: topMenu
      }, 800);
      
      current('.about-link');
      
      return false;
  });
  
   $('.skills-link').click(function(){
      $('html,body').animate({
        scrollTop: $('#skills').offset().top - decalMobile
      }, 800);
      
      current('.skills-link');
      
      return false;
  });
  
  $('.book-link').click(function(){
      $('html,body').animate({
        scrollTop: $('.item').offset().top - (decalMobile + 200 - decalProject) 
      }, 800);
      //projectOpen = false;
      //$('.project').slideUp(400);
      
      current('.book-link');
      
      return false;
  });
  
  $('.contact-link').click(function(){
      $('html,body').animate({
        scrollTop: 0
      }, 800);
     
      current('.contact-link');
      
      return false;
  });
  
  
  function current(ID){
    if(!mobile){
      $('.current').removeClass('current');
      $(ID).addClass('current');
    }
  }
  
  
  
  projectOpen = false;

  
  
  description = $('#description');
  fixedLimitStart = '';
  fixedLimitEnd = '';
  descriptionTop = '';
  project = $('.project');
  
  
  function calcFixedDescription(){

    if(projectOpen){
      description = $('#description');
      fixedLimitStart = project.offset().top - 128;
      fixedLimitEnd = project.offset().top + project.height() - description.height() - 151;
      descriptionTop = project.height() - description.height()-25;
    }
  }


  function reCalcFixedDescription(){

    project = $('.project');

    if(projectOpen){
      description = $('#description');
      fixedLimitStart = project.offset().top - 100;
      fixedLimitEnd = project.offset().top + project.height() - description.height() - 123;
      descriptionTop = project.height() - description.height()-25;
    }
  }
  
  $(window).trigger('scroll'); 
 
  $(window).scroll(function(event){
    
    windowScroll = $(window).scrollTop();
    
    if(!mobile){
      if(windowScroll >= 30+topMenu){
        $('#header-wrap2').show();
      }else{
        $('#header-wrap2').hide();
      }
    }
      
    if(windowScroll<=topMenu-1){
      
      current('.contact-link');
      
    }else if(windowScroll>=topMenu && windowScroll<=$('#skills').offset().top - 80 ){
      
      current('.about-link');
      
    }else if(windowScroll>=$('#skills').offset().top - 80 && windowScroll<=$('#book').offset().top - 110 ){
      
      current('.skills-link');
      
    }else if(windowScroll>=$('#book').offset().top - 110 ){
      
      current('.book-link');
      
    }
    


    if(projectOpen && !mobile){

      

      if( windowScroll >= fixedLimitStart && windowScroll <= fixedLimitEnd){

          //alert('test');



          description.addClass('description-fixed');
          description.css('top', '100px');
      } else {
        description.removeClass('description-fixed');
        if(windowScroll >= fixedLimitEnd){
          description.css('top', descriptionTop);
        }else{
          description.css('top', '0');
        }

        

      }
      
    }

    console.log(fixedLimitStart + ' --- ' +fixedLimitEnd);
    
  });
  
  if(!mobile){
    $(document).mousemove(function(e){
        $('#loader').css('top', e.pageY + 10 - $('html,body').scrollTop());
        $('#loader').css('left', e.pageX + 10);
    });
  }else{
      $('#loader').css('top', '100px');
      $('#loader').css('left', loaderMidle);
    }
  
  document.body.onresize = function (){
    calcFixedDescription();
    console.log('fixedLimitStart = '+fixedLimitStart);
    calcContactBottom();
    loaderMidle = ($(window).width() - $('#loader').width())/2;
    $('#loader').css('left', loaderMidle);
  }
  
  if(mobile){
    $('.item').removeClass('no-touch');
  }


 var url = window.location.pathname;
  if( document.location.href.indexOf('projects') > -1 ){
    //scrollTop: $('.project').offset().top - decalMobile;
    //alert('test');
    projectOpen = true;
    $(window).scrollTop($('.project').offset().top - 128);

    calcFixedDescription();
  }




  function getArticle(route){
  //alert(route);


    

    
  
    if(route != '/'){

      $('html,body').animate({
        scrollTop: $('#project').offset().top - 100
      }, 400);

      $('#page-loader').fadeIn(400);

      $('#project').animate({
        minHeight: 1000
      }, 400);

      $('#project').fadeOut(800, function() {


        
        $.ajax({
          url: route,
          type: "GET",
          async : false,
          cache: true,
          success: function(data) {

            $('#project').html($(data).find("#project").children('.project'));

          },
          complete: function(){
            projectOpen = true;

            $('#page-loader').fadeOut(400);
            
            $('#project').fadeIn(400, function() {

              reCalcFixedDescription();

              //RECALCUL DU PERIMETTRE DE LA DESCRIPTION // TROUVER UNE MEILLEURE SOLUTION

              setTimeout(function(){
                reCalcFixedDescription();
                console.log('reCalcFixedDescription');
              },1000);

              setTimeout(function(){
                reCalcFixedDescription();
                console.log('reCalcFixedDescription');
              },2000);

              

            });
          }



        });

      });
    }else{
      $('html,body').animate({
        scrollTop: 300
      }, 400);

      $('#project').animate({
        minHeight: 0
      }, 400);

      $('.project').fadeOut(200);

    }



    

  }


  function changeRoute(route){
   

    if($('#project').hasClass('first') == true){
      console.log('test de premier chargement');

      $('#project').removeClass('first');

    }else{


      getArticle(route);

    }
   
  }


  var links = $(".ajax");
 
  links.click(function (event) {
   
    //Suppression du comportement par défaut
   
    event.preventDefault();
   
    // Modification de l’url avec la valeur du liens

    //var route = '../'+$(this).attr('href');// PROD
    //var routeSplit = route.split('/');
    //if(routeSplit[1] != 'projects'){
      //var route = '../projects/'+$(this).attr('href');
    //}
    var route = $(this).attr('href'); //PREPROD
   
    history.pushState(null, null, route);
   
    // Modification du contenu de la page
   
    changeRoute(route);
  });


  window.onpopstate = function(){

   
    //changeRoute('../'+window.location.pathname); //PROD
    changeRoute(window.location.pathname); //PREPROD


  }
  
  
});


function dribbble(){

  console.log('load shot');

  $.ajax({
    url: 'http://api.dribbble.com/players/mickaelmarquez/shots',
    type: "GET",
    async : false,
    cache: true,
    dataType: 'jsonp',
    contentType: "application/json; charset=utf-8",
    jsonp: 'callback',
    jsonpCallback: 'jsonpCallback', 
    success: function(data) {

      console.log(data);

      for (var i = 0; i<=2; i++) {
        var dribbleShot = data.shots[i].image_url;
        var dribbleShotUrl = data.shots[i].short_url;

        console.log('img = '+dribbleShot)

        $('#dribbble').children('.dribbble-item:eq('+i+')').children('.item-img').css('background-image', 'url('+dribbleShot+')');
        $('#dribbble').children('.dribbble-item:eq('+i+')').attr('href', dribbleShotUrl);
      }
      //$('#project').html($(data).find("#project").children('.project'));

    },
    complete: function(){
      $('#dribbble').fadeIn(600);
    }



  });
}

dribbble();




