"use strict",
function init(a) { //LHS
    //AO编译阶段  在全局变量AO对象里面添加b
    b = a + 3; //LHS RHS(查询a)
   
}
init(2);//HRS 
console.log(b);