import { techTree } from "./data.js";

export function getTree(era) {
  return techTree?.[era];
}

export class TechTreeInteract {
  constructor(data) {

    this.data = data,

      // На будущее, чтобы выполнялись запросы по эре
      this.eras = [
        'primitives',
      ]

    this.actions = {
      open: (techId) => this.openModal(techId),
      close: () => this.closeModal(),
    };

    this.svgIcons = {
      close: '#cross',
      info: '#info'
    };

    this.elements = {
      tree: document.querySelector('.tree'),
      shading: document.querySelector('.shading'),
      modal: document.querySelector('.modal-tech'),

      // treeTechs = document.querySelectorAll('.tree .tech')
      // closeModal: document.querySelector('.close-modal'),
    };
  }

  toggleTabIndex(block, value) {
    const btns = block.querySelectorAll('button');

    btns.forEach(btn => btn.tabIndex = value);
  }

  renderTree() {
    const levelsMap = new Map();

    // Группируем технологии по уровням
    this.data.forEach(tech => {
      const level = tech.rowLevel;

      if (!levelsMap.has(level)) {
        levelsMap.set(level, []);
      }

      levelsMap.get(level).push(tech);
    });

    // Сортируем уровни
    const sortedLevels = [...levelsMap.keys()]
      .sort((a, b) => Number(a) - Number(b));

    const html = sortedLevels.map(level => {
      const techsHtml = levelsMap.get(level)
        .map(tech => `
        <button
          class="tech"
          data-tech-id="${tech.id}"
          data-action="open"
        >
          <span class="name">${tech.name}</span>
          <span class="cost">${tech.cost}</span>

          <svg class="prev"></svg>
          <svg class="next"></svg>
        </button>
      `)
        .join('');

      return `
      <div class="level">
        <h2 class="row-level">${level}</h2>

        ${techsHtml}
      </div>
    `;
    }).join('');

    this.elements.tree.innerHTML = html;
  }

  renderRelatedTechsList(tech, direction) {
    const arr = tech.relates?.[direction] ?? [];

    if (arr.length === 0) {
      return '<span>Нет</span>';
    }

    const html = arr.map(techId => {
      const foundTech = this.data.find(dataTech => dataTech.id === techId);

      return `<button data-tech-id="${techId}"
        data-action="open">${foundTech.name}</button>`;
    });

    return html.join('');
  }

  openModal(id) {
    const tech = this.data
      .find(obj => obj?.id === id);

    if (!tech) return;

    const html = `
        <div class="tech-title">
          <h3>${tech.name}</h3>
          <button class="close-modal" data-action="close">
            <svg>
              <use href="${this.svgIcons.close}"></use>
            </svg>
          </button>
        </div>
        <p class="description">
          ${tech.description}
        </p>
        <div class="related-techs">
          <div class="related-title">
            <div class="has-tooltip">
              <h4>Связанные технологии</h4>
              <svg>
                <use href="${this.svgIcons.info}"></use>
              </svg>
              <span class="tooltip">
                Вложенность связей 1
              </span>
            </div>
            <button data-action="showRelatedTree" style="display: none;">Показать древо связей</button>
          </div>

          <div class="lists">
            <div class="prev-list">
              <h5>Технологии для получения</h5>
              ${this.renderRelatedTechsList(tech, 'prev')}
            </div>
            <div class="next-list">
              <h5>Технологии в которых используется</h5>
              ${this.renderRelatedTechsList(tech, 'next')}
            </div>
          </div>
        </div>
    `

    this.elements.modal.innerHTML = html;

    this.toggleTabIndex(this.elements.tree, -1);
    this.toggleTabIndex(this.elements.modal, 0);

    // this.elements.tree.classList.add('hide');
    this.elements.shading.classList.add('show');
    this.elements.modal.classList.add('open');
  }

  closeModal() {

    this.toggleTabIndex(this.elements.modal, -1);
    this.toggleTabIndex(this.elements.tree, 0);

    // this.elements.tree.classList.remove('hide');
    this.elements.shading.classList.remove('show');
    this.elements.modal.classList.remove('open');
  }

  initActions() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button');

      if (!btn) return;

      const { action, techId } = btn.dataset;

      if (action && techId) {
        this.actions?.[action](techId);
        return;
      }

      this.actions?.[action]();
    })
  }
}

export function createApp() {
  const data = getTree('primitives');

  const interact = new TechTreeInteract(data);

  interact.renderTree();
  interact.initActions();

  return interact;
}