import { createEffect, Show } from 'solid-js';
import { useContent } from '../ContentContext';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';
import { useNavigate } from '@solidjs/router';

function GeneratedContent() {
  const {
    prompt,
    contentType,
    generatedContent,
    setGeneratedContent,
    loading,
    setLoading,
  } = useContent();
  const navigate = useNavigate();

  createEffect(() => {
    if (!prompt()) {
      // إذا لم يكن هناك مدخل، قم بإعادة التوجيه إلى الصفحة الرئيسية
      navigate('/');
      return;
    }

    const generateContent = async () => {
      setLoading(true);
      try {
        const aiPrompt = `اكتب ${contentType()} حول الموضوع التالي: "${prompt()}".

الرجاء التأكد من أن المحتوى مكتوب باحترافية عالية دون أخطاء لغوية وبأسلوب جذاب وبتنسيق احترافي.`;
        const result = await createEvent('chatgpt_request', {
          prompt: aiPrompt,
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

    generateContent();
  });

  return (
    <div class="flex-1 flex flex-col items-center justify-center">
      <Show when={loading()}>
        <div class="text-center text-lg text-primary">يتم الآن إنشاء المحتوى...</div>
      </Show>
      <Show when={!loading() && generatedContent()}>
        <div class="mt-8 bg-white p-6 rounded-lg shadow-md overflow-auto w-full">
          <SolidMarkdown children={generatedContent()} />
        </div>
      </Show>
    </div>
  );
}

export default GeneratedContent;