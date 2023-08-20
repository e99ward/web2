// dom elements
console.log(window.innerHeight);
document.addEventListener('DOMContentLoaded', runFirst);

let dataBase = [];
let cnt = 0;

async function runFirst() {
    // load lotto data for showing and processing
    await LoadData();
    console.log(dataBase['agency'][0]);
    console.log(dataBase.agency);
    console.log(dataBase.member[2][2]);
    console.log(dataBase.member[2].length);
    cnt = Object.keys(dataBase.name).length;
    console.log(cnt);
    initial();
}

async function LoadData() {
  const URL = './saved_db.json';
  const inletResponse = await fetch(URL);
  dataBase = await inletResponse.json();
  console.log(dataBase)
  // inlet.forEach((item) => {
  //     groups.push(item);
  // });
  // console.log(groups)
}

/* link */
let toggle = true;
let x = document.createElement("AUDIO");

function playSong(str) {
  let filename = "./media/" + str + ".mp3";

  if (toggle == true) {
    x.setAttribute("src", filename);
    x.play();
    toggle = false;
  } else {
    x.pause();
    toggle = true;
  }
}

function playVideo_old(str) {
  let video = document.querySelector('.youtube');
  video.style.display = "block";
  let filename = "//www.youtube.com/embed/" + str;
  const attr = document.createAttribute("src");
  attr.value = filename;
  document.getElementById('video').setAttributeNode(attr);
}

function playVideo(str) {
  let video = document.querySelector('.youtube');
  video.style.display = "block";
  let iframe = '<iframe id="video" width="420" height="315" src="//www.youtube.com/embed/';
  iframe += str;
  iframe += '" frameborder="1" allowfullscreen></iframe>';
  iframe += '<button onclick="closeVideo()">Close</button>';
  document.getElementById('player').innerHTML = iframe;
}

function closeVideo () {
  let video = document.querySelector('.youtube');
  video.style.display = "none";
  document.getElementById('video').removeAttribute("src");
}

function showThem(str) {
  let brief = document.querySelector('.brief');
  document.addEventListener('mousedown', (e) => {
    brief.style.left = `${e.pageX - 10}px`;
    brief.style.top = `${e.pageY + 10}px`;
  });
  document.getElementById(str).style.display = "block";
}

function hideThem(str) {
  document.getElementById(str).style.display = "none";
}

/* database */
let db1 = [
  {name: 'Spinkl', debut: '2011-03-11', close: '', member: ['na1', 'na2', 'na3'], songs: ['so1', 'so2']},
  {name: 'IVE', debut: '2021-03-11', close: '', member: ['na1', 'na2', 'na3'], songs: ['so11', 'so12']},
  {name: 'Crue', debut: '2001-03-11', close: '2009-01-01', member: ['na1', 'na2', 'na3'], songs: ['so11', 'so12']}
];

function sortXX() {
  db1.sort(function(a, b) {
    const A = a.debut;
    const B = b.debut;
    return A < B ? -1 : A > B ? 1 : 0;
  });
  db1.sort(function(a, b) {
    const A = a.name.toUpperCase();
    const B = b.name.toUpperCase();
    return A < B ? -1 : A > B ? 1 : 0;
  });
  writeDB(db1);
}

// let dbcopy = db1.slice(0);
let isActive = false;
let isMembers = false;
let isSongs = false;
let is1 = true;
let is2 = true;
let is3 = true;
let is4 = true;

function statusUpdate() {
  let x = document.getElementById("active");
  isActive = x.checked;
  let y = document.getElementById("members");
  isMembers = y.checked;
  let z = document.getElementById("songs");
  isSongs = z.checked;
  let g1 = document.getElementById("gen1");
  is1 = g1.checked;
  let g2 = document.getElementById("gen2");
  is2 = g2.checked;
  let g3 = document.getElementById("gen3");
  is3 = g3.checked;
  let g4 = document.getElementById("gen4");
  is4 = g4.checked;
}

function sortName() {
  writeDB(dataBase);
}

function sortDate() {
  db_new = [];




  writeDB(dataBase);
}


function writeDB(db) {
  console.log("in")
  statusUpdate()
  let line = lineheader;
  if (isMembers == true) {
    line = lineheader1;
  }
  for (i=0; i<cnt; i++) {
    if (isActive == true && isNaN(db.disband[i])) {
      console.log('pass the dismissed');
    } else if (is1 == false && db.gen[i] == 1) {
      console.log('pass the dismissed');
    } else if (is2 == false && db.gen[i] == 2) {
      console.log('pass the dismissed');
    } else if (is3 == false && db.gen[i] == 3) {
      console.log('pass the dismissed');
    } else if (is4 == false && db.gen[i] == 4) {
      console.log('pass the dismissed');
    } else {
      line += '<tr><th>'
      line += db.name[i];
      line += '&nbsp;&nbsp;<small>('
      line += db.alias[i];
      line += ')</small></th><th>';
      line += db.debut[i];
      line += '</th><th>';
      line += db.disband[i];
      line += '</th><th>';
      line += db.mCount[i];
      line += '</th><th>';
      if (isMembers == true) {
        for (let j=0; j < db.member[i].length; j++) {
          line += '<span class="image">'; //<img src=';
          //line += db.mImg[i][j];
          //line += ' width="75" height="84"><br>';
          line += db.member[i][j];
          line += '<br><small>';
          line += db.mBirth[i][j];
          line += '</small></span>&nbsp;';
        }
        line += '</th><th>';
      }
      line += db.agency[i];
      line += '</th></tr>'
    }
  };
  document.getElementById("matrixcontext").innerHTML = line;
}

let lineheader = '<tr class="headline"><th class="null2yr">그룹명 (Group Name)</th> \
                  <th class="null1yr">데뷔일자</th><th class="null1yr">해체일자</th> \
                  <th class="null">멤버수</th><th class="null1yr">소속사</th></tr>';
let lineheader1 = '<tr class="headline"><th class="null1yr">그룹명 (Group Name)</th><th class="null1yr">데뷔일자</th> \
                  <th class="null1yr">해체일자</th><th class="null">멤버수</th><th class="null2yr">멤버이름</th> \
                  <th class="null1yr">소속사</th></tr>';

function initial() {
  let matrix = document.getElementById("matrixcontext");
  let line = lineheader;
  matrix.innerHTML = line;
}



// <tr >
// <th>베이비복스 (Baby VOX)</th>
// <th>Q</th>
// <th>1999-09-09</th>
// <th></th>
// <th></th>
// <th>Shift</th>
// </tr>
