/**
* Get min value from array
**/
let getMin = (arr,attr,attr2) =>{
  return arr.reduce((prev,curr)=>{
    return prev[attr2]/prev[attr]<curr[attr2]/curr[attr]?prev:curr
  })
}

module.exports = {
  getMin : getMin
};
