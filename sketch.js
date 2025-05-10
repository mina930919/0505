// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // 確保至少檢測到一隻手
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // 繪製 keypoints 的圓點
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          // 根據左手或右手設定顏色
          if (hand.handedness == "Left") {
            fill(255, 0, 255); // 左手顏色
          } else {
            fill(255, 255, 0); // 右手顏色
          }

          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }

        // 串接 keypoints[0] 到 keypoints[4]，以及其他手指的 keypoints
        let keypoints = hand.keypoints;
        if (keypoints.length >= 21) {
          strokeWeight(2);
          if (hand.handedness == "Left") {
            stroke(255, 0, 255); // 左手顏色
          } else {
            stroke(255, 255, 0); // 右手顏色
          }

          // 串接 keypoints[0] 到 keypoints[4]
          for (let i = 0; i < 4; i++) {
            let start = keypoints[i];
            let end = keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }

          // 串接 keypoints[5] 到 keypoints[8]
          for (let i = 5; i < 8; i++) {
            let start = keypoints[i];
            let end = keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }

          // 串接 keypoints[9] 到 keypoints[12]
          for (let i = 9; i < 12; i++) {
            let start = keypoints[i];
            let end = keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }

          // 串接 keypoints[13] 到 keypoints[16]
          for (let i = 13; i < 16; i++) {
            let start = keypoints[i];
            let end = keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }

          // 串接 keypoints[17] 到 keypoints[20]
          for (let i = 17; i < 20; i++) {
            let start = keypoints[i];
            let end = keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }
      }
    }
  }
}
