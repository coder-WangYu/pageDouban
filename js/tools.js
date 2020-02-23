/**
 * 该文件为js工具包
 * 封装了一些可复用并且经常使用的方法
 * 所有封装好的方法都有其用途（方法名）
 * 所有方法中的参数以及应用方法都有对应的说明
 * 
 * 
 *             作者：阿宇
 * 
 */


/**
 * 
 *#######################        一、运动篇          #####################
 * 
 */


// （一）、匀速运动
/**
 * 
 * @param {*} dom ：要进行匀速运动的元素
 * @param {*} target ：匀速运动的位置
 * @param {*} direc ：匀速运动的方向，只封装了左和上，若想反方向运动则设置target为负
 * @param {*} timer ：方法中的定时器，需要在全局中定义
 * uniform 是匀速的单词，均匀
 */
function uniformMove(dom, target, direc) {
    clearInterval(timer)
    var iSpeed = null
    switch (direc) {
        case 'left':
            iSpeed = target - dom.offsetLeft > 0 ? 5 : -5
            timer = setInterval(function () {
                if (Math.abs(target - dom.offsetLeft) < Math.abs(iSpeed)) {
                    // Math.abs()用于求绝对值
                    clearInterval(timer)
                    dom.style.left = target + 'px'
                } else {
                    dom.style.left = dom.offsetLeft + iSpeed + 'px'
                }
            }, 50)
            break
        case 'top':
            iSpeed = target - dom.offseTop > 0 ? -5 : 5
            timer = setInterval(function () {
                if (Math.abs(target - dom.offsetTop) < Math.abs(iSpeed)) {
                    // Math.abs()用于求绝对值
                    clearInterval(timer)
                    dom.style.top = target + 'px'
                } else {
                    dom.style.top = dom.offsetTop + iSpeed + 'px'
                }
            }, 50)
            break
        default:
            console.log('传值错误')
    }
}
// （二）、缓冲运动
/**
 * 
 * @param {*} dom :要进行缓冲运动的元素
 * @param {*} target ：缓冲运动的位置
 * @param {*} direc ：缓冲运动的方向，left表示左向右，若想反方向则设置target为负
 * @param {*} timer ：方法中的定时器，需要在全局中定义
 * buffer是缓冲的单词
 */
function bufferMove(dom, target, direc) {
    clearInterval(timer)
    var iSpeed = null
    switch (direc) {
        case 'left':
            timer = setInterval(function () {
                iSpeed = (target - dom.offsetLeft) / 5
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
                if (dom.offsetLeft == target) {
                    clearInterval(timer)
                } else {
                    dom.style.left = dom.offsetLeft + iSpeed + 'px'
                }
            }, 50)
            break
        case 'top':
            timer = setInterval(function () {
                iSpeed = (target - dom.offsetTop) / 5
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
                if (dom.offsetTop == target) {
                    clearInterval(timer)
                } else {
                    dom.style.top = dom.offsetTop + iSpeed + 'px'
                }
            }, 50)
            break
        default:
            console.log('传值错误')
    }
}
// （三）、多物体运动
/**
 * 
 * @param {*} dom ：要操作的DOM元素
 * @param {*} attr ：要改变的DOM元素样式
 * @param {*} target ：要改变的DOM元素的目标值
 */
function domsMove(dom, attr, target) {
    clearInterval(dom.timer)
    var iSpeed = null,
        iCur = null
    dom.timer = setInterval(function () {
        if (attr == 'opacity') {
            iCur = parseFloat(getStyle(dom, attr)) * 100
        } else {
            iCur = parseInt(getStyle(dom, attr))
        }
        iSpeed = (target - iCur) / 5
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
        if (iCur == target) {
            clearInterval(dom.timer)
        }
        if (attr == 'opacity') {
            dom.style.opacity = (iCur + iSpeed) / 100
        } else {
            dom.style[attr] = iCur + iSpeed + 'px'
        }
    }, 50)
}
// （四）、多物体多值运动
/**
 * 
 * @param {*} dom ：需要操作的DOM元素
 * @param {*} attrObj ：需要改变的属性值对象，形如：{width:400,height:200,opacity:30}
 * @param {*} callback ：回调函数，通过回调机制来触发多个DOM元素的运动
 */
function domsMoveMore(dom, attrObj, callback) {
    clearInterval(dom.timer)
    var iSpeed = null,
        iCur = null
    dom.timer = setInterval(function () {
        var bStop = true
        for (var attr in attrObj) {
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(dom, attr)) * 100
            } else {
                iCur = parseInt(getStyle(dom, attr))
            }
            iSpeed = (attrObj[attr] - iCur) / 5
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
            if (attr == 'opacity') {
                dom.style.opacity = (iCur + iSpeed) / 100
            } else {
                dom.style[attr] = iCur + iSpeed + 'px'
            }
            if (iCur != attrObj[attr]) {
                bStop = false
            }
        }
        if (bStop) {
            clearInterval(dom.timer)
            typeof callback == 'function' && callback()
        }
    }, 50)
}
// （五）、加速度运动
/**
 * 
 * @param {*} dom ：需要操作的DOM元素
 * @param {*} upSpeed ：指定的加速度值（a）
 * @param {*} direc ：DOM元素的运动方向
 */
function speedUpMove(dom, upSpeed, direc) {
    // v = v0 + at
    clearInterval(dom.timer)
    var iSpeed = 0
    switch (direc) {
        case 'left':
            dom.timer = setInterval(function () {
                iSpeed = iSpeed + upSpeed
                oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px'
            }, 30)
            break
        case 'top':
            dom.timer = setInterval(function () {
                iSpeed = iSpeed + upSpeed
                oDiv.style.top = oDiv.offsetTop + iSpeed + 'px'
            }, 30)
            break
    }
}
// （六）、弹性运动
/**
 * 
 * @param {*} dom ：需要操作的DOM元素
 * @param {*} target ：目标位置
 */
function elasticMove (dom, target) {
    clearInterval(timer)
    var a = 3,iSpeed = 0, u = 0.8
    timer = setInterval(function () {
        a = (target - dom.offsetLeft) / 2.3
        iSpeed += a
        iSpeed *= u
        if (Math.abs(iSpeed) < 1 && Math.abs((target - dom.offsetLeft)) < 1) {
            clearInterval(timer)
            dom.style.left = target + 'px'
        } else {
            dom.style.left = dom.offsetLeft + iSpeed + 'px'
        }
    }, 50)
}
// （七）、多方向弹性运动————模拟重力场
/**
 * 
 * @param {*} dom ：需要操作的DOM元素
 * @param {*} speedX ：横向移动的速度
 * @param {*} speedY ：纵向移动的速度
 */
function direcMoreMove(dom, speedX, speedY) {
    clearInterval(dom.timer)
    var iSpeedX = speedX
    var iSpeedY = speedY
    var g = 5
    dom.timer = setInterval(function () {
        iSpeedY += g
        var newTop = dom.offsetTop + iSpeedY
        var newLeft = dom.offsetLeft + iSpeedX
        // 边界检测
        if (newTop >= document.documentElement.clientHeight - dom.clientHeight) {
            iSpeedY *= -1
            // 能量损失
            iSpeedX *= 0.8
            iSpeedY *= 0.8
            newTop = document.documentElement.clientHeight - dom.clientHeight
        }
        if (newTop <= 0) {
            iSpeedY *= -1
            iSpeedX *= 0.8
            iSpeedY *= 0.8
            newTop = 0
        }
        if (newLeft >= document.documentElement.clientWidth - dom.clientWidth) {
            iSpeedX *= -1
            iSpeedX *= 0.8
            iSpeedY *= 0.8
            newLeft = document.documentElement.clientWidth - dom.clientWidth
        }
        if (newLeft <= 0) {
            iSpeedX *= -1
            iSpeedX *= 0.8
            iSpeedY *= 0.8
            newLeft = 0
        }
        if (Math.abs(iSpeedX) < 1) {
            iSpeedX = 0
        }
        if (Math.abs(iSpeedY) < 1) {
            iSpeedY = 0
        }
        if (iSpeedX == 0 && iSpeedY == 0 && newTop == document.documentElement.clientHeight - dom.clientHeight) {
            clearInterval(dom.timer)
        } else {
            dom.style.left = newLeft + 'px'
            dom.style.top = newTop + 'px'
        }
    }, 30)
}


/**
 * 
 *######################         二、DOM操作篇         #######################
 * 
 */

// （一）、获取DOM元素样式的值
/**
 * 
 * @param {*} dom ：要操作的dom元素
 * @param {*} attr ：传入的样式的值（字符串），例如：'width'
 */
function getStyle(dom, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(dom, null)[attr]
    } else {
        return dom.currentStyle[attr]
    }
}

// （二）、获取所有兄弟元素
/**
 * 
 * @param {*} dom ：需要获取所有兄弟元素的元素
 */
function getSiblings (dom) {
    var siblings = []
    var siblingDown = dom.parentNode.firstChild
    var siblingUp = dom.parentNode.lastChild
    for ( ; siblingDown; siblingDown = siblingDown.nextSibling) {
        if (siblingDown.nodeType !== 1 || siblingDown == dom) {
            continue
        }
        siblings.push(siblingDown)
    }
    for ( ; siblingUp; siblingUp = siblingUp.nextSibling) {
        if (siblingUp.nodeType !== 1 || siblingUp == dom) {
            continue
        }
        siblings.push(siblingUp)
    }
    return siblings
}