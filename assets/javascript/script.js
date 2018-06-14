


var intervalId;

$(document).ready(function () {

    // ### Option One: Basic Quiz (Timed Form)
    var timeCount = {
        time: 120,
        reset: function () {
            clearInterval(intervalId);
            this.time = 120;
        },
        start: function () {
            intervalId = setInterval(this.count, 100);
        },
        stop: function () {
            clearInterval(intervalId);
        },
        count: function () {
            timeCount.time--;
            // console.log(timeCount.timeConverter(timeCount.time));
            $("#timer").html(timeCount.timeConverter(timeCount.time));

            if (timeCount.time <= 0) {
                timeCount.stop();
                showScore();
            }
        },
        timeConverter: function (t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes + ":" + seconds;
        }
    }

    // ### Option Two: Advanced Assignment (Timed Questions)
    var timeCountAdv = {
        time: 15,   //??? this initial time setup is the only difference.  Can I make it DRY ???
        reset: function () {
            clearInterval(intervalId);
            this.time = 15;
        },
        start: function () {
            intervalId = setInterval(this.count, 500);
        },
        stop: function () {
            clearInterval(intervalId);
        },
        count: function () {
            timeCount.time--;
            // console.log(timeCount.timeConverter(timeCount.time));
            $("#timer").html(timeCount.timeConverter(timeCount.time));

            if (timeCount.time <= 0) {
                timeCount.stop();
                showScore();
            }
        },
        timeConverter: function (t) {
            var seconds = t;

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return "00:" + seconds;
        }
    }

    function showScore() {
        var score = 0;
        $(".trivia").hide();
        $(".result").fadeIn(2000);
        $(".try").fadeIn(5000);
        $('input[type="radio"]:checked').each(function () {
            if (this.value === '1') {
                score += 10;
            }
        });
        if (score === 0) {
            $(".result h2").html("Thank you for checking this out !!! <br><br>BTW... your score is 0 <br><br><br>Do you wanna try it again?<br><br>");
        } else if (score < 50) {
            $(".result h2").html("You got an A for Effort! <br><br>But.... your score is  " + score + "/100.<br><br><br>Let's try again !!!<br><br>");
        } else if (score < 70) {
            $(".result h2").html("Nice try !!! <br><br>Your score is  " + score + "/100 <br><br><br>You might get 100 if you try again !!!<br><br>");
        } else if (score === 100) {
            $(".result h2").html("You got the PERFECT score !!! <br><br><br>Hope you enjoyed it !!!<br><br>")
        }
    }

    // start the game
    // default .trivia & .result are hidden
    $(".trivia").hide();
    $(".result").hide();
    $(".try").hide();
    // two options: regular and advance
    $('#reg, #adv').on('click', function () {

        // if regular
        if (this.id === 'reg') {
            $(".intro").hide();
            $(".next").hide();
            $(".trivia").fadeIn(1000);
            timeCount.start();

            //??? can I call this condition outside of the timeCount.count() so I can have both this and button to trigger the event ???
            // if time === 0 || click on .submit, show score
            // if (timeCount.time == 0) {
            //     showScore();
            // }

            $(".submit").on("click", function () {
                showScore();
                timeCount.stop();
            });

            // if click on .try, go back to the game
            $(".try").on("click", function () {
                $(".result").hide();
                $(".trivia").fadeIn(1000);
                timeCount.reset();
                timeCount.start();
            });

        // if advance
        } else if (this.id === 'adv') {
            var nthQuestion = 2;
            $(".intro").hide();
            $(".trivia").show();
            $(".question").hide();
            $(".q1").show();
            $(".submit").hide();
            // start from this
            $(".next").on("click", function () {
                console.log(nthQuestion);
                $(".trivia .question:nth-child(" + nthQuestion + ")").show();
                $(".trivia .question:nth-child(" + (nthQuestion - 1) + ")").hide();
                nthQuestion++;
            });
        }






    });
    // $(".trivia").hide();
    // $(".result").hide();
    // $(".try").hide();

    // // game starts on click on body
    // $("body").one("click", function() {
    //     $(".intro").hide();
    //     $(".trivia").fadeIn(1000);
    //     timeCount.start();
    // });

    // //??? can I call this condition outside of the timeCount.count() so I can have both this and button to trigger the event ???
    // // if time === 0 || click on .submit, show score
    // // if (timeCount.time == 0) {
    // //     showScore();
    // // }

    // $(".submit").on("click", function() {
    //     showScore();
    //     timeCount.stop();
    // });

    // // if click on .try, go back to the game
    // $(".try").on("click", function() {
    //     $(".result").hide();
    //     $(".trivia").fadeIn(1000);
    //     timeCount.reset();
    //     timeCount.start();
    // });











});





// answers
console.log("answers:");
console.log("1. C. John and Mary");
console.log("2. C. in the 19th century, when it became a symbol of the abolition of slavery");
console.log("3. A. Buttermilk");
console.log("4. C. a four-story Georgian-style home in Missouri");
console.log("5. B. compact disk player");
console.log("6. C. Byron Nelson");
console.log("7. C. Willie Mays");
console.log("8. B. 18");
console.log("9. A. cocker spaniel");
console.log("10. D. Joe Louis");
