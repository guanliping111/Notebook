function a(age) {
    console.log(age);//[Function: age]
    var age = 20;
    console.log(age); //20
    function age() { } //函数同名属性 覆盖
    console.log(age); //20 作用域链查找  向父级a函数寻找age: age = 20
}
a(18);