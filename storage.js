window.liList = [
  { li: "", Id: "", height: "", value: "", checkBox: "" },
]
function theli(Id, height, value, checkBox) {
  this.Id = Id;    //通过this关键字设置默认成员
  this.height = height;
  this.value = value;
  this.checkBox = checkBox
};

function lsave() {
  let nowNumber = document.querySelector(".number").innerHTML;
  localStorage.setItem('nowNumber', nowNumber);
  localStorage.setItem('nowSum', sum);
  //现存的Li存入liLiat数组并用localstorage保存
  for (let i = 0; i < sum; i++) {
    let theLiId = 'liii' + (i + 1);
    let theLiHeight = window.getComputedStyle(document.getElementById('ii' + (i + 1))).getPropertyValue('height');
    let theLiValue = document.getElementById('ii' + (i + 1)).innerText;
    let theLicheck = document.getElementById('i' + (i + 1)).checked;
    window.liList[i] = new theli(theLiId, theLiHeight, theLiValue, theLicheck);
    console.log(theLiId)
  }
  localStorage.setItem('myLi', JSON.stringify(window.liList));
  console.log("save")
};

function lload() {
  if (JSON.parse(localStorage.getItem('myLi'))) {
    //以下，载入保存的count和sum
    count = localStorage.getItem("nowNumber");
    sum = localStorage.getItem("nowSum")
    console.log(Number(count))
    console.log(Number(sum))
    //载入保存的数组
    newArea = JSON.parse(localStorage.getItem('myLi'));
    //document.querySelector(".box").innerHTML = JSON.parse(localStorage.getItem('myPage'));
    console.log("jiazai");
    console.log(newArea)
    //重新创建li并载入上面newArea保存的数据
    for (let i = 0; i < sum; i++) {
      let newli = document.createElement("li");
      //li中从左至右
      let newspan = document.createElement("span");
      let newinput = document.createElement("input");
      let newEbtn = document.createElement("button")
      //li
      let list = document.querySelector(".list");
      //载入保存的数据
      let savedId = newArea[i].Id.slice(4);
      newinput.setAttribute("id", 'i' + savedId);//i1
      newspan.setAttribute("id", 'ii' + savedId);//ii1
      newEbtn.setAttribute("id", 'iii' + savedId);//iii1
      newli.setAttribute("id", 'liii' + savedId);//Liii1
      newli.style.height = newArea[i].height;
      //重新添加至HTML中
      list.appendChild(newli);
      //向li中添加
      newli.appendChild(newinput);
      newli.appendChild(newspan);
      newspan.innerHTML = newArea[i].value;
      newli.appendChild(newEbtn);
      //设置相关属性
      newinput.setAttribute("type", "checkbox");
      if (newArea[i].checkBox) {
        newinput.setAttribute("class", "green");
        newinput.checked = newArea[i].checkBox
        newspan.style.textDecoration = "line-through";
        newspan.style.color = "#d9d9d9";
      }
      else {
        newinput.setAttribute("class", "origin");
      }
      newEbtn.setAttribute("class", "Ebtn");
      newspan.setAttribute("class", "changespan");
    }
    //if (sum != 0) {
    //以下，重新绑定函数以及判断
    let allbtn = document.querySelector(".gray");
    let ballbtn = document.querySelector(".black");
    if (count == 0 && allbtn && sum != 0) {
      console.log("把allbtn变黑")
      allbtn.className = 'black';
    }
    if (allbtn) {
      allbtn.style.display = "block";
      if (sum == 0) {
        let allbtn = document.querySelector(".gray");
        allbtn.style.display = "none";
      }
    }
    //使下面的区域显现
    if (sum != 0) {
      //使框出现
      const change = document.querySelector(".change")
      change.style.display = "block";
      const change1 = document.querySelector(".change1")
      change1.style.display = "block";
      const change2 = document.querySelector(".change2")
      change2.style.display = "block";
      //计数显示
      let number = document.querySelector(".number");
      number.innerHTML = count;
      // var cspan=document.getElementById("changespan");
      // cspan.addEventListener("blclick",ShowElement(this),true);
      //绑定函数，点击圆圈执行complete
      let Fbtn = [];
      for (let i = 0; i < sum; i++) {
        Fbtn[i] = document.getElementById("i" + (i + 1))
        Fbtn[i].addEventListener("click", completeOne, false);
      }
      //绑定函数，点击删除按钮执行deleteOne
      let Ebtn = document.querySelectorAll(".Ebtn");
      for (let i = 0; i < sum; i++) {
        Ebtn[i].addEventListener("click", deleteOne, false);
      }
      let allLi = document.getElementsByTagName("li")
      for (let i = 0; i < sum; i++) {
        let theHeight = window.getComputedStyle(document.getElementById("ii" + allLi[i].id.slice(4))).getPropertyValue('height')
        allLi[i].style.height = theHeight;
      }
      const allList = document.querySelector(".list")
      allList.addEventListener('mouseover', showDeleteBtn, false);
      allList.addEventListener('mouseout', hideDeleteBtn, false);
      //绑定函数，使span双击后可修改,按回车后不可修改(此处还应去掉回车键默认换行事件)
      let allspan = document.getElementsByClassName("changespan");
      for (let i = 0; i < sum; i++) {
        allLi[i].addEventListener("dblclick", ediTable, false);
        //allspan[i].addEventListener("mousedown",clickoutSide);
        allspan[i].addEventListener('keyup', function (e) {
          let currKey = 0
          e = e || event
          currKey = e.keyCode || e.which || e.charCode // 支持IE、FF
          if (event.keyCode === 13) {
            //alert("xd")
            let thisid = allspan[i].id;
            let thisspan = document.getElementById(thisid);
            //这里本来相用preventDfault取消回车换行
            //但发现无效，采用正则表达式,寻找空行并替换
            var reg = /\n(\n)*( )*(\n)*\n/;
            var oldStr = thisspan.innerText;
            var newStr = oldStr.replace(reg, "\n");
            thisspan.innerText = newStr;
            thisspan.setAttribute("contenteditable", "false")
          }
        })
      }
      let clear = document.querySelector(".clear");
      //显现一个按钮
      if (count != sum || count == 0) {
        clear.style.display = "block";
      }
      //console.log(sum)
      if (count == sum) {
        clear.style.display = "none";
      }
      //刷新后载入原BTN页面
      new_element = document.createElement("script");
      new_element.setAttribute("type", "text/javascript");
      new_element.setAttribute("src", "bottomBtn.js");
      // 在这里引入
      document.body.appendChild(new_element)

      console.log(localStorage.getItem('allFlag'))
      console.log(localStorage.getItem('actFlag'))
      console.log(localStorage.getItem('comFlag'))
      if (localStorage.getItem('allFlag') == 1 && localStorage.getItem('actFlag') == 0 && localStorage.getItem('comFlag') == 0) {
        console.log('all')
        rall();
        localStorage.setItem('allFlag', 0)
      }
      if (localStorage.getItem('actFlag') == 1 && localStorage.getItem('allFlag') == 0 && localStorage.getItem('comFlag') == 0) {
        active();
        console.log('act')
        localStorage.setItem('actFlag', 0);
      }
      if (localStorage.getItem('comFlag') == 1 && localStorage.getItem('actFlag') == 0 && localStorage.getItem('allFlag') == 0) {
        complete();
        console.log('com')
        localStorage.setItem('comFlag', 0);
      }
    }
  }
}