const timeDelay = 3000;

function IsNumeric(n) {
    return !isNaN(n);
}

function spin() {
    var promise = $("#my_audio").get(0).play();
    var numLow = $("#lownumber").val();
    var numHigh = $("#highnumber").val();
    var listName = $("#listName");
    var result = $("#result");

    if (listName.val() !== "") {

        $("#roller").get(0).play();
        var lines = listName.val().split('\n');
        console.log(lines.length);
        // for (var i = 0; i < lines.length; i++) {
        //     console.log(lines[i]);
        // }
        interval = setInterval(function() {
            var numRandOne = Math.floor(Math.random() * lines.length) + parseFloat(0);
            var numRandTwo = Math.floor(Math.random() * lines.length) + parseFloat(0);
            result.html("<span>" + lines[numRandOne] + "/" + lines[numRandTwo] + "</span>");
        }, 50); // every 0,5 second
        setTimeout(function() {
            clearInterval(interval);
            $("#roller").get(0).pause();
            $("#jackpot").get(0).play();
        }, timeDelay);
    } else {
        var adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;

        if ((IsNumeric(numLow)) && (IsNumeric(numHigh)) && (parseFloat(numLow) <= parseFloat(numHigh)) && (numLow != '') && (numHigh != '')) {

            $("#roller").get(0).play();
            interval = setInterval(function() {
                var numRandOne = Math.floor(Math.random() * adjustedHigh) + parseFloat(0);
                var numRandTwo = Math.floor(Math.random() * adjustedHigh) + parseFloat(0);
                result.html("<span>" + numRandOne + "/" + numRandTwo + "</span>");
            }, 50); // every 1 second
            setTimeout(function() {
                clearInterval(interval);
                $("#roller").get(0).pause();
                $("#jackpot").get(0).play();
            }, timeDelay);
        } else {
            result.text("Chưa nhập số...");
        }
    }
}

$(function() {

    $("#listName").focus();

    $('#isRandomNumber').click(function(e) {
        $("#listName").val("");
    });

    $("#spin").click(function(e) {
        e.preventDefault()
        spin();
    });
    document.addEventListener("keydown", function(event) {
        if (event.keyCode == '32') {
            spin();
        }
        // console.log(event.which);
    })
});