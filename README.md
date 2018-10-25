# math-input

Extension based on Khan Academy's Math-Input library. Test

# 设置： 

  1. 下载源代码 
  2. 在Chrome中打开 math-input/index.html
  3. 打开 Chrome developer 模式 ( settings > more tools > Developer Tools ) 
  4. 切换到手机显示模式
  5. 点击输入框，公式输入就会显示


![screenshot](/doc/newSymbols.png?raw=true "New Symbols")

# **测试1**:  输入添加新字符 （点击链接能看到所有的修改）
https://github.com/song06971/MathInput/commit/f037cf88113281c85e69c937688df24a3fd83d58

更改文件：  src/store/index.js

```javascript
  const initialKeypadState = {
     //   extraKeys: ['x', 'y', Keys.THETA, Keys.PI],  --- old
        extraKeys: ['x', 'T', Keys.THETA, Keys.PI],  // new
        keypadType: defaultKeypadType,
        active: false,
    };
 ```
 
说明：  store/index.js 保持所有的state, 以及初始化数据。   

# **测试2**:  输入添加新恒等符号 （点击链接能看到所有的修改）
https://github.com/song06971/MathInput/commit/771be21e63b822d80b10ce78f19234e9bf229737

a. 创建文件： src/components/iconography/equiv.js
说明： Vector 恒等图像用于显示

b. 修改文件： src/components/iconography/index.js
添加  
 ```javascript

 EQUIV:require('./equiv'),
```
说明： 登记新添加的符号图像

c. 修改文件： src/data/keys.js
添加     
 ```javascript
EQUIV:'EQUIV',
```
说明：所有的符号都需要注册

d. 修改文件：src/components/input/math-wrapper.js
添加： 
```javascript
[Keys.EQUIV]:{str:'\\equiv',fn:WRITE},
```

说明：所有的符号都需要注册

e. 修改文件：src/components/expression-keypad.js
 修改：        
 
 ```javascript
                {/*  <TouchableKeypadButton
                    keyConfig={KeyConfigs.NEQ}
                    borders={BorderStyles.NONE}
                />*/}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EQUIV}
                    borders={BorderStyles.NONE}
                />
```
说明：  用新的符号取代旧的符号

f. 修改文件 src/data/key-configs.js

添加 
 ```javascript
[Keys.EQUIV]: {
        type: KeyTypes.OPERATOR,
        ariaLabel: i18n._('Always-equal sign'),
    },
```
说明： 定义新符号的属性。 


####其他修改方法总结
* 添加按钮点击，往输入框增加内容。 修改文件为math-input.js, 聚焦方法this.mathField.focus(); 增加内容方法this.mathField.setContent('666')，获取内容方法this.mathField.getContent() 注：athquill初始化是在math-wraper.js

# license

This project is for research and personal interest only and is not intended to be included in any commerical software. Please use Khan's originial project as the base for any commercial release. 


    







