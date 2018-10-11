/**
 * Constants that are shared between multiple files.
 */

module.exports = {
    KeypadTypes: {
        FRACTION: 'FRACTION',
        EXPRESSION: 'EXPRESSION',
    },

    KeyTypes: {
      // 空
        EMPTY: 'EMPTY',
        // For numerals, variables, and any other characters that themselves
        // compose 'values'.用于数字、变量和其他任何字符本身
        VALUE: 'VALUE',
        // For buttons that insert or adjust math in an input.
        // 用于在输入中插入或调整数学的按钮。
        OPERATOR: 'OPERATOR',
        // For buttons that move the cursor in an input (including via
        // deletion).用于在输入中移动光标的按钮（包括通过删除）
        INPUT_NAVIGATION: 'INPUT_NAVIGATION',
        // For buttons that modify the broader keypad state (e.g., by changing
        // the visible pane).用于修改更宽的键盘状态的按钮（例如，通过改变可见窗格）
        KEYPAD_NAVIGATION: 'KEYPAD_NAVIGATION',
        // For buttons that house multiple buttons and have no action
        // themselves.  用于容纳多个按钮且没有动作的按钮他们自己。
        MANY: 'MANY',
        // For the echo animation that appears on press.
        ECHO: 'ECHO',
    },

    DeviceOrientations: {
        LANDSCAPE: 'LANDSCAPE',
        PORTRAIT: 'PORTRAIT',
    },

    DeviceTypes: {
        PHONE: 'PHONE',
        TABLET: 'TABLET',
    },

    LayoutModes: {
        FULLSCREEN: 'FULLSCREEN',
        COMPACT: 'COMPACT',
    },

    BorderDirections: {
        LEFT: 'LEFT',
        BOTTOM: 'BOTTOM',
    },
    BorderStyles: {
        LEFT: ['LEFT'],
        BOTTOM: ['BOTTOM'],
        ALL: ['LEFT', 'BOTTOM'],
        NONE: [],
    },

    IconTypes: {
        MATH: 'MATH',
        SVG: 'SVG',
        TEXT: 'TEXT',
    },

    DecimalSeparators: {
        COMMA: 'COMMA',
        PERIOD: 'PERIOD',
    },

    EchoAnimationTypes: {
        SLIDE_AND_FADE: 'SLIDE_AND_FADE',
        FADE_ONLY: 'FADE_ONLY',
        LONG_FADE_ONLY: 'LONG_FADE_ONLY',
    },
};
