import { createSignal } from 'solid-js';
import Header from './components/Header';
import ContentGenerator from './components/ContentGenerator';
import GeneratedContent from './components/GeneratedContent';
import { createEvent } from './supabaseClient';

function App() {
  const [generatedContent, setGeneratedContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGenerateContent = async (prompt) => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating content:', error);
      // يمكنك إضافة معالجة للأخطاء هنا
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="max-w-3xl mx-auto h-full flex flex-col">
        <Header />
        <div class="flex-1">
          <ContentGenerator onGenerate={handleGenerateContent} loading={loading} />
          <GeneratedContent content={generatedContent} />
        </div>
      </div>
    </div>
  );
}

export default App;