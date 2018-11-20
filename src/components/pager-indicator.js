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

        const fillColor = active ? gray68 : gray85;

        // return <svg width={2 * radiusPx} height={2 * radiusPx}>
        // ()=>console.log('click',this.props.page)
        
        return <View onClick={()=> this.props.changeTab(this.props.page)}><svg width={2 * radiusPx} height={2 * radiusPx}>
            <circle
                cx={radiusPx}
                cy={radiusPx}
                r={radiusPx}
                fill={fillColor}
            />
        {/* </svg>; */}
        </svg></View>;
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
                    active={i === currentPage}
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
            </View>
            <View style={styles.btnMargin}>
                <Text onPress={()=>{console.log('pager-indicator:切换中文键盘'); showKeyboard()}}>{'中文'}</Text>
            </View>
            <View style={styles.btnMargin}>
                <Text onPress={()=>{console.log('pager-indicator:切换画板'); showCanvas()}}>{'手写'}</Text>
            </View>
            <View style={styles.btnMargin}>
                <Text onPress={()=>{console.log('pager-indicator:确认按钮'); sendAnswer()}}>{'确认'}</Text> 
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
        height: '50px',
        lineHeight: '50px'
    },
    iconStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnMargin: {
        marginLeft: '16px',
    }
});

const mapStateToProps = (state) => {
    return {
        paginationEnabled: state.layout.paginationEnabled,
    };
};

const mapDispatchProps = (dispatch) => {
	return {
		changeCurrentPage(i) {
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
