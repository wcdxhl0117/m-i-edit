/**
 * This file contains constants for keypad buttons that aren't single
 * alphanumeric characters.
 */

// TODO(charlie): There's duplication between this file and key-configs.js.
// We should clean it up by removing this file and requiring clients to use the
// `id` field on the key configurations.
const Keys = {
    // 新增
    COMMA: 'COMMA',
    BRACKETS: 'BRACKETS',
    TWOTERM: 'TWOTERM',
    ANGLE: 'ANGLE',
    RIGHTSUB: 'RIGHTSUB',
    MIDDLEBRACKETS: 'MIDDLEBRACKETS',
    VERTICAL: 'VERTICAL',
    RIGHTTOPBTM: 'RIGHTTOPBTM',
    ABSOLUTEVALUE: 'ABSOLUTEVALUE',
    TRIANGLE: 'TRIANGLE',
    PARALLEL: 'PARALLEL',
    PM: 'PM',
    CIRC: 'CIRC',
    APPROX: 'APPROX',
    FEN: 'FEN',
    LE: 'LE',
    TWOFEN: 'TWOFEN',
    DWAN: 'DWAN',
    ALPHA: 'ALPHA',
    COT: 'COT',
    COLON: 'COLON',
    BETA: 'BETA',
    HUO: 'HUO',
    BAI: 'BAI',
    QIE: 'QIE',
    TEMPERATURE: 'TEMPERATURE',
    ONE: 'ONE',
    LEFTRIGHT: 'LEFTRIGHT',
    FOUR: 'FOUR',
    PI: 'PI',
    RIGHTLEFT: 'RIGHTLEFT',
    TWO: 'TWO',
    FIVE: 'FIVE',
    THREE: 'THREE',
    SIX: 'SIX',
    SIM: 'SIM',
    CONG: 'CONG',
    THREETERM: 'THREETERM',
    LG: 'LG',
    INFTY: 'INFTY',
    NEG: 'NEG',
    LOGARITHM: 'LOGARITHM',
    COMPLEMENT: 'COMPLEMENT',
    VEE: 'VEE',
    BAR: 'BAR',
    OVERRIGHTARROW: 'OVERRIGHTARROW',
    VARNOTHING: 'VARNOTHING',
    WEDGE: 'WEDGE',
    HAT: 'HAT',
    CAP: 'CAP',
    SUBSET: 'SUBSET',


    // 新增结束
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    NEGATIVE: 'NEGATIVE',
    TIMES: 'TIMES',
    DIVIDE: 'DIVIDE',
    DECIMAL: 'DECIMAL',
    PERIOD: 'PERIOD',
    PERCENT: 'PERCENT',
    CDOT: 'CDOT',
    EQUAL: 'EQUAL',
    NEQ: 'NEQ',
    GT: 'GT',
    LT: 'LT',
    GEQ: 'GEQ',
    LEQ: 'LEQ',
    FRAC_INCLUSIVE: 'FRAC_INCLUSIVE',
    FRAC_EXCLUSIVE: 'FRAC_EXCLUSIVE',
    EXP: 'EXP',
    EXP_2: 'EXP_2',
    EXP_3: 'EXP_3',
    SQRT: 'SQRT',
    CUBE_ROOT: 'CUBE_ROOT',
    RADICAL: 'RADICAL',
    LEFT_PAREN: 'LEFT_PAREN',
    RIGHT_PAREN: 'RIGHT_PAREN',
    LN: 'LN',
    LOG: 'LOG',
    LOG_N: 'LOG_N',
    SIN: 'SIN',
    COS: 'COS',
    SUREBTN: 'SUREBTN',
    EQUIV:'EQUIV',
    TAN: 'TAN',

    // TODO(charlie): Add in additional Greek letters.
    // PI: 'PI',
    THETA: 'THETA',

    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    BACKSPACE: 'BACKSPACE',
    DISMISS: 'DISMISS',

    JUMP_OUT_PARENTHESES: 'JUMP_OUT_PARENTHESES',
    JUMP_OUT_EXPONENT: 'JUMP_OUT_EXPONENT',
    JUMP_OUT_BASE: 'JUMP_OUT_BASE',
    JUMP_INTO_NUMERATOR: 'JUMP_INTO_NUMERATOR',
    JUMP_OUT_NUMERATOR: 'JUMP_OUT_NUMERATOR',
    JUMP_OUT_DENOMINATOR: 'JUMP_OUT_DENOMINATOR',

    NOOP: 'NOOP',

    // Multi-functional keys.
    FRAC_MULTI: 'FRAC_MULTI',

    // A custom key that captures an arbitrary number of symbols but has no
    // 'default' symbol or action.
    MANY: 'MANY',
    MANY1: 'MANY1',
};

module.exports = Keys;
