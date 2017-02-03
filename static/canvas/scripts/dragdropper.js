function setDraggable(unique_id)
{
      $(".display_canvas [unique-id='"+unique_id+"']").custommouse({
      mouseStart: function(e) {
        this.canvas = $(".display_canvas.active-display");
        this.element = getElementFromPoint(e);
        this.draggableElement = wrapDraggable(this.element, ".display_canvas.active-display");

        this.originalElementPosition = $(this.canvas).offset();
        this.scaler =Math.round(1/$(this.draggableElement).css("zoom"));
        this.dragStart = { left: this.scaler*(e.pageX - this.originalElementPosition.left), top: this.scaler*(e.pageY - this.originalElementPosition.top) };
        console.log("Starting mousemove");
      },

      mouseDrag: function(e) {
        $(this.draggableElement).css({
          left: this.scaler * (e.pageX - this.originalElementPosition.left),
          top:  this.scaler * (e.pageY - this.originalElementPosition.top)
        });
        allHovers = getAllElementsFromPoint(e);

        if(allHovers.length == 0)
        {
          //This means that the user dragged off the display
          $(this.draggableElement).remove();
          return false;
        }
        else if(allHovers.length == 1)
        {
          //Find the neighbors on either side and insert it in the dom
          $(".previewObj").remove();
          $previewElement = $(this.draggableElement).clone();
          $($previewElement).wrapInner("<div class='previewObj'></div>");
          $previewElement = $($previewElement).find(".previewObj").unwrap();
          $(this.canvas).append($previewElement);
          $(this.draggableElement).css("display", "none");
        }
        else
        {
          //Get the Parent to insert into
          //Then Find the neighnors on either side to insert it in the dom in the right place.
          
          //First, make sure that i'm not dropping on myself: 
          if(allHovers.indexOf(this.element)>=0)
          {
            $(".previewObj").remove();
            $(this.draggableElement).css("display", "block");
          }
          else
          {
            //Now we're talking.
          }
        }
      },
      mouseStop: function(e) {
        $(this.draggableElement).remove();

      },
      mouseCapture: function(e) {
        // Optional event handler: Return false here when you want to ignore a
        // drag-and-drop sequence, so the start/drag/stop events don't fire ...
        return true;
      }

      // Goodies from the Mouse plugin:
      // Minimum distance in pixels before dragging is triggered
      //distance: 1
      // Minimum time in milliseconds before dragging is triggered
      //delay: 0
    });
}
function wrapDraggable(sentElement, attachTo)
{
  wrapInner = $(sentElement).clone();
  $(wrapInner).wrap("<div class='mover'></div>").parent().appendTo(attachTo);
  return $(".mover");
}
function getElementFromPoint(e)
{
  return document.elementFromPoint(e.clientX, e.clientY);
}

function getAllElementsFromPoint(e)
{
  var clickX = e.pageX
        ,clickY = e.pageY
        ,$list
        ,offset
        ,range;

    $list = $('.display_canvas').find("*").filter(function() {
        offset = $(this).offset();
        range = {
            x: [offset.left,
                offset.left + $(this).outerWidth()],
            y: [offset.top,
                offset.top + $(this).outerHeight()]
        };
        return ((clickX >= range.x[0] && clickX <= range.x[1]) && (clickY >= range.y[0] && clickY <= range.y[1]) && !$(this).hasClass("mover") && !$(this).hasClass("previewObj"));
    });

    offset = $('.display_canvas').offset();
    sizer = {width: $('.display_canvas').outerWidth(), height: $('.display_canvas').outerHeight()};
    range = {
      x: [offset.left, offset.left + sizer.width],
      y: [offset.top, offset.top + sizer.height]
    };
    
    // console.log(String(range.x[0]) + ", " + String(range.y[0])+ ", " + String(range.x[1])+ ", " + String(range.y[1]));
    list = [];

    if((clickX >= range.x[0] && clickX <= range.x[1]) && (clickY >= range.y[0] && clickY <= range.y[1]))
    {
      list.push($(".display_canvas"));
    }

    $.each($list, function(i, item){
      list.push(item);
    });
    return list;
}