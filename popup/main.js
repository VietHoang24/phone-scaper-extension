// Gắn sự kiện khi nhấn nút "Quét số điện thoại"
document.getElementById("scan-button").addEventListener("click", async () => {
    // Gửi yêu cầu đến content script để quét số điện thoại
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "extractPhones" }, (response) => {
        const phoneList = response?.phoneNumbers || [];
        if (phoneList.length > 0) {
            displayPhones(phoneList);
        } else {
            displayNoPhonesFound();
        }
    });
});

// Hiển thị danh sách số điện thoại lên giao diện
function displayPhones(phoneNumbers) {
    const phoneListElement = document.getElementById("phone-list");
    phoneListElement.innerHTML = ""; // Xóa danh sách cũ

    phoneNumbers.forEach((phone) => {
        const listItem = document.createElement("li");
        const phoneSpan = document.createElement("span");
        phoneSpan.textContent = phone;

        const copyButton = document.createElement("button");
        copyButton.textContent = "Sao chép";
        copyButton.addEventListener("click", () => copyToClipboard(phone));

        listItem.appendChild(phoneSpan);
        listItem.appendChild(copyButton);
        phoneListElement.appendChild(listItem);
    });
}

// Hiển thị thông báo không có số điện thoại
function displayNoPhonesFound() {
    const phoneListElement = document.getElementById("phone-list");
    phoneListElement.innerHTML = ""; // Xóa danh sách cũ

    const noPhonesMessage = document.createElement("p");
    noPhonesMessage.textContent = "Không có số điện thoại nào.";
    phoneListElement.appendChild(noPhonesMessage);
}

// Sao chép số điện thoại vào clipboard
function copyToClipboard(phone) {
    navigator.clipboard.writeText(phone).then(() => {
        alert(`Đã sao chép: ${phone}`);
    }).catch((err) => {
        console.error("Lỗi sao chép:", err);
    });
}
