document.addEventListener('DOMContentLoaded', (event) => {
  var mid_puncts = "《》〈〉（）『』「」・";
  var end_puncts = "。，、：；";
  var lat_puncts = "“”‘’";
  var puncts = mid_puncts.concat(end_puncts).concat(lat_puncts);
  var nodes = document.querySelectorAll("body *");
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
            if (lat_puncts.includes(char)) {
              span.className = "pwid";
            }
            else {
              span.className = "halt";
            }
            span.insertAdjacentText("afterbegin", char);
            node.insertBefore(span, child);
            if (end_puncts.includes(char)) {
              node.insertBefore(document.createTextNode(" "), child); // ensp
              // node.insertBefore(document.createTextNode(" "), child); // sp
            }
            new_text = "";
          } else {
            if (char == "　") {
              new_text = new_text.concat(" ");
            } else {
              new_text = new_text.concat(char);
            }
          }
        }
        node.insertBefore(document.createTextNode(new_text), child);
        node.removeChild(child);
      }
    });
  });
});
