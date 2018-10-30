
# 修改方法总结
* 右下角的符号修改方法
    src/store/index.js
    注意：如果是特殊符号需要按下面按钮的方式去添加编码
    ```
    const initialKeypadState = {
            extraKeys: ['x', 'y', 'z', Keys.THETA, Keys.PI], 
            keypadType: defaultKeypadType,
            active: false,
        };
    ```
* 修改其他按钮的方法
    1. 新建一个svg组件： 位置在src/components/iconography/equiv.js，说明： Vector 恒等图像用于显示
    2. 修改iconography文件的index： src/components/iconography/index.js, iconography下方的所有公式的svg组件，index是做统一导出
        ```
        EQUIV:require('./equiv'),
        ```
    3. 修改符号注册文件： src/data/keys.js
        ```
            EQUIV:'EQUIV',
        ```
        注意：key-configs.js不知道是否有用，据查里面是一些符号规范，可能不影响
    4. 修改文件：src/components/input/math-wrapper.js，math-wrapper.js里面包含了几乎所有符号的LaTeX编码
        ```
        [Keys.EQUIV]:{str:'\\equiv',fn:WRITE},
        ```
    5. 

* 添加按钮点击，往输入框增加内容。 修改文件为math-input.js, 聚焦方法this.mathField.focus(); 增加内容方法this.mathField.setContent('666')，获取内容方法this.mathField.getContent() 注：athquill初始化是在math-wraper.js
```
  />}
            {/* wangchaogai */}
            <p onClick={this.toZfuchuan.bind(this)}>按钮</p>
        </View>;
    }
    // wangchaogai 新增按钮
    toZfuchuan() {
        this.mathField.focus();
        this.mathField.setContent('666')
    }
```



# license

This project is for research and personal interest only and is not intended to be included in any commerical software. Please use Khan's originial project as the base for any commercial release. 


    







