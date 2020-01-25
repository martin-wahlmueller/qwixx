$(document).ready(function () {

    $(":button").on("click", function (event) {
        tickButtonNew(event);
    });

    calculateFailX("gray");
    calculateX("red");
    calculateX("yellow");
    calculateX("green");
    calculateX("blue");
    calculateTotalScore();
});

function tickButtonNew(event) {
    var clickedButton = $(event.target);

    var color = getColor(clickedButton);
    tickButton(event, color);
}

function getColor(element) {
    if (element.hasClass("red")) {
        return "red";
    } else if (element.hasClass("yellow")) {
        return "yellow";
    } else if (element.hasClass("green")) {
        return "green";
    } else if (element.hasClass("blue")) {
        return "blue";
    } else {
        return "no color";
    }
}

function tickButton(event, color) {
    var clickedButton = $(event.target);

    if (clickedButton.val() !== "key") {

        var validateRightButtonRule = isClickedButtonRightFromLastCrossdButton(color, clickedButton.val());
        var validateForeLast = isCrossedButtonForeLast(color, clickedButton.val());
        var validateGreaterThanFour = isCrossedCountGreaterThanFour(color);

        if (validateRightButtonRule) {
            if (validateForeLast) {
                if (validateGreaterThanFour) {
                    clickedButton.val("X");
                    clickedButton.addClass("ticked");
                    var keyButton = $("#" + color + "key");
                    keyButton.val("X");
                    keyButton.addClass("ticked");
                } else {
                    alert("Du musst zuerst mindestens 5 Kreuze haben, bevor die die letzte Zahl ankreuzt!");
                }
            } else {
                clickedButton.val("X");
                clickedButton.addClass("ticked");
            }
        } else {
            alert("Werte links vom letzten 'X' dürfen nicht angeglickt werden!");
        }
    }

    calculateX(color);
    calculateFailX("gray");

    calculateTotalScore();
}

function calculateX(color) {
    var scoreElement = $("#" + color + "score");
    var countX = 0;
    var buttons = $("." + color + ", ticked, button");
    buttons.each(function () {
        if ($(this).val() === "X") {
            countX++;
        }       
    });
    scoreElement.val(calculateScore(countX));
}

function calculateFailX(color) {
    var scoreElement = $("#" + color + "score");
    var countX = 0;
    var buttons = $("." + color + ", ticked, button");
    buttons.each(function () {
        if ($(this).val() === "X") {
            countX++;
        }
    });
    scoreElement.val(calculateFail(countX));
}

function calculateScore(countX) {
    var array = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
    return array[countX];
}

function calculateFail(countX) {
    var array = [0, -5, -10, -15, -20];
    return array[countX];
}

function calculateTotalScore() {
    var redScore = parseInt($("#redscore").val()) ? parseInt($("#redscore").val()) : 0;
    var yellowScore = parseInt($("#yellowscore").val()) > 0 ? parseInt($("#yellowscore").val()) : 0;
    var greenScore = parseInt($("#greenscore").val()) > 0 ? parseInt($("#greenscore").val()) : 0;
    var blueScore = parseInt($("#bluescore").val()) > 0 ? parseInt($("#bluescore").val()) : 0;
    var grayScore = parseInt($("#grayscore").val()) < 0 ? parseInt($("#grayscore").val()) : 0;

    var sum = redScore + yellowScore + greenScore + blueScore + grayScore;
    $("#totalscore").val(sum);
}

function isClickedButtonRightFromLastCrossdButton(color, crossIndex) {
    var buttons = $(".button");
    buttons = buttons.filter("." + color);
    buttons = buttons.filter(".ticked");
    if (buttons.length === 0) {
        return true;
    }

    var id = new String(buttons.last().attr("id"));
    id = parseInt(id.replace(color, ""));

    if ((color === "red") || (color === "yellow")) {
        if (id <= crossIndex) {
            return true;
        } else {
            return false;
        }
    } else if ((color === "green") || (color === "blue")) {
        if (id <= crossIndex) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function isCrossedButtonForeLast(color, crossIndex) {
    var isValid = false;
    if ((color === "red") || (color === "yellow")) {
        if (crossIndex == 12) {
            isValid = true;
        }  
    } else if ((color === "green") || (color === "blue")) {
        if (crossIndex == 2) {
            isValid = true;
        } 
    }
    return isValid;
}

function isCrossedCountGreaterThanFour(color) {
    var isValid = false;

    var countX = 0;
    var buttons = $("." + color + ", ticked, button");
    buttons.each(function () {
        if ($(this).val() === "X") {
            countX++;
        }
    });

    if (countX > 4) {
        isValid = true;
    }

    return isValid;
}

