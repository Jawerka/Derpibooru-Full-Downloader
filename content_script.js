chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getImageId") {
    const element = document.elementFromPoint(message.x, message.y);
    if (!element) {
      sendResponse({ error: "Элемент не найден" });
      return;
    }

    const container = element.closest(".image-container");
    if (!container) {
      sendResponse({ error: "image-container не найден" });
      return;
    }

    const imageId = container.dataset.imageId;
    if (!imageId) {
      sendResponse({ error: "data-image-id не найден" });
      return;
    }

    const fullLink = `https://derpibooru.org/images/${imageId}`;
    sendResponse({ imageId, fullLink });
  }
});