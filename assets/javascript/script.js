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

// show answers
console.log("answers:");
for (var i = 0; i < answerArr.length; i++) {
    console.log(answerArr[i]);
}

$(document).ready(function () {

    // ### Timer component for Option One: Basic Quiz (Timed Form)
    var timer = {
        clockRunning: false,
        intervalId: null,
        container: null,
        start: function () {
            if (!this.clockRunning) {
                this.time = 120;
                this.intervalId = setInterval(this.count.bind(this), 10);
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

    var showAdv = {
        questionNum: 0,
        score: 0,

        moveToQuestion: function () {
            $(".intro").hide();
            $(".triviaAdv").show();
        },

        addQuestion: function () {
            var mc = '';
            for (var i = 0; i < mcArr[this.questionNum].length; i++) {
                mc += '<div class="mc mc' + i + '">' + mcArr[this.questionNum][i] + '</div>'
            }
            var question = '<div class="question q1" id="1" value="1"><h5>' + questionArr[this.questionNum] + '</h5>' + mc + '<br></div>'
            $('.triviaAdv').html(question);
            // $('.triviaAdv').append(this.next_btn);
            this.chooseAnswer();
        },

        chooseAnswer: function () {
            $('.mc').on('click', this, function () {
                $(this).toggleClass('selectedAnswer');
                if ($(this).text() === answerArr[showAdv.questionNum]) {
                    // console.log(true);
                    showAdv.ifCorrect();
                } else {
                    showAdv.ifWrong();
                }
            });
        },

        ifCorrect: function () {
            var correct = "<h1 class='correct'>Congrats!!! You got it Correct!!!</h1>";
            this.score += 10;
            $('.triviaAdv').html(correct);
            this.ifAnswered();
        },

        ifWrong: function () {
            var wrong = "<div class='correctAns'><h3>You selected wrong answer :(</h3><br>The correct answer is: &emsp;<b>" + answerArr[this.questionNum] + "</b></div>";
            // console.log(wrong);
            $('.triviaAdv').html(wrong);
            this.ifAnswered();
        },

        ifAnswered: function () {
            setTimeout(() => {
                $('.triviaAdv:first-child').hide();
                this.questionNum++;
                console.log(this.questionNum);
                if (this.questionNum === 10) {
                    this.showScore();
                } else {
                    this.addQuestion();
                }
            }, 1000);
        },

        showScore: function () {
            if (this.score === 0) {
                $(".triviaAdv").html("<h2>Thank you for checking this out !!! <br><br>BTW... your score is 0 <br><br>Do you wanna try it again?<br><br><br></h2>");
            } else if (this.score < 50) {
                $(".triviaAdv").html("<h2>You got an A for Effort! <br><br>But.... your score is  " + this.score + "/100.<br><br>Let's try again !!!<br><br><br></h2>");
            } else if (this.score < 100) {
                $(".triviaAdv").html("<h2>Nice try !!! <br><br>Your score is  " + this.score + "/100 <br><br><br>You might get 100 if you try again !!!<br><br><br></h2>");
            } else if (this.score === 100) {
                $(".triviaAdv").html("<h2>You got the PERFECT score !!! <br><br>Hope you enjoyed it !!!<br><br><br></h2>");
            }
            $('.triviaAdv').append('<button type="button" class="btn btn-success" id="retry-btn">Try Again</button>');
        },

    }

    $('#adv').on('click', function () {
        showAdv.moveToQuestion();
        showAdv.addQuestion();
    });

    $('#retry-btn').on('click', function () {
        showAdv.score = 0;
        showAdv.questionNum = 0;
        showAdv.addQuestion();
    });




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



    // start
    start();

    // ### reg
    $('#reg').on('click', function () {
        showAll();

        //??? How can I keep this timer component separately with this Jquery function ???

        $(".submit-btn").on("click", function () {
            showScore();
        });
        $(".retry-btn").on("click", function () {
            retry();
        });
    });
});




