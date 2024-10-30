import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function App() {
  const [prompt, setPrompt] = createSignal('');
  const [generatedContent, setGeneratedContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGenerateContent = async () => {
    if (!prompt()) return;
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: prompt(),
        response_type: 'text'
      });
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating content:', error);
      // Optionally handle error, e.g., show a message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="max-w-3xl mx-auto h-full flex flex-col">
        <h1 class="text-4xl font-bold mb-8 text-center text-purple-600">منشئ محتوى ذكي باللغة العربية</h1>
        <div class="flex-1">
          <div class="mb-4">
            <textarea
              placeholder="اكتب وصفًا أو موضوعًا للحصول على محتوى"
              value={prompt()}
              onInput={(e) => setPrompt(e.target.value)}
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-right"
              rows="5"
            />
          </div>
          <button
            onClick={handleGenerateContent}
            disabled={loading()}
            class={`w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading() ? 'يتم الآن إنشاء المحتوى...' : 'إنشاء المحتوى'}
          </button>
        </div>
        <Show when={generatedContent()}>
          <div class="mt-8 bg-white p-6 rounded-lg shadow-md overflow-auto">
            <SolidMarkdown children={generatedContent()} />
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;