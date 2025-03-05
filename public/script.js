const form = document.getElementById('uploadForm');
const socket = io();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  await fetch('/upload', { method: 'POST', body: formData });
  alert('File uploaded!');
});

socket.on('file-uploaded', (fileName) => {
  console.log(`New file uploaded: ${fileName}`);
});
