/* load data set */
let numbers = [];
let current = 1;

const URL = 'numbers.v1.txt';
fetch(URL)
    .then(response => response.text())
    .then(text => {
        console.log(text);
        readtext = text.split('\n');
        readtext.forEach(lines => {
            let readjson = JSON.parse(lines);
            numbers.push(readjson);
        });
        // Show the latest Lotto number
        current = numbers.length - 1;
        ShowLottoNumber(numbers[current]);
    })
    .catch(err => console.log(err));

function ShowLottoNumber(db_numbers) {
    let text = '<span>';
    text += db_numbers.draw;
    text += '회 당첨결과 (추첨일: ';
    text += db_numbers.date;
    text += ')</span>';
    document.getElementById("num-draw").innerHTML = text;

    let text1 = '';
    db_numbers.n.forEach((value) => {
        text1 += '<span class="ball_645 ';
        if (value <= 10) {
            text1 += 'ball1">';
        } else if (value <= 20) {
            text1 += 'ball2">';
        } else if (value <= 30) {
            text1 += 'ball3">';
        } else if (value <= 40) {
            text1 += 'ball4">';
        } else {
            text1 += 'ball5">';
        }
        text1 += value;
        text1 += '</span>\n';
    });
    document.getElementById("num-win").innerHTML = text1;

    let value = db_numbers.bonus;
    let text2 = '<span class="ball_645 ';
    if (value <= 10) {
        text2 += 'ball1">';
    } else if (value <= 20) {
        text2 += 'ball2">';
    } else if (value <= 30) {
        text2 += 'ball3">';
    } else if (value <= 40) {
        text2 += 'ball4">';
    } else {
        text2 += 'ball5">';
    }
    text2 += value;
    text2 += '</span>\n';
    document.getElementById("num-bonus").innerHTML = text2;
}

function ShowPreviousNumbers() {
    if (current == 0) {
        alert('이전 자료가 없습니다.');
    } else {
        current -= 1;
        ShowLottoNumber(numbers[current]);
    }
}

function ShowNextNumbers() {
    if (current < numbers.length) {
        current += 1;
        ShowLottoNumber(numbers[current]);
    }    
}

// Promise Style
function updateLottoNumbers() {
    let text3 = '<img src="./image/rolling.gif" style="height:300px"> Anticipating...';
    getPromise(3000).then(
        function(value) {
            text3 = value;
            document.getElementById("rcorners").innerHTML = text3;
        },
        function(error) { /* code if some error */ }
    );
    document.getElementById("rcorners").innerHTML = text3;
}

function getPromise(ms) {
    let myPromise = new Promise(function(myResolve, myReject) {
        setTimeout(() => {
            myResolve("OK"); // when successful
            myReject("Error");  // when error
        }, ms);
    });
    return myPromise;
}

// Asynchronous Style
function UpdateLottoNumbers() {
    //let text3 = '<img src="image/rolling.gif" style="height:300px"> Anticipating...';
    let text3 = '<p id="loader"></p> Anticipating...';
    setTimeout(DisplayComplete, 3000)
    document.getElementById("rcorners").innerHTML = text3;
    document.getElementById("btn").innerHTML = '';
    //document.getElementsByClassName("button").remove(); // .style.display="none"
}

function DisplayComplete() {
    let text4 = 'Completed!!';
    let num1 = Math.floor(Math.random() * 45) + 1;
    text4 += '<span class="ball_645 ball1">';
    text4 += num1;
    text4 += '</span>\n';
    document.getElementById("rcorners").innerHTML = text4;
}
