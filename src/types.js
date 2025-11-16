// Type definitions for shopping list application

export const Item = {
  text: String,
  done: Boolean,
  updatedBy: String, // optional
};

export const Member = {
  id: String,
  name: String,
  email: String,
  role: String, // 'owner' | 'member'
};

export const List = {
  id: String,
  name: String,
  owner: String, // owner email
  members: Array, // Array of Member
  items: Array, // Array of Item
  archived: Boolean,
  isDefault: Boolean,
};

