$(document).ready(function () {
    insertRow("red");
    insertRow("yellow");
    insertRowReverse("green");
    insertRowReverse("blue");
    insertFail("gray");
});

function insertRow(color) {
    var main = $("#main");
    valuesForward().forEach(function (item) {
        var button = $("<input>").attr("type", "button").attr("value", item);
        button.attr("id", color + item);
        button.attr("class", "button " + color);
        button.on("click", function (event) {
            tickButton(event, color);
        });
        main.append(button);
    });
    main.append("</br>");
}

function insertRowReverse(color) {
    var main = $("#main");
    valuesBackward().forEach(function(item) {
        var button = $("<input>").attr("type", "button").attr("value", item);
        button.attr("id", color + item);
        button.attr("class", "button " + color);
        button.on("click", function (event) {
            tickButton(event, color);
        });
        main.append(button);
    });
    main.append("</br>");
}

function insertFail(color) {
    var main = $("#main");
    for (i = 0; i < 4; i++) {
        var button = $("<input>").attr("type", "button");
        button.attr("id", color + i);
        button.attr("class", "button " + color);
        button.on("click", function (event) {
            tickButton(event, color);
        });
        main.append(button);
    }
    main.append("</br>");
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
    var redScore = parseInt($("#redscore").val()) > 0 ? parseInt($("#redscore").val()) : 0;
    var yellowScore = parseInt($("#yellowscore").val()) > 0 ? parseInt($("#yellowscore").val()) : 0;
    var greenScore = parseInt($("#greenscore").val()) > 0 ? parseInt($("#greenscore").val()) : 0;
    var blueScore = parseInt($("#bluescore").val()) > 0 ? parseInt($("#bluescore").val()) : 0;
    var grayScore = parseInt($("#grayscore").val()) < 0 ? parseInt($("#grayscore").val()) : 0;

    var sum = redScore + yellowScore + greenScore + blueScore + grayScore;
    $("#totalscore").val(sum);
}

function valuesForward() {
    return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "key"];
}

function valuesBackward() {
    return [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "key"];
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

