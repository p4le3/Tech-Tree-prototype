export const techTree = {
  primitives: [
    {
      id: '1',
      name: 'Огонь',
      cost: '50',
      rowLevel: '0',
      description: 'Огонь, простая и хорошая технология.Не смотрите на него снисходительно, ведь всё с него и началось.',

      relates: {
        prev: [],
        next: ['3']
      }
    },
    {
      id: '2',
      name: 'Глиняная лепка',
      cost: '50',
      rowLevel: '0',
      description: 'Обширная технология, которая положит начало многому.',

      relates: {
        prev: [],
        next: ['3']
      }
    },
    {
      id: '3',
      name: 'Начальная плавильная печь',
      cost: '200',
      rowLevel: '1',
      description: 'Некачественная и слабая, но хоть какая-то печь, способная плавить некоторую руду',

      relates: {
        prev: ['1', '2'],
        next: ['4']
      }
    },
    {
      id: '4',
      name: 'Сталь',
      cost: '100',
      rowLevel: '2',
      description: 'Её можно использовать там, где пожелаете.',

      relates: {
        prev: ['3'],
        next: []
      }
    },
  ]
}