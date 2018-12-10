import React, {Component} from 'react';

const ReactDOM = require('react-dom');
const MathWrapper = require('./input/math-wrapper');

const {View,Text} = require('../fake-react-native-web');
var sketcher = null;
let wi = screen.width - 4;

export default class Whiteboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latexArr: [],
        }
    }

    componentDidMount() {
        this.mathField1 = new MathWrapper(this._mathContainer1, {}, {});
        this.mathField2 = new MathWrapper(this._mathContainer2, {}, {});
        this.mathField3 = new MathWrapper(this._mathContainer3, {}, {});
        sketcher = new Sketchable(this.refs.canvas);
    }

    generateSVGInk = (type) => {
        let off = false;
        let _this = this;
        // let timer = null;
        if (type === 'end') {
            this.timer = setTimeout(function(){
                const strokes = sketcher.strokes();
                const scgInk = _this.strokesToScg(strokes);
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
                        // appendText(json.latex)
                        // 将latex放入数组
                        _this.setState(()=>{
                            return {
                                latexArr: [...json.latex]
                            }
                            console.log(this.state)
                        })
                    })  .catch(error => {
                        console.log(error);
                    });
            }, 100000)
        } else if(type === 'start') {
            clearTimeout(this.timer)
        } else {
            clearTimeout(this.timer)
        }
        
    };

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
    handleClick(str) {
        alert(str)
    }

    render() {
        // let str = '\\sqrt[3]{890}';
        let str = '';
        return (<div>
            <div>
                <span
                    onClick={() => this.handleClick(str)}
                    style={{border: 'none',display: 'inline-block',padding: '0 10px'}}
                    ref={(node) => {
                        this._mathContainer1 = ReactDOM.findDOMNode(node);
                    }}
                >{str}</span>
                
            </div>
            <canvas id="drawing-canvas"
                    width={wi}
                    height = '180'
                    ref="canvas"
                    onTouchStart={() => this.generateSVGInk('start')}
                    onTouchEnd={() => this.generateSVGInk('end')}
                    style={{'border': '1px solid #000000'}}/>
        </div>);
    }
}

