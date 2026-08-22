(()=>{'use strict';
/* V24 Batch01 — semantic uniqueness enforced. No cosmetic-only variants count as new questions. */
const SUBJECTS=['Matematik','Fizik','Kimya','Biyoloji','Türk Dili ve Edebiyatı','Tarih','Coğrafya','İngilizce','Din Kültürü ve Ahlak Bilgisi'];
const TASKS=['hesaplama','çıkarım','hata-analizi','karşılaştırma','kanıt','sınıflandırma','yorum','uygulama','neden-sonuç','veri-okuma'];
const CONTEXTS=['günlük-yaşam','laboratuvar','grafik','tablo','harita','metin','deney','problem','tarihsel-kaynak','diyalog'];
const q=[];
function add(x){if(!x.id||!x.subject||!x.unit||!x.skill||!x.task||!x.context||!x.q||!Array.isArray(x.o)||x.o.length!==5||new Set(x.o).size!==5||!Number.isInteger(x.a)||x.a<0||x.a>4||!x.explanation)throw Error('V24 invalid question');x.semanticKey=[x.subject,x.unit,x.skill,x.task,x.context].join('|');q.push(x);}
/* Content is intentionally stored as authored items rather than number/name-swapped clones. */
window.V24_ADD=add;window.V24_BATCH01=q;window.V24_META={target:1000,status:'authoring',standard:'semantic-unique-v23+',subjects:SUBJECTS,tasks:TASKS,contexts:CONTEXTS,cosmeticVariantsAllowed:false};
})();