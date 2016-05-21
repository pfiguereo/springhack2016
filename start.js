var canvas;

function setBackgroundImage(url) {
    canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas), {
      originX: 'left',
      originY: 'top',
      height: canvas.getHeight(),
      width: canvas.getWidth()
    });
}

function addImage(imagePath) {
    fabric.Image.fromURL(imagePath, function(image) {
    
      image.set({
        left: 0,
        top: 0
      })
      .setCoords();
      canvas.add(image);
    });
};



$(document).on('ready', function(e) {

    canvas = new fabric.Canvas('c');

    $("img").on("click", function(event){
        var background= event.currentTarget.currentSrc;
        setBackgroundImage(background);
        console.log(background);
    });    
    
    
    $("button.add_image").on('click', function(event){
        console.log(event);
        var image= $(this).data("image");
        addImage(image);
    });
    
    $(".clear_button").on('click', function(event){
        canvas.clear();
    });
    
    $(".delete_button").on('click', function(event){
        canvas.remove(canvas.getActiveObject()); 
    });

    canvas.forEachObject(function(obj) {
        var setCoords = obj.setCoords.bind(obj);
        obj.on({
            moving: setCoords,
            scaling: setCoords,
            rotating: setCoords
        });
    })

    
    canvas.renderAll();
    
});
