const got = require("got");
const { createWriteStream } = require("fs");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);

const url = "https://adecampus.univ-rouen.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=36308&projectId=0&calType=ical&nbWeeks=4&displayConfigId=8";
const fileName = "ADECal.ics";

const downloadStream = got.stream(url);
const fileWriterStream = createWriteStream(fileName);

downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
  const percentage = Math.round(percent * 100);
  console.error(`progress: ${transferred}/${total} (${percentage}%)`);
});

pipeline(downloadStream, fileWriterStream)
  .then(() => console.log(`File downloaded to ${fileName}`))
  .catch((error) => console.error(`Something went wrong. ${error.message}`));
