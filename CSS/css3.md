# 1.过渡
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。要实现这一点，必须规定两项内容：
1. 指定要添加效果的CSS属性
2. 指定效果的持续时间。

## 2-1语法
```
transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
```
例子
```
/*宽度从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒，0.2秒后执行过渡*/
transition：width,.5s,ease,.2s

/*所有属性从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒*/
transition：all,.5s

```
## 2-2实例-hover效果

## 2-3 实例-下拉菜单

.ul-transition ul{transform-origin: 0 0;transition: all .5s;}

# 2.动画
---
```
animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running）
```
例子
```
/*执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
animation: logo2-line 2s linear;

/*2秒后开始执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
animation: logo2-line 2s linear 2s;
```
many...

# 5.选择器
---
![](../asserts/15fbf40815f2e26b)

# 6.阴影
---
以前没有css3的时候，或者需要兼容低版本浏览器的时候，阴影只能用图片实现，但是现在不需要，css3就提供了！

## 6-1.语法
```
box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;

```


# 10.文字
换行
语法：**word-break: normal|break-all|keep-all;**
栗子和运行效果
![](../asserts/15fbf40a3835c6dc)

语法：word-wrap: normal|break-word;
栗子和运行效果
![](../asserts/15fbf40a45d4e4ed)

## 多行超出省略号
---
```css
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

```


# 11.颜色
一个是rgba（rgb为颜色值，a为透明度）
```
color: rgba(255,00,00,1);
background: rgba(00,00,00,.5);
```

hsla
h:色相”，“s：饱和度”，“l：亮度”，“a：透明度”
```
color: hsla( 112, 72%, 33%, 0.68);
background-color: hsla( 49, 65%, 60%, 0.68);
```

# 渐变

# 17.盒模型定义
box-sizing:border-box的时候，边框和padding包含在元素的宽高之内！
box-sizing:content-box的时候，边框和padding不包含在元素的宽高之内！如下图


