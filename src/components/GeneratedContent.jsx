import { Show } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';

function GeneratedContent({ content }) {
  return (
    <Show when={content}>
      <div class="mt-8 bg-white p-6 rounded-lg shadow-md overflow-auto">
        <SolidMarkdown children={content} />
      </div>
    </Show>
  );
}

export default GeneratedContent;