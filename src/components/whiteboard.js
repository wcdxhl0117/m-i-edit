import React, {Component} from 'react';

const ReactDOM = require('react-dom');
const MathWrapper = require('./input/math-wrapper');

var sketcher = null;
var wi = screen.width - 4;
var He = 0;

var u = navigator.userAgent;
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // 安卓手机
    He = 160
} else if (u.indexOf('iPhone') > -1) {
    // 苹果手机
    He = 190
} else if (u.indexOf('Windows Phone') > -1) {
    //winphone手机
}

export default class Whiteboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latexArr: []
        }
    }
    
    componentDidMount() {
        console.log(wi)
        this.mathField1 = new MathWrapper(this._mathContainer1, {}, {});
        this.mathField2 = new MathWrapper(this._mathContainer2, {}, {});
        this.mathField3 = new MathWrapper(this._mathContainer3, {}, {});

        // var can = this.refs.canvas;	
		// 	var cxt = can.getContext("2d");
		// 	var imgs = new Image();
		// 	imgs.src = "http://qnstatic.file.yoomath.com/parent/V1.0.5/kapian1.png";
		// 	imgs.onload = function (){
		// 		var bg = cxt.createPattern(imgs,"no-repeat");
		// 		cxt.fillStyle = bg;
        //         cxt.fillRect(0,0,can.width,can.height);
        //     };//图片加载完成再执行
			
        sketcher = new Sketchable(this.refs.canvas,  {
            graphics: {
                firstPointSize: 1,
            },
            events: {
                // We use the "before" event hook to update brush type right before drawing starts.
                mousedownBefore: function(elem, data, evt) {
                        // There is a method to get the default mode (pencil) back.
                        data.options.graphics.lineWidth = 2;
                        data.options.graphics.strokeStyle = "#000";
                        // data.options.graphics.beginFill = '#000'
                        // data.sketch.pencil();
                    }
                },
        });
    }

    putIn() {
        this.mathField1.delAll();
    }

    generateSVGInk = (type) => {
        let _this = this;
        if (type === 'end') {
            this.timer = setTimeout(function(){
                const strokes = sketcher.strokes();
                const scgInk = _this.strokesToScg(strokes);
                // console.log('scgInk generated', JSON.stringify(scgInk));

                // https://hw.yooshare.cn
                const url = "http://72.93.93.62:8080/hw/mathreco";
                // const url = "https://hw.yooshare.cn/hw/mathreco";
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


                $.ajax({
                    url: url,
                    method: 'POST',
                    data: JSON.stringify(requestSVG),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    success: function(json) {
                        sketcher.clear();
                        // 将latex放入数组
                        // console.log(json.n_best_latex);
                        _this.setState(()=>{
                            return {
                                latexArr: json.n_best_latex
                            }
                        })
                        console.log(_this.state.latexArr);
                        _this.delAllStr();
                        // style1.borderRight = '1px solid #e2e2e2';
                        _this.mathField1.writeContent(_this.state.latexArr[0]);
                        _this.mathField2.writeContent(_this.state.latexArr[1]);
                        _this.mathField3.writeContent(_this.state.latexArr[2]);
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })


                // console.log('recognize', url, options);
                // return fetch(url,options)
                //     .then(response => response.json())
                //     .then(json => {
                //         sketcher.clear();
                //         // 将latex放入数组
                //         // console.log(json.n_best_latex);
                //         _this.setState(()=>{
                //             return {
                //                 latexArr: json.n_best_latex
                //             }
                //         })
                //         console.log(_this.state.latexArr);
                //         _this.delAllStr();
                //         // style1.borderRight = '1px solid #e2e2e2';
                //         _this.mathField1.writeContent(_this.state.latexArr[0]);
                //         _this.mathField2.writeContent(_this.state.latexArr[1]);
                //         _this.mathField3.writeContent(_this.state.latexArr[2]);
                //     }).catch(error => {
                //         console.log(error);
                //     });


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

    // 清空方法
    delAllStr() {
        // style1.borderRight = 'none';
        this.mathField1.delAll();
        this.mathField1.mathField.blur();
        this.mathField2.delAll();
        this.mathField2.mathField.blur();
        this.mathField3.delAll();
        this.mathField3.mathField.blur();
    }

    handleClick(str) {
        appendText(str);
        this.setState(() => {
            return {
                latexArr: []
            }
        });
        this.delAllStr();
    }

    render() {
        // 'borderRight': '1px solid #999', 
        return (<div style={{'width': '84%', 'backgroundColor': '#fff', 'position': 'relative'}}>
            <div style={{'height': '40px', 'overflow': 'auto', 'display': 'flex'}}>
                <span style={style1}>
                    <span
                        className='strOne'
                        onClick={() => this.handleClick(this.state.latexArr[0])}
                        style={{border: 'none'}}
                        ref={(node) => {
                            this._mathContainer1 = ReactDOM.findDOMNode(node);
                        }}
                    ></span>
                </span>
                <span style={style1}>
                    <span
                        className='strTwo'
                        onClick={() => this.handleClick(this.state.latexArr[1])}
                        style={{border: 'none'}}
                        ref={(node) => {
                            this._mathContainer2 = ReactDOM.findDOMNode(node);
                        }}
                    ></span>
                </span>
                <span style={style2}>
                    <span
                        className='strThree'
                        onClick={() => this.handleClick(this.state.latexArr[2])}
                        style={{border: 'none'}}
                        ref={(node) => {
                            this._mathContainer3 = ReactDOM.findDOMNode(node);
                        }}
                    ></span>
                </span>
            </div>
            {/* <div style={style3}>仅支持英文、数字、公式</div> */}
            <canvas id="drawing-canvas"
                    width={wi*0.85}
                    height = {He}
                    ref="canvas"
                    onTouchStart={() => this.generateSVGInk('start')}
                    onTouchEnd={() => this.generateSVGInk('end')}
                    style={style4}/>
        </div>);
    }
}
let style1 = {
    border: 'none', 
    display: 'inline-block', 
    // borderRight: '', 
    margin: '6px 0',
    padding: '0 10px', 
    height: '30px'
}
let style2 = {
    border: 'none', 
    display: 'inline-block', 
    margin: '6px 0', 
    padding: '0 12px', 
    height: '30px'
}
let style3= {
    position: 'absolute',
    bottom: '2px',
    left: '0',
    textAlign: 'center',
    width: '100%',
    textAlign: 'center',
    height: 'auto',
    fontSize: '12px',
    color: '#ccc'
}
let style4 = {
    'borderTop': '1px solid #e2e2e2',
    // 'background-image': 'url(http://qnstatic.file.yoomath.com/parent/V1.0.5/kapian1.png)'
}
