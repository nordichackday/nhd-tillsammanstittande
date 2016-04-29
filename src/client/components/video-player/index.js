import $        from 'jquery';
import template from 'template.hbs'

const VIDEO_ID     = '1372168-001A';
const VIDEO_CONFIG = {
  useAltDashUrl: false,
  useAltHlsUrl: false,
  splash: false,
  theme: 'standard'
};

const initialize = () => {
  // set menu content
  const content = template({});
  $('#page-video-container').html(content);
};

const play = () => {
  console.log('trying to start video');

  if (!window.SVP) {
    console.log('SVP is not available');
    return;
  }

  SVP.config(VIDEO_CONFIG);

  const element      = $('#videoplayer').get(0);
  const videoElement = $('#videoplayer video').get(0);

  videoElement.setAttribute('preload', 'auto'),
  videoElement.setAttribute('autoplay', ''),
  videoElement.setAttribute('data-video-reduced-bandwidth', 'true'),
  videoElement.setAttribute('data-video-id', VIDEO_ID);

  // if(poster) {
  //   videoElement.setAttribute('poster', poster);
  // }

  // var videoLength = document.getElementById('lengthInput').value;
  // if (videoLength !== undefined) {
  //   videoElement.setAttribute('data-video-length', videoLength);
  // }

  const position = 600;
  if (position) {
    videoElement.setAttribute('data-video-startposition', position);
  }

  if (element.state && element.state()) {
    console.log('Change video to ' + VIDEO_ID);
    element.load(VIDEO_ID);
    return;
  }

  console.log('Init player with video ' + VIDEO_ID);
  window.SVP(element);
}

export default function (socket) {
  initialize();
  return { play };
};
