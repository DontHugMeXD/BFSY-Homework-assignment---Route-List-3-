# BFSY-Homework-assignment---Route-List-3
BFSY Homework assignment - Route: List (#3)

# Shopping List App

A collaborative shopping list management application built with React. Create, manage, and share shopping lists with multiple members. Track items, mark them as completed, and organize your lists efficiently.

## Features

- **Multiple Shopping Lists**: Create and manage multiple shopping lists
- **Member Management**: Add members to lists, assign roles (owner/member), and manage permissions
- **Item Management**: 
  - Add, edit, and delete items
  - Mark items as done/undone
  - Track who completed each item
- **List Organization**:
  - Archive and restore lists
  - Set default list
  - Rename lists
- **Filtering & Sorting**: Filter items by status and sort by various criteria
- **Responsive Design**: Modern UI with intuitive navigation

## Technologies Used

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **React Scripts** 5.0.1

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BFSY_Homework_assignment_RouteList_3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - Ejects from Create React App (one-way operation)

### Production Build

To build and serve the production version:

1. Build the app:
```bash
npm run build
```

2. Serve the build (from the build directory):
```bash
cd build
npx serve -s . -l 3000
```

The production build will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddItemForm.js
│   ├── AddMemberForm.js
│   ├── ArchivedListCard.js
│   ├── EmptyState.js
│   ├── FilterControls.js
│   ├── ItemsFooter.js
│   ├── ItemsList.js
│   ├── MemberRow.js
│   ├── MembersList.js
│   ├── MembersPanel.js
│   ├── SettingsCard.js
│   ├── ShoppingListCard.js
│   ├── ShoppingListItemRow.js
│   └── SortControls.js
├── pages/              # Page components
│   ├── ArchivedListsPage.js
│   ├── ListMembersPage.js
│   ├── ListSettingsPage.js
│   ├── ShoppingListDetailPage.js
│   └── ShoppingListsPage.js
├── shared/             # Shared components
│   ├── AppHeader.js
│   ├── Toolbar.js
│   └── icons/
├── App.js              # Main app component with routing
├── data.js             # Initial data and constants
└── types.js            # Type definitions
```

## Usage

### Creating a Shopping List

1. Navigate to the home page
2. Click the "Create List" button
3. Enter a name for your list (or use the default "New Shopping List")

### Managing Items

- **Add Item**: Use the add item form at the top of the list detail page
- **Mark as Done**: Click the checkbox next to an item
- **Edit Item**: Click the edit icon on an item row
- **Delete Item**: Click the delete icon on an item row

### Managing Members

1. Navigate to a shopping list
2. Go to the Members page
3. Add members by entering their email address
4. Remove members (if you're the owner)
5. Leave a list if you're a member

### List Settings

1. Navigate to a shopping list
2. Go to the Settings page
3. Rename the list
4. Set as default list
5. Archive or delete the list

### Viewing Archived Lists

Navigate to the Archive page to view and restore archived lists.

## Current User

The application uses a default current user defined in `src/data.js`:
- Name: "Me"
- Email: "me@example.com"

You can modify this in the `CURRENT_USER` constant in `src/data.js`.

## License

This project is private and intended for educational purposes.
