$(document).ready(function() {

  SetActiveWindow();
  $(window).resize(function(){
    SetActiveWindow();
  });


  $("body").click(function(){
    console.log("body is clicked");
    $(".contextmenu").remove();
  });
  
});
function SetActiveWindow()
{
  SetDesktopSize();
}
function SetDesktopSize()
{
  var docHeight = Math.floor($(window).height());
  var docWidth = $(window).width();
  var topSpace = Math.floor($(".header").outerHeight(true) + $(".toolbar").outerHeight(true));
  var availableHeight = docHeight - topSpace - 32;
  var availableWidth = docWidth - 32;
  var aspectRatio = availableWidth/availableHeight;
  var iMacRatio = 16/9.0;
  var desktop_height = 0;
  var desktop_width = 0;
  if(aspectRatio <= iMacRatio)
  {
    //This means that width is the limiting factor
    desktop_width = Math.floor(availableWidth);
    desktop_height = Math.floor(desktop_width/iMacRatio);
  }
  else
  {
    //This means that height is the limiting factor
    desktop_height = Math.floor(availableHeight);
    desktop_width = Math.floor(desktop_height * iMacRatio);
  }

  $("#iMac").outerWidth(desktop_width);
  $("#iMac").outerHeight(desktop_height);

  $("#iPhone").parent().css("display", "none");
  $("#iMac").parent().css("display","block");

  $("#iMac .display_canvas").addClass("active-display");

  SetGrid("md");
}

function SetMobileSize()
{
  var docHeight = Math.floor($(document).height());
  var docWidth = $(document).width();
  var topSpace = Math.floor($(".header").outerHeight(true) + $(".toolbar").outerHeight(true));
  var padding_top_bottom = $("#iPhone").css("padding-top");
  var availableHeight = docHeight - topSpace - 32;
  var availableWidth = docWidth - 32;
  var aspectRatio = availableWidth/availableHeight;
  var iMacRatio = 16/9.0;
  var desktop_height = 0;
  var desktop_width = 0;
  if(aspectRatio <= iMacRatio)
  {
    //This means that width is the limiting factor
    desktop_width = Math.floor(availableWidth);
    desktop_height = Math.floor(desktop_width/iMacRatio);
  }
  else
  {
    //This means that height is the limiting factor
    desktop_height = Math.floor(availableHeight);
    desktop_width = Math.floor(desktop_height * iMacRatio);
  }

  $("#iMac").outerWidth(desktop_width);
  $("#iMac").outerHeight(desktop_height);
  $("#iMac").parent().css("display","block");
}

//screenSize is like lg or sm or md or xl or xs
function SetGrid(screenSize)
{
  if(!$(".display_canvas.active-display").hasClass("container-fluid"))
  {
    $(".display_canvas.active-display").addClass("container-fluid");
    $(".display_canvas.active-display").append(AddNewRow(screenSize));
  }
}

function AddNewRow(screenSize)
{
  rowString = "<div class='row'>"
  for(i=0; i<12; i+=1)
  {
    rowString += "<div class='col-lg-1 col-md-2 col-sm-4 col-xs-6' layout-col-num="+String(i+1)+"></div>";
  }
  rowString += "</div>"
  return rowString;
}