/**
 * A component that renders a view pager indicator, with a circular icon for
 * each page.
 */

const React = require('react');
const {StyleSheet} = require('aphrodite');

const {connect} = require('react-redux');

const {View, Text} = require('../fake-react-native-web');
const {pageIndicatorHeightPx, gray68, gray85} = require('./common-style');

class PagerIcon extends React.Component {
    static propTypes = {
        active: React.PropTypes.bool,
        radiusPx: React.PropTypes.number,
    };

    static defaultProps = {
        active: false,
        radiusPx: 4,
    };

    render() {
        const {active, radiusPx} = this.props;

        const fillColor = active ? '#51d326' : gray85;

        // return <svg width={2 * radiusPx} height={2 * radiusPx}>
        // ()=>console.log('click',this.props.page)
        
        return <View 
                onClick={()=> this.props.changeTab(this.props.page)}
                style={styles.indicators}
            >
            <svg width={2 * radiusPx} height={2 * radiusPx}>
                <circle
                    cx={radiusPx}
                    cy={radiusPx}
                    r={radiusPx}
                    fill={fillColor}
                />
            </svg>
            {/* <div style={{width: '100%', height: '100%',backgroundColor: fillColor, borderRadius: '6px',}}>
                tab{this.props.page + 1}
            </div> */}
        
        </View>;
    }
}

class PagerIndicator extends React.Component {
    static propTypes = {
        currentPage: React.PropTypes.number.isRequired,
        numPages: React.PropTypes.number.isRequired,
    };

    render() {
        const {currentPage, numPages} = this.props;

        const pagerIconRadiusPx = 4;

        // Collect the various indicator circles.
        const indicators = [];
        for (let i = 0; i < numPages; i++) {
            indicators.push(
                <PagerIcon
                    key={i}
                    page={i}
                    changeTab={this.props.changeCurrentPage}
                    active={i === currentPage && i !== 0}
                    radiusPx={pagerIconRadiusPx}
                />
            );
        }

        // Size the box that contains the icons to accommodate for proper
        // spacing, and let Flexbox take care of the details.
        const totalIconWidthPx = 2 * pagerIconRadiusPx * numPages;
        const totalSpacingWidthPx = 2 * pagerIconRadiusPx * (numPages - 1);
        const iconStripSize = {
            width: totalIconWidthPx + totalSpacingWidthPx,
        };

        return <View style={styles.indicatorStrip}>
            <View style={styles.iconStrip} dynamicStyle={iconStripSize}>
                {indicators}
                <Text onPress={()=>{ this.props.changeCurrentPage(5) }} style={(currentPage==0) ? styles.titleStyle1: styles.titleStyle2}>公式</Text>
            </View>

            <View style={styles.btnMargin}>
                {/* <Text onPress={()=>{console.log('pager-indicator:切换画板'); showCanvas()}}>{'手写'}</Text> */}
                <Text style={(currentPage==0) ? styles.handwritten1: styles.handwritten2} onPress={()=>{ this.props.changeCurrentPage(0) }}>{'手写'}</Text>
            </View>
            <View style={styles.btnMargin}>
                <Text onPress={()=>{console.log('pager-indicator:切换中文键盘'); window.showKeyboard(1)}}>{'英文'}</Text>
            </View>
            <View style={styles.btnMargin}>
                <Text onPress={()=>{console.log('pager-indicator:切换中文键盘'); window.showKeyboard(2)}}>{'中文'}</Text>
            </View>
            <View style={styles.btnMargin}>
                <Text style={styles.surebtn} onPress={()=>{console.log('pager-indicator:确认按钮'); window.sendAnswer()}}>{'确认'}</Text> 
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    indicatorStrip: {
        backgroundColor: '#F0F1F2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: pageIndicatorHeightPx,
        height: '40px',
        lineHeight: '20px',
    },
    iconStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        position: 'relative',
        marginLeft: '-26px',
    },
    // new
    indicators: {
        marginRight: '3px !important',
        marginBottom: '10px'
    },
    titleStyle1: {
        position: 'absolute',
        height: '12px',
        bottom: '0px',
        left: '16px',
        color: '#a0a0a0',
    },
    titleStyle2: {
        position: 'absolute',
        height: '12px',
        bottom: '0px',
        left: '16px',
        color: '#51d326',
    },
    btnMargin: {
        width: '40px',
        height: '30px',
        lineHeight: '30px',
        borderRadius: '6px',
        textAlign: 'center',
        marginLeft: '6px !important',
        marginRight: '6px !important',
        color: '#a0a0a0'
    },
    surebtn: {
        display: 'inline-block',
        margin: '0',
        width: '80px',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#47c3f7',
        borderRadius: '6px'
    },
    handwritten1: {
        color: '#51d326'
    },
    handwritten2: {
        color: '#a0a0a0'
    },
});

const mapStateToProps = (state) => {
    return {
        paginationEnabled: state.layout.paginationEnabled,
    };
};

const mapDispatchProps = (dispatch) => {
	return {
		changeCurrentPage(i) {
            console.log(i)
			const action = {
				type: 'changeCurrentPage',
				value: i
			}
			dispatch(action);
		}
	}
}

// module.exports = PagerIndicator;
module.exports = connect(mapStateToProps, mapDispatchProps)(PagerIndicator);
