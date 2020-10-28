// 获取和创建DOM元素
var oSpanNews = document.getElementById('log-item1')
var oSpanPwd = document.getElementById('log-item2')
var oDivNews = document.getElementById('news-area')
var oDivPwd = document.getElementById('pwd-area')
var oIconQr = document.getElementById('icon-qr')
var oIconPc = document.getElementById('icon-pc')
var oLogPwd = document.getElementById('log-pwd') 
var oLogPointer = document.getElementById('log-pointer')
var oPpwd = document.getElementById('p-pwd')
var oPpointer = document.getElementById('p-pointer')
var oNum = document.getElementById('number')
var oChooseArea = document.getElementById('choose-area')
var oCountryNum = document.getElementById('country-num')
var oCloseChooseArea = document.getElementById('close-choose-area')
var oPointer = document.getElementById('pointer')
var oLiArray = document.getElementsByTagName('li')
var oI = document.createElement('i')
var oPhone = document.getElementById('phone')
var oCheck = document.getElementById('check')
var oLogBtn = document.getElementById('log-btn')
var oPwdLogBtn = document.getElementById('pwd-log-btn')
var oPOE = document.getElementById('phone-or-email')
var oPEP = document.getElementById('phone-email-pwd')

//定义全局变量
var timer

//页面加载时执行的功能
window.onload = function () {
    BindEvent()
    checkLogBtn()
}

//绑定事件函数
function BindEvent () {
    //选择国际区号
    (function countryNumChange () {
        for (var i = 0; i < oLiArray.length; i++) {
            var oSpan = oLiArray[i].getElementsByTagName('span')
            oLiArray[i].onclick = function () {
                //getSiblings方法被封装在tools.js
                var otherArr = getSiblings(this)
                for (var i = 0; i < otherArr.length; i++) {
                    var newClassArr = otherArr[i].className
                    var _arr = newClassArr.split(" ")
                    if (_arr.length >= 2) {
                        otherArr[i].classList.remove('selected')
                    } 
                }
                var oClassArray = this.className
                var arr = oClassArray.split(" ")
                for (var prop in arr) {
                    if (arr[prop] == "clearfix") {
                        this.classList.add('selected')
                        this.appendChild(oI)
                        oI.classList.add('iconfont')
                        oI.classList.add('icon-shuruzhengque')
                        oI.classList.add('left')
                        oNum.childNodes[0].nodeValue = this.childNodes[1].innerText
                        oChooseArea.classList.add('hidden')
                    }
                } 
            }
        }
        oCloseChooseArea.onclick = function () {
            oChooseArea.classList.add('hidden')
        }
    }());
    //显示选择国际区号区域
    oNum.addEventListener('click', function () {
        oChooseArea.classList.remove('hidden')
    });
    //切换登录方式的功能
    (function logWaysChange() {
        oSpanNews.onclick = function () {
            oSpanPwd.classList.remove('selected')
            this.classList.add('selected')
            oDivPwd.classList.add('hidden')
            oDivNews.classList.remove('hidden')
        }
        oSpanPwd.onclick = function () {
            oSpanNews.classList.remove('selected')
            this.classList.add('selected')
            oDivNews.classList.add('hidden')
            oDivPwd.classList.remove('hidden')
        }
    }());
    //切换扫码登录功能
    (function logPointerChange() {
        oIconQr.onclick = function () {
            oIconPc.classList.remove('hidden')
            this.classList.add('hidden')
            oLogPwd.classList.add('hidden')
            oLogPointer.classList.remove('hidden')
            oPpointer.classList.add('hidden')
            oPpwd.classList.remove('hidden')
            oPointer.classList.remove('hidden')
        }
        oIconPc.onclick = function () {
            oIconQr.classList.remove('hidden')
            this.classList.add('hidden')
            oLogPointer.classList.add('hidden')
            oLogPwd.classList.remove('hidden')
            oPpwd.classList.add('hidden')
            oPpointer.classList.remove('hidden')
            oPointer.classList.add('hidden')
        }
    }())
}

//每隔一段时间检查一次页面（是否可以登录）
function checkLogBtn () {
    timer = setInterval(function () {
        if (oPhone.value != "" && oCheck.value != "") {
            oLogBtn.disabled = false
            clearInterval(timer)
        }else if (oPOE.value != "" && oPEP.value != "") {
            oPwdLogBtn.disabled = false
            clearInterval(timer)
        }
    }, 2000)
}