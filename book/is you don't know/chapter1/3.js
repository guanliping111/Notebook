//LHS RHS 变量查找
function foo(a) { //LHS 给参数a 赋值 隐式 a = 2
    var b = a; //LHS RHS(查询a)
    return a + b; //RHS (查询a b)
}
//Left Hand Search
var c = foo(2); //LHS RHS(查询foo的值)