// import htmlContent from '../../whiteboard/whiteboard.html';

import React, {Component} from 'react';

// import {Sketchable} from '../../whiteboard/sketchable.full.min'

const {connect} = require('react-redux');
const {View,Text} = require('../fake-react-native-web');
var sketcher = null;

export default class Whiteboard extends Component {
    componentDidMount() {


       sketcher = new Sketchable(this.refs.canvas,  {
           events: {
               // We use the "before" event hook to update brush type right before drawing starts.
               mousedownBefore: function(elem, data, evt) {
                       // There is a method to get the default mode (pencil) back.
                       data.options.graphics.lineWidth = 3;
                       data.options.graphics.strokeStyle = "#0000FF";
                       // data.sketch.pencil();
                   }
               },
       });
        // sketcher = new Sketchable(this.refs.canvas);
    }

    generateSVGInk = () => {
        const strokes = sketcher.strokes();
        const scgInk = this.strokesToScg(strokes);
        console.log('scgInk generated', JSON.stringify(scgInk));

        sketcher.clear();
        const url = "http://72.93.93.62:8080/hw/mathreco";
        let options = Object.assign({ method: 'POST' } );
        options.headers = {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8"',
        };
        const requestSVG = {
                "id": 0,
                "scg_ink":scgInk,
                "info": null,
        };

        options.body= JSON.stringify(requestSVG);
        console.log('recognize', url, options);
        return fetch(url,options)
            .then(response => response.json())
            .then(json => {
                console.log('response', json);
                window.alert(JSON.stringify(json));
                appendText(json.latex)
            })  .catch(error => {
                console.log(error);
            });
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
        });

        return scg
    }


    render() {
        // console.log('width:  ' + window.innerWidth + ' height: ' + window.innerHeight);

        let width = Math.round(window.innerWidth * 2/3) - 10;
        let height = '200'; //todo: remove hardcode, need to fix overall position calculation
        // console.log(`width used:  ${width}`);


        // note:  the upper limit of the width  seems to be screenwidth * ratio ( 1, 1.5 or 2)  to display strokes properly.
        return (<View style={this.props.style}>
            <table>
                <tr>
            <td>
            <canvas id="drawing-canvas"
                    width={width}
                    height = {height}
                    ref="canvas"
                    style={{'border': '1px solid #000000'}}/>
            </td>
            <td>
                <table>
                    <tr>
                <Text onPress={this.generateSVGInk}>{'识别'}</Text>
                    </tr>
                    <tr/>
                    <tr>
                <Text onPress={()=>sketcher.clear()}>{'清除'}</Text>
                    </tr>
                </table>
            </td>
                </tr>
            </table>
        </View>);
    }
}


