'use strict';

const gallery = document.getElementById('gallery');
const image = document.getElementById('gallery-image');
const title = document.getElementById('gallery-title');
const sizeButton = document.getElementById('gallery-size');
let trigger;

document.addEventListener('click', event => {
  const link = event.target.closest('[data-gallery]');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (typeof gallery.showModal !== 'function') return;

  event.preventDefault();
  trigger = link;
  image.src = link.href;
  image.alt = link.querySelector('img').alt;
  title.textContent = link.closest('figure').querySelector('figcaption').textContent;
  gallery.showModal();
});

sizeButton.addEventListener('click', () => {
  const widened = gallery.classList.toggle('gallery-wide');
  sizeButton.setAttribute('aria-pressed', widened);
  sizeButton.textContent = widened ? '完整显示' : '按宽度查看';
  gallery.querySelector('.dialog-image').scrollTop = 0;
});

gallery.addEventListener('close', () => {
  gallery.classList.remove('gallery-wide');
  sizeButton.setAttribute('aria-pressed', 'false');
  sizeButton.textContent = '按宽度查看';
  image.removeAttribute('src');
  trigger?.focus({ preventScroll: true });
});
