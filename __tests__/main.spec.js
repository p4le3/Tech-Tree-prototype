import { test, expect, beforeEach } from 'vitest'
import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event'

import { createApp } from '../src'

beforeEach(() => {
  document.body.innerHTML = `
    <div class="tech-tree">
      <div class="tree"></div>
      <div class="shading"></div>
      <div class="modal-tech"></div>
    </div>
  `;
});

test('Открытие модалки', async () => {
  // Объект для выполнения действий над элементами
  const user = userEvent.setup()

  // Запуск TechTreeInteract
  createApp();

  await user.click(
    screen.getByRole('button', {
      name: /огонь/i
    })
  );

  expect(
    screen.getByRole('heading', {
      level: 3,
      name: /огонь/i
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/простая и хорошая технология/i)
  ).toBeInTheDocument();

  expect(
    document.querySelector('.modal-tech')
  ).toHaveClass('open');

});

test('Переход между модалками', async () => {
  // Объект для выполнения действий над элементами
  const user = userEvent.setup()
  const modal = document.querySelector('.modal-tech');

  // Запуск TechTreeInteract
  createApp();

  await user.click(
    screen.getByRole('button', {
      name: /огонь/i,
    })
  );

  expect(
    screen.getByRole('heading', {
      level: 3,
      name: /огонь/i
    })
  ).toBeInTheDocument();

  await user.click(
    within(modal).getByRole('button', {
      name: /начальная плавильная печь/i,
    })
  );

  expect(
    within(modal).getByRole('heading', {
      level: 3,
      name: /начальная плавильная печь/i,
    })
  ).toBeInTheDocument();

  expect(
    within(modal).queryByRole('heading', {
      level: 3,
      name: /^огонь$/i,
    })
  ).not.toBeInTheDocument();
});