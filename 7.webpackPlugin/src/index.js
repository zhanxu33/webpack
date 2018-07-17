import {flatten, join} from 'lodash'
// import flatten from 'lodash/flatten'
// import join from 'lodash/join'
let arr = [1, [2, 3], [4, [5, 6], 7]]
let res = flatten(arr)
console.log(res)