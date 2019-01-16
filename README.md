
# 运行方法
* npm install
* npm run watch
生成打包文件，在浏览器打开index.html，预览效果

# 功能介绍
本项目开发建立在可汗学院的math-input基础之上，[传送门](https://github.com/Khan/math-input)。在此基础上添加了手写识别功能，改变了页面布局（原5*4改为6*4，原2 tab 改为6tab），去掉了全键盘模式。

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
