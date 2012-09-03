$(document).ready(function () {
    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + "," + month + " " + year + " " + hour + ":" + min + ":" + sec;
        return time;
    }
    var reddit_url = "http://api.reddit.com/r/pics.json?jsonp=?";
    var uri = new URI(document.URL),
        synthax = uri.query(true);
    var lastid;
    if (synthax.after != null) {
        reddit_url = "http://api.reddit.com/r/pics.json?jsonp=?&count=25&after=" + synthax.after;
    }
    $.getJSON(reddit_url, {
        format: "json",
        timeout: 500
    }, function (data) {
        $.each(data.data.children, function (i, obj) {
            var url = obj.data.url;
            var reddit_html = url;
            var imgurl;
            lastid = obj.data.name;
            var uri = new URI(obj.data.url);
            uri.domain();
            if (uri.domain() == "imgur.com" && obj.data.url.length == 22) {
                imgurl = obj.data.url + ".png";
            } else {
                imgurl = obj.data.url;
            }
            var imgbox;
            console.log(obj.data.over_18);
            var nsfw = obj.data.over_18;
            if (nsfw == true) {
                imgbox = '<center><br/><br/><a href="' + obj.data.url + '"><img src="img/unsafe.jpeg" alt="' + obj.data.title + '"></a></center>';
                console.log("THIS IS NUDE");
            } else {
                imgbox = '<a href="' + obj.data.url + '"><img src="' + imgurl + '" alt="' + obj.data.title + '"></a>';
            }
            var reddit_imagediv = '<div class="row"><div class="span9"><div class="thumbnail"><div class="row show-grid">';
            reddit_imagediv += '<div class="span6">' + imgbox;
            reddit_imagediv += '<div id="reddit_container"></div></div><div class="span2"><div class="caption">';
            reddit_imagediv += "<p><h2>" + obj.data.title + "</h2></p>";
            reddit_imagediv += "<p><h6> submitted " + jQuery.timeago(timeConverter(obj.data.created_utc)) + "</h6></p>";
            reddit_imagediv += '<p><h5>by <a href="http://www.reddit.com/user/' + obj.data.author + '" target="_blank">' + obj.data.author + "</a></h5></p>";
            reddit_imagediv += '<p><a href="http://reddit.com' + obj.data.permalink + '" target="_blank" class="btn btn"><i class="icon-comment"></i> ' + obj.data.num_comments + " comments</a>";
            reddit_imagediv += '<p><span class="label big label-success">' + obj.data.score + "</span>";
            reddit_imagediv += " </div>";
            reddit_imagediv += " </div>";
            reddit_imagediv += " </div>";
            reddit_imagediv += " </div><br />";
            reddit_imagediv += " </div>";
            $("#reddit_container").append(reddit_imagediv);
        });
        var reddit_nextdiv = '<p><a href="index.html?after=' + lastid + '" class="btn btn-primary btn-large">Next</a></p>';
        $("#button_next_container").append(reddit_nextdiv);
    });
});