import { createEffect, Show, createSignal } from 'solid-js';
import { useContent } from '../ContentContext';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';
import { useNavigate } from '@solidjs/router';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';

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
  const [audioUrl, setAudioUrl] = createSignal('');
  const [isProcessingAudio, setIsProcessingAudio] = createSignal(false);
  const [isCopying, setIsCopying] = createSignal(false);
  const [isDownloading, setIsDownloading] = createSignal(false);
  const [isRegenerating, setIsRegenerating] = createSignal(false);

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

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(generatedContent());
    } catch (error) {
      console.error('Error copying content:', error);
    } finally {
      setIsCopying(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [new Paragraph(generatedContent())],
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${contentType()} - ${prompt().substring(0, 20)}.docx`);
    } catch (error) {
      console.error('Error downloading content:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleListen = async () => {
    setIsProcessingAudio(true);
    try {
      const result = await createEvent('text_to_speech', {
        text: generatedContent(),
      });
      setAudioUrl(result);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsProcessingAudio(false);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      setGeneratedContent('');
      setAudioUrl('');
      setLoading(true);
      const aiPrompt = `اكتب ${contentType()} حول الموضوع التالي: "${prompt()}".
      
الرجاء التأكد من أن المحتوى مكتوب باحترافية عالية دون أخطاء لغوية وبأسلوب جذاب وبتنسيق احترافي.`;
      const result = await createEvent('chatgpt_request', {
        prompt: aiPrompt,
        response_type: 'text',
      });
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error regenerating content:', error);
    } finally {
      setLoading(false);
      setIsRegenerating(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div class="flex-1 flex flex-col items-center justify-center w-full">
      <Show when={loading()}>
        <div class="text-center text-lg text-primary">يتم الآن إنشاء المحتوى...</div>
      </Show>
      <Show when={!loading() && generatedContent()}>
        <div class="flex flex-col items-center w-full space-y-4">
          <div class="flex space-x-2">
            <button
              onClick={handleBack}
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              الرجوع
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading()}
              class={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                isDownloading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isDownloading() ? 'جاري التحميل...' : 'التحميل'}
            </button>
            <button
              onClick={handleCopy}
              disabled={isCopying()}
              class={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                isCopying() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isCopying() ? 'جاري النسخ...' : 'نسخ'}
            </button>
            <button
              onClick={handleListen}
              disabled={isProcessingAudio()}
              class={`px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                isProcessingAudio() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isProcessingAudio() ? 'جارٍ المعالجة...' : 'استماع'}
            </button>
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating()}
              class={`px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                isRegenerating() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isRegenerating() ? 'جارٍ إعادة الإنشاء...' : 'إعادة الإنشاء'}
            </button>
          </div>
          <div class="mt-4 bg-white p-6 rounded-lg shadow-md overflow-auto w-full">
            <SolidMarkdown children={generatedContent()} />
          </div>
          <Show when={audioUrl()}>
            <div class="mt-4">
              <audio controls src={audioUrl()} class="w-full" />
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default GeneratedContent;