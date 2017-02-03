function newTyped(){ /* A new typed object */ }

function foo(){ console.log("Callback"); }

function newPage_func()
{
  $(".nextpage").css("background-color", "#f2f2f2");
  $(".nextpage").css("display", "block");

  $("#codeman").css("z-index", "0");
  
  $(".nextpage").animate({
    left: '0'
  }, 800);

  // $("#codeman").animate({
  //   width:"4em",
  //   top:"0.5em",
  //   right:"-1.5em"
  // },1600);
  
  setTimeout(function() {
    window.location.href = "canvas";
  }, 900);
}

$(document).ready(function(){

  $("#typed").typed({
      // strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
      stringsElement: $('#typed-strings'),
      typeSpeed: 30,
      backDelay: 500,
      loop: false,
      contentType: 'html', // or text
      // defaults to false for infinite loop
      loopCount: false,
      callback: function(){ foo(); },
      resetCallback: function() {newTyped();}
  });

  $(".reset").click(function(){
      $("#typed").typed('reset');
  });
  $(".nextpage_link").click(function(){
    newPage_func();
  });

});