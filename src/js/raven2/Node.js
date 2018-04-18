/**
 * 定义tag
 * ComponentFunction = 1
 * ComponnetClass = 2
 * Text = 3
 * DOMEl = 5
 */
export default class Node{
  constructor(type, tag,props, key, ref){
    this.type = type;
    this.props = props;
    this.tag = tag;
    this.key = key;
    this.ref = ref;
  }
}