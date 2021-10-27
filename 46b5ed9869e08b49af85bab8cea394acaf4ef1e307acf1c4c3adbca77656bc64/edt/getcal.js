
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
  let response
  try{
    response = await awaitWithTimeout(2000, got("https://adecampus.univ-rouen.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=36308&projectId=0&calType=ical&nbWeeks=1&displayConfigId=8"))
  }catch (error){
    response = "error time"
  }
  if(response === "error time"){
    return
  }else{
    console.log(response)
  const cal = convert(response.body)
  cal.VCALENDAR[0].VEVENT.forEach(element => {
    element.DTSTART = element.DTSTART.slice(0,-1).split("T")
    element.DTEND = element.DTEND.slice(0,-1).split("T")
    delete element.DTSTAMP
    delete element.UID
    delete element.CREATED
    delete element.SEQUENCE
    delete element["LAST-MODIFIED"]
    element.DTSTART[3] = parseInt(element.DTSTART[1])+20000
    element.DTEND[3] = parseInt(element.DTEND[1])+20000
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
  
  var Context = {
  canvas: null,
  context: null,
  create: function(canvas_tag_id) {
      this.canvas = document.getElementById(canvas_tag_id);
      this.context = this.canvas.getContext('2d');
      return this.context;
  }
  };
  const width = Allcal.length*400+200
  const height = 1300
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height)
  context.strokeStyle = "black";
  context.lineWidth = 5
  context.strokeRect(100, 100, (width-200), (height-200));

  for(let i = 1; i<=12; i++ ){
    context.font = 'bold 19pt Arial'
    context.textAlign = 'center'
    context.fillStyle = 'black'
    context.fillText(i+7+"h00", 50, 100*i)
  }

  function courses2(context, x, y, colorcours){
    let x1 = y*400+100
    let y1 = (x.DTSTART[3]/100)-700
    let x2 = 400
    let y2 = ((x.DTEND[3]/100)-700)-((x.DTSTART[3]/100)-700)

    function getRandomColor() {
      var letters = '56789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    }

    let color
    if(colorcours.has(x.SUMMARY)){
      color = colorcours.get(x.SUMMARY)
    }else{
      color = getRandomColor()
      colorcours.set(x.SUMMARY, color)
    }

    context.fillStyle = color
    context.fillRect(x1, y1, x2, y2)

    context.strokeStyle = "black";
    context.lineWidth = 5
    context.strokeRect(x1, y1, x2, y2)

    context.font = 'bold 11pt Arial'
    context.textAlign = 'center'
    context.fillStyle = 'black'
    context.fillText(x.SUMMARY, (x1+(x2/2)), (y1+(y2/4)))
    context.fillText(x.LOCATION, (x1+(x2/2)), (y1+(3*y2/5)))
    context.fillText(x.DESCRIPTION, (x1+(x2/2)), (y1+(2*y2/5)))
    context.font = 'bold 17pt Arial'
    let heure = (parseInt(x.DTSTART[1].slice(0,2), 10)+2).toString()+":"+x.DTSTART[1].slice(2,4)+' / '+(parseInt(x.DTEND[1].slice(0,2), 10)+2).toString()+":"+x.DTEND[1].slice(2,4)
    context.fillText(heure, (x1+(x2/2)), (y1+(7*y2/8)))
  }
  let colorcours = new Map()

  Allcal.forEach(x => {
    let y = Allcal.indexOf(x)
    context.font = 'bold 20pt Arial'
    context.textAlign = 'center'
    context.fillStyle = 'black'
    let v = new Date(Date.UTC(x[0].slice(0,4), x[0].slice(4,6)-1, x[0].slice(6,8))).toDateString()
    context.fillText(v, (y*400+300), 50)
    
    x[1].forEach(course => {
      courses2(context, course, y ,colorcours)
    })
  })

  const buffer = canvas.toBuffer("image/png")
  console.log("ca marche")

}
}) ();