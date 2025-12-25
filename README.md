# StackAlign 🛡️

### The Hallucination-Proof Tech Stack Finder for Cursor & Windsurf.

StackAlign helps you pick a tech stack that AI coding assistants (like Cursor, Windsurf, and ChatGPT) actually understand. We filter out "beta" libraries, breaking changes, and bleeding-edge tools to ensure LLMs can write perfect, hallucination-free code on the first try.

---

## 🚀 Features

### 🛡️ Hallucination-Proof
We only recommend libraries with high **AI Safety Scores**. This means the library has been around long enough for its documentation to be included in the training data of major LLMs (GPT-4, Claude 3.5 Sonnet).

### 🧠 Smart Context
Once you pick your stack, StackAlign generates a custom **System Context Prompt**. You can copy this prompt or download it as a `.cursorrules` file to instantly "teach" your AI editor how to write code for your specific project.

### ⚡ Strict Mode
Enable "Strict Mode" to aggressively filter out any library that has had major breaking changes in the last 6 months. This ensures maximum compatibility with AI models that might have a knowledge cutoff.

---

## 🛠️ Tech Stack

Built with the "Safe Stack" itself:
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix Primitives)
- **Language:** TypeScript
- **Icons:** Lucide React

---

## 🏁 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/stack-align.git
   cd stack-align
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to start finding your safe stack.

---

## 📄 License

MIT License. Feel free to use this code to build your own hallucination-proof projects.
