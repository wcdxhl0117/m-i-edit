
# 修改方法总结
* 右下角的符号修改方法
    src/store/index.js
    ```
    const initialKeypadState = {
            extraKeys: ['x', 'y', Keys.THETA, Keys.PI], 
            keypadType: defaultKeypadType,
            active: false,
        };
    ```

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


    







