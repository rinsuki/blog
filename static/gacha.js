addEventListener("DOMContentLoaded", function() {
    var base_url = "/static/shibuyarin/2017/10-halloweencode/"
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
    style.innerText = "html body header #gray-filter {background-image: url("+base_url+gachaResult+".jpg);}"
    document.head.appendChild(style)
})