export type Lang = "en" | "fr" | "es" | "ar" | "zh";

export const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

type Dict = {
  nav: [string, string, string];
  badge: string; h1a: string; h1b: string; sub: string;
  placeholder: string; paste: string; download: string; fetching: string;
  ready: string; dlVideo: string; saveHint: string; save: string;
  howTitle: string; steps: [string, string][];
  featTitle: string; features: [string, string][];
  faqTitle: string; faqs: [string, string][];
  footer: string;
};

export const dict: Record<Lang, Dict> = {
  en: {
    nav: ["How it works", "Features", "FAQ"],
    badge: "Free · No watermark · HD", h1a: "RedNote Video Downloader", h1b: "without watermark",
    sub: "Paste a RedNote link and save the original video or photos in seconds.",
    placeholder: "Paste RedNote link here…", paste: "Paste", download: "Download", fetching: "Fetching…",
    ready: "Ready", dlVideo: "Download video (HD, no watermark)", saveHint: "If it opens in a player, right-click or long-press → Save video.", save: "Save",
    howTitle: "How it works",
    steps: [["Copy the link", "In RedNote, tap Share → Copy link on any video or photo post."], ["Paste it here", "Drop the link (or the whole shared text) into the box above."], ["Download", "Get the original HD file — clean, with no watermark."]],
    featTitle: "Why people use rednotosave",
    features: [["No watermark", "We fetch the original source file, not the stamped export."], ["HD quality", "Download videos in the best resolution available."], ["Photos too", "Save every image from carousel posts in one place."], ["Free & private", "No signup, no app, nothing stored on our side."]],
    faqTitle: "Questions",
    faqs: [["Is it free?", "Yes. Paste as many links as you like."], ["Which links work?", "xiaohongshu.com, xhslink.com and rednote.com post links, including shared text that contains a link."], ["Why did my link fail?", "The post may be private, deleted, or region-restricted. Try copying the link again."], ["Can I re-upload downloaded content?", "Please respect creators. Only download content for personal use or with permission."]],
    footer: "rednotosave is not affiliated with RedNote / Xiaohongshu. Please respect creators' rights.",
  },
  fr: {
    nav: ["Fonctionnement", "Avantages", "FAQ"],
    badge: "Gratuit · Sans filigrane · HD", h1a: "Téléchargeur de vidéos RedNote", h1b: "sans filigrane",
    sub: "Collez un lien RedNote et enregistrez la vidéo ou les photos originales en quelques secondes.",
    placeholder: "Collez le lien RedNote ici…", paste: "Coller", download: "Télécharger", fetching: "Chargement…",
    ready: "Prêt", dlVideo: "Télécharger la vidéo (HD, sans filigrane)", saveHint: "Si elle s'ouvre dans un lecteur, clic droit ou appui long → Enregistrer la vidéo.", save: "Enregistrer",
    howTitle: "Comment ça marche",
    steps: [["Copiez le lien", "Dans RedNote, touchez Partager → Copier le lien."], ["Collez-le ici", "Déposez le lien (ou tout le texte partagé) dans la case ci-dessus."], ["Téléchargez", "Obtenez le fichier HD original, sans filigrane."]],
    featTitle: "Pourquoi choisir rednotosave",
    features: [["Sans filigrane", "Nous récupérons le fichier source original."], ["Qualité HD", "Téléchargez dans la meilleure résolution disponible."], ["Photos aussi", "Enregistrez toutes les images des carrousels."], ["Gratuit et privé", "Sans inscription, sans application, rien n'est stocké."]],
    faqTitle: "Questions",
    faqs: [["Est-ce gratuit ?", "Oui. Collez autant de liens que vous voulez."], ["Quels liens fonctionnent ?", "Les liens xiaohongshu.com, xhslink.com et rednote.com, y compris le texte partagé contenant un lien."], ["Pourquoi mon lien a échoué ?", "La publication est peut-être privée, supprimée ou limitée par région. Recopiez le lien."], ["Puis-je republier le contenu ?", "Respectez les créateurs. Usage personnel ou avec permission uniquement."]],
    footer: "rednotosave n'est pas affilié à RedNote / Xiaohongshu. Respectez les droits des créateurs.",
  },
  es: {
    nav: ["Cómo funciona", "Ventajas", "Preguntas"],
    badge: "Gratis · Sin marca de agua · HD", h1a: "Descargador de videos de RedNote", h1b: "sin marca de agua",
    sub: "Pega un enlace de RedNote y guarda el video o las fotos originales en segundos.",
    placeholder: "Pega el enlace de RedNote aquí…", paste: "Pegar", download: "Descargar", fetching: "Buscando…",
    ready: "Listo", dlVideo: "Descargar video (HD, sin marca de agua)", saveHint: "Si se abre en un reproductor, clic derecho o mantén pulsado → Guardar video.", save: "Guardar",
    howTitle: "Cómo funciona",
    steps: [["Copia el enlace", "En RedNote, toca Compartir → Copiar enlace."], ["Pégalo aquí", "Pon el enlace (o todo el texto compartido) en la caja de arriba."], ["Descarga", "Obtén el archivo HD original, limpio y sin marca de agua."]],
    featTitle: "Por qué usar rednotosave",
    features: [["Sin marca de agua", "Obtenemos el archivo original."], ["Calidad HD", "Descarga en la mejor resolución disponible."], ["También fotos", "Guarda todas las imágenes de los carruseles."], ["Gratis y privado", "Sin registro, sin app, no guardamos nada."]],
    faqTitle: "Preguntas",
    faqs: [["¿Es gratis?", "Sí. Pega todos los enlaces que quieras."], ["¿Qué enlaces funcionan?", "Enlaces de xiaohongshu.com, xhslink.com y rednote.com, incluso texto compartido con un enlace."], ["¿Por qué falló mi enlace?", "La publicación puede ser privada, eliminada o restringida por región. Copia el enlace de nuevo."], ["¿Puedo volver a publicar el contenido?", "Respeta a los creadores. Solo para uso personal o con permiso."]],
    footer: "rednotosave no está afiliado a RedNote / Xiaohongshu. Respeta los derechos de los creadores.",
  },
  ar: {
    nav: ["طريقة العمل", "المميزات", "الأسئلة"],
    badge: "مجاني · بدون علامة مائية · HD", h1a: "تحميل فيديوهات RedNote", h1b: "بدون علامة مائية",
    sub: "الصق رابط RedNote واحفظ الفيديو أو الصور الأصلية في ثوانٍ.",
    placeholder: "الصق رابط RedNote هنا…", paste: "لصق", download: "تحميل", fetching: "جارٍ الجلب…",
    ready: "جاهز", dlVideo: "تحميل الفيديو (HD، بدون علامة مائية)", saveHint: "إذا فُتح في مشغّل، انقر بزر الفأرة الأيمن أو اضغط مطولاً ← حفظ الفيديو.", save: "حفظ",
    howTitle: "طريقة العمل",
    steps: [["انسخ الرابط", "في RedNote، اضغط مشاركة ← نسخ الرابط."], ["الصقه هنا", "ضع الرابط (أو النص المشارك كاملاً) في المربع أعلاه."], ["حمّل", "احصل على الملف الأصلي بجودة HD بدون علامة مائية."]],
    featTitle: "لماذا يستخدم الناس rednotosave",
    features: [["بدون علامة مائية", "نجلب الملف الأصلي وليس النسخة المختومة."], ["جودة HD", "حمّل الفيديو بأفضل دقة متاحة."], ["الصور أيضاً", "احفظ كل صور المنشورات في مكان واحد."], ["مجاني وخاص", "بدون تسجيل أو تطبيق، ولا نخزّن شيئاً."]],
    faqTitle: "أسئلة شائعة",
    faqs: [["هل هو مجاني؟", "نعم. الصق أي عدد من الروابط."], ["ما الروابط المدعومة؟", "روابط xiaohongshu.com و xhslink.com و rednote.com، بما في ذلك النص المشارك الذي يحتوي على رابط."], ["لماذا فشل الرابط؟", "قد يكون المنشور خاصاً أو محذوفاً أو مقيداً جغرافياً. جرّب نسخ الرابط مجدداً."], ["هل يمكنني إعادة نشر المحتوى؟", "احترم صناع المحتوى. للاستخدام الشخصي فقط أو بإذن."]],
    footer: "rednotosave غير تابع لـ RedNote / Xiaohongshu. يرجى احترام حقوق صناع المحتوى.",
  },
  zh: {
    nav: ["使用方法", "功能", "常见问题"],
    badge: "免费 · 无水印 · 高清", h1a: "小红书视频下载器", h1b: "无水印",
    sub: "粘贴小红书链接，几秒内保存原始视频或图片。",
    placeholder: "在此粘贴小红书链接…", paste: "粘贴", download: "下载", fetching: "获取中…",
    ready: "已就绪", dlVideo: "下载视频（高清，无水印）", saveHint: "如果在播放器中打开，请右键或长按 → 保存视频。", save: "保存",
    howTitle: "使用方法",
    steps: [["复制链接", "在小红书中点击 分享 → 复制链接。"], ["粘贴到这里", "将链接（或整段分享文字）粘贴到上方输入框。"], ["下载", "获取无水印的高清原始文件。"]],
    featTitle: "为什么选择 rednotosave",
    features: [["无水印", "获取原始文件，而非带水印的导出版本。"], ["高清画质", "以最高可用分辨率下载视频。"], ["支持图片", "一次保存图文笔记中的所有图片。"], ["免费且私密", "无需注册或安装，不保存任何内容。"]],
    faqTitle: "常见问题",
    faqs: [["免费吗？", "是的，链接数量不限。"], ["支持哪些链接？", "xiaohongshu.com、xhslink.com 和 rednote.com 的笔记链接，以及包含链接的分享文字。"], ["为什么链接失败？", "笔记可能是私密、已删除或有地区限制。请重新复制链接。"], ["可以转载下载的内容吗？", "请尊重创作者，仅限个人使用或获得授权后使用。"]],
    footer: "rednotosave 与小红书 / RedNote 无关联。请尊重创作者权利。",
  },
};
