/* site.js — shared helpers: Swift syntax highlighter for pre>code blocks */
(function () {
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const re = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|\b(struct|enum|protocol|extension|func|var|let|case|return|await|async|throws|throw|try|guard|else|if|in|import|some|any|do|catch|public|private|final|class|static|where|associatedtype|nonisolated)\b|(\.(?:allow|reroute|drop|root|nearestBranch|topmostAncestor|high|critical|normal|fade|home|wallet|saved|active)\b)|\b([A-Z][A-Za-z0-9]*)\b/g;
  document.querySelectorAll("pre code").forEach(el => {
    const src = el.textContent;
    let out = "", last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      const cls = m[1] ? "tok-cm" : m[2] ? "tok-str" : m[3] ? "tok-kw" : m[4] ? "tok-prop" : "tok-type";
      out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
      last = m.index + m[0].length;
    }
    out += esc(src.slice(last));
    el.innerHTML = out;
  });
})();
