
# 运行方法
* npm install
* npm run watch
生成打包文件，在浏览器打开index.html，预览效果

# 功能介绍
本项目开发建立在可汗学院的math-input基础之上（[传送门]）(https://github.com/Khan/math-input)。在此基础上添加了：
1.手写识别功能（识别接口为私有接口）
2.改变了页面布局（原5*4改为6*4，原2 tab 改为6tab）
3.去掉了全键盘模式
4.将输入框宽度调整，高度固定，光标居中
5.加载结束光标自动聚焦到输入状态
6.暴露组件到index.html，在index去操作组件，取值并与Native交互（Native端交互细节为美国大佬所写）

# 增加tab页具体方法
* 修改的是expression-keypad.js，已有onePage和six-Page，若要新增，需在加一个和其他tab页相同结构，如sevenPage，同时将numPages加1：numPages = 7
* 在two-page-keypad.js（当然也可以重新建一个在seven-page-keypad.js），引入sevenPage，使用sevenPage，代码如下： 
```
    
        // 修改默认节点数量
        static propTypes = {
            currentPage: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]).isRequired,
            sevenPage: React.PropTypes.node.isRequired,
            sixPage: React.PropTypes.node.isRequired,
            fivePage: React.PropTypes.node.isRequired,
            fourPage: React.PropTypes.node.isRequired,
            threePage: React.PropTypes.node.isRequired,
            paginationEnabled: React.PropTypes.bool.isRequired,
            twoPage: React.PropTypes.node.isRequired,
            onePage: React.PropTypes.node.isRequired,
        };
        // 引入
        const {
            currentPage,
            sevenPage
            sixPage,
            fivePage,
            fourPage,
            threePage,
            twoPage,
            paginationEnabled,
            onePage,
        } = this.props;
        // 使用
        <View style={styles.borderTop}>
            <ViewPager>
                {sevenPage}
                {sixPage}
                {fivePage}
                {fourPage}
                {threePage}
                {twoPage}
                {onePage}
            </ViewPager>
        </View>
```

* 修改view-pager.js，新增tab。
```
        return <View style={pagerStyle} dynamicStyle={dynamicPagerStyle}>
            <View dynamicStyle={dynamicPageStyle}>
                {children[0]}
            </View>
            <View style={styles.rightPage} dynamicStyle={dynamicPageStyle}>
                {children[1]}
            </View>
            
            {/* 新增第三个tab */}
            <View dynamicStyle={dynamicPageStyle}>
                {children[2]}
            </View>

            {/* 新增第四个tab */}
            <View dynamicStyle={dynamicPageStyle}>
                {children[3]}
            </View>
            
            {/* 新增第五个tab */}
            <View dynamicStyle={dynamicPageStyle}>
                {children[4]}
            </View>

            {/* 新增第六个tab */}
            <View dynamicStyle={dynamicPageStyle}>
                {children[5]}
            </View>

            {/* 新增第七个tab */}
            <View dynamicStyle={dynamicPageStyle}>
                {children[5]}
            </View>

        </View>;

        // 修改样式(宋霖)
        twoPagePager: {
            alignSelf: 'flex-start',
            // Note: By default, <View> sets a `maxWidth` of 100% to fix some
            // Flexbox bugs. We have to override it to accommodate for our two
            // pages. The exact value here isn't super important, as long as it's
            // large enough to accommodate for two pages (so, 200%) and some
            // separators.
            // 2tab用,这是我没发现的关键点，美国那边帮助下发现的关键，如果2个tab需要>200%,3个>300%
            // maxWidth: '250%',
            // 7tab用
            maxWidth: '850%'
        }
```

# 公式替换的方法
* 新建一个svg组件： 位置在components/iconography/cos1.js，这个文件是现实按钮图片的svg
* 修改iconography文件的index： components/iconography/index.js, iconography下方的所有公式的svg组件，index是做统一导出
```
    COS1:require('./cos1')
```
* 修改符号注册文件： data/keys.js
```
    COS1:'COS1',
```
* 定义新符号的属性。修改文件： data/key-configs.js
```
    [Keys.COS1]: {
        type: KeyTypes.OPERATOR,
        ariaLabel: i18n._('Always-equal cos'),
    },
```
*  修改文件：components/input/math-wrapper.js，math-wrapper.js里面包含了几乎所有符号的LaTeX编码
    但是不同类型的公式修改地方和方法好事不一样，如cos就做了特殊处理，加了括号，我直接用了cos的代码

* 以上步骤已将将新加的公式符号svg,Latex编码都准备好了，现在需要引入到页面, 
    渲染公式键盘位置：components/expression-keypad.js, expression-keypad.js修改能替换和添加公式，
    新增一列就是在page下新增一个大的view，里面5个具体公式，添加一行则需要在page下每个列去添加一个具体公式
```
            <TouchableKeypadButton
                keyConfig={KeyConfigs.COS1}
                borders={BorderStyles.NONE}
            />
```

# 添加多个MANY公式的方法
    具体修改的文件见： https://github.com/wangchao117/m-i-edit/commit/eae546cf1cc6612a6e462b71ae09681233c8e4d5
> 此类型公式不是一般公式都能这样做，只有特定类型的能，参照math-wrapper.js（72-81）行
