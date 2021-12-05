

const { createFFmpeg, fetchFile } = FFmpeg;
let ffmpeg = null;
const transcode = async ({ target: { files } }) => {
if (ffmpeg === null) {
    ffmpeg = createFFmpeg({ log: true });
}



const { name } = files[0];
dropdownfrom = document.getElementById("format-selection1");
dropdownfromvalue = dropdownfrom.value;
dropdownto = document.getElementById("format-selection2");
dropdowntovalue = dropdownto.value;
if (dropdownfromvalue === "mkv-1") {
    convertfrom = "mkv"  
};
if (dropdownfromvalue === "webm-1") {
  convertfrom = "webm"
};
if (dropdownfromvalue === "mp4-1") {
    convertfrom = "mp4"
};
if (dropdowntovalue === "mkv-2") {
    convertto = "mkv"
};
if (dropdowntovalue === "mp4-2") {
  convertto = "mp4" 
};
console.log(dropdownfromvalue)
console.log(dropdowntovalue)
message.innerHTML = 'Loading ffmpeg-core.js';
if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
  message.innerHTML = 'Start transcoding';
  await ffmpeg.run('-i', name,  'output.' + convertto);
  message.innerHTML = 'Complete transcoding';
  const data = ffmpeg.FS('readFile', 'output.' + convertto);
  const video = document.getElementById('output-video');
  video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/'+ convertto }));
  document.getElementById("output-video").style.visibility = "visible";
  const downloadbutton = document.getElementById('adownload');
  downloadbutton.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/' + convertto}));
}

const elm = document.getElementById('uploader');
      elm.addEventListener('change', transcode);

const cancel = () => {
    try {
      ffmpeg.exit();
    } catch(e) {}
    ffmpeg = null;
}

