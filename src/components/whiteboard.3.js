import React, {Component} from 'react';
import axios from 'axios';

const ReactDOM = require('react-dom');
const MathWrapper = require('./input/math-wrapper');

const {View,Text} = require('../fake-react-native-web');
var sketcher = null;
let wi = screen.width - 4;

export default class Whiteboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latexArr: ['\\frac{123}{456}'],
        }
    }

    componentWillUpdate() {
        // console.log('componentWillUpdate')
        // this.mathField1 = new MathWrapper(this._mathContainer1, {}, {});
        // this.mathField2 = new MathWrapper(this._mathContainer2, {}, {});
        // this.mathField3 = new MathWrapper(this._mathContainer3, {}, {});
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.mathField1 = new MathWrapper(this._mathContainer1, {}, {});
        this.mathField2 = new MathWrapper(this._mathContainer2, {}, {});
        this.mathField3 = new MathWrapper(this._mathContainer3, {}, {});
        // sketcher = new Sketchable(this.refs.canvas);
        sketcher = new Sketchable(this.refs.canvas,  {
            events: {
                // We use the "before" event hook to update brush type right before drawing starts.
                mousedownBefore: function(elem, data, evt) {
                        // There is a method to get the default mode (pencil) back.
                        data.options.graphics.lineWidth = 2;
                        data.options.graphics.strokeStyle = "#000";
                        // data.sketch.pencil();
                    }
                },
        });

        // axios.get('http://yoocorrect.yoomath.com/api/ycorrect/user/login?username=七八九九&password=123456')
        //     .then((response)=> {
        //         console.log(response)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }

    generateSVGInk = (type) => {
        let off = false;
        let _this = this;
        // let timer = null;
        if (type === 'end') {
            this.timer = setTimeout(function(){
                const strokes = sketcher.strokes();
                const scgInk = _this.strokesToScg(strokes);
                // console.log('scgInk generated', JSON.stringify(scgInk));

                sketcher.clear();
                // https://hw.yooshare.cn
                // const url = "http://72.93.93.62:8080/hw/mathreco";
                const url = "http://72.93.93.62:8080/hw/mathreco";
                let options = Object.assign({ method: 'POST' } );
                options.headers = {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                };
                const requestSVG = {
                        "id": 0,
                        "scg_ink":scgInk,
                        "info": null,
                };

                options.body= JSON.stringify(requestSVG);
                // console.log('recognize', url, options);
                return fetch(url,options)
                    .then(response => response.json())
                    .then(json => {
                        // console.log('response', json);
                        // 将latex放入数组
                        for (var i=0;i<json.n_best_latex.length;i++) {                    
                            json.n_best_latex[i] = json.n_best_latex[i].replace(/\\/g,"\\\\");
                        }
                        console.log(json.n_best_latex);
                        _this.setState(()=>{
                            return {
                                latexArr: json.n_best_latex
                            }
                        })
                        
                    }).catch(error => {
                        console.log(error);
                    });
            }, 600)
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
        this.setState({
			latexArr: []
		})
    }

    render() {
        console.log('render')
        return (<div style={{'width': '84%', 'borderRight': '1px solid #999'}}>
            <div style={{'height': '44px', 'overflow': 'auto', 'display': 'flex'}}>
                {
                    this.state.latexArr.map((item, index) => {
                        return (
                            <span key={index} style={index === this.state.latexArr.length - 1 ? style2 : style1}>
                                <span
                                    onClick={() => this.handleClick(item)}
                                    style={{border: 'none'}}
                                    ref={(node) => {
                                        if (index === 0 ) {
                                            this._mathContainer1 = ReactDOM.findDOMNode(node);
                                        } else if (index ===1) {
                                            this._mathContainer2 = ReactDOM.findDOMNode(node);
                                        } else if (index ===2) {
                                            this._mathContainer3 = ReactDOM.findDOMNode(node);
                                        }
                                    }}
                                >{item}</span>
                            </span>)
                    })
                }
            </div>
            <canvas id="drawing-canvas"
                    width={wi*0.85}
                    height = '180'
                    ref="canvas"
                    onTouchStart={() => this.generateSVGInk('start')}
                    onTouchEnd={() => this.generateSVGInk('end')}
                    style={{'borderTop': '1px solid #999',}}/>
        </div>);
    }
}
let style1 = {
    border: 'none', 
    display: 'inline-block', 
    borderRight: '1px solid #999', 
    margin: '6px 0',
    padding: '0 10px', 
    height: '30px'
}
let style2 = {
    border: 'none', 
    display: 'inline-block', 
    margin: '6px 0', 
    padding: '0 10px', 
    height: '30px'
}
