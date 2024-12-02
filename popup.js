document.getElementById('sendButton').addEventListener('click', () => {
  const senderName = document.getElementById('senderName').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!senderName || !phoneNumber || !message) {
    alert('Please fill out all fields.');
    return;
  }

  // Show loading message
  const loading = document.getElementById('loading');
  loading.classList.add('show');

  setTimeout(() => {
    // Hide loading message after a short delay
    loading.classList.remove('show');

    const formattedMessage = encodeURIComponent(`*${senderName}*\n${message}`);
    const whatsappUrl = navigator.userAgent.includes("Mobile")
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${formattedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${formattedMessage}`;

    chrome.tabs.create({ url: whatsappUrl });
  }, 1000);
});