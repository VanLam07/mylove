const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Kích thước dấu chấm
const dotSize = 3;

// Khoảng cách giữa các dấu chấm
const step = 0.08;

// Phương trình trái tim
for (let t = 0; t < Math.PI * 2; t += step) {

  // Phương trình trái tim
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

  // Phóng to và đưa vào giữa canvas
  const scale = 15;

  const px = canvas.width / 2 + x * scale;
  const py = canvas.height / 2 - y * scale;

  // Vẽ dấu chấm
  ctx.beginPath();
  ctx.arc(px, py, dotSize, 0, Math.PI * 2);
  ctx.fill();
}