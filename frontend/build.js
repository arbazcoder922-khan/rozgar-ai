document.getElementById("resumeUpload").addEventListener("change", function() {
  if (this.files.length > 0) {
    document.getElementById("fileNameDisplay").textContent = this.files[0].name;
  }
});

