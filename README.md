# Vedic Medic: AI-Powered Medical Report Analyzer & Health Chatbot

**An intelligent RAG-based web application for summarizing medical reports and providing trusted health information from a curated knowledge base.**

---

## Project Overview

Vedic Medic is a secure and user-friendly web application designed to empower users to better understand their health. It offers two primary features:

1.  **AI-Powered Medical Report Analysis:** Users can securely upload an image of their medical report (e.g., a blood test or pathology report). The application utilizes a powerful multimodal AI model to analyze the report and generate a clear, easy-to-understand summary of the findings, highlighting any abnormalities or key results.

2.  **Conversational Medical Chat:** Users can engage in a natural conversation with an AI assistant to ask questions about various diseases, symptoms, treatments, and general health topics.

The core of Vedic Medic is its **Retrieval-Augmented Generation (RAG)** system. This means the AI's responses are strictly based on a secure, pre-loaded, and verified medical knowledge base. The model **does not** use general web knowledge to answer health questions, ensuring the information provided is reliable and consistent with the data you provide.

## Features

* **Secure Report Upload:** Upload medical reports in common image formats (PNG, JPG, JPEG) through a secure interface.
* **Intelligent Summary:** Get a detailed summary of your report, including key findings, abnormal values, and general recommendations, all presented in simple language.
* **Conversational Chat:** Ask complex health-related questions and receive informative answers from a knowledgeable AI assistant.
* **Private Knowledge Base:** All answers from the chatbot are generated exclusively from a curated and trusted medical dataset, preventing misinformation.
* **User Authentication:** Secure user accounts to keep your medical data private and accessible only to you.
* **Clean & Responsive UI:** A user-friendly interface that works seamlessly on both desktop and mobile devices.

## How It Works: The RAG System

Vedic Medic's reliability comes from its RAG architecture. Here’s a simplified breakdown of the process:

1.  **Knowledge Ingestion (Offline):** A comprehensive dataset of trusted medical documents and information is processed and converted into numerical representations (embeddings) using a Google Embedding model. These embeddings are stored in a specialized vector database.

2.  **User Query:** When you ask a question in the chat (e.g., "What are the symptoms of anemia?"), your question is also converted into an embedding.

3.  **Retrieval:** The system performs an incredibly fast search in the vector database to find the chunks of medical text that are most semantically similar to your question.

4.  **Augmentation & Generation:** The retrieved text chunks are then passed to the Large Language Model (LLM) along with your original question. The LLM is instructed to formulate its answer *only* using the information provided in these chunks.

This process ensures that the AI's response is grounded in your specific data, making it a safe and reliable source of information.

## Technology Stack

* **Backend:** Django, Django REST Framework
* **Frontend:** React (or HTML/CSS with JavaScript)
* **AI & Machine Learning:**
    * **LLM:** Google's Gemini (for multimodal and text generation)
    * **Embeddings:** `models/embedding-001`
    * **Framework:** LangChain
* **Database:** PostgreSQL / SQLite
* **Vector Database:** Pinecone / ChromaDB / FAISS
* **Deployment:** Docker, Gunicorn, Nginx

## Installation and Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Python 3.9+
* Node.js and npm (if using a React frontend)
* An account with Google AI Studio and Pinecone (or another vector DB).

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your_username/vedic-medic.git](https://github.com/your_username/vedic-medic.git)
    cd vedic-medic
    ```

2.  **Setup Backend**
    ```sh
    # Create and activate a virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

    # Install Python dependencies
    pip install -r requirements.txt

    # Set up your environment variables in a .env file
    # (Create a .env file and add your keys)
    # GOOGLE_API_KEY="your_google_api_key"
    # PINECONE_API_KEY="your_pinecone_api_key"
    # SECRET_KEY="your_django_secret_key"

    # Run database migrations
    python manage.py migrate

    # Start the Django server
    python manage.py runserver
    ```

3.  **Setup Frontend** (if applicable)
    ```sh
    cd frontend
    npm install
    npm start
    ```

## Usage

1.  **Register/Login:** Create an account to securely store and access your information.
2.  **Analyze a Report:** Navigate to the "Analyze Report" section, upload an image of your medical report, and wait for the AI to generate a summary.
3.  **Chat with the AI:** Go to the "Chat" section and type in any medical question you have.

## Important Disclaimer

Vedic Medic is an informational tool and **not a substitute for professional medical advice, diagnosis, or treatment.** Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.

