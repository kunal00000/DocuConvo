## Introduction

DocuConvo is an innovative application that combines traditional documentation with conversational AI capabilities powered by GPT-3.5. This allows organizations to enhance their documentation search experience by enabling users to converse with the documentation.

## How DocuConvo Works Internally

DocuConvo operates in the following steps:

1. **Crawling Documentation Website:**

   - Our application crawls the entire documentation website provided by the organization.

2. **Creating Knowledge Base:**

   - The crawled information is processed and converted into vector embeddings.
   - Vector embeddings are saved into the Pinecone vector database as an index.

3. **Search Process:**
   - When a search request is received from the organization's search bar, it is compared against the knowledge base using vector embeddings.
   - Similar vectors are passed to GPT3.5 as context, along with the search query.

## Get Started

To create a knowledge base for their documentation website, organizations need to provide the following details:

1. **Documentation Website URL:**

   - Example: `https://nextjs.org/docs`

2. **Documentation Website URL Match:**

   - Example: `https://nextjs.org/docs/**`
   - This is a URL pattern that describes the structure of the documentation URLs. Use a wildcard (`**`) to capture variations.

3. **CSS Selector for Main Text Content:**
   - This selector helps identify the main content area of the documentation, increasing the accuracy of the context passed to GPT.

### &ensp;Pinecone Details

&emsp;To store vector embeddings, ensuring complete ownership of your data:

1. **Pinecone API Key**
2. **Pinecone Index Name**
3. **Pinecone Environment**

### &ensp;OpenAI API Key

&emsp;The last step is to enter the OpenAI API key, which will be used to generate responses for search queries with documentation context.

## Usage

```javascript
import { Docuconvo } from 'docuconvo'

const docuconvo = new Docuconvo({
  docuconvo_key: 'your-docuconvo-key'
})

const { answer, message, error } = await docuconvo.search(searchQuery)
```

## Acknowledgments 
DocuConvo draws inspiration from the [BuilderIO/gpt-crawler](https://github.com/BuilderIO/gpt-crawler) project, GPT-Crawler focuses on crawling documentation websites to generate knowledge files for use with OpenAI assistants, DocuConvo takes it a step further by directly integrating the conversational search capability into the documentation website itself.

By combining the information retrieval capabilities of a web crawler with the natural language processing power of GPT-3.5, DocuConvo provides an immersive and interactive experience for users seeking information within documentation.

## Contributors
A big thank you to the following contributors who have played a significant role in the development of DocuConvo:
<a href="https://github.com/kunal00000/DocuConvo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kunal00000/DocuConvo" />
</a>
