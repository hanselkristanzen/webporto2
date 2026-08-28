import type { ResearchProject } from "../types/content";

export const nlpResearch: ResearchProject = {
  slug: "nlp-intent-classification",
  title:
    "Comparative Analysis of NLP Intent Classification in Indonesian Customer Service Chatbots",
  venue: "ICIMTech 2026",
  status: "Published",
  year: "2026",
  summary:
    "A benchmark of five intent-classification approaches on real Indonesian customer-service queries — comparing accuracy, inference speed, and robustness to noisy, informal language.",
  dataset: {
    size: 5292,
    intentCategories: 11,
    language: "Indonesian",
    characteristics: [
      "Slang",
      "Typos",
      "Indonesian–English code-mixing",
      "Noisy test data",
    ],
  },
  models: [
    {
      id: "rule-based",
      name: "Rule-Based Matching",
      shortName: "Rule-Based",
      methodology: "Keyword and pattern matching against a hand-written rule set.",
      accuracy: null,
      latencyMs: null,
      robustnessDropPp: null,
      note: "Reported as a baseline in the study; no accuracy, latency, or robustness figure was published for this method.",
    },
    {
      id: "rapidfuzz",
      name: "RapidFuzz",
      shortName: "RapidFuzz",
      methodology: "Fuzzy string matching against labeled intent phrases.",
      accuracy: 62.44,
      latencyMs: null,
      robustnessDropPp: null,
    },
    {
      id: "tfidf-svm",
      name: "TF-IDF + Linear SVM",
      shortName: "TF-IDF · SVM",
      methodology: "TF-IDF vectorization with a linear support vector classifier.",
      accuracy: 99.78,
      latencyMs: 0.57,
      robustnessDropPp: 5.11,
    },
    {
      id: "word2vec-mlp",
      name: "Word2Vec + MLP",
      shortName: "Word2Vec · MLP",
      methodology: "Word2Vec embeddings feeding a multilayer perceptron classifier.",
      accuracy: 97.89,
      latencyMs: null,
      robustnessDropPp: null,
    },
    {
      id: "indobert",
      name: "IndoBERT",
      shortName: "IndoBERT",
      methodology: "Fine-tuned IndoBERT transformer for sequence classification.",
      accuracy: 100.0,
      latencyMs: 18.77,
      robustnessDropPp: 7.56,
    },
  ],
};
