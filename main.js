const { createFFmpeg, fetchFile } = FFmpeg;
let ffmpeg = null;
const transcode = async ({ target: { files } }) => {
if (ffmpeg === null) {
    ffmpeg = createFFmpeg({ log: true });
}
const { name } = files[0];
message.innerHTML = 'Loading ffmpeg-core.js';
if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
  message.innerHTML = 'Start transcoding';
  await ffmpeg.run('-i', name,  'output.mkv');
  message.innerHTML = 'Complete transcoding';
  const data = ffmpeg.FS('readFile', 'output.mkv');
  const video = document.getElementById('output-video');
  video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mkv' }));
  const downloadbutton = document.getElementById('adownload');
  downloadbutton.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mkv' }));
}

const elm = document.getElementById('uploader');
      elm.addEventListener('change', transcode);

const cancel = () => {
    try {
      ffmpeg.exit();
    } catch(e) {}
    ffmpeg = null;
}

