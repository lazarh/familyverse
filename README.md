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

## Dockerization

This application can be built and run as a Docker container. Ensure you have Docker installed on your system.

### Building the Docker Image

To build the Docker image for the application, navigate to the root directory of the project (where the `Dockerfile` is located) and run the following command:

```bash
docker build -t familyverse-app .
```

If you encounter permission issues, you might need to run the command with `sudo`:

```bash
sudo docker build -t familyverse-app .
```

Alternatively, you can add your user to the `docker` group to avoid using `sudo` for Docker commands. You'll need to log out and log back in for this change to take effect:

```bash
sudo usermod -aG docker ${USER}
```

### Running the Docker Container

Once the image is built successfully, you can run it using:

```bash
docker run -p 3000:3000 familyverse-app
```

This command starts the container and maps port 3000 of the container to port 3000 on your host machine. You should then be able to access the application at `http://localhost:3000`.

### Deploying to Another Environment

To deploy the application to a different environment using Docker:

1.  **Tag and Push the Image to a Container Registry**:
    *   First, tag your locally built image. Replace `your-registry/your-repo` with the actual path to your container registry (e.g., `docker.io/yourusername`, `gcr.io/your-project-id`, `your-aws-account-id.dkr.ecr.your-region.amazonaws.com`).
        ```bash
        docker tag familyverse-app your-registry/your-repo/familyverse-app:latest
        ```
    *   Log in to your container registry (if required):
        ```bash
        docker login your-registry
        ```
    *   Push the tagged image:
        ```bash
        docker push your-registry/your-repo/familyverse-app:latest
        ```

2.  **Pull the Image in the Deployment Environment**:
    On your deployment server or service, pull the image from the registry:
    ```bash
    docker pull your-registry/your-repo/familyverse-app:latest
    ```

3.  **Run the Container in the Deployment Environment**:
    Run the container, ensuring you configure any necessary environment variables. Secrets like `NEXTAUTH_SECRET` and `DATABASE_URL` **must** be provided at runtime and should not be baked into the image.

    There are two common ways to pass environment variables:

    *   **Using the `-e` flag for each variable:**
        ```bash
        docker run -d -p 3000:3000 \
          -e NEXTAUTH_SECRET="your_very_secure_nextauth_secret_here" \
          -e DATABASE_URL="your_production_database_connection_string" \
          # Add any other required environment variables like Stripe keys, etc.
          your-registry/your-repo/familyverse-app:latest
        ```

    *   **Using an environment file with the `--env-file` flag:**
        Create a file (e.g., `production.env`) in your deployment environment (do **not** commit this file to Git if it contains real secrets):
        ```env
        # Example production.env file
        NEXTAUTH_SECRET="your_very_secure_nextauth_secret_here"
        DATABASE_URL="your_production_database_connection_string"
        # STRIPE_SECRET_KEY="sk_live_yourstripekey"
        # NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_yourstripekey"
        ```
        Then run the container:
        ```bash
        docker run -d -p 3000:3000 --env-file ./production.env your-registry/your-repo/familyverse-app:latest
        ```

    The `-d` flag runs the container in detached mode (in the background).

**Note**: For a production deployment, ensure your `DATABASE_URL` in the Docker run command points to your production database. The SQLite database included in the repository (`prisma/dev.db`) is suitable for development but not recommended for production. You will also need to provide a strong, unique `NEXTAUTH_SECRET`. You can generate one using `openssl rand -base64 32`.

---

## Environment Variables

It's recommended to create a `.env.example` file in your project root to list all the environment variables required by the application, especially those needed for production. This helps other developers and your future self understand the configuration needs.

Example `.env.example`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000 # Change for production
NEXTAUTH_SECRET= # Generate a strong secret for production

# Database (Prisma)
DATABASE_URL="file:./dev.db" # Change for production (e.g., postgresql://user:password@host:port/database)

# Stripe (if implemented)
# STRIPE_SECRET_KEY=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## License
This project is licensed under the MIT License.
