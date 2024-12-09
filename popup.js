let isConnected = false;
let messageHistory = [];
let attachmentFile = null; // Added to store the file attachment

// Update connection status
function updateConnectionStatus() {
  const statusIndicator = document.querySelector('.status-indicator');
  const statusText = document.querySelector('.status-text');
  
  if (isConnected) {
    statusIndicator.classList.add('connected');
    statusIndicator.classList.remove('disconnected');
    statusText.textContent = 'Connected';
  } else {
    statusIndicator.classList.add('disconnected');
    statusIndicator.classList.remove('connected');
    statusText.textContent = 'Not Connected';
  }
}

// Format message with sender name
function formatMessageWithSender(message, senderName) {
  if (senderName) {
    return `*${senderName}:*\n${message}`;
  }
  return message;
}

// Add emoji to message
function addEmojiToMessage(emoji) {
  const messageInput = document.getElementById('message');
  messageInput.value += ` ${emoji}`;
}

// Insert formatting
function insertFormatting(tag) {
  const messageInput = document.getElementById('message');
  const start = messageInput.selectionStart;
  const end = messageInput.selectionEnd;
  const selectedText = messageInput.value.substring(start, end);
  
  const formattedText = `${tag}${selectedText}${tag}`;
  messageInput.setRangeText(formattedText, start, end, 'select');
}

// Send message immediately
function sendMessage() {
  const message = document.getElementById('message').value.trim();
  const senderName = document.getElementById('senderName').value.trim();
  const phoneInputs = document.querySelectorAll('.phone-input');
  const phoneNumbers = Array.from(phoneInputs).map(input => input.value.trim()).filter(Boolean);

  if (!message || phoneNumbers.length === 0) {
    alert('Please enter a message and at least one phone number.');
    return;
  }

  const formattedMessage = formatMessageWithSender(message, senderName);

  phoneNumbers.forEach(phoneNumber => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    messageHistory.push({
      phoneNumber,
      message: formattedMessage,
      timestamp: new Date().toLocaleString()
    });
  });

  updateMessageHistory();
  clearForm();
}

// Handle attachment button click
document.getElementById('attachmentButton').addEventListener('click', () => {
  document.getElementById('attachmentInput').click();
});

// Handle file selection
document.getElementById('attachmentInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    attachmentFile = file;
    const attachmentPreview = document.getElementById('attachmentPreview');
    attachmentPreview.innerHTML = `
      <p>Selected file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>
    `;
    alert(`File ${file.name} selected.`);
  }
});


// Schedule message
function scheduleMessage() {
  const message = document.getElementById('message').value.trim();
  const senderName = document.getElementById('senderName').value.trim();
  const phoneInputs = document.querySelectorAll('.phone-input');
  const phoneNumbers = Array.from(phoneInputs).map(input => input.value.trim()).filter(Boolean);
  const scheduleDate = document.getElementById('scheduleDate').value;
  const scheduleTime = document.getElementById('scheduleTime').value;

  if (!message || phoneNumbers.length === 0 || !scheduleDate || !scheduleTime) {
    alert('Please fill all fields to schedule a message.');
    return;
  }

  const formattedMessage = formatMessageWithSender(message, senderName);
  const scheduleTimestamp = new Date(`${scheduleDate}T${scheduleTime}`).getTime();

  setTimeout(() => {
    phoneNumbers.forEach(phoneNumber => {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(whatsappUrl, '_blank');

      if (attachmentFile) {
        alert(`Attachment: ${attachmentFile.name} selected. Note: Actual attachment functionality is not implemented in this version.`);
      }

      messageHistory.push({
        phoneNumber,
        message: formattedMessage,
        timestamp: new Date().toLocaleString()
      });
    });
    updateMessageHistory();
  }, scheduleTimestamp - Date.now());

  alert('Message scheduled successfully!');
  clearForm();
}

// Clear form
function clearForm() {
  document.getElementById('message').value = '';
  document.getElementById('senderName').value = '';
  document.querySelectorAll('.phone-input').forEach(input => (input.value = ''));
  document.getElementById('scheduleDate').value = '';
  document.getElementById('scheduleTime').value = '';
  attachmentFile = null; // Reset the attachment after sending
  document.getElementById('attachmentPreview').innerHTML = ''; // Clear the preview
}

// Add phone number input
function addPhoneNumberInput() {
  const phoneNumbersContainer = document.getElementById('phoneNumbers');
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.className = 'phone-input';
  newInput.placeholder = 'e.g., +911234567890';
  phoneNumbersContainer.appendChild(newInput);
}

// Save draft
function saveDraft() {
  const draft = {
    message: document.getElementById('message').value.trim(),
    senderName: document.getElementById('senderName').value.trim(),
    phoneNumbers: Array.from(document.querySelectorAll('.phone-input')).map(input => input.value.trim()).filter(Boolean)
  };

  localStorage.setItem('draft', JSON.stringify(draft));
  alert('Draft saved successfully!');
}

// Load draft
function loadDraft() {
  const draft = JSON.parse(localStorage.getItem('draft'));
  if (draft) {
    document.getElementById('message').value = draft.message || '';
    document.getElementById('senderName').value = draft.senderName || '';
    const phoneInputs = document.querySelectorAll('.phone-input');
    phoneInputs.forEach((input, index) => (input.value = draft.phoneNumbers[index] || ''));
  }
}

// Update message history
function updateMessageHistory() {
  const historyContainer = document.getElementById('messageHistory');
  historyContainer.innerHTML = '';
  messageHistory.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <p><strong>From:</strong> ${item.phoneNumber}</p>
      <p><strong>Message:</strong> ${item.message}</p>
      <p><strong>Sent:</strong> ${item.timestamp}</p>
    `;
    historyContainer.appendChild(historyItem);
  });
}

// Switch tab
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.style.display = tab.id === tabName ? 'block' : 'none';
  });

  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });
}

// Handle attachment button click
document.getElementById('attachmentButton').addEventListener('click', () => {
  document.getElementById('attachmentInput').click();
});

// Handle file selection
document.getElementById('attachmentInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    attachmentFile = file;
    const attachmentPreview = document.getElementById('attachmentPreview');
    attachmentPreview.innerHTML = `Selected file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    alert(`File ${file.name} selected.`);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  updateConnectionStatus();
  loadDraft();

  document.getElementById('sendButton').addEventListener('click', sendMessage);
  document.getElementById('boldButton').addEventListener('click', () => insertFormatting('*'));
  document.getElementById('italicButton').addEventListener('click', () => insertFormatting('_'));
  document.getElementById('emojiButton').addEventListener('click', () => addEmojiToMessage('😊'));
  document.getElementById('clearButton').addEventListener('click', clearForm);
  document.getElementById('saveDraftButton').addEventListener('click', saveDraft);
  document.getElementById('addContactButton').addEventListener('click', addPhoneNumberInput);
  document.getElementById('scheduleButton').addEventListener('click', scheduleMessage);
  document.getElementById('attachmentButton').addEventListener('click', () => alert('Attachment functionality not implemented in this version.'));

  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  // Simulating a connection after 3 seconds
  setTimeout(() => {
    isConnected = true;
    updateConnectionStatus();
    document.getElementById('loggedInNumber').textContent = '+911234567890'; // Example number
  }, 3000);
});
