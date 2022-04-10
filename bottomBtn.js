function rall() {
  var all = document.querySelector(".all");
  var active = document.querySelector(".active");
  var complete = document.querySelector(".complete")
  all.style.borderColor = "rgba(175, 47, 47, 0.2)"
  active.style.borderColor = "transparent";
  complete.style.borderColor = "transparent";
  var allLi = document.getElementsByTagName("li");
  for (let i = 0; i < sum; i++) {
    allLi[i].style.display = "block";
  }
  let allFlag=1;
  let actFlag=0;
  let comFlag=0;
  localStorage.setItem('allFlag',allFlag)
  localStorage.setItem('actFlag',actFlag)
  localStorage.setItem('comFlag',comFlag)
}
function active() {
  var all = document.querySelector(".all");
  var active = document.querySelector(".active");
  var complete = document.querySelector(".complete")
  active.style.borderColor = "rgba(175, 47, 47, 0.2)"
  all.style.borderColor = "transparent";
  complete.style.borderColor = "transparent";
  //隐藏已完成
  let allw = document.getElementsByClassName("green");
  for (let i = 0; i < sum - count; i++) {
    let wid = "lii" + allw[i].id;
    document.getElementById(wid).style.display = "none";
  }
  //显现未完成
  let allc = document.getElementsByClassName("origin");
  for (let i = 0; i < count; i++) {
    let cid = "lii" + allc[i].id;
    document.getElementById(cid).style.display = "block";
  }
  let actFlag=1;
  let allFlag=0;
  let comFlag=0;
  localStorage.setItem('allFlag',allFlag)
  localStorage.setItem('actFlag',actFlag)
  localStorage.setItem('comFlag',comFlag)
}
function complete() {
  var all = document.querySelector(".all");
  var active = document.querySelector(".active");
  var complete = document.querySelector(".complete")
  complete.style.borderColor = "rgba(175, 47, 47, 0.2)"
  active.style.borderColor = "transparent";
  all.style.borderColor = "transparent";
  //隐藏未完成
  let allc = document.getElementsByClassName("origin");
  for (let i = 0; i < count; i++) {
    let cid = "lii" + allc[i].id;
    document.getElementById(cid).style.display = "none";
  }
  //显现已完成
  let allw = document.getElementsByClassName("green");
  for (let i = 0; i < sum - count; i++) {
    let wid = "lii" + allw[i].id;
    document.getElementById(wid).style.display = "block";
  }
  let comFlag=1;
  let actFlag=0;
  let allFlag=0;
  localStorage.setItem('allFlag',allFlag)
  localStorage.setItem('actFlag',actFlag)
  localStorage.setItem('comFlag',comFlag)
}
function clearall() {
  ssum = sum;
  var arr = [];
  //清除掉已完成的所有
  var allw = document.getElementsByClassName("green");
  for (let i = 0; i < ssum - count; i++) {
    //这里试了好多次，非得拿个数组做缓冲
    //若是直接在下面4行处用allw[i].id会报错
    arr[i] = allw[i].id;
  }
  for (let i = 0; i < ssum - count; i++) {
    let thiscompleteid = "lii" + arr[i];
    let thisli = document.getElementById(thiscompleteid);
    let parent = thisli.parentElement;
    parent.removeChild(thisli);
    sum--;
  }
  //还得重新编号，CV上面的方法
  let allEbtn = document.querySelectorAll(".Ebtn");
  for (let i = 0; i < sum; i++) {
    let theid = allEbtn[i].id;
    let thisinput = document.getElementById('i' + theid.slice(3));
    let thisspan = document.getElementById('ii' + theid.slice(3));
    let thisEbtn = document.getElementById('iii' + theid.slice(3));
    let thisli = document.getElementById('liii' + theid.slice(3));
    thisinput.setAttribute("id", 'i' + (i + 1));
    thisspan.setAttribute("id", 'ii' + (i + 1));
    thisEbtn.setAttribute("id", 'iii' + (i + 1));
    thisli.setAttribute("id", 'liii' + (i + 1));
  }
  let clear = document.querySelector(".clear");
  //显现一个按钮
  if (count != sum) {
    clear.style.display = "block";
  }
  if (sum - count == 0||count==0) {
    clear.style.display = "none";
  }
  if (count == 0) {
    document.querySelector(".change").style.display = "none";
  }
  if (count == 0) {
    var allbtn = document.querySelector(".black");
    if (allbtn) {
      allbtn.style.display = "none";
    }
  }
}