var questionArr = [
    "1. In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
    "2. When did the Liberty Bell get its name?",
    "3. In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
    "4. The Daniel Boon museum at the home where he died can best be described how?",
    "5. Which of the following items was owned by the fewest U.S. homes in 1990?",
    "6. Who holds the record for the most victories in a row on the professional golf tour?",
    "7. Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
    "8. In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",
    "9. During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
    "10. The first black American pictured on a U.S. postage stamp was who?"
];

var mcArr = [
    ["A. William and Elizabeth", "B. Joseph and Catherine", "C. John and Mary", "D. George and Anne"],
    ["A. when it was made, in 1701", "B. when it rang on July 4, 1776", "C. in the 19th century, when it became a symbol of the abolition of slavery", "D. none of the above"],
    ["A. Buttermilk", "B. Daisy", "C. Scout", "D. Tulip"],
    ["A. a log cabin in Kentucky", "B. a two-story clapboard house in Tennessee", "C. a four-story Georgian-style home in Missouri", "D. a three story brick house in Arkansas"],
    ["A. home computer", "B. compact disk player", "C. cordless phone", "D. dishwasher"],
    ["A. Jack Nicklaus", "B. Arnold Palmer", "C. Byron Nelson", "D. Ben Hogan"],
    ["A. Reggie Jackson", "B. Harmon Killebrew", "C. Willie Mays", "D. Frank Robinson"],
    ["A. 8", "B. 18", "C. 38", "D. 58"],
    ["A. cocker spaniel", "B. German shepherd", "C. Labrador retriever", "D. poodle"],
    ["A. Frederick Douglass", "B. Booker T. Washington", "C. Louis Armstrong", "D. Joe Louis"]
];

var answerArr = [
    "C. John and Mary",
    "C. in the 19th century, when it became a symbol of the abolition of slavery",
    "A. Buttermilk",
    "C. a four-story Georgian-style home in Missouri",
    "B. compact disk player",
    "C. Byron Nelson",
    "C. Willie Mays",
    "B. 18",
    "A. cocker spaniel",
    "D. Joe Louis"
];

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

    var showAll1 = {
        addQuestions: function () {
            for (var i = 0; i < questionArr.length; i++) {
                var mc = '';
                for (var j = 0; j < mcArr[i].length; j++) {
                    mc += '<div class="mc mc'+ i +'">' + mcArr[i][j] + '</div>'
                }
                var question = '<div class="question q1" id="1" value="1"><h5>' + questionArr[i] +'</h5>' + mc + '<br></div>'
                $('.trivia').append(question);
            }
            $('.trivia').append(this.submit_btn);

            /////
            $('.mc').on('click', this, function () {
                $('.mc').css('font-weight', 'bold');
            })
        },
        submit_btn: '<button type="button" class="btn btn-success submit-btn">Submit</button>'
    }
    // showAll1.addQuestions();




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
