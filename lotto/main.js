let numbers = [];
let current = 1;
let number_only = [];
let pred_numbers = [];
const window_size = 12; // = time_seqs
const time_seqs = 132; // = batch_size

document.addEventListener('DOMContentLoaded', runFirst);
//const btnML = document.getElementById("btnML");
//btnML.addEventListener("click", runThen);

async function runFirst() {
    // load lotto data for showing and processing
    await LoadData();
    ShowLottoNumber(numbers[current]);
}

async function LoadData() {
    // load lotto
    const URL = './numbers.json';
    const inletResponse = await fetch(URL);
    const inlet = await inletResponse.json();
    // input for showing number_info
    current = inlet.length - 1;
    inlet.forEach((item) => {
        numbers.push(item);
    });
    // input for machine learning
    number_only = inlet.map(d => d.n);
    console.log(number_only);
}

// PART 1. Show the Numbers
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
    } else {
        current = numbers.length - 1;
    }
}

// PART 2. Anticipate the Numbers
async function runML() {
    // prepare data for machine learning
    // inputs => values & latest for prediction
    const tensorData = await ConvertToTensor(number_only);
    const { inputs, values, latest } = tensorData;
    
    // Create the model
    const model = CreateModel();
    
    // Train the model
    await TrainModel(model, inputs, values);
    console.log('OK3: done training');
    // const saveResults = await model.save('downloads://my-model');

    // Make some predictions using the model
    pred_numbers = await TestModel(model, latest);
    console.log('END');
    pred_numbers = pred_numbers.slice(-6);
    UpdateLottoNumbers();
}

async function runML2() {
    // Make some predictions using the saved model
    const model = await tf.loadLayersModel('./my-model.json');
    const flat = tf.tensor(number_only).reshape([-1]);
    const last = flat.size - window_size;
    const latest = flat.slice([last], [window_size]);
    pred_numbers = await TestModel(model, latest);
    console.log('END');
    pred_numbers = pred_numbers.slice(-6);
    UpdateLottoNumbers();
}

async function DisplayRunning() {
    let text3 = '<p id="loader"></p> Anticipating...';
    document.getElementById("results").innerHTML = text3;
    document.getElementById("btnML").innerHTML = '예측중...';
    setTimeout(runML, 2000);
}


async function DisplayRunning2() {
    let text3 = '<p id="loader"></p> Anticipating...';
    document.getElementById("results").innerHTML = text3;
    setTimeout(runML2, 2000);
}

function UpdateLottoNumbers() {
    let text4 = '<p>Completed!!<br><br></p>';
    let value;
    pred_numbers.forEach((value) => {
        text4 += '<span class="ball_645 ';
        if (value <= 10) {
            text4 += 'ball1">';
        } else if (value <= 20) {
            text4 += 'ball2">';
        } else if (value <= 30) {
            text4 += 'ball3">';
        } else if (value <= 40) {
            text4 += 'ball4">';
        } else {
            text4 += 'ball5">';
        }
        text4 += value;
        text4 += '</span>\n';
    });
    document.getElementById("results").innerHTML = text4;
    document.getElementById("btnML").innerHTML = '다시실행';
}

async function ConvertToTensor(data) {
    // Wrapping these calculations in a tidy will dispose any intermediate tensors.
    
    return tf.tidy(() => {
        // shuffle = vtf.util.shuffle(data);
        const flat = tf.tensor(data).reshape([-1]);
        console.log(flat.print());
        let inputs = tf.tensor([]);
        let values = tf.tensor([]);
        for (let i = 0; i < time_seqs; i++) {
            inputs = inputs.concat(flat.slice([i], [window_size]));
            values = values.concat(flat.slice([i + window_size], [1]));
        }
        // time sequence will be the batch size 
        // = reshape[b,t,in]
        inputs = inputs.reshape([time_seqs, window_size, 1]);
        values = values.reshape([time_seqs, 1]).sub(23).div(22);
        const last = flat.size - window_size;
        const latest = flat.slice([last], [window_size]);
        // inputs.print();
        // values.print();

        return { inputs, values, latest };
    });
}

function CreateModel() {
    // Create a sequential model
    const model = tf.sequential();
    model.add(tf.layers.simpleRNN({ inputShape: [, 1], units: 12, returnSequences: true }));
    model.add(tf.layers.simpleRNN({ units: 12, returnSequences: false }));
    model.add(tf.layers.dense({ units: 1 }));

    return model;
}

async function TrainModel(model, inputs, labels) {
    // Prepare the model for training.
    // model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
    model.compile({
        optimizer: tf.train.sgd(0.0001), //'sgd',
        loss: 'meanSquaredError',
        metrics: ['mse'],
    });
    console.log("OK2: in training");
    const batchSize = 32;
    const epochs = 120;

    //     await model.fit(xs, ys, { epochs: 1000 });
    return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
            { name: 'Training Performance' },
            ['loss'], //'mse'],
            { height: 200, callbacks: ['onEpochEnd'] }
        )
    });
}

async function TestModel(model, inputData) {
    // inputData = tf.tensor([12, 27, 29, 38, 41, 45]);
    let data_new = inputData.reshape([1, window_size, 1]).sub(23).div(22)
    console.log("OK4: in anticipating");
    for (let k = 0; k < 6; k++) {
        let preds = model.predict(data_new);
        //console.log(preds.mul(23).add(23).print());
        data_new = data_new.reshape([-1]).slice([1], [window_size - 1]);
        data_new = data_new.concat(preds.reshape([1])).reshape([1, window_size, 1]);
    }
    data_new = data_new.reshape([-1]).mul(22).add(23);
    const values = data_new.dataSync();
    const arr = Array.from(values);
    let arr_int  = arr.map((x) => Math.round(x));
    arr_int.forEach((item, index) => {
        if (item < 1) {
            arr_int[index] = 1;
        } else if (item > 45) {
            arr_int[index] = 45;
        }
    });

    return arr_int;
}
