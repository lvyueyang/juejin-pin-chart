async function initChart(headers) {
    const wHref = window.location.href
    if (wHref.includes('https://juejin.im/pin/')) {
        const domStr = `
        <div class="jj-char-wrapper">
            <div class="jj-header">
                <div class="name"><span class="text"></span><span class="length"></span></div>
                <div class="operate">
                    <div class="icon refresh-message" title="刷新消息">
                        <svg viewBox="0 0 1024 1024" 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="64" 
                        height="64">
                        <path d="M790.912 834.858667A425.002667 425.002667 0 0 1 512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667c0 91.136-28.586667 175.616-77.226667 244.906667L725.333333 512h128a341.333333 341.333333 0 1 0-104.96 246.272l42.538667 76.586667z"
                         fill="#ffffff"></path>
                        </svg>
                    </div>
                    <div class="icon max-window" title="最大化">
                        <svg viewBox="0 0 1024 1024" 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="64" 
                        height="64">
                        <path d="M170.666667 128h682.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m42.666666 85.333333v597.333334h597.333334V213.333333H213.333333z" 
                        fill="#ffffff"></path>
                        </svg>
                    </div>
                    <div class="icon min-window" title="最小化">
                        <svg viewBox="0 0 1024 1024"
                             version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             width="128"
                             height="128">
                            <path d="M213.333333 469.333333h597.333334v85.333334H213.333333z"
                                  fill="#ffffff"></path>
                        </svg>
                    </div>
                    <div class="icon close" style="display: none;">
                        <svg viewBox="0 0 1024 1024"
                             version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             width="128"
                             height="128">
                            <path d="M512 451.669333l211.2-211.2 60.330667 60.330667-211.2 211.2 211.2 211.2-60.330667 60.330667-211.2-211.2-211.2 211.2-60.330667-60.330667 211.2-211.2-211.2-211.2L300.8 240.469333z"
                                  fill="#ffffff"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="jj-body"><div></div></div>
            <div class="jj-form" style="display: none;">
                <textarea id="chartFormText" placeholder="骚年，留下你的评论..."></textarea>
                <div class="operate">
                    <div class="icon">
                        <span>
                            <svg class="icon"
                                 viewBox="0 0 1024 1024"
                                 version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="32"
                                 height="32">
                                <path d="M205.994667 896l-0.853334 0.853333-0.896-0.853333H127.658667A42.368 42.368 0 0 1 85.333333 853.632V170.368A42.666667 42.666667 0 0 1 127.658667 128h768.682666c23.381333 0 42.325333 18.986667 42.325334 42.368v683.264a42.666667 42.666667 0 0 1-42.325334 42.368H205.994667zM853.333333 640V213.333333H170.666667v597.333334L597.333333 384l256 256z m0 120.661333l-256-256L291.328 810.666667H853.333333v-50.005334zM341.333333 469.333333a85.333333 85.333333 0 1 1 0-170.666666 85.333333 85.333333 0 0 1 0 170.666666z"
                                      fill="#007fff"></path>
                            </svg>
                        </span>
                    </div>
                    <button>发送</button>
                </div>
            </div>
        </div>
        `

        const getList = async (pageNum = 1, headers) => {
            return new Promise((resolve, reject) => {
                headers = headers.filter(item => {
                    return item.name === 'X-Juejin-Uid' ||
                        item.name === 'X-Juejin-Token' ||
                        item.name === 'X-Juejin-Client' ||
                        item.name === 'X-Juejin-Src'
                })
                const id = location.pathname.split('/pin/')[1]
                const url = `https://hot-topic-comment-wrapper-ms.juejin.im/v1/comments/${id}?pageNum=${pageNum}&pageSize=40`
                axios.get(url, {
                    headers: function () {
                        let obj = {}
                        for (let i of headers) {
                            obj[i.name] = i.value
                        }
                        return obj
                    }()
                }).then(res => {
                    resolve(res.data.d)
                }).catch(e => {
                    reject(e)
                })
            })
        }
        const getReplyList = (pageNum = 1, id, headers) => {
            return new Promise((resolve, reject) => {
                headers = headers.filter(item => {
                    return item.name === 'X-Juejin-Uid' ||
                        item.name === 'X-Juejin-Token' ||
                        item.name === 'X-Juejin-Client' ||
                        item.name === 'X-Juejin-Src'
                })
                const url = `https://hot-topic-comment-wrapper-ms.juejin.im/v1/reply/${id}?pageNum=${pageNum}&pageSize=40`
                axios.get(url, {
                    headers: function () {
                        let obj = {}
                        for (let i of headers) {
                            obj[i.name] = i.value
                        }
                        return obj
                    }()
                }).then(res => {
                    resolve(res.data.d)
                }).catch(e => {
                    reject(e)
                })
            })
        }

        // html 插入
        $('body').append(domStr)
        const chartWrap = $('.jj-char-wrapper')
        // 绑定操作事件
        $('body').on('click', '.jj-header .min-window', () => {
            chartWrap.addClass('min-window')
        })
        $('body').on('click', '.jj-header .max-window', () => {
            chartWrap.removeClass('min-window')
        })
        $('body').on('click', '.jj-header .refresh-message', async () => {
            await getAllList()
        })

        // 评论信息载入
        let authorId = ''
        let authorName = $('.pin-header-row .username').text()
        let userId = $('#juejin > div.view-container > div > header > div > nav > ul > li.nav-item.menu > ul > div:nth-child(2) > li:nth-child(1) > a').attr('href').split('/user/')[1]
        console.log(userId)
        $('.jj-header .name .text').html(`${authorName} 的沸点`)

        function pushMessage(item) {
            let itemStr = `
                        <div class="item ${item.userInfo.objectId === userId ? 'me' : ''}">
                            <div class="avatar"><img
                                    src="${item.userInfo.avatarLarge || 'https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg'}"
                                    alt="${item.userInfo.username}"></div>
                            <div class="info-wrapper">
                                <div class="name-info">
                                    <a href="/user/${item.userInfo.objectId}" target="_blank">${item.userInfo.username}</a>
                                    <span class="grade"><img src="https://b-gold-cdn.xitu.io/v3/static/img/lv-${item.userInfo.level}.636691c.svg" alt=""></span>
                                    ${item.userInfo.objectId === authorId ? '<span>(作者)</span>' : ''}
                                    <span class="position">${item.userInfo.jobTitle} @ ${item.userInfo.company}</span>
                                </div>
                                <div class="content">
                                    <div class="text"><span class="at-user">${item.respUserInfo ? `@${item.respUserInfo.username}` : ''}</span>${item.content}</div>
                                    <div class="img-wrapper">
                                        <div class="img">
                                            <img src="${item.picList[0]}" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                `
            $('body').on('click', '.jj-char-wrapper .jj-body .img-wrapper img', function (e) {
                const src = $(this).attr('src')
                $(`.image[data-src="${src}"]`).click()
            })
            $('.jj-char-wrapper .jj-body>div').append(itemStr)
        }

        async function pushList(pageNum = 1) {
            try {
                const res = await getList(pageNum, headers)
                authorId = res.targetId
                const comments = res.comments
                let list = []
                for (let item of comments) {
                    if (Array.isArray(item.topComment)) {
                        let topComment = JSON.parse(JSON.stringify(item.topComment))
                        if (topComment.length < item.replyCount) {
                            const repC = await getReplyList(1, item.id, headers).then(replys => replys.comments)
                            list.push(...repC)
                        } else {
                            list.push(...topComment)
                        }
                    }
                    list.push(item)
                }
                return {
                    list,
                    count: comments.length
                }
            } catch (e) {
                console.error(e)
            }
        }

        async function getAllList() {
            let listAll = []
            let num = 0

            async function pageNext() {
                const res = await pushList(num)
                listAll.push(...res.list)
                if (res.count === 20) {
                    num += 1
                    await pageNext()
                }
            }

            await pageNext()

            listAll.sort((a, b) => {
                return new Date(a.createdAt) > new Date(b.createdAt)
            })
            $('.jj-char-wrapper .jj-body>div').html('')
            listAll.forEach(item => {
                pushMessage(item)
            })
            $('.jj-header .name .length').html(`${listAll.length}条`)

            setTimeout(async () => {
                await getAllList()
            }, 5000)
        }

        await getAllList()
        $('.jj-char-wrapper .jj-body').animate({
            'scrollTop': $('.jj-char-wrapper .jj-body>div').height() + 'px'
        })
    }
}

const getHeaders = () => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({api: 'getHeaders'}, function (response) {
            resolve(response)
        })
    })
}

$(() => {
    setTimeout(() => {
        getHeaders().then(headers => {
            initChart(JSON.parse(headers))
        })
    }, 1000)
})
