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
    var style = document.createElement("style")
    style.innerText = ".navbar .container .gray-filter {background-image: url("+base_url+gacha()+".png);}"
    document.head.appendChild(style)
})