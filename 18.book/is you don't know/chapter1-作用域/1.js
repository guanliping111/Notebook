//编译
//AO { }
// JS 基于原型的面向对象
// 变量查找： 冒泡
// a._proto_ = b
// b._proto_ = c

var a = 3;
function func() {
    var a = 2;
    var a = 1;
    console.log(a);
}
func();