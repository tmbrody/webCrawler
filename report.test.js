const { test, expect } = require('@jest/globals');
const { sortPageInstances } = require('./report');

const test1 = {};
const result1 = [];

test('Checks test1 object', () => {
    expect(sortPageInstances(test1)).toStrictEqual(result1);
});

const test2 = {'example.com': {count: 1}};
const result2 = [ 'example.com' ];

test('Checks test2 object', () => {
    expect(sortPageInstances(test2)).toStrictEqual(result2);
});

const test3 = {
    'example.com': {count: 1},
    'example.com/path1': {count: 0},
    'example.com/path2': {count: -1},
    'example.com/path3': {count: 5},
    'example.com/path4': {count: 2}, 
    'example.com/path5': {count: 5},
};
const result3 = [
    'example.com/path3',
    'example.com/path5',
    'example.com/path4',
    'example.com',
    'example.com/path1',
    'example.com/path2'
];

test('Checks test3 object', () => {
    expect(sortPageInstances(test3)).toStrictEqual(result3);
});

const test4 = {
    'example.com': {count: undefined},
    'example.com/c_path': {count: 0},
    'example.com/a_path': {count: 999},
    'example.com/d_path': {count: NaN},
    'example.com/b_path': {count: "count"}, 
};
const result4 = [
    'example.com',
    'example.com/a_path',
    'example.com/c_path',
    'example.com/d_path',
    'example.com/b_path'
];

test('Checks test4 object', () => {
    expect(sortPageInstances(test4)).toStrictEqual(result4);
});

const test5 = {
    'example.com': {count: 0},
    'example.com/path100': {count: 1},
    'example.com/path002': {count: 3},
    'example.com/path003': {count: 7},
    'example.com/path004': {count: 8},
    'example.com/path005': {count: 4},
    'example.com/path006': {count: 66},
    'example.com/path007': {count: 7},
    'example.com/path008': {count: 4},
    'example.com/path009': {count: 12},
    'example.com/path010': {count: 22},
    'example.com/path011': {count: 2},
    'example.com/path012': {count: 4},
    'example.com/path013': {count: 4},
    'example.com/path014': {count: 5},
    'example.com/path015': {count: 1},
    'example.com/path016': {count: 9},
    'example.com/path017': {count: 99},
    'example.com/path018': {count: 67},
    'example.com/path019': {count: 3},
    'example.com/path020': {count: 65},
    'example.com/path021': {count: 9},
    'example.com/path022': {count: 8},
    'example.com/path023': {count: 5},
    'example.com/path024': {count: 26},
    'example.com/path025': {count: 74},
    'example.com/path026': {count: 42},
    'example.com/path027': {count: 68},
    'example.com/path028': {count: 11},
    'example.com/path029': {count: 60},
    'example.com/path030': {count: 40},
    'example.com/path031': {count: 49},
    'example.com/path032': {count: 77},
    'example.com/path033': {count: 8},
    'example.com/path034': {count: 5},
    'example.com/path035': {count: 2},
    'example.com/path036': {count: 1},
    'example.com/path037': {count: 3},
    'example.com/path038': {count: 55},
    'example.com/path039': {count: 19},
    'example.com/path040': {count: 63},
    'example.com/path041': {count: 90},
    'example.com/path042': {count: 44},
    'example.com/path043': {count: 24},
    'example.com/path044': {count: 38},
    'example.com/path045': {count: 31},
    'example.com/path046': {count: 57},
    'example.com/path047': {count: 98},
    'example.com/path048': {count: 4},
    'example.com/path049': {count: 11},
    'example.com/path050': {count: 9},
    'example.com/path051': {count: 5},
    'example.com/path052': {count: 43},
    'example.com/path053': {count: 37},
    'example.com/path054': {count: 58},
    'example.com/path055': {count: 87},
    'example.com/path056': {count: 73},
    'example.com/path057': {count: 16},
    'example.com/path058': {count: 23},
    'example.com/path059': {count: 39},
    'example.com/path060': {count: 70},
    'example.com/path061': {count: 61},
    'example.com/path062': {count: 17},
    'example.com/path063': {count: 84},
    'example.com/path064': {count: 62},
    'example.com/path065': {count: 46},
    'example.com/path066': {count: 6},
    'example.com/path067': {count: 3},
    'example.com/path068': {count: 15},
    'example.com/path069': {count: 30},
    'example.com/path070': {count: 25},
    'example.com/path071': {count: 47},
    'example.com/path072': {count: 85},
    'example.com/path073': {count: 94},
    'example.com/path074': {count: 48},
    'example.com/path075': {count: 55},
    'example.com/path076': {count: 87},
    'example.com/path077': {count: 3},
    'example.com/path078': {count: 67},
    'example.com/path079': {count: 97},
    'example.com/path080': {count: 5},
    'example.com/path081': {count: 17},
    'example.com/path082': {count: 26},
    'example.com/path083': {count: 38},
    'example.com/path084': {count: 99},
    'example.com/path085': {count: 60},
    'example.com/path086': {count: 30},
    'example.com/path087': {count: 41},
    'example.com/path088': {count: 72},
    'example.com/path089': {count: 31},
    'example.com/path090': {count: 62},
    'example.com/path091': {count: 5},
    'example.com/path092': {count: 15},
    'example.com/path093': {count: 64},
    'example.com/path094': {count: 89},
    'example.com/path095': {count: 84},
    'example.com/path096': {count: 73},
    'example.com/path097': {count: 60},
    'example.com/path098': {count: 88},
    'example.com/path099': {count: 82},
    'example.com/path001': {count: 96},
};
const result5 = [
    'example.com/path017', 'example.com/path084', 'example.com/path047',
    'example.com/path079', 'example.com/path001', 'example.com/path073',
    'example.com/path041', 'example.com/path094', 'example.com/path098',
    'example.com/path055', 'example.com/path076', 'example.com/path072',
    'example.com/path063', 'example.com/path095', 'example.com/path099',
    'example.com/path032', 'example.com/path025', 'example.com/path056',
    'example.com/path096', 'example.com/path088', 'example.com/path060',
    'example.com/path027', 'example.com/path018', 'example.com/path078',
    'example.com/path006', 'example.com/path020', 'example.com/path093',
    'example.com/path040', 'example.com/path064', 'example.com/path090',
    'example.com/path061', 'example.com/path029', 'example.com/path085',
    'example.com/path097', 'example.com/path054', 'example.com/path046',
    'example.com/path038', 'example.com/path075', 'example.com/path031',
    'example.com/path074', 'example.com/path071', 'example.com/path065',
    'example.com/path042', 'example.com/path052', 'example.com/path026',
    'example.com/path087', 'example.com/path030', 'example.com/path059',
    'example.com/path044', 'example.com/path083', 'example.com/path053',
    'example.com/path045', 'example.com/path089', 'example.com/path069',
    'example.com/path086', 'example.com/path024', 'example.com/path082',
    'example.com/path070', 'example.com/path043', 'example.com/path058',
    'example.com/path010', 'example.com/path039', 'example.com/path062',
    'example.com/path081', 'example.com/path057', 'example.com/path068',
    'example.com/path092', 'example.com/path009', 'example.com/path028',
    'example.com/path049', 'example.com/path016', 'example.com/path021',
    'example.com/path050', 'example.com/path004', 'example.com/path022',
    'example.com/path033', 'example.com/path003', 'example.com/path007',
    'example.com/path066', 'example.com/path014', 'example.com/path023',
    'example.com/path034', 'example.com/path051', 'example.com/path080',
    'example.com/path091', 'example.com/path005', 'example.com/path008',
    'example.com/path012', 'example.com/path013', 'example.com/path048',
    'example.com/path002', 'example.com/path019', 'example.com/path037',
    'example.com/path067', 'example.com/path077', 'example.com/path011',
    'example.com/path035', 'example.com/path100', 'example.com/path015',
    'example.com/path036', 'example.com'
];

test('Checks test5 object', () => {
    expect(sortPageInstances(test5)).toStrictEqual(result5);
});
