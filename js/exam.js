window.addEventListener("load", function () {
    const QUESTIONS = 4, TOTAL = 100;
    const studentName = document.getElementsByClassName('name');
    const lastQuestions = document.querySelectorAll('input[name="question' + QUESTIONS + '"]');
    const time = document.getElementById("time");
    const studentDegree = document.getElementById("degree");
    const next = document.getElementById("next");
    const previous = document.getElementById("previous");
    const popup = document.getElementById("popup");
    const again = document.getElementById("again");

    function startExam() {
        let counter = 1;
        hideAll();
        document.getElementById("quiz" + counter).setAttribute("style", "display: block;");
        previous.disabled = true;   // disable previous button

        studentName[0].innerText = getName();
        next.addEventListener("click", function () {
            if (counter >= QUESTIONS) {
                // here i am stand on the last question
                // and i sure that all questions are answered
                // now i can finish the exam

                stopTimer();
            } else {
                counter++;
                if (counter != 1) {
                    previous.disabled = false;  // enable previous button
                }
                if (counter == QUESTIONS) {
                    next.setAttribute("value", "Finish");
                    if (!isAllChecked()) {
                        next.disabled = true;   // disable finish button
                    }
                }
                hideAll();
                document.getElementById("quiz" + counter).setAttribute("style", "display: block;");
            }
        });

        previous.addEventListener("click", function () {
            if (counter <= 1) {
                //
            } else {
                counter--;
                if (counter != QUESTIONS) {
                    next.setAttribute("value", "Next");
                    next.disabled = false;      // enable finish button
                }
                if (counter == 1) {
                    previous.disabled = true;   // disable previous button
                }
                hideAll();
                document.getElementById("quiz" + counter).setAttribute("style", "display: block;");
            }
        });

        lastQuestions.forEach(lastQuestion => lastQuestion.addEventListener('change', function (event) {
            if (!isAllChecked()) {          // means that there is at least one question not answered
                next.disabled = true;       // disable finish button
            } else {                        // means that all questions are answered
                next.disabled = false;      // enable finish button
            }
        }));

        time.innerText = "00 : 00";
        let seconds = 0;
        let minutes = 0;
        timerId = setInterval(function () {
            if (minutes >= 1) {
                stopTimer();
            } else {
                if (seconds > 9) {
                    time.innerText = "0" + minutes + " : " + seconds;
                } else {
                    time.innerText = "0" + minutes + " : " + "0" + seconds;
                }

                if (seconds >= 59) {
                    seconds = 0;
                    minutes++;
                } else {
                    seconds++;
                }
            }
        }, 1000);
    }

    function hideAll() {
        for (let i = 1; i <= QUESTIONS; i++) {
            document.getElementById("quiz" + i).setAttribute("style", "display: none;");
        }
        popup.setAttribute("style", "display: none;");
    }

    function isAllChecked() {
        // before finishing the exam i must check if all questions is answered
        for (let i = 1; i <= QUESTIONS; i++) {
            if (document.querySelector("input[name='question" + i + "']:checked") == null) {
                // there is some questions are not answered, you can't finish
                return false;
            }
        }
        // all questions are answered, you can finish
        return true;
    }

    function checkAnswers() {
        let answers = [2, 1, 1, 3];
        let degree = 0;

        // check each answer
        for (let i = 0; i < QUESTIONS; i++) {
            // if the question is answered assign its value to 'answer', otherwise assign zero
            let answer = document.querySelector('input[name="question' + (i + 1) + '"]:checked') ?
                document.querySelector('input[name="question' + (i + 1) + '"]:checked').value : 0;
            if (answer == answers[i]) {
                degree += (TOTAL / QUESTIONS);
            }
        }
        return degree;
    }

    function stopTimer() {
        clearInterval(timerId);
        // time.innerText = "00 : 00";

        finishExam();
    }

    function finishExam() {
        // document.getElementById("container").setAttribute("style", "display: none;");   // hide all page contents
        // document.getElementById("result").setAttribute("style", "display: block;");     // display only result div
        document.getElementById("container").setAttribute("style", "opacity: 0.5;");
        popup.style.display = 'block';
        // display name and result

        studentName[1].innerText = getName();
        studentDegree.innerText = checkAnswers();
    }

    function getName() {
        return location.search.substring(1).split("=")[1].replaceAll("+", " ");;
    }

    startExam();
    again.addEventListener("click", function () {
        window.location.replace("./index.html")
    });
});

