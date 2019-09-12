# tab

標籤頁
可依照不同需求設定參數，例如點了頁籤是否用fadeIn方式顯示內容，或是以滾動頁面方式找到內容位置
new Tab(option);
option
{
    tab: '.tab', //標籤元件
    title: '.tab .title', //標籤的title(default: false)
    tab_item: '.tab_item', //頁籤的元件
    container_item: '.content_item', //內容元件
    scroll: true, //是否為滾動頁面錨點方式(default: false，內容以fadeIn方式替換)
    init_idx: 1, //預設開啟第幾個頁籤(預設為1)
    link_enable: false//是否開啟頁籤href換頁功能(default: false)
}
