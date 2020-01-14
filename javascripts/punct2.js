document.addEventListener('DOMContentLoaded', (event) => {
  var toggled = false;
  var body = document.querySelector("main").cloneNode(true);
  var mid_puncts = "《》（）「」";
  var end_puncts = "。，、：；";
  var puncts = mid_puncts.concat(end_puncts);
  var nodes = document.querySelectorAll("main *");
  nodes.forEach(function(node) {
    var children = Array.from(node.childNodes);
    children.forEach(function(child) {
      if (child.nodeType == 3) {
        var text = child.nodeValue;
        var new_text = "";
        for (var i = 0; i < text.length; i++) {
          var char = text[i];
          if (puncts.includes(char)) {
            node.insertBefore(document.createTextNode(new_text), child);
            var span = document.createElement("span");
            span.className = "halt";
            span.insertAdjacentText("afterbegin", char);
            node.insertBefore(span, child);
            if (end_puncts.includes(char)) {
              node.insertBefore(document.createTextNode(" "), child);
            }
            new_text = "";
          } else {
            new_text = new_text.concat(char);
          }
        }
        node.insertBefore(document.createTextNode(new_text), child);
        node.removeChild(child);
      }
    });
  });
  var body_new = document.querySelector("main").cloneNode(true);

  document.querySelector("main").replaceWith(body);
  document.querySelector('#punct').onclick = function(event) {
    if (toggled) {
      toggled = false;
      document.querySelector("main").replaceWith(body);
      console.log("recover");
    } else {
      toggled = true;
      document.querySelector("main").replaceWith(body_new);
      console.log("toggle");
    }
  };
});
