// import htmlContent from '../../whiteboard/whiteboard.html';

import React, {Component} from 'react';

// import {Sketchable} from '../../whiteboard/sketchable.full.min'
const {View,Text} = require('../fake-react-native-web');
var sketcher = null;

export default class Whiteboard extends Component {
    componentDidMount() {
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
        return (<View>
            <Text onPress={this.generateSVGInk}>{'SVG INK'}</Text>
            <canvas id="drawing-canvas" width="300" height="200" ref="canvas"
                    style={{'border': '1px solid #000000'}}/>
        </View>);
    }
}
