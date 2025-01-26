Endpoints:

Kimlik Doğrulama
POST /login
Açıklama: Kullanıcıyı doğrular ve bir oturum başlatır.
İstek Gövdesi: Kullanıcı adı ve parola içeren JSON nesnesi.
Yanıt: Başarılı olursa panoya yönlendirir, aksi takdirde bir hata mesajı döndürür.

Pano
GET /dashboard
Açıklama: Pano sayfasını sunar.
Yanıt: Panonun HTML içeriği.

Veri Alma
GET /situationData

Açıklama: Farklı şirketler için pazar payı verilerini alır.
Yanıt: Şirket adlarının ve pazar paylarının JSON dizisi.

GET /getData/:type

Açıklama: Belirtilen türe göre verileri alır.
URL Parametreleri: tür (örneğin, salesamount, sales_germany, sales_abroad, production_total, production_germany, production_abroad, incomeCosts, expense).
Yanıt: Belirtilen tür için JSON veri dizisi.

GET /getNames

Açıklama: Ayrı model adlarının bir listesini alır.
Yanıt: Model adlarının JSON dizisi.

GET /getSalesData

Açıklama: Belirli bir model için satış verilerini alır.
Sorgu Parametreleri: name (modelin adı).
Yanıt: Belirtilen model için satış verilerinin JSON dizisi.

GET /getEvNameData

Açıklama: Ayrı elektrikli araç (EV) model adlarının bir listesini alır.
Yanıt: EV model adlarının JSON dizisi.

GET /getEvData

Açıklama: Belirli bir EV modeli için satış verilerini alır.
Sorgu Parametreleri: name (EV modelinin adı).
Yanıt: Belirtilen EV modeli için satış verilerinin JSON dizisi.

GET /getFactories

Açıklama: Yıllık maliyetler dahil olmak üzere fabrika verilerini alır.
Sorgu Parametreleri: name (isteğe bağlı, fabrikanın adı).
Yanıt: Fabrika verilerinin JSON dizisi.

GET /getProd

Açıklama: Fabrikalar için üretim verilerini alır.
Sorgu Parametreleri: name (isteğe bağlı, fabrikanın adı).
Yanıt: Üretim verilerinin JSON dizisi.
