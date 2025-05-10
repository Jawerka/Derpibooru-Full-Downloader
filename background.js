chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "download_derpy",
    title: "Download full - derpy",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "download_derpy") return;

  try {
    const srcUrl = info.srcUrl;

    // Ищем ID (цифры) из пути типа /509372/
    const match = srcUrl.match(/\/(\d{5,})\//);
    if (!match) {
      console.error("Не удалось извлечь ID из ссылки:", srcUrl);
      return;
    }

    const imageId = match[1];
    const apiUrl = `https://derpibooru.org/api/v1/json/images/${imageId}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    const imageUrl = data.image?.representations?.full;
    if (imageUrl) {
      chrome.downloads.download({
        url: imageUrl,
        filename: imageUrl.split("/").pop(),
        saveAs: false
      });
    } else {
      console.error("Полное изображение не найдено");
    }
  } catch (err) {
    console.error("Ошибка при загрузке:", err);
  }
});
