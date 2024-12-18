// Định dạng regex để tìm số điện thoại (hỗ trợ dấu . phân cách)
const phoneRegex = /(\+84|0[1-9])\d{2}([.\s]?)\d{3}\2\d{3}/g;

// Hàm đợi (delay)
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Hàm nhấp vào các nút có selector cụ thể
async function clickShowPhoneButtons() {
    const buttons = document.querySelectorAll('.ShowPhoneButton_flexDiv__3qpNj');
    buttons.forEach((button) => button.click());
    await delay(1000); // Đợi 1 giây sau khi nhấp vào nút
}

// Hàm quét số điện thoại
function extractPhoneNumbers() {
    const textContent = document.body.innerText; // Quét tất cả nội dung trang
    const phoneNumbers = textContent.match(phoneRegex); // Tìm số điện thoại bằng regex
    return phoneNumbers ? [...new Set(phoneNumbers)] : []; // Loại bỏ số trùng lặp
}

// Lắng nghe yêu cầu từ popup
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "extractPhones") {
        await clickShowPhoneButtons(); // Nhấp vào các nút và đợi
        const phoneNumbers = extractPhoneNumbers(); // Quét số điện thoại
        sendResponse({ phoneNumbers });
    }
});
