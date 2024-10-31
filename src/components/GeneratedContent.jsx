import { createEffect, Show, createSignal } from 'solid-js';
import { useContent } from '../ContentContext';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';
import { useNavigate } from '@solidjs/router';
import { saveAs } from 'file-saver';
import { Packer, Document, Paragraph } from 'docx';

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

  // الحالة الخاصة بالأزرار الجديدة
  const [audioUrl, setAudioUrl] = createSignal('');
  const [audioLoading, setAudioLoading] = createSignal(false);
  const [regenerating, setRegenerating] = createSignal(false);
  let audioRef;

  createEffect(() => {
    if (!prompt()) {
      // إذا لم يكن هناك مدخل، قم بإعادة التوجيه إلى الصفحة الرئيسية
      navigate('/');
      return;
    }

    generateContent();
  });

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

  createEffect(() => {
    if (audioUrl() && audioRef) {
      audioRef.play();
    }
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent()).then(
      () => {
        alert('تم نسخ المحتوى إلى الحافظة!');
      },
      (err) => {
        console.error('Error copying text: ', err);
      }
    );
  };

  const handleDownload = async () => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(generatedContent())],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'المحتوى.docx');
  };

  const handleListen = async () => {
    setAudioLoading(true);
    try {
      const result = await createEvent('text_to_speech', {
        text: generatedContent(),
      });
      setAudioUrl(result);
    } catch (error) {
      console.error('Error converting text to speech:', error);
    } finally {
      setAudioLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    await generateContent();
    setRegenerating(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div class="flex-1 flex flex-col items-center justify-center">
      <Show when={loading()}>
        <div class="text-center text-lg text-primary">يتم الآن إنشاء المحتوى...</div>
      </Show>
      <Show when={!loading() && generatedContent()}>
        <div class="flex flex-col items-center">
          <div class="flex space-x-2 mb-4">
            <button
              onClick={handleBack}
              class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              الرجوع
            </button>
            <button
              onClick={handleDownload}
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              التحميل
            </button>
            <button
              onClick={handleCopy}
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              نسخ
            </button>
            <button
              onClick={handleListen}
              disabled={audioLoading()}
              class={`px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                audioLoading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {audioLoading() ? 'جاري التحويل...' : 'استماع'}
            </button>
            <button
              onClick={handleRegenerate}
              disabled={regenerating()}
              class={`px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                regenerating() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {regenerating() ? 'جاري إعادة الإنشاء...' : 'إعادة الإنشاء'}
            </button>
          </div>

          <div class="mt-4 bg-white p-6 rounded-lg shadow-md overflow-auto w-full">
            <SolidMarkdown children={generatedContent()} />
          </div>

          <Show when={audioUrl()}>
            <div class="mt-4 w-full">
              <audio
                ref={(el) => (audioRef = el)}
                controls
                src={audioUrl()}
                class="w-full"
              />
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default GeneratedContent;