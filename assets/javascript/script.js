$(document).ready(function () {
    // ### Timer component for Option One: Basic Quiz (Timed Form)
    var timer = {
        clockRunning: false,
        intervalId: null,
        container: null,
        start: function () {
            if (!this.clockRunning) {
                this.time = 120;
                this.intervalId = setInterval(this.count.bind(this), 1000);
                this.clockRunning = true;
            }
        },
        stop: function () {
            clearInterval(this.intervalId);
            this.clockRunning = false;
        },
        count: function () {
            this.time--;
            var converted = this.timeConverter(this.time);
            $("#timer").html(converted);
            // console.log(this.time);
            if (this.time <= 0) {
                this.stop();

                //??? How can I keep this timer component separately with this Jquery function ???
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
    //??? Below code is not working to DRY it ???
    // var timer15 = $.extend(true, {}, timer);
    // timer15.time = 15;
    // console.log(timer);
    // console.log(timer15);

    var timer15 = {
        clockRunning: false,
        intervalId: null,
        container: null,
        start: function () {
            if (!this.clockRunning) {
                this.time = 15;
                this.intervalId = setInterval(this.count.bind(this), 1000);
                this.clockRunning = true;
            }
        },
        stop: function () {
            clearInterval(this.intervalId);
            this.clockRunning = false;
        },
        count: function () {
            this.time--;
            var converted = this.timeConverter(this.time);
            $("#timer").html(converted);
            // console.log(this.time);
            if (this.time <= 0) {
                this.stop();

                //??? How can I keep this timer component separately with this Jquery function ???
                // showAnswer
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

    function start() {
        $(".trivia").hide();
        $(".result").hide();
        $(".retry-btn").hide();
    }

    function showAll() {
        $(".intro").hide();
        $(".next-btn").hide();
        $(".trivia").fadeIn(1000);
        timer.start();
    }

    function showScore() {
        timer.stop();
        var score = 0;
        $(".trivia").hide();
        $(".result").fadeIn(2000);
        $(".retry-btn").fadeIn(5000);
        $('input[type="radio"]:checked').each(function () {
            console.log()
            var isCorrect = $(this).parent().parent().attr("value");
            if (isCorrect === '1') score += 10;
            
        });
        if (score === 0) {
            $(".result h2").html("Thank you for checking this out !!! <br><br>BTW... your score is 0 <br><br><br>Do you wanna try it again?<br><br>");
        } else if (score < 50) {
            $(".result h2").html("You got an A for Effort! <br><br>But.... your score is  " + score + "/100.<br><br><br>Let's try again !!!<br><br>");
        } else if (score < 100) {
            $(".result h2").html("Nice try !!! <br><br>Your score is  " + score + "/100 <br><br><br>You might get 100 if you try again !!!<br><br>");
        } else if (score === 100) {
            $(".result h2").html("You got the PERFECT score !!! <br><br><br>Hope you enjoyed it !!!<br><br>")
        }
    }

    function retry() {
        $('input[type="radio"]:checked').each(function () {
            $(this).prop('checked', false);
        });
        $(".result").hide();
        $(".trivia").fadeIn(1000);
        timer.start();
    }

    function showScoreAdv() {
        // timer15.stop();
        // $(".submit-btn").hide();
        // $(".next-btn").hide();
        // $(".result").fadeIn(2000);
        // $(".retry-btn").fadeIn(5000);
        // //??? cannot reference the value of scAdv; ???
        // var scAdv = selectedRadio.scAdv;
        // if (scAdv === 0) {
        //     $(".result h2").html("Thank you for checking this out !!! <br><br>BTW... your score is 0 <br><br><br>Do you wanna try it again?<br><br>");
        // } else if (scAdv < 50) {
        //     $(".result h2").html("You got an A for Effort! <br><br>But.... your score is  " + scAdv + "/100.<br><br><br>Let's try again !!!<br><br>");
        // } else if (scAdv < 70) {
        //     $(".result h2").html("Nice try !!! <br><br>Your score is  " + scAdv + "/100 <br><br><br>You might get 100 if you try again !!!<br><br>");
        // } else if (scAdv === 100) {
        //     $(".result h2").html("You got the PERFECT score !!! <br><br><br>Hope you enjoyed it !!!<br><br>")
        // }
        // $(".retry-btn").on("click", function () {
        //     scAdv = 0;
        //     $(".next-btn").attr('value', '1');
        //     $('input[type="radio"]:checked').each(function () {
        //         $(this).prop('checked', false);
        //     });
        //     retryAdv();
        // });
    }

    function showOne() {
        $(".intro").hide();
        $(".trivia").show();
        $(".question").hide();
        $(".submit-btn").hide();
        $(".q1").show();
        $(".next-btn").show();
        timer15.stop();
        timer15.start();
    }

    function youGotItCorrect() {
        $('.trivia').append("<h1 class='correct'>Congrats !!! Your answer is correct !!!</h1>")
    }

    function retryAdv() {
        $(".result").hide();
        showOne();
    }

    // start
    start();
    // two options: regular and advance
    $('#reg, #adv').on('click', function () {

        // ### reg
        if (this.id === 'reg') {
            showAll();

            //??? How can I keep this timer component separately with this Jquery function ???

            $(".submit-btn").on("click", function () {
                showScore();
            });
            $(".retry-btn").on("click", function () {
                retry();
            }); 
        } 
        
        // ### advance
        if (this.id === 'adv') {
            var scAdv = 0;
            // show first question
            showOne();
            $(".next-btn").on("click", function () {

                timer15.stop();
                timer15.start();
                var selectedRadio = $('input[type="radio"]:checked');
                selectedRadio.each(function () {
                    var currentQuestion = $(this).parent().parent().parent();

                    if ($(currentQuestion).attr("value") === $(".next-btn").val()) {
                        $(".next-btn").attr("value", parseInt($(".next-btn").val()) + 1);
                        // console.log($(".next-btn").val());
                        console.log($(this));
                        $(currentQuestion).hide();
                        $(".next-btn").hide();

                        // * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.


                        // * If the player selects the correct answer, show a screen congratulating them for choosing the right option. 
                        // After a few seconds, display the next question -- do this without user input.
                        // console.log($(this).parent().parent().attr('value'));
                        var isCorrect = $(this).parent().parent().attr("value");
                        if (isCorrect === '1') {
                            scAdv += 10;
                            console.log($(this));
                            // console.log(scAdv);
                            youGotItCorrect();
                            setTimeout(() => {
                                $('.correct').hide();
                            }, 3000);
                            setTimeout(() => {
                                $(currentQuestion).next().fadeIn(1000);
                                $(".next-btn").fadeIn(2000);
                            }, 3000);
                        }
                        // * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. 
                        else {
                            // console.log(currentQuestion.children('div[value="1"]').children());
                            var correctAns = currentQuestion.children('div[value="1"]').children().text();
                            var youGotItWrong = "<div class='correctAns'><h3>You selected wrong answer :(</h3><br>The correct answer is: &emsp;<b>" + correctAns + "</b></div>";
                            $(".trivia").append(youGotItWrong);
                            setTimeout(function () {
                                $('.correctAns').hide();
                                $(currentQuestion).next().fadeIn(1000);
                                $(".next-btn").fadeIn(2000);
                            }, 3000);
                        }
                    }
                    if (parseInt($(".next-btn").val()) > 10) {
                        setTimeout(function () {
                            // showScoreAdv();
                            /////
                            console.log("total = " + scAdv);
                            timer15.stop();
                            $(".submit-btn").hide();
                            $(".next-btn").hide();
                            $(".result").fadeIn(2000);
                            $(".retry-btn").fadeIn(5000);
                            if (scAdv === 0) {
                                $(".result h2").html("Thank you for checking this out !!! <br><br>BTW... your score is 0 <br><br><br>Do you wanna try it again?<br><br>");
                            } else if (scAdv < 50) {
                                $(".result h2").html("You got an A for Effort! <br><br>But.... your score is  " + scAdv + "/100.<br><br><br>Let's try again !!!<br><br>");
                            } else if (scAdv < 70) {
                                $(".result h2").html("Nice try !!! <br><br>Your score is  " + scAdv + "/100 <br><br><br>You might get 100 if you try again !!!<br><br>");
                            } else if (scAdv === 100) {
                                $(".result h2").html("You got the PERFECT score !!! <br><br><br>Hope you enjoyed it !!!<br><br>")
                            }
                            $(".retry-btn").on("click", function () {
                                scAdv = 0;
                                $(".next-btn").attr('value', '1');
                                $('input[type="radio"]:checked').each(function () {
                                    $(this).prop('checked', false);
                                });
                                retryAdv();
                            });
                            /////
                        }, 1000);
                    }

                });

            });
        }





    });

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
