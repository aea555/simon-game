var colors = ["red", "green", "yellow", "blue"]
var gamePattern = []
var userClickPattern = []
var level = 0
let toggler = false

let showLevel = () => {
    $("#level-title").text("Level " + level)
}

let playAudio = (color) => {
    let audio = new Audio("sounds/" + color + ".mp3")
    audio.play()
}

let animate = (color) => {
    $("#" + color).fadeIn(300).fadeOut(300).fadeIn(300)
}

let createRandomColor = () => {
    let randomColor = colors[Math.floor(Math.random() * 4)]
    return randomColor
}

let reset = () => {
    setTimeout(function() {
        $("#level-title").text("Game over, click the button below to restart")
        $("body").addClass("game-over")
        playAudio("wrong")
        $(".refresh-button").removeClass("undisplayed")
        $(".btn").addClass("undisplayed")
        toggler = false
    }, 200)
}

////////////////////////////////////////////////////////////////////////////////////
let createStep = () => {
    let step = createRandomColor()
    gamePattern.push(step)
    animate(step)
    playAudio(step)
}

let handleClick = (clickedButton) => {
    let clickedColor = $(clickedButton).attr("id")
    userClickPattern.push(clickedColor)
    $("#" + clickedColor).addClass("pressed")
    playAudio(clickedColor)
    animate(clickedColor)
    $("#" + clickedColor).removeClass("pressed")
}

let check = () => {
    if (gamePattern.length === userClickPattern.length) {
        if (checkPattern(gamePattern, userClickPattern)) {
            level++
            showLevel()
            userClickPattern = []
            setTimeout(function() {
                createStep()
            }, 900)
        } else {
            reset()
        }
    }
}

let checkPattern = (a, b) => {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

let go = () => {
    createStep()
    $(".btn").click(function() {
        handleClick($(this))
        check()
    })
}

$(document).keypress(function() {
    $("body").removeClass("game-over")
    if (toggler === false) {
        level++
        $("#level-title").text("Level " + level)
        go()
        toggler = true
    }
})

$("#level-title").on("click", function() {
    $("body").removeClass("game-over")
    if (toggler === false) {
        level++
        $("#level-title").text("Level " + level)
        go()
        toggler = true
    }
})
