const fs = require('fs');
const got = require('got');

var NEW_LINE = /\r\n|\n|\r/;
var COLON = ":";
var SPACE = " ";

function convert(source) {
  var currentKey = "",
    currentValue = "",
    parentObj = {},
    splitAt;

  var output = {};
  var lines = source.split(NEW_LINE);

  var currentObj = output;
  var parents = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.charAt(0) === SPACE) {
      currentObj[currentKey] += line.substr(1);
    } else {
      splitAt = line.indexOf(COLON);

      if (splitAt < 0) {
        continue;
      }

      currentKey = line.substr(0, splitAt);
      currentValue = line.substr(splitAt + 1);

      switch (currentKey) {
        case "BEGIN":
          parents.push(parentObj);
          parentObj = currentObj;
          if (parentObj[currentValue] == null) {
            parentObj[currentValue] = [];
          }
          currentObj = {};
          parentObj[currentValue].push(currentObj);
          break;
        case "END":
          currentObj = parentObj;
          parentObj = parents.pop();
          break;
        default:
          if (currentObj[currentKey]) {
            if (!Array.isArray(currentObj[currentKey])) {
              currentObj[currentKey] = [currentObj[currentKey]];
            }
            currentObj[currentKey].push(currentValue);
          } else {
            currentObj[currentKey] = currentValue;
          }
      }
    }
  }
  return output;
}
function awaitWithTimeout(timeout, ...args) {
  function timeOut() {
    return new Promise((res, rej) => setTimeout(rej, timeout, new Error(`Timed out after ${timeout}ms`)));
  }
  return Promise.race([...args, timeOut()]);
}
(async () => {
  let x
  try{
    x = await awaitWithTimeout(2000, got("https://adecampus.univ-rouen.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=36308&projectId=0&calType=ical&nbWeeks=1&displayConfigId=8"))
  }catch (error){
    x = "error time"
  }
  if(x === "error time"){
    return
  }else{
  const cal = convert(x.body)
  cal.VCALENDAR[0].VEVENT.forEach(element => {
    element.DTSTART = element.DTSTART.slice(0,-1).split("T")
    element.DTEND = element.DTEND.slice(0,-1).split("T")
    delete element.DTSTAMP
    delete element.UID
    delete element.CREATED
    delete element.SEQUENCE
    delete element["LAST-MODIFIED"]
    element.DESCRIPTION = element.DESCRIPTION.split(/\\n/)
    element.DESCRIPTION = element.DESCRIPTION[element.DESCRIPTION.length-3]
  });
  let Allcal = new Map()
  cal.VCALENDAR[0].VEVENT.forEach(element => {
    if(!Allcal.has(element.DTSTART[0])){
      Allcal.set(element.DTSTART[0], [element])
    }else{
      let list = []
      Allcal.get(element.DTSTART[0]).forEach(x => {
        list.push(x)
      })
      list.push(element)
      Allcal.set(element.DTSTART[0], list)
    }
    Allcal.forEach(x => {
      x.sort(function (a, b){
        return a.DTSTART[1] - b.DTSTART[1]
      })
    })
  });
  Allcal = Array.from(Allcal);
  Allcal.sort(function(a,b){
    return a[0] - b[0]
  })
  console.log(Allcal)
}
}) ();