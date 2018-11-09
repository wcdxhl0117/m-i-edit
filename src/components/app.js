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
