document.getElementById('sendButton').addEventListener('click', () => {
  const senderName = document.getElementById('senderName').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const message = document.getElementById('message').value.trim();
  const scheduleTime = document.getElementById('scheduleTime').value;

  if (!senderName || !phoneNumber || !message) {
    alert('Please fill out all fields.');
    return;
  }

  const sendMessage = () => {
    const formattedMessage = encodeURIComponent(`*${senderName}*\n${message}`);
    const whatsappDesktopUrl = `whatsapp://send?phone=${phoneNumber}&text=${formattedMessage}`;

    // Open WhatsApp Desktop App
    window.location.href = whatsappDesktopUrl;
  };

  if (scheduleTime) {
    const scheduleTimestamp = new Date(scheduleTime).getTime();
    const currentTimestamp = new Date().getTime();

    if (scheduleTimestamp <= currentTimestamp) {
      alert('Please select a future date and time for scheduling.');
      return;
    }

    const delay = scheduleTimestamp - currentTimestamp;
    alert(`Message scheduled for ${new Date(scheduleTimestamp).toLocaleString()}.`);
    setTimeout(() => {
      sendMessage();
    }, delay);
  } else {
    sendMessage();
  }
});