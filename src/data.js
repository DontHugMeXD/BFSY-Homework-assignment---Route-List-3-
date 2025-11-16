// Initial data constants for shopping lists

const INITIAL_MEMBERS = [
  { id: '1', name: 'Me', email: 'me@example.com', role: 'owner' },
  { id: '2', name: 'Ronald Roberts', email: 'ronald@example.com', role: 'member' },
  { id: '3', name: 'Jerome Hall', email: 'jerome@example.com', role: 'member' },
  { id: '4', name: 'Robert Fox', email: 'robert@example.com', role: 'member' },
];

const INITIAL_ITEMS = [
  { text: 'Milk', done: false, updatedBy: null },
  { text: 'Bread', done: false, updatedBy: null },
  { text: 'Eggs', done: true, updatedBy: 'ronald@example.com' },
  { text: 'Butter', done: false, updatedBy: null },
];

export const INITIAL_LISTS = [
  {
    id: '1',
    name: 'Weekly Groceries',
    owner: 'me@example.com',
    members: INITIAL_MEMBERS,
    items: INITIAL_ITEMS,
    archived: false,
    isDefault: true,
  },
  {
    id: '2',
    name: 'Party Shopping',
    owner: 'ronald@example.com',
    members: [
      { id: '1', name: 'Ronald Roberts', email: 'ronald@example.com', role: 'owner' },
      { id: '2', name: 'Me', email: 'me@example.com', role: 'member' },
    ],
    items: [
      { text: 'Beer', done: false, updatedBy: null },
      { text: 'Chips', done: true, updatedBy: 'ronald@example.com' },
    ],
    archived: false,
    isDefault: false,
  },
  {
    id: '3',
    name: 'Old List',
    owner: 'me@example.com',
    members: [{ id: '1', name: 'Me', email: 'me@example.com', role: 'owner' }],
    items: [
      { text: 'Item 1', done: true, updatedBy: null },
      { text: 'Item 2', done: true, updatedBy: null },
    ],
    archived: true,
    isDefault: false,
  },
];

export const CURRENT_USER = {
  name: 'Me',
  email: 'me@example.com',
};

