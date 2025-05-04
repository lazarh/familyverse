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

## Docker Deployment

To build and run this application using Docker:

1.  **Ensure Docker is installed** on your system.
2.  **Create a `.env` file** in the project root with your necessary environment variables (e.g., `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`). **Do not commit this file.**
    ```env
    # Example .env file content
    DATABASE_URL="file:./dev.db" # Or your production database URL
    NEXTAUTH_SECRET="your_strong_secret_here" # Generate a strong secret
    NEXTAUTH_URL="http://localhost:3000" # Or your production URL
    ```
3.  **Build the Docker Image:**
    Open a terminal in the project root directory and run:
    ```bash
    docker build -t familyverse-app .
    ```
4.  **Run the Docker Container:**
    ```bash
    # Make sure your .env file is in the current directory or provide the full path
    docker run -p 3000:3000 -d --env-file .env --name my-familyverse-container familyverse-app
    ```
    *   `-p 3000:3000`: Maps port 3000 on your host to port 3000 in the container.
    *   `-d`: Runs the container in the background.
    *   `--env-file .env`: Loads environment variables from the specified file.
    *   `--name my-familyverse-container`: Assigns a name for easy management.
    *   `familyverse-app`: The name of the image to run.

    You should now be able to access the application at `http://localhost:3000`.

5.  **Updating the Application:**
    When you have new code changes:
    *   Rebuild the image: `docker build -t familyverse-app .`
    *   Stop the old container: `docker stop my-familyverse-container`
    *   Remove the old container: `docker rm my-familyverse-container`
    *   Run the new container using the `docker run` command from step 4.

    *Note:* For production deployments, consider using Docker Compose for easier management or a container orchestration platform like Kubernetes. Database migrations (`npx prisma migrate deploy`) should typically be run as a separate step during your deployment process before starting the new container.

---

## License
This project is licensed under the MIT License.
