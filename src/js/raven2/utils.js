
var numberMap = {
  //null undefined IE6-8这里会返回[object Object]
  "[object Boolean]": 2,
  "[object Number]": 3,
  "[object String]": 4,
  "[object Function]": 5,
  "[object Symbol]": 6,
  "[object Array]": 7
};

/**
 * undefined = 0
 * null = 1
 * bool = 2
 * number = 3
 * string = 4
 * func = 5
 * symbol = 6
 * array = 7
 * object = 8
 */
export function checkType(type){
  if(type === null){
    return 1;
  }
  if(type === void 1){
    return 0;
  }
  var t = numberMap[Object.prototype.toString.call(type)];
  return t || 8;
}