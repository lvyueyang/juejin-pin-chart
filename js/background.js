function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response)
        })
    })
}

let headers = null

chrome.webRequest.onBeforeSendHeaders.addListener(
    res => {
        console.log(res)
        try {
            headers = res.requestHeaders
            return
            if (!headers) {
                headers = res.requestHeaders
                sendMessageToContentScript({headers})
            }
        } catch (e) {
            console.log(e)
        }
    },
    {
        urls: ["https://hot-topic-comment-wrapper-ms.juejin.im/v1/comments/*"]
    },
    ["blocking", "requestHeaders"])

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse(JSON.stringify(headers))
})
