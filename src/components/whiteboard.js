// import htmlContent from '../../whiteboard/whiteboard.html';

import React, {Component} from 'react';

const ReactDOM = require('react-dom');
const MathWrapper = require('./input/math-wrapper');

// import {Sketchable} from '../../whiteboard/sketchable.full.min'
const {View,Text} = require('../fake-react-native-web');
var sketcher = null;
let wi = screen.width - 3;

export default class Whiteboard extends Component {
    
    componentDidMount() {
        
        this.mathField1 = new MathWrapper(this._mathContainer, {}, {
            onCursorMove: (cursor) => {
                // TODO(charlie): It's not great that there is so much coupling
                // between this keypad and the input behavior. We should wrap
                // this `MathInput` component in an intermediary component
                // that translates accesses on the keypad into vanilla props,
                // to make this input keypad-agnostic.
                this.props.keypadElement &&
                    this.props.keypadElement.setCursor(cursor);
            },
        });

        // console.log('componentDidMount', this.refs.canvas);
        // let options = {
        //     events: {
        //         mousedown: function (elem, data, evt) {
        //             console.log('mouse down');
        //             // notifyEvent(evt.type);
        //         },
        //         mouseup: function (elem, data, evt) {
        //             console.log('mouse up');
        //         }
        //         // notifyEvent(evt.type);
        //         ,
        //         mousemove: function (elem, data, evt) {
        //             console.log('mouse move');
        //             // notifyEvent(evt.type);
        //         }
        //     }
        // };

       // sketcher = new Sketchable(this.refs.canvas, options);
        sketcher = new Sketchable(this.refs.canvas);
    }
    generateSVGInk = () => {
        const strokes = sketcher.strokes();
        const scgInk = this.strokesToScg(strokes);
        console.log('scgInk generated', scgInk);
        window.alert(scgInk);
    };

    //
    // transform(strokes) {
    //     for (var i = 0; i < strokes.length; ++i)
    //         for (var j = 0, stroke = strokes[i]; j < stroke.length; ++j)
    //             strokes[i][j] = [ strokes[i][j][0], strokes[i][j][1] ];
    //     return strokes;
    // };


    strokesToScg(strokes) {
        var scg = 'SCG_INK\n' + strokes.length + '\n'
        strokes.forEach(function (stroke) {
            scg += stroke.length + '\n'
            stroke.forEach(function (p) {
                scg += p[0] + ' ' + p[1] + '\n'
            })
        })

        return scg
    }
    
    render() {
        // return <div><h5>Hello</h5></div>;
        let str = '\\sqrt[3]{4}';
        return (<View>
            <View
                ref={(node) => {
                    this._mathContainer = ReactDOM.findDOMNode(node);
                }}
            >
                <Text
                    onPress={this.generateSVGInk}
                >{str}</Text>
                <Text
                    onPress={this.generateSVGInk}
                >{str}</Text>
                <Text
                    onPress={this.generateSVGInk}
                >{str}</Text>
            </View>
            <canvas id="drawing-canvas" width={wi} height="220" ref="canvas"
                    // onTouchEnd={this.generateSVGInk}
                    style={{'border': '1px solid #000000'}}/>
        </View>);
    }
}

// export default class Pre extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         <div>{this.props.preVue}</div>
//     }
// }