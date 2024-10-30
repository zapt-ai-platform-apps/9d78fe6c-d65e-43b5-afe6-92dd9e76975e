# منشئ محتوى ذكي باللغة العربية

## وصف التطبيق

"منشئ محتوى ذكي باللغة العربية" هو تطبيق ويب يساعدك على إنشاء محتوى نصي عربي عالي الجودة بسهولة وسرعة. يعتمد التطبيق على تقنيات الذكاء الاصطناعي لتوليد مقالات، قصص، قصائد، أو أي نوع آخر من المحتوى النصي بناءً على مدخلاتك.

## رحلات المستخدم

### 1. إنشاء محتوى جديد

**الخطوات:**

1. **فتح التطبيق:**

   - قم بزيارة التطبيق عبر متصفح الويب الخاص بك. ستظهر لك واجهة مستخدم بسيطة وجذابة تحتوي على حقل نصي وزر.

2. **إدخال الموضوع أو الوصف:**

   - في الحقل النصي المتاح، اكتب الموضوع أو الوصف الذي ترغب في توليد محتوى حوله.
   - مثال: "أهمية التكنولوجيا في التعليم الحديث" أو "قصيدة عن الطبيعة وجمالها".

3. **إنشاء المحتوى:**

   - اضغط على زر "إنشاء المحتوى".
   - سيظهر مؤشر تحميل لإعلامك بأن التطبيق يقوم بتوليد المحتوى.

4. **عرض المحتوى المولد:**

   - بعد اكتمال العملية، سيتم عرض المحتوى المولد أسفل الزر بشكل منسق وجميل.
   - يمكنك قراءة المحتوى، نسخه، أو حفظه للاستخدام الشخصي.

### 2. تعديل المدخلات وإعادة التوليد

**الخطوات:**

1. **تعديل النص المدخل:**

   - إذا لم تكن راضيًا عن المحتوى أو ترغب في تعديل الموضوع، قم بتحديث النص في الحقل النصي.

2. **إعادة إنشاء المحتوى:**

   - اضغط على زر "إنشاء المحتوى" مرة أخرى.
   - سيتم توليد محتوى جديد بناءً على المدخلات المحدثة.

## الخدمات الخارجية المستخدمة

- **OpenAI ChatGPT:**

  - يستخدم التطبيق خدمة OpenAI لتوليد المحتوى النصي بناءً على مدخلات المستخدم.

- **Sentry:**

  - يستخدم لمراقبة الأخطاء والأداء في التطبيق وتحسين تجربة المستخدم.

## المتغيرات البيئية المطلوبة (.env)

- `VITE_PUBLIC_APP_ID`: معرف التطبيق المستخدم في ZAPT.
- `VITE_PUBLIC_SENTRY_DSN`: مفتاح DSN الخاص بخدمة Sentry.
- `VITE_PUBLIC_APP_ENV`: بيئة التطبيق (مثل "development" أو "production").
- `PROJECT_ID`: معرف المشروع المستخدم لأغراض تسجيل الأخطاء في Sentry.
