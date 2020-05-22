function getOuter() {
  var date = "815";
  function getDate(str) {
    console.log(str + date);
  }
  return getDate;
}

let today = getOuter();
today('ddd')
today('tttt')

function updateCount() {
  let count = 0
  function getCount(val) {
    count = val
  }
  return getCount
}

let count = updateCount()
count(11)
count(200)
