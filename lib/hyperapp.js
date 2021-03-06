!(function(n, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : ('function' == typeof define && define.amd) || e((n.hyperapp = {}));
})(this, function(n) {
  'use strict';
  (n.h = function(n, e) {
    for (var r, o = [], t = [], i = arguments.length; i-- > 2; )
      o.push(arguments[i]);
    for (; o.length; )
      if (Array.isArray((r = o.pop()))) for (i = r.length; i--; ) o.push(r[i]);
      else null != r && !0 !== r && !1 !== r && t.push(r);
    return 'function' == typeof n
      ? n(e || {}, t)
      : { name: n, props: e || {}, children: t };
  }),
    (n.app = function(n, e, r, o) {
      function t(n, e) {
        return {
          name: n.nodeName.toLowerCase(),
          props: {},
          children: e.call(n.childNodes, function(n) {
            return 3 === n.nodeType ? n.nodeValue : t(n, e);
          })
        };
      }
      function i() {
        y = !y;
        var n = r(b, k);
        for (o && !y && (N = m(o, N, w, (w = n))); (n = g.pop()); ) n();
      }
      function l() {
        y || ((y = !y), setTimeout(i));
      }
      function u(n, e) {
        var r = {};
        for (var o in n) r[o] = n[o];
        for (var o in e) r[o] = e[o];
        return r;
      }
      function f(n, e, r) {
        var o = {};
        return n.length
          ? ((o[n[0]] = n.length > 1 ? f(n.slice(1), e, r[n[0]]) : e), u(r, o))
          : e;
      }
      function c(n, e) {
        for (var r = 0; r < n.length; r++) e = e[n[r]];
        return e;
      }
      function p(n, e, r) {
        for (var o in r)
          'function' == typeof r[o]
            ? (function(o, t) {
                r[o] = function(o) {
                  return (
                    'function' == typeof (o = t(o)) && (o = o(c(n, b), r)),
                    o &&
                      o !== (e = c(n, b)) &&
                      !o.then &&
                      l((b = f(n, u(e, o), b))),
                    o
                  );
                };
              })(o, r[o])
            : p(n.concat(o), (e[o] = e[o] || {}), (r[o] = u(r[o])));
      }
      function a(n) {
        return n && n.props ? n.props.key : null;
      }
      function s(n, e, r, o, t) {
        if ('key' === e);
        else if ('style' === e)
          for (var i in u(t, r))
            n[e][i] = null == r || null == r[i] ? '' : r[i];
        else
          'function' == typeof r || (e in n && !o)
            ? (n[e] = null == r ? '' : r)
            : null != r && !1 !== r && n.setAttribute(e, r),
            (null != r && !1 !== r) || n.removeAttribute(e);
      }
      function d(n, e) {
        var r =
          'string' == typeof n || 'number' == typeof n
            ? document.createTextNode(n)
            : (e = e || 'svg' === n.name)
              ? document.createElementNS('http://www.w3.org/2000/svg', n.name)
              : document.createElement(n.name);
        if (n.props) {
          n.props.oncreate &&
            g.push(function() {
              n.props.oncreate(r);
            });
          for (var o = 0; o < n.children.length; o++)
            r.appendChild(d(n.children[o], e));
          for (var t in n.props) s(r, t, n.props[t], e);
        }
        return r;
      }
      function h(n, e, r) {
        if ((r = e.props)) {
          for (var o = 0; o < e.children.length; o++)
            h(n.childNodes[o], e.children[o]);
          r.ondestroy && r.ondestroy(n);
        }
        return n;
      }
      function v(n, e, r, o) {
        function t() {
          n.removeChild(h(e, r));
        }
        r.props && (o = r.props.onremove) ? o(e, t) : t();
      }
      function m(n, e, r, o, t, i) {
        if (o === r);
        else if (null == r) e = n.insertBefore(d(o, t), e);
        else if (o.name && o.name === r.name) {
          !(function(n, e, r, o) {
            for (var t in u(e, r))
              r[t] !== ('value' === t || 'checked' === t ? n[t] : e[t]) &&
                s(n, t, r[t], o, e[t]);
            r.onupdate &&
              g.push(function() {
                r.onupdate(n, e);
              });
          })(e, r.props, o.props, (t = t || 'svg' === o.name));
          for (var l = [], f = {}, c = {}, p = 0; p < r.children.length; p++)
            (l[p] = e.childNodes[p]),
              null != (w = a((y = r.children[p]))) && (f[w] = [l[p], y]);
          p = 0;
          for (var h = 0; h < o.children.length; ) {
            var y = r.children[p],
              N = o.children[h],
              w = a(y),
              b = a(N);
            if (c[w]) p++;
            else if (null == b) null == w && (m(e, l[p], y, N, t), h++), p++;
            else {
              var k = f[b] || [];
              w === b
                ? (m(e, k[0], k[1], N, t), p++)
                : k[0]
                  ? m(e, e.insertBefore(k[0], l[p]), k[1], N, t)
                  : m(e, l[p], null, N, t),
                h++,
                (c[b] = N);
            }
          }
          for (; p < r.children.length; )
            null == a((y = r.children[p])) && v(e, l[p], y), p++;
          for (var p in f) c[f[p][1].props.key] || v(e, f[p][0], f[p][1]);
        } else
          o.name === r.name
            ? (e.nodeValue = o)
            : ((e = n.insertBefore(d(o, t), (i = e))), v(n, i, r));
        return e;
      }
      var y,
        g = [],
        N = (o && o.children[0]) || null,
        w = N && t(N, [].map),
        b = u(n),
        k = u(e);
      return l(p([], b, k)), k;
    });
});
//# sourceMappingURL=hyperapp.js.map
