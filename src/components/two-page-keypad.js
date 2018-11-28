/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const Keypad = require('./keypad');
const ViewPager = require('./view-pager');
const PagerIndicator = require('./pager-indicator');
const {View} = require('../fake-react-native-web');
const {column, row, fullWidth} = require('./styles');
const {
    innerBorderColor, innerBorderStyle, innerBorderWidthPx, gray85,
} = require('./common-style');

class TwoPageKeypad extends React.Component {
    static propTypes = {
        currentPage: React.PropTypes.oneOf([0, 1, 2, 3, 4]).isRequired,
        threePage: React.PropTypes.node.isRequired,
        paginationEnabled: React.PropTypes.bool.isRequired,
        twoPage: React.PropTypes.node.isRequired,
        onePage: React.PropTypes.node.isRequired,
    };

    render() {
        const {
            currentPage,
            threePage,
            twoPage,
            paginationEnabled,
            onePage,
        } = this.props;

        if (paginationEnabled) {
            return <Keypad style={[column, styles.keypad]}>
                <View style={styles.borderTop}>
                    <ViewPager>
                        {threePage}
                        {twoPage}
                        {onePage}
                    </ViewPager>
                </View>
                {/* 小点点个数 */}
                <PagerIndicator numPages={3} currentPage={currentPage} />
            </Keypad>;
        } else {
            // 全屏展示
            return <Keypad style={styles.keypad}>
                <View style={row}>
                    <View style={fullWidth}>
                        {threePage}
                    </View>
                    <View style={fullWidth}>
                        {twoPage}
                    </View>
                    <View style={[styles.borderLeft, fullWidth]}>
                        {onePage}
                    </View>
                </View>
            </Keypad>;
        }
    }
}

const styles = StyleSheet.create({
    keypad: {
        // Set the background to light grey, so that when the user drags the
        // keypad pages past the edges, there's a grey backdrop.
        backgroundColor: gray85,
    },

    borderTop: {
        borderTop: `${innerBorderWidthPx}px ${innerBorderStyle} `
            + `${innerBorderColor}`,
    },
    borderLeft: {
        borderLeft: `${innerBorderWidthPx}px ${innerBorderStyle} `
            + `${innerBorderColor}`,
        boxSizing: 'content-box',
    }
});

const mapStateToProps = (state) => {
    return {
        paginationEnabled: state.layout.paginationEnabled,
    };
};

module.exports = connect(mapStateToProps)(TwoPageKeypad);
