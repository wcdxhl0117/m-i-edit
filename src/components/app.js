const React = require('react');

const {View} = require('../fake-react-native-web');
const {components} = require('../index');

const {Keypad, KeypadInput} = components;

class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
                keypadElement: null,
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

    appendText(text) {
        console.log('appendText in app', text);
        this.setState({value: (this.state.value + text)});
    }

    render() {
        return <View>
            <div
                style={{
                    // marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    // height: 60,
                    // overflow: 'auto',
                    // marginBottom: 40,
                    position: 'fixed',
                    top: '4',
                    zIndex: '10000',
                    // bottom: '205',
                    width: '95%'
                }}
            >
                <KeypadInput
                    ref={(inputComponent) => {window.inputComponent = inputComponent}}
                    value={this.state.value}
                    keypadElement={this.state.keypadElement}
                    onChange={(value, cb) => {
                            this.setState({value}, cb);
                            try{
                                // 不需要每次输入都传答案给native
                                // sendAnswer(value);
                                this.setState({value}, cb);
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
