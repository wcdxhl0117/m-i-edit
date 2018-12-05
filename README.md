
# 修改方法总结
#### 右下角的符号修改方法
    src/store/index.js
    注意：如果是特殊符号需要按下面按钮的方式去添加编码
```
    const initialKeypadState = {
        extraKeys: ['x', 'y', 'z', Keys.THETA, Keys.PI], 
        keypadType: defaultKeypadType,
        active: false,
    };
```

#### 添加多个MANY公式的方法
```
    具体修改的文件见：
    https://github.com/wangchao117/m-i-edit/commit/eae546cf1cc6612a6e462b71ae09681233c8e4d5
```
> 此类型公式不是一般公式都能这样做，只有特定类型的能，参照math-wrapper.js（72-81）行
    


#### 进入页面聚焦修改
    math-input.js，在组件挂在结束的钩子里调用它的focus方法。
``` 
    // 60
    let _this = this;
    setTimeout(function() {
        _this.focus();
    }, 50)
```
#### 修改其他钮的方法
    1. 新建一个svg组件： 位置在components/iconography/cos1.js，这个文件是现实按钮图片的svg
    2. 修改iconography文件的index： components/iconography/index.js, iconography下方的所有公式的svg组件，
    index是做统一导出
```
    COS1:require('./cos1'),
```
    3. 修改符号注册文件： data/keys.js
```
    COS1:'COS1',
```
    4. 定义新符号的属性。修改文件： data/key-configs.js
```
    [Keys.COS1]: {
        type: KeyTypes.OPERATOR,
        ariaLabel: i18n._('Always-equal cos'),
    },
```
    5. 修改文件：components/input/math-wrapper.js，math-wrapper.js里面包含了几乎所有符号的LaTeX编码
    但是不同类型的公式修改地方和方法好事不一样，如cos就做了特殊处理，加了括号，我直接用了cos的代码

    6. 以上步骤已将将新加的公式符号svg,Latex编码都准备好了，现在需要引入到页面, 
    渲染公式键盘位置：components/expression-keypad.js, expression-keypad.js修改能替换和添加公式，
    新增一列就是在page下新增一个大的view，里面5个具体公式，添加一行则需要在page下每个列去添加一个具体公式
```
            <TouchableKeypadButton
                keyConfig={KeyConfigs.COS1}
                borders={BorderStyles.NONE}
            />
```
        注意：如果在某一列添加一个图标，那么整个tab页布局都会变化：如目前是5*4的结构，如果在公式的某一行添加一个公式，
        那么键盘布局会变为5*5的结构，所以会交错，建议添加一个最好是整体都添加公式或加列，最好还是添加个tab页去添加公式，
        这样不影响布局
    

#### 添加按钮点击，往输入框增加内容。 
修改文件为math-input.js, 聚焦方法this.mathField.focus(); 增加内容方法this.mathField.writeContent()，获取内容方法this.mathField.getContent() 注：mathquill初始化是在math-wraper.js
```
  // 增加按钮  
    <p onClick={this.toZfuchuan.bind(this)}>按钮</p>

    toZfuchuan() {
        this.mathField.focus();
        this.mathField.setContent('666')
    }
```
注：这一块还是有问题的，应该是没走整个事件流程导致的，暂时搁置

#### 新增tab的尝试
    1. 首先要修改的是expression-keypad.js，已有rightPage和leftPage,需要再添加一个middlPpage，
    具体结构和leftPage和rightPage保持一致，同时将numPages = 3
    2. 在two-page-keypad.js（当然也可以重新建一个在there-page-keypad.js），引入middlePage，使用middlepage

```
        // 修改默认节点数量
        static propTypes = {
            // currentPage: React.PropTypes.oneOf([0, 1]).isRequired,
            currentPage: React.PropTypes.oneOf([0, 1, 2]).isRequired,
            leftPage: React.PropTypes.node.isRequired,
            paginationEnabled: React.PropTypes.bool.isRequired,
            rightPage: React.PropTypes.node.isRequired,
        };
        // 引入
        const {
            currentPage,
            leftPage,
            paginationEnabled,
            rightPage,
            middlePage,
        } = this.props;
        // 使用
        if (paginationEnabled) {
            return <Keypad style={[column, styles.keypad]}>
                <PagerIndicator numPages={3} currentPage={currentPage} />
                <View style={styles.borderTop}>
                    <ViewPager>
                        {leftPage}
                        {middlePage}
                        {rightPage}
                    </ViewPager>
                </View>
            </Keypad>;
        } else {
            return <Keypad style={styles.keypad}>
                <View style={row}>
                    <View style={fullWidth}>
                        {leftPage}
                    </View>
                    <View style={fullWidth}>
                        {middlePage}
                    </View>
                    <View style={[styles.borderLeft, fullWidth]}>
                        {rightPage}
                    </View>
                </View>
            </Keypad>;
        }
```

    3. 修改view-pager.js，新增tab。
```
        return <View style={pagerStyle} dynamicStyle={dynamicPagerStyle}>
            <View dynamicStyle={dynamicPageStyle}>
                {children[0]}
            </View>
            <View style={styles.rightPage} dynamicStyle={dynamicPageStyle}>
                {children[1]}
            </View>
            {/* 新增tab */}
            <View style={styles.rightPage} dynamicStyle={dynamicPageStyle}>
                {children[2]}
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
            // 3tab用
            maxWidth: '400%'
        }
```

#### 公式输入时，自动移动到输入处的相关设置
    math-wrapper.js文件，如果需要光标移动到输入的位置，需要在presskey()方法中去设置，通过if判断，去做移动光标的操作,如下是中括号添加（200-203）
```
 } else if(key===Keys.MIDDLEBRACKETS) {
            this.mathField.write('\\left[\\right]');
            this.mathField.keystroke('Left');
        } else { // added by SongLin.  放入字符串到输入框

```

#### 与native通讯，将外部字符串放入输入框的方法（感谢宋霖）
    我一直的思路是在math-input.js组件里面去改，在math-wrapper组件组去写对应的方法，一直有问题。
    宋霖老师的做法：在component/app.js
```
    const React = require('react');
    const {View} = require('../fake-react-native-web');
    const {components} = require('../index');
    const {Keypad, KeypadInput} = components;
    class App extends React.Component {
        constructor(props){
            super(props);
            this.state ={
                    keypadElement: null,
                    // 这个是输入框的默认值，考虑在这里去替换
                    value:'',
            };
        }

        /*componentWillMount(){
            realAnswer.callback = (data) => {
                // `this` refers to our react component
                this.setState({value:realAnswer});
            };
        }
    */
        render() {
            return <View>
                <div
                    style={{
                        marginTop: 10,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 40,
                    }}
                >
                    <KeypadInput
                        value={this.state.value}
                        keypadElement={this.state.keypadElement}
                        {/* 在change事件去将输入框变化后的内容传出去，这样能在index.html里设置函数接收值，可以传给native */}
                        onChange={(value, cb) => {
                                this.setState({value}, cb);
                                try{
                                    sendAnswer(value);
                                }catch (e){
                                    console.log('cannot send answer' + e.toString());
                                }
                            }
                        }
                        onFocus={() => this.state.keypadElement.activate()}
                        onBlur={() => this.state.keypadElement.dismiss()}
                    />
                </div>
                <Keypad
                    onElementMounted={node => {
                        if (node && !this.state.keypadElement) {
                            this.setState({keypadElement: node});
                        }
                    }}
                />
            </View>;
        }
    }
    module.exports = App;
```
在src/app.js中将整个app的render结果传给myComponent，在index.html中直接使用myComponent去接受字符串通过setState放入输入框


#### 其他注意点：
* expression-keypad.js的36行，可能是定义行列数的位置
```
    // 发现重要线索，实践证明这个变动，按钮大小会改变，可以更据实际情况调整行列以及调整view-pager.js的百分比来适应屏幕宽度
    static rows = 4;
    static columns = 5;
```
* math-wrapper里面的方法应该就是输入框的对应方法，里面定义了mathquill的一些API
* 按钮点击执行事件文件定位: gesture-manager.js（54: click）
    1. gesture-state-machine.js(230: onTouchEnd，注释：253）
    2. popover-state-machine.js(130: ontouchend, 注释：133，158), 触发onTrigger，点击事件
    3. 根据上面分析，特别是gesture-manager.js（54: click），定位node-manager.js里的事件layoutPropsForId(只是确定位置信息，没啥用)
    4. 实在没找到hander.onClick在哪定义，最后猜测会不会放在了store，果然：store/index.js(257: onClick的dispath)，
    所以找到对应reducer:'PressKey'(多个)，43->对应inputReducer,通过打印state.keyHandler，发现keyHander在math-input
    中被使用（279），这可以在这里判断按钮类型：
```
    // 这里可以判断按钮点击的是谁，比如可以加一个确认按钮，事件就能触发到了
    if (key === 'COS') {
        console.log('点击了cos');
        console.log(localStorage.getItem('toLatex'));
    }
```
* 在math-input.js输入框的光标拖动改动：
    通过onCursorHandleTouchMove方法（619），进而找到_constrainToBound方法（594），这个方法是控制光标移动时位置的，在左右极值
    源代码并没有作限制，这里我改为不能移除左右边框,同时改样式（去掉overflow:hidden）,让输入框内容能够拖动

* 新增确认按钮
    通过store流程，找到点击按钮时input的出发的是focus，所以在focus中添加判断，调用全局函数，与native通讯

* 在math-input原项目下，http://khan.github.io/math-input/custom.html可设置键盘结构，设置好的参数直接放到index.html后面，能实现不同功能的键盘

* 在store （110）改动，让其不能收起键盘
* 目前添加操作输入框的相关操作，首先考虑在input-wrapper上去定义新方法

* key-configs.js下的不同type对应的active背景颜色不一样,type: KeyTypes.INPUT_NAVIGATION，type: KeyTypes.VALUE, type: KeyTypes.OPERATOR

* keypad.js(349 --> 69ß): maxWidth: widthPx, 其实改变按钮宽度的方法就是上面的重要线索，express-keypad.js（40），如果键盘为6列4行，这对应改为：static rows = 4; static columns = 6;

* 键盘公式点击的动画速度：view-pager.js (44:animationDurationMs), 这个额速度它是根据整个宽度的像素数量来计算时间的，我除了个6，不然从第一页到最后一夜动画太长了。当然应该是能定死的

* 宽屏（iPad）模式下，结构会错乱：解决办法就是取消在宽屏时展示全部公式---> two-page-keypad.js（42，57-81），仅仅处理这里还不行，会有方向键，文件keypad-container.js(195-200), 去掉展示方向键的按钮，按钮在pad上的宽度调整为100%（keypad-button.js: 346）

* 按钮点击状态的背景动画时间控制：echo-manager.js（79）


# license

This project is for research and personal interest only and is not intended to be included in any commerical software. Please use Khan's originial project as the base for any commercial release. 


    







