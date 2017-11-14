addEventListener("DOMContentLoaded", function() {
    var base_url = document.querySelector('meta[name="base-url"]').content+"shibuyarin/2017/10-halloweencode/"
    var count = 12
    function gacha() {
        var result = Math.floor(Math.random()*count)
        try {
            var old_result = localStorage.getItem("blog_old_gacha")*1
            console.log(old_result, result)
            if (old_result == result) {
                return gacha()
            }
            localStorage.setItem("blog_old_gacha", result)
        } catch(e) {
            console.error(e)
        } finally {
            return result
        }
    }
    var gachaResult = gacha()
    var style = document.createElement("style")
    style.innerText = ".navbar .container .gray-filter {background-image: url("+base_url+gachaResult+".jpg);}"
    document.head.appendChild(style)
    setTimeout(function() {
        var userAgent = navigator.userAgent.toLowerCase();
        if(~userAgent.indexOf("iphone") || ~userAgent.indexOf("android") || ~userAgent.indexOf("mobile") || ~userAgent.indexOf("phone")) return
        function loadImg(i) {
            if (i >= count) {
                localStorage.setItem("cache-image", base_url)
                return
            }
            if (i == gachaResult) return loadImg(i+1)
            var img = new Image()
            img.src = base_url+i+".jpg"
            img.onload = function(){
                setTimeout(function() {
                    loadImg(i+1)
                }, 1000)
            }
        }
        if(localStorage.getItem("cache-image") != base_url) loadImg(0)
    }, 1000)
})