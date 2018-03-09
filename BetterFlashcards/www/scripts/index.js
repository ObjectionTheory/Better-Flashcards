// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        
        var storage = window.localStorage;

        storage.setItem("lists", JSON.stringify({
            default: 'breadlist'
        }));

        storage.setItem("breadList", JSON.stringify({

        }));
        storage.setItem('bread', JSON.stringify(
            { front: 'βεκος', back: 'Bread in ancient Phrygian' }
        ));

        var first = storage.getItem("lists").default;
        var bread = JSON.parse(storage.getItem(first));

        var firstCard = new Flashcard("Bread", bread.front, bread.back);
        
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function addListToStorage(key, list) {
        var storage = window.localStorage;
        storage.setItem(key, list);
    }

    function Flashcard(name, frontText, backText) {
        var card = $(document.createElement('div'));
        var content = $(document.createElement('div')); 
        var front = $(document.createElement('div'));
        var back = $(document.createElement('div'));
        var position = "right";
        var moveDistance = "100%";
       
        card
            .appendTo($("#main"))
            .attr({
                class: "card",
                id: name,
                top: "50%"
            });

        front
            .appendTo(card)
            .attr({
                class: "front card-interior",
                id: name + "-front"
            })
        .html("<div class='card-text-front'>" + frontText + "</div>");

        back
            .appendTo(card)
            .attr({
                class: "back card-interior",
                id: name + "-back"
            })
        .html("<div class='card-text-back'>" + backText + "</div>");

        $(".card-text-front").fitText(0.5);
        $(".card-text-back").fitText();

        var frontImage = SVG(name + "-front").size('100%', '100%');
        var backImage = SVG(name + "-back");
        $.get('./images/Card.svg', function (contents) {
            var $tmp = $('svg', contents);
            frontImage.svg($tmp.html());

            backImage.svg($tmp.html());
            back.find("#layer2").attr("fill", "#ccc");
                //.flip('x', '50%');
        }, 'xml');

        card.flip({ 
            trigger: 'click',
            forceWidth: true,
            forceHeight: true
        });

        card.bind("tap", tapHandler);
        $("#main").add(card).on("swipeleft", swipeLeftHandler);
        $("#main").add(card).on("swiperight", swipeRightHandler);
        
        function tapHandler(event) {
        }

        function swipeLeftHandler(event) {
            if (position === "right") {
                move("-" + moveDistance);
                position = "center";
            } else if (position === "center") {
                move("-" + moveDistance);
                position = "left";
            }
            
        }

        function swipeRightHandler(event) {
            if (position === "left") {
                move(moveDistance);
                position = "center";
            } else if (position === "center") {
                move(moveDistance);
                position = "right";
            }
        }

        function move(distance) {
            card.animate({
                'marginLeft': "+=" + distance
            }, 'fast');
        }
    }

    

    
    

})();