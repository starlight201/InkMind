export function renderModal() {
  return `
    <div class="modal-backdrop" id="modal-backdrop">
      <article class="modal" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="关闭弹窗">×</button>
        <div id="modal-content"></div>
      </article>
    </div>`;
}

export function openModal(content) {
  document.querySelector("#modal-content").innerHTML = content;
  document.querySelector("#modal-backdrop").classList.add("open");
}

export function closeModal() {
  document.querySelector("#modal-backdrop").classList.remove("open");
}
