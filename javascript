## 连等赋值问题
  var a = {n: 1};  
  var b = a; 
  a.x = a = {n: 2};  
  console.log(a.x);// --> undefined  
  console.log(b.x);// --> {n:2} 
