//count是显示未完成的
count = 0;
//sum计数总共创建过的list
sum = 0;
function onn() {
  let list = document.querySelector(".list");
  let input = document.querySelector(".new");
  input.onkeyup = function () {
    let value = input.value;
    // let newdiv = document.createComment("div")
    this.size = this.value.length;
    let newli = document.createElement("li");
    //li中从左至右
    let newspan = document.createElement("span");
    let newinput = document.createElement("input");
    let newEbtn = document.createElement("button")
    //按下回车的刹那
    if (event.keyCode == 13 && value != '') {
      list.appendChild(newli);
      //向li中添加
      newli.appendChild(newinput);
      newli.appendChild(newspan);
      newspan.innerHTML = value;
      newli.appendChild(newEbtn);
      //设置相关属性
      newinput.setAttribute("type", "checkbox");
      newinput.setAttribute("class", "origin");
      newEbtn.setAttribute("class", "Ebtn");
      newspan.setAttribute("class", "changespan");
      //计数
      count++;
      console.log(count);
      if (count != 0) {
        //若此处已保存，重新编号
        let allEbtn = document.querySelectorAll(".Ebtn");
        for (let i = 0; i < sum; i++) {
          let theid = allEbtn[i].id;
          let thisinput = document.getElementById('i' + theid.slice(3));
          let thisSpan = document.getElementById('ii' + theid.slice(3));
          let thisEbtn = document.getElementById('iii' + theid.slice(3));
          let thisli = document.getElementById('liii' + theid.slice(3));
          thisinput.setAttribute("id", 'i' + (i + 1));
          thisSpan.setAttribute("id", 'ii' + (i + 1));
          thisEbtn.setAttribute("id", 'iii' + (i + 1));
          thisli.setAttribute("id", 'liii' + (i + 1));
        }
        //
        let allbtn = document.querySelector(".gray");
        let ballbtn = document.querySelector(".black");
        if (allbtn) {
          allbtn.style.display = "block";
        }
        if (ballbtn) {
          ballbtn.style.display = "block";
          ballbtn.className = "gray";
        }
      }
      sum++;
      input.value = "";
      //编号id
      newinput.setAttribute("id", 'i' + sum);
      newspan.setAttribute("id", 'ii' + sum);
      newEbtn.setAttribute("id", 'iii' + sum);
      newli.setAttribute("id", 'liii' + sum);

      //使下面的区域显现
      if (count != 0) {
        //使框出现
        const change = document.querySelector(".change")
        change.style.display = "block";
        const change1 = document.querySelector(".change1")
        change1.style.display = "block";
        const change2 = document.querySelector(".change2")
        change2.style.display = "block";
        //计数显示
        number = document.querySelector(".number");
        number.innerHTML = count;
        // let cspan=document.getElementById("changespan");
        // cspan.addEventListener("blclick",ShowElement(this),true);
        const allList = document.querySelector(".list")
        //绑定函数，点击圆圈执行complete
        let Fbtn = document.querySelectorAll(".origin");
        for (let i = 0; i < count; i++) {
          Fbtn[i].addEventListener("click", completeOne, false);
        }
        //绑定函数，点击删除按钮执行deleteOne
        let Ebtn = document.querySelectorAll(".Ebtn");
        for (let i = 0; i < count; i++) {
          Ebtn[i].addEventListener("click", deleteOne, false);
        }
        let allLi = document.getElementsByTagName("li");
        for (let i = 0; i < sum; i++) {
          let theHeight = window.getComputedStyle(document.getElementById("ii" + allLi[i].id.slice(4))).getPropertyValue('height')
          allLi[i].style.height = theHeight;
        }
        //基于冒泡机制的事件代理，只绑定一次
        allList.addEventListener('mouseover', showDeleteBtn, false);
        allList.addEventListener('mouseout', hideDeleteBtn, false);
        // //绑定函数,给所有的li绑定上鼠标移到上面事出现x按钮的事件
        // for (let i = 0; i < sum; i++) {
        //   allLi[i].addEventListener("mouseover", showDeleteBtn, false);
        // }
        // //绑定函数,给所有的li绑定上鼠标移出上面事NO x按钮的事件
        // for (let i = 0; i < sum; i++) {
        //   allLi[i].addEventListener("mouseout", hideDeleteBtn, false);
        // }
        //绑定函数，使span双击后可修改,按回车后不可修改(此处还应去掉回车键默认换行事件)
        let allspan = document.getElementsByClassName("changespan");
        for (let i = 0; i < sum; i++) {
          allLi[i].addEventListener("dblclick", ediTable, false);
          allspan[i].addEventListener('keyup', function (e) {
            let currKey = 0
            e = e || event
            currKey = e.keyCode || e.which || e.charCode // 支持IE、FF
            if (event.keyCode === 13) {
              let thisid = allspan[i].id;
              let thisSpan = document.getElementById(thisid);
              //这里本来相用preventDfault取消回车换行
              //但发现无效，采用正则表达式,寻找空行并替换
              let reg = /\n(\n)*( )*(\n)*\n/;
              let oldStr = thisSpan.innerText;
              let newStr = oldStr.replace(reg, "\n");
              thisSpan.innerText = newStr;
              thisSpan.setAttribute("contenteditable", "false")
            }
          })
        }
      }
    }
  }
}

flag = 0;
function ediTable() {
  let thisid = this.id;//这是liii1形式id,span的Id是ii1
  //console.log(thisid)
  let spanId = thisid.slice(2);
  //console.log(spanId)
  let thisSpan = document.getElementById(spanId);
  thisSpan.setAttribute("contenteditable", "true");
  thisSpan.setAttribute("autofocus", "autofocus");
  //进入编辑模式去掉X的Ebtn
  let thisEbtn = document.getElementById(thisid.slice(1));
  thisEbtn.style.display = "none";
  console.log(thisEbtn.style.display);
  flag = 1;
  thisSpan.onkeyup = function () {
    let allLi = document.getElementsByTagName("li");
    for (let i = 0; i < sum; i++) {
      if (event.keyCode == 13 && thisSpan.innerText != '') {
        thisSpan.setAttribute("contenteditable", "false")
        flag = 0;
        let theHeight = window.getComputedStyle(document.getElementById("ii" + allLi[i].id.slice(4))).getPropertyValue('height')
        allLi[i].style.height = theHeight;
      }
    }
  }
  thisSpan.style.display = "inline-block";
  thisSpan.size = thisSpan.innerHTML.length;
}

function clickoutSide(nameClass, callback) {
  // 全局注册点击事件
  document.onmousedown = function (e) {
    //若点击元素为目标元素则返回
    if (e.target.className === nameClass) return
    //否则执行回调函数
    callback();
    callback();
  }
}
clickoutSide('changespan', function () {
  flag = 0;
  let allLi = document.getElementsByTagName("li");
  let theHeight = [];
  for (let i = 0; i < sum; i++) {
    theHeight[i] = window.getComputedStyle(document.getElementById("ii" + allLi[i].id.slice(4))).getPropertyValue('height');
    //console.log(theHeight[i])
  }
  for (let i = 0; i < sum; i++) {
    allLi[i].style.height = theHeight[i];
    //console.log("s")
  }
  let allspan = document.getElementsByClassName("changespan");
  for (let i = 0; i < sum; i++) {
    let thisid = allspan[i].id;
    let thisSpan = document.getElementById(thisid);
    //这里本来相用preventDfault取消回车换行
    //但发现无效，采用正则表达式,寻找空行并替换
    let reg = /\n(\n)*( )*(\n)*\n/;
    let oldStr = thisSpan.innerText;
    let newStr = oldStr.replace(reg, "\n");
    thisSpan.innerText = newStr;
    thisSpan.setAttribute("contenteditable", "false")
  }
})

