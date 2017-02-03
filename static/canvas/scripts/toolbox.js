$(document).ready(function(){
  
  $(".xbar .close").click(function(e){
    $(".toolbox").css("display", "none");
    e.stopPropagation();
  }); //End of $(".xbar .close").click(function(){})

  $(".toolbox .xbar").click(function(e){
    e.stopPropagation();
    console.log($(".toolbox").css("bottom"));
    if($(".toolbox").css("bottom")== "0px")
    {
      $(".toolbox").animate({"bottom": "-75%", "margin-bottom":"2em"}, "slow");
    }
    else
    {
      $(".toolbox").animate({"bottom": "0em", "margin-bottom":"0em"}, "slow");
    }
  });
  LoadToolbox();
});
function LoadToolbox()
{
  //$(".toolbox-box").empty();
  $.getJSON( "static/canvas/toolbox/toolbox.json", function(tagData) {
    //tags = $.parseJSON(tagData);
    var panelMenu = "";
    $.each(tagData["toolbox"], function(key, tag){
      menuItem = "<div class='toolbox-item fancyFont' unique-id='"+key+"'>";
      menuItem += "<span class='mdi "+tag["icon"]+"'></span><br/>";
      menuItem += tag["display_name"].toUpperCase();
      menuItem += "</div>";

      panelMenu += menuItem;
      //console.log(tag["display_name"]);
      //https://cdn.materialdesignicons.com/1.8.36/
      //https://wwww.materialdesignicons.com
    });
    $(".toolbox-box").append(panelMenu);
    LoadAddableElements(tagData["toolbox"]);
  });
}
function LoadAddableElements(tagDictionary)
{
  $(".toolbox-item").click(function(){
    var unique_id = $(this).attr("unique-id");
    var code_block = tagDictionary[unique_id]["code-block"];
    code_block = $(code_block);
    $(code_block).attr("unique-id", unique_id);
    $(".display_canvas").append(code_block);
    //RightClick context_menu to open the properties window    
    //Resizable
    
    //Draggable
    setDraggable(unique_id);
  });
}