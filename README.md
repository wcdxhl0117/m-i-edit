
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
    4. 定义新符号的属性。修改文件： src/data/key-configs.js
        ```
        [Keys.EQUIV]: {
                type: KeyTypes.OPERATOR,
                ariaLabel: i18n._('Always-equal sign'),
            },
        ```
    5. 修改文件：src/components/input/math-wrapper.js，math-wrapper.js里面包含了几乎所有符号的LaTeX编码
        ```
        [Keys.EQUIV]:{str:'\\equiv',fn:WRITE},
        ```
    6. 以上步骤已将将新加的公式符号svg,Latex编码都准备好了，现在需要引入到页面, 渲染公式键盘位置：src/components/expression-keypad.js, expression-keypad.js修改能替换和添加公式
        ```
            <TouchableKeypadButton
                keyConfig={KeyConfigs.EQUIV}
                borders={BorderStyles.NONE}
            />
        ```
        注意：如果在某一列添加一个图标，那么整个tab页布局都会变化：如目前是5*4的结构，如果在公式的某一行添加一个公式，那么键盘布局会变为5*5的结构，所以会交错，建议添加一个最好是整体都添加公式，最好还是添加个tab页去添加公式，这样不影响布局（tab添加方式后期研究）
    

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

* 新增tab的尝试
    首先在expression-keypad.js中发现已有rightPage和leftPage,需要再添加一个page，在two-page-keypad.js中增加这个page（two-page-keypad.js一些样式引入至styles.js，如column），然后在 view-page.js中添加一个chrild[2],




# license

This project is for research and personal interest only and is not intended to be included in any commerical software. Please use Khan's originial project as the base for any commercial release. 


    







