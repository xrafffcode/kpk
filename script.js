let additionalResValue = document.getElementById('additionalResult');
toggleAdditionalRes(false);

let sprendimas = document.getElementById('sprendimas');
let resultInput = document.getElementById('result');

let type = document.getElementById('type');
let img = document.getElementById('formul_img');

recalc();

function typeChange() {
  let imgSrc = (type.value === 'A') ? "a.png" : "c.png";
  img.src = "images/" + imgSrc;

  if(type.value === 'A') {
    document.getElementById('a-tip').style.display = "block";
    document.getElementById('c-tip').style.display = "none";
  } else {
    document.getElementById('a-tip').style.display = "none";
    document.getElementById('c-tip').style.display = "block";
  }

  recalc();
}

function recalc() {
  let n = parseInt(document.getElementById('n').value);
  let k = parseInt(document.getElementById('k').value);

  if(k < 0 || n < 0 || k > n || (type.value === 'C' && k === n)) {
    sprendimas.innerHTML = "";
    toggleAdditionalRes(false);
    resultInput.value = "";
    return;
  }

  let bottomRes = n - k;

  let tempRes = n;
  let topRes = n;

  let mainRes = 0;

  if(type.value === 'A') {
    let calcs = "";
    let first = true;
    while(tempRes - 1 != bottomRes) {
      tempRes --;
      topRes *= tempRes;

      calcs += ' * ' + tempRes;
    }
    mainRes = topRes;

    sprendimas.innerHTML = '<span class="f"><div class="n">' + n + '!</div><div>(' + n + ' - ' + k + ')!</div></span> ';
    if(bottomRes > 0) {
      sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + '!</div><div>' + bottomRes  + '!</div></span>';
      sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + calcs + ' * <strike>' + bottomRes + '!</strike> </div><div><strike>' + bottomRes + '!</strike></div></span>';
    }
    else {
      sprendimas.innerHTML += ' = ' + n + '!';
      sprendimas.innerHTML += ' = ' + n + calcs;
    }

    toggleAdditionalRes(false);

  } else {
    let biggerRes = bottomRes > k ? bottomRes : k;
    let lastRes = bottomRes > k ? k : bottomRes;

    let calcs = "";
    while(tempRes - 1 != biggerRes) {
      tempRes --;
      topRes *= tempRes;
      calcs += tempRes + " * ";
    }

    let ress = 1;
    let bottomCalcs = "";
    let first = true;
    for(let i = lastRes; i > 1; i --) {
      ress *= i;

      if(first) {
        first = false;
      } else bottomCalcs += ' * ';
      bottomCalcs += i;
    }

    toggleAdditionalRes(true);
    additionalResValue.innerHTML = topRes + "&frasl;" + ress;

    mainRes = topRes / ress;

    let styledK = k > bottomRes ? '<strike>' + k + '!</strike>' : k + '!';
    let styledBottomRes = (bottomRes > k || k === bottomRes) ? '<strike>' + bottomRes + '!</strike>' : bottomRes + '!';

    sprendimas.innerHTML = '<span class="f"><div class="n">' + n + '!</div><div>' + k + '!(' + n + ' - ' + k + ')!</div></span> ';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + '!</div><div>' + k + '! * ' + bottomRes  + '!</div></span>';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + ' * ' + calcs + '<strike>' + biggerRes + '!</strike> </div><div>' + styledK + ' * ' + styledBottomRes + '</div></span>';
    if(lastRes > 2) sprendimas.innerHTML += ' = <span class="f"><div class="n">' + topRes + '</div><div>' + bottomCalcs + '</div></span>';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + topRes + '</div><div>' + ress + '</div></span>';

  }
  sprendimas.innerHTML += " = " + mainRes;
  resultInput.value = mainRes;
}
function toggleAdditionalRes(toggle) {
  additionalResValue.style.display = toggle ? "block" : "none";
}
