
// GALLERY TRACK
const galleryImages = [
  'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=320&q=80',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=320&q=80',
  'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=320&q=80',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=320&q=80',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=320&q=80',
  'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=320&q=80',
];
const track = document.getElementById('galleryTrack');
if (track) {
  [...galleryImages, ...galleryImages].forEach((src) => {
    const div = document.createElement('div');
    div.className = 'about-gallery-item';
    div.innerHTML = `<img src="${src}">`;
    track.appendChild(div);
  });
}
(function () {
  var words = ['your beloved pet','active dogs','senior dogs','puppies','picky eaters','adult dogs'];
  var i = 0;
  var el = document.getElementById('pf-home-ticker');
  if (!el) return;
 
  setInterval(function () {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(25%)';
    setTimeout(function () {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.style.transition = 'transform .4s ease, opacity .4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150);
  }, 3000);
})();