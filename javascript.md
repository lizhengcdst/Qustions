##1.连等赋值问题
    var a = {n: 1};  
    var b = a; 
    a.x = a = {n: 2};  
    console.log(a.x);// --> undefined  
    console.log(b.x);// --> {n:2} 


关于这个问题最开始是从[前端面试](https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/master/Translations/Chinese?utm_source=ourjs.com)总结上看到的，后来在这[creeperyang](https://github.com/creeperyang/blog/issues/2)的github上看到了他的分析，也看到了[颜海镜](http://yanhaijing.com/javascript/2012/04/05/javascript-continuous-assignment-operator/)的博客的分析。我也来说说我自己的理解，在此之前我们需要熟悉注赋值运算符从右到左的结合顺序是以及LHS、RHS引用查找等相关概念。

根据赋值运算符的结合顺序，我们来预估下这个连等式子可能的结合顺序。

    方式一：(a.x=a)={n:2}方式二：a.x=(a={n:2})


- 方式一：暂时不看别的，这种结合方式必然是错误的，首先A.X=A这个运算完了之后就会返回运算结果值，然后对这个结果值赋值，那必然是错误的，就像1=2这个表达式一样。

- 方式二：这种方式明显不会出现方式一的错误，下面我们来分析下为什么会出现b.x有值，而a.x是undefined的情况。当引擎执行到这个表达式时，首先会对左值(a.x)进行lhs查询，既然要找a.x，那我们必然要先找到a,这时我们会对a进行RHS查找，这样我们会找到a所引用的对象即{n:1}，然后在这个对象中对x进行LHS查找，结果肯定没有找到，然后根据LHS规则，那引擎会为这个对象新建一个x属性，这样就完成了第一个左值的查找了。然后就是计算a={n:2},这个很好理解，就是对a进行LHS，然后赋值。这个计算结果自然赋给我们开始进行查找到的那个对象新建的属性了。同时**b**一直指向那个对象，所以最后**b**是有值的，而**a**所指向的对象是没有x属性。

--------------------------------------------------------------------------
