function completeOne() {
  let thisId = this.id;
  let check = document.getElementById(thisId);
  if (check.checked) {
    let thisFbtn = document.getElementById(thisId);
    //发现伪元素只读，改变伪元素方法，换类大法！
    thisFbtn.setAttribute("class", "green");
    let thisspan = document.getElementById("i" + thisId);
    thisspan.style.textDecoration = "line-through";
    thisspan.style.color = "#d9d9d9";
    let number = document.querySelector(".number");
    count--;
    number.innerHTML = count;
  }
  if (!check.checked) {
    let thisFbtn = document.getElementById(thisId);
    thisFbtn.setAttribute("class", "origin");
    let thisspan = document.getElementById("i" + thisId);
    thisspan.style.textDecoration = "none";
    thisspan.style.color = "black";
    let number = document.querySelector(".number");
    count++;
    number.innerHTML = count;

  }
  if (count == 0) {
    let allbtn = document.querySelector(".gray");
    allbtn.className = "black";
  }
  else {
    let allbtn = document.querySelector(".black");
    if (allbtn) {
      allbtn.className = "gray";
    }
  }

  let clear = document.querySelector(".clear");
  //显现一个按钮
  if (count != sum) {
    clear.style.display = "block";
  }
  //console.log(sum)
  if (count == sum && count == 0) {
    clear.style.display = "none";
  }
  if (count == sum) {
    clear.style.display = "none";
  }
}

function completeAll() {
  //设置一个不干扰显示的未完成计数
  wcount = count;
  //设置一个计数已完成
  ccount = sum - document.querySelector(".number").innerHTML;
  //选中所有未完成list
  let lists = document.getElementsByClassName('origin');
  //选中所有已完成list
  let clists = document.getElementsByClassName('green');
  //存储所有未完成list的id
  let listsId = [];
  for (let i = 0; i < wcount; i++) {
    listsId[i] = lists[i].id;
  }
  //存储所有已完成listid
  let clistsId = [];
  for (let i = 0; i < ccount; i++) {
    clistsId[i] = clists[i].id;
  }
  //现在checkbox为空的标记为完成，与上面completeOne的判定相反
  for (let i = 0; i < wcount; i++) {
    let check = document.getElementById(listsId[i]);
    if (!check.checked) {
      check.checked = true;
      let thisFbtn = document.getElementById(listsId[i]);
      //发现伪元素只读，改变伪元素方法，换类大法！
      thisFbtn.setAttribute("class", "green");
      // wei.outline='rgb(127, 255, 212) solid 1px';
      // console.log(wei.outline)
      let thisspan = document.getElementById("i" + listsId[i]);
      thisspan.style.textDecoration = "line-through";
      thisspan.style.color = "#d9d9d9";
      let number = document.querySelector(".number");
      count--;
      number.innerHTML = count;
    }
  }
  //操作所有已完成的变成未完成
  if (ccount == sum) {
    for (let i = 0; i < ccount; i++) {
      let ccheck = document.getElementById(clistsId[i]);
      if (ccheck.checked) {
        ccheck.checked = false;
        let thisFbtn = document.getElementById(clistsId[i]);
        //发现伪元素只读，改变伪元素方法，换类大法！
        thisFbtn.setAttribute("class", "origin");
        // wei.outline='rgb(127, 255, 212) solid 1px';
        // console.log(wei.outline)
        let thisspan = document.getElementById("i" + clistsId[i]);
        thisspan.style.textDecoration = "none";
        thisspan.style.color = "black";
        let number = document.querySelector(".number");
        count++;
        number.innerHTML = count;
      }
    }
  }
  if (count == 0) {
    let allbtn = document.querySelector(".gray");
    if(allbtn){
    allbtn.className = "black";
    }
  }
  else {
    let allbtn = document.querySelector(".black");
    if(allbtn){
    allbtn.className = "gray";
    }
  }
  let clear = document.querySelector(".clear");
  //显现一个按钮
  if (count == 0) {
    clear.style.display = "block";
  }
  //console.log(sum)
  if (count == sum ) {
    clear.style.display = "none";
  }
}
function deleteOne() {
  //存一下原sum
  ssum = sum;
  let thisId = this.id;
  let thisli = document.getElementById("l" + thisId);
  //找到父节点直接删掉一个li
  let parent = thisli.parentElement;
  if (document.getElementById(thisId.slice(2)).className == "origin") {
    count--;
    let number = document.querySelector(".number");
    number.innerHTML = count;
  }
  //进行删除操作
  parent.removeChild(thisli);
  //console.log(document.getElementById(thisId.slice(2)).className);
  //derta记录执行删除函数的次数
  derta = 0;
  derta++;
  //重新按新的sum编id
  sum = sum - derta;
  //选中现存的所有框
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
  if (sum == 0) {
    document.querySelector(".change").style.display = "none";
    let allbtn = document.querySelector(".gray");
    if(allbtn){
      allbtn.style.display = "none";
    }
  }
  let clear = document.querySelector(".clear");
  //console.log(sum)
  if (count == sum ) {
    clear.style.display = "none";
  }
  if(sum==0){
    let allbtn = document.querySelector(".black");
    if(allbtn){
    allbtn.style.display = "none";
    }
  }
}
function showDeleteBtn(e) {
  let thisid = e.target.id;
  //console.log(e.target.id)
  thisbtn = document.getElementById("iii" + thisid.slice(-1));
  if(flag==0&&thisbtn )
  { thisbtn.style.display = "block";}
}
function hideDeleteBtn(e) {
  let thisid = e.target.id;
  thisbtn = document.getElementById("iii" + thisid.slice(-1));
  if(thisbtn)
  {thisbtn.style.display = "none"};
}