$(function(){
  $.ajax({
    url: 'https://tsubakicraft.wordpress.com/feed/rss2',
    type: 'GET',
    cache: false,
    dataType: 'xml',
    timeout: 5000,
    success: function(res, status) {
      if (status === 'success') {

        // responseText から取得して、xml 形式に変換する必要があり
        var xmlText = res["responseText"];
        var xml = $.parseXML(xmlText);

        var row = 0;
        var data = [];
        var nodeName;

        $(xml).find('item').each(function() {
          data[row] = {};
          $(this).children().each(function() { // 子要素を取得
              nodeName = $(this)[0].nodeName; // 要素名
              data[row][nodeName] = {}; // 初期化
              attributes = $(this)[0].attributes; // 属性を取得
              for (var i in attributes) {
              data[row][nodeName][attributes[i].name] = attributes[i].value; // 属性名 = 値
              }
            data[row][nodeName]['text'] = $(this).text();
          });
          row++;
        });
        var content = '<div style="border:1px solid orange;width:100%;height:800px;padding:8px;overflow:scroll">';
        for (i in data) {
            content +=
              '<div style="border-bottom: 1px solid orange">' +
              '<a href="' + data[i].link.text + '" target="_blank">' +
              '<h3>' + data[i].title.text + '</h3>' +
              '</a>' +
              '<p>' + data[i].description.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 200) + '</p>' +
              '<p style="font-size:9pt;text-align:right">' + data[i].pubDate.text + '</p>' +
              '</div>';
        }
        content += '</div>';
        $('#rss').append(content);
      }
    }
  });
});
