# Family Tree App

## Overview
The Family Tree App is a web application designed to help users create, manage, and visualize family trees. It allows users to add family members, define relationships, and export visual representations of the tree. The app is built using the Next.js framework and stores data in an SQLite database.

---

## Features

### Core Features
1.  **Family Tree Visualization**
    *   Interactive tree representation of family members and their relationships.
    *   Export the tree as an image or PDF.

2.  **Family Member Management**
    *   Add family members with details such as name, picture, and relationships (parents, children, or other).
    *   Link members to existing family members to define relationships.

3.  **User Authentication**
    *   Email-based registration and login.
    *   Users can only view and manage their own families or families where they are linked as a member.

4.  **Data Storage**
    *   Family tree data is stored in an SQLite database using a hierarchical structure.

5.  **Trial and Paid Modes**
    *   **Trial Mode**: Users can add up to great-grandparents.
    *   **Paid Mode**: Unlimited family tree creation and management.
    *   Stripe integration for payment processing.

---

## User Workflow

1.  **Registration and Login**
    *   Users register via email.
    *   Free trial mode is activated upon registration.

2.  **Family Creation**
    *   Users start by creating a family and adding the first member.
    *   Additional members can be added and linked to existing members.

3.  **Tree Visualization**
    *   Users can view the family tree in an interactive format.
    *   Export the tree as an image or PDF.

4.  **Upgrade to Paid Mode**
    *   Users can upgrade to the paid version via Stripe for unlimited access.

---

## Technical Requirements

### Frontend
- **Framework**: Next.js
- **UI Components**: React-based components for forms, tree visualization, and navigation.

### Backend
- **Database**: SQLite for storing family tree data in a hierarchical structure.
- **API**: RESTful API endpoints for managing family members, exporting trees, and handling authentication.

### Authentication
- **Email-based**: Secure user authentication and session management.

### Payment Integration
- **Stripe**: For handling payments and subscriptions.

### Export Functionality
- **Formats**: Image (e.g., PNG, JPEG) and PDF.

---

## Limitations in Trial Mode
- Users can only add up to great-grandparents in the family tree.
- Full access requires upgrading to the paid version.

---

## Future Enhancements (Optional)
- Multi-language support.
- Collaboration features for shared family tree editing.
- Advanced analytics for family tree insights.

---

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up the `.env.local` file with database and Stripe credentials.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## License
This project is licensed under the MIT License.
