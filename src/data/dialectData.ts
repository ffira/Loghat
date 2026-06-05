import { DialectEntry, QuizQuestion, SurvivalPhrase, Badge } from '../types';

const STATIC_DIALECT_ENTRIES: DialectEntry[] = [
  // Logat Utara (Northern - Kedah/Penang/Perlis/Perak)
  {
    id: 'nord-01',
    word_name: 'Ketegaq',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Kedah',
    standard_bm_equivalent: 'Degil / Keras Kepala',
    english_equivalent: 'Stubborn / Obstinate',
    context_of_use: 'Slang',
    explanation: 'Used to describe someone who refuses to listen to advice or change their mind. Commonly said by parents to children.',
    example_sentence: 'Awat hang ni ketegaq sangat? Orang suruh buat kerja, dia main game.',
    verified_status: true,
    upvote_count: 142,
  },
  {
    id: 'nord-02',
    word_name: 'Loqlaq',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Penang',
    standard_bm_equivalent: 'Kelakuan tidak sopan / comot',
    english_equivalent: 'Bad-mannered / Unruly / Sloppy',
    context_of_use: 'Slang',
    explanation: 'Refers to someone whose behavior is sloppy, eccentric, or lacking in social manners.',
    example_sentence: 'Jangan dok loqlaq sangat kat depan orang tua-tua tu, jaga perangai sikit.',
    verified_status: true,
    upvote_count: 98,
  },
  {
    id: 'nord-03',
    word_name: 'Ghaqbaq',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Perlis',
    standard_bm_equivalent: 'Sangat bersepah / kacau-bilau',
    english_equivalent: 'Messy / Total Chaos',
    context_of_use: 'Slang',
    explanation: 'Used to describe a highly cluttered space, a messy situation, or a disaster-like state.',
    example_sentence: 'Bilik tidur hang ni awat ghaqbaq sangat macam tongkang pecah?',
    verified_status: true,
    upvote_count: 73,
  },
  {
    id: 'nord-04',
    word_name: 'Nawa',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Kedah',
    standard_bm_equivalent: 'Berbohong / Karut',
    english_equivalent: 'To lie / Bluff / Tell tall tales',
    context_of_use: 'Slang',
    explanation: 'An old Northern slang meaning to make up stories or exaggerate falsehoods to deceive someone.',
    example_sentence: 'Hang jangan dok nawa kami la, mana ada hantu siang-siang hari!',
    verified_status: true,
    upvote_count: 65,
  },
  {
    id: 'nord-05',
    word_name: 'Kekwat',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Penang',
    standard_bm_equivalent: 'Kerek / Sombong',
    english_equivalent: 'Arrogant / Snobbish',
    context_of_use: 'Insult',
    explanation: 'Describes a haughty, snobbish posture, often behaving cold and selective with response.',
    example_sentence: 'Kekwat sungguh minah tu sejak pakai beg berjenama mewah.',
    verified_status: true,
    upvote_count: 82,
  },
  {
    id: 'nord-06',
    word_name: 'Cenonot',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Kedah',
    standard_bm_equivalent: 'Sangat kecil / Kecil molek',
    english_equivalent: 'Tiny / Highly compact',
    context_of_use: 'Endearment',
    explanation: 'A Northern adjective describing something or someone remarkably tiny, petite, or young.',
    example_sentence: 'Cenonot saja budak tu tapi lari laju mengalahkan atlet sekolah.',
    verified_status: true,
    upvote_count: 51,
  },
  {
    id: 'nord-07',
    word_name: 'Keleboq',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Perak',
    standard_bm_equivalent: 'Lumpur lekit padat',
    english_equivalent: 'Deep squelching mud',
    context_of_use: 'Slang',
    explanation: 'Used in Perak and Kedah, it describes deep, sticky paddy mud or wet silt that traps vehicles or feet.',
    example_sentence: 'Tayar moto aku terbenam dalam keleboq semalam sampai kena tolak ramai-ramai.',
    verified_status: true,
    upvote_count: 91,
  },
  {
    id: 'nord-08',
    word_name: 'Ghemba',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Perak',
    standard_bm_equivalent: 'Merayau tanpa tujuan',
    english_equivalent: 'To wander around aimlessly',
    context_of_use: 'Slang',
    explanation: 'A Perak dialect term meaning to walk or drive around without a fixed plan or destination, wasting fuel.',
    example_sentence: 'Kome berjalan ghemba satu bandar Ipoh tak bosan ke cari kedai makan?',
    verified_status: true,
    upvote_count: 42,
  },
  {
    id: 'nord-09',
    word_name: 'Hambat',
    primary_language: 'Malay',
    dialect_type: 'Logat Utara',
    state_origin: 'Kedah',
    standard_bm_equivalent: 'Kejar',
    english_equivalent: 'To chase after / Pursue',
    context_of_use: 'Slang',
    explanation: 'Northern expression commonly used when chasing after an escaping person, animal, or time limit.',
    example_sentence: 'Cepat sikit berkemas! Kena hambat bas kilang nanti tertinggal susah kita.',
    verified_status: true,
    upvote_count: 79,
  },

  // Kelantanese (Kelantan)
  {
    id: 'kel-01',
    word_name: 'Bekwoh',
    primary_language: 'Malay',
    dialect_type: 'Kelantanese',
    state_origin: 'Kelantan',
    standard_bm_equivalent: 'Kenduri / Pesta Makan Besar',
    english_equivalent: 'Feast / Big banquet / Feast for community gathering',
    context_of_use: 'Formal',
    explanation: 'Derived from the English phrase "big work". It refers to cooking and holding a community gathering or wedding feast.',
    example_sentence: 'Kampung kawan ada bekwoh esok, pakat maghi belaka makan nasi gulai.',
    verified_status: true,
    upvote_count: 215,
  },
  {
    id: 'kel-02',
    word_name: 'Gelenya',
    primary_language: 'Malay',
    dialect_type: 'Kelantanese',
    state_origin: 'Kelantan',
    standard_bm_equivalent: 'Gatal / Mengada-ngada',
    english_equivalent: 'Flirtatious / Overly attention-seeking',
    context_of_use: 'Insult',
    explanation: 'Usually used to label someone acting excessively flirtatious, hyperactive, or restless in a socially annoying way.',
    example_sentence: 'Menggeliat gelenya sungguh budak tu bila nampak abang motor hensem.',
    verified_status: true,
    upvote_count: 110,
  },
  {
    id: 'kel-03',
    word_name: 'Tebeng',
    primary_language: 'Malay',
    dialect_type: 'Kelantanese',
    state_origin: 'Kelantan',
    standard_bm_equivalent: 'Memaksa diri / Gigih',
    english_equivalent: 'To push through / Persist stubbornly',
    context_of_use: 'Slang',
    explanation: 'A deeply expressive Kelantan term meaning to force oneself to complete a task despite feeling sick, tired, or having insufficient resources.',
    example_sentence: 'Ambo tebeng jugak paksa diri hadir kuliah sebab hari ni exam penting.',
    verified_status: true,
    upvote_count: 134,
  },
  {
    id: 'kel-04',
    word_name: 'Gaha',
    primary_language: 'Malay',
    dialect_type: 'Kelantanese',
    state_origin: 'Kelantan',
    standard_bm_equivalent: 'Sental kuat-kuat',
    english_equivalent: 'To scrub vigorously and heavily',
    context_of_use: 'Slang',
    explanation: 'Means to physically scrub a surface, like heavy black soot off local wok, with intense mechanical effort.',
    example_sentence: 'Gaha kail kuali tu biar bersih berkilat balik baru cerah dapo.',
    verified_status: true,
    upvote_count: 89,
  },
  {
    id: 'kel-05',
    word_name: 'Gocoh',
    primary_language: 'Malay',
    dialect_type: 'Kelantanese',
    state_origin: 'Kelantan',
    standard_bm_equivalent: 'Bergaduh / Bertumbuk',
    english_equivalent: 'To engage in a physical fight / Brawl',
    context_of_use: 'Insult',
    explanation: 'Highly regional word for physical scuffles, wrestling, or punching matches among youngsters.',
    example_sentence: 'Pakak pakak lari gi tengok dua budak loni tengah gocoh di sebalik bendang.',
    verified_status: true,
    upvote_count: 95,
  },
  {
    id: 'kel-06',
    word_name: 'Sengoti',
    primary_language: 'Malay',
    dialect_type: 'Kelantanese',
    state_origin: 'Kelantan',
    standard_bm_equivalent: 'Sungguh-sungguh / Benar sekali',
    english_equivalent: 'Seriously / Truly / Unto truth',
    context_of_use: 'Endearment',
    explanation: 'Used to add maximum weight and sincerity to a statement, signifying absolute, genuine truth.',
    example_sentence: 'Ambo saye ko demo sengoti ni, buke main-main acuh sajo.',
    verified_status: true,
    upvote_count: 167,
  },

  // Terengganu
  {
    id: 'ganu-01',
    word_name: 'Gu',
    primary_language: 'Malay',
    dialect_type: 'Terengganu',
    state_origin: 'Terengganu',
    standard_bm_equivalent: 'Kawan rapat / Rakan seiring',
    english_equivalent: 'Close Friend / Buddy / Mate',
    context_of_use: 'Endearment',
    explanation: 'Term used to call a loyal peer, running partner, or friend. "Gu" forms the word "regu" (pair/team).',
    example_sentence: 'Mung ni memang gu aku dunia akhirat, sanggup tolong masa susah.',
    verified_status: true,
    upvote_count: 124,
  },
  {
    id: 'ganu-02',
    word_name: 'Kehek',
    primary_language: 'Malay',
    dialect_type: 'Terengganu',
    state_origin: 'Terengganu',
    standard_bm_equivalent: 'Meluahkan kembali',
    english_equivalent: 'To disgustedly spit out food or bones',
    context_of_use: 'Slang',
    explanation: 'An onomatopoeic Terengganu colloquialism describing the spitting out of bad food or objects back from the mouth.',
    example_sentence: 'Adik kehek balik ikan tu sebab banyak sangat tulang halus tajam gila.',
    verified_status: true,
    upvote_count: 88,
  },
  {
    id: 'ganu-03',
    word_name: 'Dokung',
    primary_language: 'Malay',
    dialect_type: 'Terengganu',
    state_origin: 'Terengganu',
    standard_bm_equivalent: 'Gendong / Dukung',
    english_equivalent: 'To carry on the back or waist',
    context_of_use: 'Formal',
    explanation: 'Local phonetic variation of supporting a child on your hip or back while carrying them around.',
    example_sentence: 'Masa heret raga kain basah, mak kena dokung adik yang sedang merengek.',
    verified_status: true,
    upvote_count: 71,
  },
  {
    id: 'ganu-04',
    word_name: 'Sura',
    primary_language: 'Malay',
    dialect_type: 'Terengganu',
    state_origin: 'Terengganu',
    standard_bm_equivalent: 'Bubur Asyura / Jamuan bubur lambuk',
    english_equivalent: 'Traditional sweet porridge community feast',
    context_of_use: 'Formal',
    explanation: 'Terengganu cultural custom of cooking sweet multi-ingredient porridge during Muharram, requiring long hours of community giant pot stirring.',
    example_sentence: 'Pakat ghamai-ghamai kacau sura dekat balai ghaya petang semalang.',
    verified_status: true,
    upvote_count: 94,
  },

  // Negeri Sembilan
  {
    id: 'n9-01',
    word_name: 'Ekau',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Kamu / Awak',
    english_equivalent: 'You',
    context_of_use: 'Formal',
    explanation: 'Standard local pronoun for "you" in the Minangkabau-descended dialect of Negeri Sembilan.',
    example_sentence: 'Ekau nak poei mano rondang-rondang ghayo ni?',
    verified_status: true,
    upvote_count: 89,
  },
  {
    id: 'n9-02',
    word_name: 'Nyangko',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Menyangka / Sangka',
    english_equivalent: 'To expect / Assume / Guess',
    context_of_use: 'Slang',
    explanation: 'Expresses disbelief or surprise that something turned out differently than initially guessed or expected.',
    example_sentence: 'Den tak nyangko dio nak balik kampung copek bona.',
    verified_status: true,
    upvote_count: 61,
  },
  {
    id: 'n9-03',
    word_name: 'Menselet',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Menyelinap / Mencelah masuk',
    english_equivalent: 'To squeeze through silently / Sneak through',
    context_of_use: 'Slang',
    explanation: 'Minangkabau-descended slang for squeezing through tightly-guarded spaces or sneakily sliding past narrow pathways.',
    example_sentence: 'Den tengok lipas tu menselet celah almari dapo copek bona tak sompat hambat.',
    verified_status: true,
    upvote_count: 76,
  },
  {
    id: 'n9-04',
    word_name: 'Melahu',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Melepak kosong / Buang masa',
    english_equivalent: 'Loitering or wasting time aimlessly',
    context_of_use: 'Insult',
    explanation: 'Describes sitting idly under shade, bus stops, or on motorcycles doing absolutely zero productive chores.',
    example_sentence: 'Daripada kamu melahu bona bawah pondok tu, elok poei bantu mak ekau kupas kelapo.',
    verified_status: true,
    upvote_count: 83,
  },

  // Melaka
  {
    id: 'mlk-01',
    word_name: 'Hawau',
    primary_language: 'Malay',
    dialect_type: 'Melaka',
    state_origin: 'Melaka',
    standard_bm_equivalent: 'Exclamation of surprise or anger (like Haram Jadah)',
    english_equivalent: 'Darn / Outrageous / Exclamation',
    context_of_use: 'Slang',
    explanation: 'A unique Melaka exclamation that can signify surprise, annoyance, or playful insult depending on the tone of delivery.',
    example_sentence: 'Hawau betul budak tu, dia curi mangga jiran sebelah rumah!',
    verified_status: true,
    upvote_count: 110,
  },
  {
    id: 'mlk-02',
    word_name: 'Melahu',
    primary_language: 'Malay',
    dialect_type: 'Melaka',
    state_origin: 'Melaka',
    standard_bm_equivalent: 'Melepak / Malas-malasan',
    english_equivalent: 'Loafing around / Loitering / Idle',
    context_of_use: 'Slang',
    explanation: 'Used to describe someone who is idling around, wasting time, or behaving extremely lazily instead of working.',
    example_sentence: 'Kau ni tak habis-habis melahu tepi surau, pergilah tapau makanan!',
    verified_status: true,
    upvote_count: 75,
  },

  // Pahang
  {
    id: 'phg-01',
    word_name: 'Kome',
    primary_language: 'Malay',
    dialect_type: 'Pahang',
    state_origin: 'Pahang',
    standard_bm_equivalent: 'Kami / Anda semua',
    english_equivalent: 'We / Us / You all',
    context_of_use: 'Formal',
    explanation: 'A signature Pahang river valley pronoun representing "we" or "you all" depending on context, used warmly in conversation.',
    example_sentence: 'Kome nak pergi memancing kat Sungai Pahang ke petang ni?',
    verified_status: true,
    upvote_count: 125,
  },
  {
    id: 'phg-02',
    word_name: 'Melenyut',
    primary_language: 'Malay',
    dialect_type: 'Pahang',
    state_origin: 'Pahang',
    standard_bm_equivalent: 'Lencun / Sangat basah',
    english_equivalent: 'Soggily wet / Drenched',
    context_of_use: 'Slang',
    explanation: 'Used to describe objects or clothes that are completely drenched or soaked through in water or heavy rain.',
    example_sentence: 'Habis lencun melenyut kain sidai kat jemuran sebab hujan lebat semalam.',
    verified_status: true,
    upvote_count: 82,
  },

  // Sarawakan (Sarawak)
  {
    id: 'swk-01',
    word_name: 'Kamek',
    primary_language: 'Malay',
    dialect_type: 'Sarawakian',
    state_origin: 'Sarawak',
    standard_bm_equivalent: 'Saya',
    english_equivalent: 'I / Me',
    context_of_use: 'Formal',
    explanation: 'The ubiquitous Sarawakian Malay pronoun for the first person singular (I or me). Very polite and endearing.',
    example_sentence: 'Kamek maok nangga kucing comel polah kitak ya.',
    verified_status: true,
    upvote_count: 178,
  },
  {
    id: 'swk-02',
    word_name: 'Nyaman',
    primary_language: 'Malay',
    dialect_type: 'Sarawakian',
    state_origin: 'Sarawak',
    standard_bm_equivalent: 'Sedap / Lazat',
    english_equivalent: 'Delicious / Tasty',
    context_of_use: 'Slang',
    explanation: 'While "nyaman" in standard Malay means comfortable, in Sarawakian and Sabahan it exclusively means delicious in reference to food.',
    example_sentence: 'Nasi goreng Sarawak tok nang nyaman gilak ooo!',
    verified_status: true,
    upvote_count: 156,
  },
  {
    id: 'swk-03',
    word_name: 'Polah',
    primary_language: 'Malay',
    dialect_type: 'Sarawakian',
    state_origin: 'Sarawak',
    standard_bm_equivalent: 'Buat / Lakukan',
    english_equivalent: 'To create / Make / Do',
    context_of_use: 'Formal',
    explanation: 'The standard verb in Sarawakian Malay used for creating things, preparing food, or carrying out activities.',
    example_sentence: 'Kitak polah apa di bilik ya? Jom kita turun tapau mee kolok nyaman.',
    verified_status: true,
    upvote_count: 112,
  },
  {
    id: 'swk-04',
    word_name: 'Gerek',
    primary_language: 'Malay',
    dialect_type: 'Sarawakian',
    state_origin: 'Sarawak',
    standard_bm_equivalent: 'Kekasih / Pacar',
    english_equivalent: 'Boyfriend / Girlfriend / Romantic partner',
    context_of_use: 'Endearment',
    explanation: 'An exceptionally sweet and widespread Sarawakian terminology representing one\'s partner in love.',
    example_sentence: 'Kacak na gerek baru kitak ya, bila maok kahwin kamek nak datang makan.',
    verified_status: true,
    upvote_count: 145,
  },
  {
    id: 'swk-05',
    word_name: 'Garit',
    primary_language: 'Malay',
    dialect_type: 'Sarawakian',
    state_origin: 'Sarawak',
    standard_bm_equivalent: 'Gatal / Hyperaktif',
    english_equivalent: 'Restless / Flirtatious / Hyperactive',
    context_of_use: 'Insult',
    explanation: 'Commonly said when a child or a person is showing restless, hyperactive energy or excessive social flirtations.',
    example_sentence: 'Jangan dok garit rami-rami sangat celah urang tua ya, simpan kacak sikit.',
    verified_status: true,
    upvote_count: 67,
  },

  // Sabahan (Sabah)
  {
    id: 'sbh-01',
    word_name: 'Bah',
    primary_language: 'Malay',
    dialect_type: 'Sabahan',
    state_origin: 'Sabah',
    standard_bm_equivalent: 'Ya / Baiklah / Jom (Penguat ayat)',
    english_equivalent: 'Sure / Let\'s go / Okay (Universal sentence softener & filler)',
    context_of_use: 'Slang',
    explanation: 'The mother of all Sabahan slang. It serves as agreement, invitation, exclamation, or a final filler and punctuation mark.',
    example_sentence: 'Bah, petang ni kita pigi minum kopi di kedai ah.',
    verified_status: true,
    upvote_count: 289,
  },
  {
    id: 'sbh-02',
    word_name: 'Aramaitii',
    primary_language: 'Malay',
    dialect_type: 'Sabahan',
    state_origin: 'Sabah',
    standard_bm_equivalent: 'Mari berseronok / Minum bersama',
    english_equivalent: 'Cheers / Let\'s party / A toast to good times',
    context_of_use: 'Slang',
    explanation: 'Originally a Dusun word meaning "noisy and fun", it is now universally used in Sabah to call friends to celebrate or raise a drink together.',
    example_sentence: 'Siring jalan ada pesta ramama! Bah, aramaitii kawan!',
    verified_status: true,
    upvote_count: 194,
  },
  {
    id: 'sbh-03',
    word_name: 'Limpar',
    primary_language: 'Malay',
    dialect_type: 'Sabahan',
    state_origin: 'Sabah',
    standard_bm_equivalent: 'Baling / Lempar',
    english_equivalent: 'To fling / Throw across space',
    context_of_use: 'Slang',
    explanation: 'A vigorous Sabahan verb for flinging stones, trash, or objects away.',
    example_sentence: 'Kau limpar saja tu botol kosong dalam tong sampah di seberang sana.',
    verified_status: true,
    upvote_count: 98,
  },
  {
    id: 'sbh-04',
    word_name: 'Sumandak',
    primary_language: 'Malay',
    dialect_type: 'Sabahan',
    state_origin: 'Sabah',
    standard_bm_equivalent: 'Awek / Gadis manis',
    english_equivalent: 'Beautiful young Sabahan lady',
    context_of_use: 'Endearment',
    explanation: 'Borrowed from Kadazan-Dusun, universally loved to praise the grace and beauty of young local women.',
    example_sentence: 'Sumandak Sabah memang cantik-cantik belaka dengan baju tradisi hitam keemasan.',
    verified_status: true,
    upvote_count: 172,
  },
  {
    id: 'sbh-05',
    word_name: 'Gigila',
    primary_language: 'Malay',
    dialect_type: 'Sabahan',
    state_origin: 'Sabah',
    standard_bm_equivalent: 'Geli ati / Melucukan',
    english_equivalent: 'Ticklish / Highly hilarious / Funny',
    context_of_use: 'Slang',
    explanation: 'Describes something incredibly funny or ticklish that makes you burst out in fits of giggles.',
    example_sentence: 'Lawak dia tu gigila betul bah, sampai sakit perut kawan ketawa siring jalan!',
    verified_status: true,
    upvote_count: 104,
  },

  // Manglish (Malaysian English)
  {
    id: 'mng-01',
    word_name: 'Gostan',
    primary_language: 'English',
    dialect_type: 'Manglish',
    state_origin: 'Selangor',
    standard_bm_equivalent: 'undur kenderaan',
    english_equivalent: 'To reverse a car or drive backwards',
    context_of_use: 'Slang',
    explanation: 'Derived from ancient maritime nautical English "go astern", modified over decades into Malaysian slang meaning to back up.',
    example_sentence: 'Bro, gostan a bit can or not? You block my gate already lah.',
    verified_status: true,
    upvote_count: 230,
  },
  {
    id: 'mng-02',
    word_name: 'Tapau',
    primary_language: 'Chinese',
    dialect_type: 'Manglish',
    state_origin: 'Kuala Lumpur',
    standard_bm_equivalent: 'Bungkus makanan / Bawa balik',
    english_equivalent: 'To pack food / Takeout',
    context_of_use: 'Slang',
    explanation: 'From Cantonese "da bao" meaning to pack up food. Used universally across all ethnicities in Malaysia.',
    example_sentence: 'I don\'t want to eat at the Mamak, I just tapau maggi goreng back home.',
    verified_status: true,
    upvote_count: 264,
  },
  {
    id: 'mng-03',
    word_name: 'Belanja',
    primary_language: 'Malay',
    dialect_type: 'Manglish',
    state_origin: 'Federal Territory',
    standard_bm_equivalent: 'Membayar untuk orang lain',
    english_equivalent: 'To treat someone to a meal/drink',
    context_of_use: 'Endearment',
    explanation: 'Generous Malaysian culture trait. Direct translation is "shop", but in slang, it means taking care of the bill for someone else.',
    example_sentence: 'Walao, today you got increment is it? Go belanja us teh tarik now lah!',
    verified_status: true,
    upvote_count: 185,
  },
  {
    id: 'mng-04',
    word_name: 'Abuden',
    primary_language: 'English',
    dialect_type: 'Manglish',
    state_origin: 'Kuala Lumpur',
    standard_bm_equivalent: 'Ah sudah tentu / Sarkastik "Mestilah"',
    english_equivalent: 'Sarcastic obvious reply ("Duh")',
    context_of_use: 'Slang',
    explanation: 'Used to mock someone who asks an extremely obvious question whose answer is sitting right in front of them.',
    example_sentence: 'A: "You eating spicy food ah?" B: "Abuden? Look at my plate full of chillies!"',
    verified_status: true,
    upvote_count: 144,
  },
  {
    id: 'mng-05',
    word_name: 'Cincai',
    primary_language: 'Chinese',
    dialect_type: 'Manglish',
    state_origin: 'Johor',
    standard_bm_equivalent: 'Ikut suka / Sambil lewa',
    english_equivalent: 'Anyhow / Whichever goes / Indiscriminate',
    context_of_use: 'Slang',
    explanation: 'Cantonese-derived, used to express easy-going acceptance of any food, plan, or style choice without fussing.',
    example_sentence: 'Nevermind lah, you choose the cafe, I cincai any food also can.',
    verified_status: true,
    upvote_count: 195,
  },
  {
    id: 'mng-06',
    word_name: 'Machan',
    primary_language: 'Tamil',
    dialect_type: 'Manglish',
    state_origin: 'Selangor',
    standard_bm_equivalent: 'Kawan / Bro / Abang ipar',
    english_equivalent: 'Close friend / Buddy / Dude',
    context_of_use: 'Endearment',
    explanation: 'Tamil for brother-in-law, universally accepted in Malaysia as a loyal dude or companion of any race.',
    example_sentence: 'Machan, tonight got big screen screening of football at Mamak stall?',
    verified_status: true,
    upvote_count: 176,
  },
  {
    id: 'mng-07',
    word_name: 'Kantang',
    primary_language: 'Malay',
    dialect_type: 'Manglish',
    state_origin: 'Johor',
    standard_bm_equivalent: 'Pelat barat / English kentang',
    english_equivalent: 'Highly localized accented Western English',
    context_of_use: 'Slang',
    explanation: 'Humorous term comparing spoken English to a western "potato" (kentang) diet; used when speaking in heavy western accents or showing off.',
    example_sentence: 'Dia tu borak kantang sangat, sampai orang kampung pun garu kepala.',
    verified_status: true,
    upvote_count: 121,
  },
  {
    id: 'mng-08',
    word_name: 'Walao',
    primary_language: 'Chinese',
    dialect_type: 'Manglish',
    state_origin: 'Kuala Lumpur',
    standard_bm_equivalent: 'Wah gila! / Amboi (Impression)',
    english_equivalent: 'Astounding / Wow / Good heavens!',
    context_of_use: 'Slang',
    explanation: 'Hokkien exclamation to vent utter disbelief, amazement, or heavy shock at an event or fact.',
    example_sentence: 'Walao eh! The parking rate at KLCC today is so expensive until I want to write a letter!',
    verified_status: true,
    upvote_count: 188,
  },
  {
    id: 'mng-09',
    word_name: 'Boskur',
    primary_language: 'Malay',
    dialect_type: 'Manglish',
    state_origin: 'Federal Territory',
    standard_bm_equivalent: 'Kawan rapat / My Boss / Bossku',
    english_equivalent: 'Bro / Champ / Chief / My Boss',
    context_of_use: 'Endearment',
    explanation: 'Slightly stylized combination of "Boss" and "Ku", universally modern slang of respect, street camaraderie, and trust.',
    example_sentence: 'Jom boskur, sembang teh tarik satu gelas dulu baru cerita ni projek.',
    verified_status: true,
    upvote_count: 153,
  },

  // Penang Hokkien (Chinese Malay Influence)
  {
    id: 'hok-01',
    word_name: 'Kaypoh',
    primary_language: 'Chinese',
    dialect_type: 'Penang Hokkien',
    state_origin: 'Penang',
    standard_bm_equivalent: 'Menyibuk / Ambil tahu hal orang',
    english_equivalent: 'Busybody / Nosey person',
    context_of_use: 'Insult',
    explanation: 'Derived from Hokkien Chinese (家婆). Usually used to tell off a meddler who snoops into private personal affairs.',
    example_sentence: 'Don\'t be so kaypoh can or not? This one is my private matter lah.',
    verified_status: true,
    upvote_count: 198,
  },
  {
    id: 'hok-02',
    word_name: 'Kiasi',
    primary_language: 'Chinese',
    dialect_type: 'Penang Hokkien',
    state_origin: 'Penang',
    standard_bm_equivalent: 'Takut mati / Takut kalah',
    english_equivalent: 'Afraid of dying / Overly cautious and risk-averse',
    context_of_use: 'Slang',
    explanation: 'Derived from Chinese (怕死). Describes the typical mindset of extreme caution, following strict rules, or being afraid of missing out.',
    example_sentence: 'He brought three extra umbrellas just in case of drizzle. Extremely kiasi!',
    verified_status: true,
    upvote_count: 147,
  },
  {
    id: 'hok-03',
    word_name: 'Bo-chup',
    primary_language: 'Chinese',
    dialect_type: 'Penang Hokkien',
    state_origin: 'Malacca',
    standard_bm_equivalent: 'Acuh tak acuh / Malas layan',
    english_equivalent: 'Indifferent / Couldn\'t care less / Nonchalant',
    context_of_use: 'Slang',
    explanation: 'Derived from Hokkien meaning to completely ignore a situation or show zero concerns about an ongoing problem.',
    example_sentence: 'The boss is very angry but she just bo-chup and kept scrolling her phone.',
    verified_status: true,
    upvote_count: 119,
  },
  {
    id: 'hok-04',
    word_name: 'Kiasu',
    primary_language: 'Chinese',
    dialect_type: 'Penang Hokkien',
    state_origin: 'Penang',
    standard_bm_equivalent: 'Sikap takut kalah / Hendak menang selalu',
    english_equivalent: 'Fear of losing / Overly competitive and FOMO',
    context_of_use: 'Slang',
    explanation: 'Derived from Chinese (怕输). Highlights the cultural complex of wanting to be first, grabbing freebies, or rushing ahead to avoid missing out.',
    example_sentence: 'She queued for six hours just to get a free mug. Super kiasu behavior!',
    verified_status: true,
    upvote_count: 151,
  },
  {
    id: 'hok-05',
    word_name: 'Limteh',
    primary_language: 'Chinese',
    dialect_type: 'Penang Hokkien',
    state_origin: 'Penang',
    standard_bm_equivalent: 'Minum teh / Lepak kedai kopi',
    english_equivalent: 'To drink tea / Socialize at a kopitiam',
    context_of_use: 'Endearment',
    explanation: 'Hokkien word (喝茶) used by all races to suggest grabbing a tea, coffee, or relaxing over conversations.',
    example_sentence: 'Already 5 PM, let\'s go limteh nearby to refresh our brains and relax.',
    verified_status: true,
    upvote_count: 162,
  },
  // Johor Additions
  {
    id: 'joh-01',
    word_name: 'Kepeng',
    primary_language: 'Malay',
    dialect_type: 'Johor',
    state_origin: 'Johor',
    standard_bm_equivalent: 'Duit Syiling / Wang kecil',
    english_equivalent: 'Coins / Small change',
    context_of_use: 'Slang',
    explanation: 'A classic Johorean word for money, especially coins or small change.',
    example_sentence: 'Ada kepeng lebih tak? Nak bayar parking dekat Bandar Baru Uda ni.',
    verified_status: true,
    upvote_count: 85,
  },
  {
    id: 'joh-02',
    word_name: 'Gerek',
    primary_language: 'Malay',
    dialect_type: 'Johor',
    state_origin: 'Johor',
    standard_bm_equivalent: 'Basikal',
    english_equivalent: 'Bicycle',
    context_of_use: 'Slang',
    explanation: 'Used in Johor and parts of the North to refer to a bicycle.',
    example_sentence: 'Aku kayuh gerek pergi kedai runcit depan jalan tu tadi.',
    verified_status: true,
    upvote_count: 94,
  },
  {
    id: 'joh-03',
    word_name: 'Kememeh',
    primary_language: 'Malay',
    dialect_type: 'Johor',
    state_origin: 'Johor',
    standard_bm_equivalent: 'Cepat menangis / Cengeng',
    english_equivalent: 'Crybaby / Easily tears up',
    context_of_use: 'Slang',
    explanation: 'Used to describe a child or person who cries very easily over small matters.',
    example_sentence: 'Budak tu kememeh betul, kena usik sikit dengan abang dia dah melalak.',
    verified_status: true,
    upvote_count: 73,
  },
  {
    id: 'joh-04',
    word_name: 'Bonggo',
    primary_language: 'Malay',
    dialect_type: 'Johor',
    state_origin: 'Johor',
    standard_bm_equivalent: 'Angkuh / Berlagak',
    english_equivalent: 'Arrogant / Snobbish',
    context_of_use: 'Insult',
    explanation: 'Southern slang describing someone who acts conceited, superior, or arrogant.',
    example_sentence: 'Jangan la bonggo sangat dengan kawan lama, dulu kita belajar sekali.',
    verified_status: true,
    upvote_count: 62,
  },

  // Negeri Sembilan Additions
  {
    id: 'n9-05',
    word_name: 'Ghabak',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Sangat buruk / Rosak teruk',
    english_equivalent: 'Dilapidated / Severely damaged',
    context_of_use: 'Slang',
    explanation: 'Negeri Sembilan slang for something in a very bad, broken, or ruined state.',
    example_sentence: 'Kereta dio ghabak kemalangan lobuh raya kelmarin, memang tak boleh baiki dah.',
    verified_status: true,
    upvote_count: 91,
  },
  {
    id: 'n9-06',
    word_name: 'Kocang',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Goncang / Kacau',
    english_equivalent: 'To shake / Disturb',
    context_of_use: 'Slang',
    explanation: 'Means to shake up a liquid or create a disturbance/shake things up.',
    example_sentence: 'Jangan dok kocang tong air tu, nanti mendak teh kat bawah naik balik.',
    verified_status: true,
    upvote_count: 68,
  },
  {
    id: 'n9-07',
    word_name: 'Polobeh',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Melebih-lebih / Sengaja tokok tambah',
    english_equivalent: 'To exaggerate / Overdo',
    context_of_use: 'Insult',
    explanation: 'Used to call out someone who is exaggerating a story or overacting a situation.',
    example_sentence: 'Cerita ekau tu polobeh bona, mana ado buaya darat nak makan sayur.',
    verified_status: true,
    upvote_count: 77,
  },
  {
    id: 'n9-08',
    word_name: 'Podot',
    primary_language: 'Malay',
    dialect_type: 'Negeri Sembilan',
    state_origin: 'Negeri Sembilan',
    standard_bm_equivalent: 'Menyumbat / Mengisi padat',
    english_equivalent: 'To stuff tightly / Pack fully',
    context_of_use: 'Slang',
    explanation: 'Refers to stuffing objects or clothes tightly into a small space or container.',
    example_sentence: 'Dio podot baju-baju tu celah beg sampai nak pecah zip dio den tengok.',
    verified_status: true,
    upvote_count: 82,
  },

  // Perlis Additions
  {
    id: 'per-01',
    word_name: 'Kelolo',
    primary_language: 'Malay',
    dialect_type: 'Perlis',
    state_origin: 'Perlis',
    standard_bm_equivalent: 'Kelakuan melucukan / Buat perangai pelik',
    english_equivalent: 'Comical / Acting silly or eccentric',
    context_of_use: 'Slang',
    explanation: 'Describes silly, comical, or attention-grabbing behaviour that is slightly improper but funny.',
    example_sentence: 'Hang jangan dok kelolo sangat kat sini, depan pak mertua jaga perangai sikit.',
    verified_status: true,
    upvote_count: 89,
  },
  {
    id: 'per-02',
    word_name: 'Teghey',
    primary_language: 'Malay',
    dialect_type: 'Perlis',
    state_origin: 'Perlis',
    standard_bm_equivalent: 'Cuba / Test',
    english_equivalent: 'To try / Attempt',
    context_of_use: 'Slang',
    explanation: 'A highly regional Northern/Perlis slang meaning to try out something new, like food or a vehicle.',
    example_sentence: 'Teghey la makan mangga Harumanis ni, manis melenting ooo!',
    verified_status: true,
    upvote_count: 95,
  },
  {
    id: 'per-03',
    word_name: 'Sengap',
    primary_language: 'Malay',
    dialect_type: 'Perlis',
    state_origin: 'Perlis',
    standard_bm_equivalent: 'Diam / Senyap sunyi',
    english_equivalent: 'Be quiet / Silence',
    context_of_use: 'Formal',
    explanation: 'A regional variation of senyap, meaning to keep quiet or stay silent.',
    example_sentence: 'Sengap sat semua orang, cikgu nak bagitahu keputusan exam ni.',
    verified_status: true,
    upvote_count: 76,
  },
  {
    id: 'per-04',
    word_name: 'Kola',
    primary_language: 'Malay',
    dialect_type: 'Perlis',
    state_origin: 'Perlis',
    standard_bm_equivalent: 'Tali air / Parit sawah',
    english_equivalent: 'Irrigation canal / Paddy trench',
    context_of_use: 'Slang',
    explanation: 'Refers to the small water trenches or irrigation canals running through the rice fields.',
    example_sentence: 'Adik tergelincir masuk dalam kola semalam masa kejar kucing jiran.',
    verified_status: true,
    upvote_count: 83,
  },

  // Pahang Additions
  {
    id: 'phg-03',
    word_name: 'Jabir',
    primary_language: 'Malay',
    dialect_type: 'Pahang',
    state_origin: 'Pahang',
    standard_bm_equivalent: 'Beg plastik / Plastik bungkus',
    english_equivalent: 'Plastic bag',
    context_of_use: 'Slang',
    explanation: 'A classic Pahang slang term for any plastic bag or carrier bag.',
    example_sentence: 'Tolong ambilkan jabir kat dapo tu, nak letak barang basah beli kat pekan.',
    verified_status: true,
    upvote_count: 112,
  },
  {
    id: 'phg-04',
    word_name: 'Mengekel',
    primary_language: 'Malay',
    dialect_type: 'Pahang',
    state_origin: 'Pahang',
    standard_bm_equivalent: 'Ketawa terbahak-bahak',
    english_equivalent: 'Laughing heartily / Giggling uncontrollably',
    context_of_use: 'Slang',
    explanation: 'Pahang river valley term describing laughing intensely or giggling uncontrollably at a joke.',
    example_sentence: 'Kome pakat mengekel dengar cerita lawak jenaka mat motor tu petang tadi.',
    verified_status: true,
    upvote_count: 98,
  },
  {
    id: 'phg-05',
    word_name: 'Kupik',
    primary_language: 'Malay',
    dialect_type: 'Pahang',
    state_origin: 'Pahang',
    standard_bm_equivalent: 'Kedekut / Kikir',
    english_equivalent: 'Stingy / Miserly',
    context_of_use: 'Insult',
    explanation: 'Used to describe someone who is extremely stingy or unwilling to spend money.',
    example_sentence: 'Kupik sungguh kawan tu, mintak belanja teh tarik pun berkira sangat.',
    verified_status: true,
    upvote_count: 81,
  },
  {
    id: 'phg-06',
    word_name: 'Sepo',
    primary_language: 'Malay',
    dialect_type: 'Pahang',
    state_origin: 'Pahang',
    standard_bm_equivalent: 'Sentuh secara tidak sengaja / Pegang tipis',
    english_equivalent: 'To touch lightly / Brush against',
    context_of_use: 'Slang',
    explanation: 'Refers to touching or brushing against something very lightly, often leaving a smudge.',
    example_sentence: 'Jangan sepo cermin tingkap tu, baru semalam mak sapu lap bersih.',
    verified_status: true,
    upvote_count: 70,
  },

  // Kuala Lumpur Additions
  {
    id: 'kl-01',
    word_name: 'Kerek',
    primary_language: 'Malay',
    dialect_type: 'Kuala Lumpur',
    state_origin: 'Kuala Lumpur',
    standard_bm_equivalent: 'Sombong / Berlagak',
    english_equivalent: 'Snobbish / Show-off',
    context_of_use: 'Insult',
    explanation: 'Urban KL slang for someone showing a haughty, arrogant, or snobbish attitude.',
    example_sentence: 'Muka dia kerek gila bila lalu depan kita, macam tak pernah kenal pulak.',
    verified_status: true,
    upvote_count: 121,
  },
  {
    id: 'kl-02',
    word_name: 'Koyak',
    primary_language: 'Malay',
    dialect_type: 'Kuala Lumpur',
    state_origin: 'Kuala Lumpur',
    standard_bm_equivalent: 'Terlalu kecewa / Tekanan mental',
    english_equivalent: 'Mental breakdown / Tilted / Stressed out',
    context_of_use: 'Slang',
    explanation: 'Widely used in modern urban speech to describe a person who breaks down under stress, criticism, or teasing.',
    example_sentence: 'Pemain pertahanan tu dah koyak gila kena ejek dengan penyokong lawan.',
    verified_status: true,
    upvote_count: 140,
  },
  {
    id: 'kl-03',
    word_name: 'Kaut',
    primary_language: 'Malay',
    dialect_type: 'Kuala Lumpur',
    state_origin: 'Kuala Lumpur',
    standard_bm_equivalent: 'Mengambil kesempatan / Untung berlebihan',
    english_equivalent: 'To reap huge profits / Exploit a situation',
    context_of_use: 'Slang',
    explanation: 'KL business/street slang meaning to capture or scoop up massive profits, sometimes selfishly.',
    example_sentence: 'Banyak kedai kaut untung kaw-kaw masa musim perayaan kat area Bukit Bintang.',
    verified_status: true,
    upvote_count: 105,
  },
  {
    id: 'kl-04',
    word_name: 'Kantoi',
    primary_language: 'Malay',
    dialect_type: 'Kuala Lumpur',
    state_origin: 'Kuala Lumpur',
    standard_bm_equivalent: 'Tertangkap basah / Rahsia pecah',
    english_equivalent: 'Caught red-handed / Exposed',
    context_of_use: 'Slang',
    explanation: 'Urban term for being caught in the act of doing something wrong or having a secret exposed.',
    example_sentence: 'Dia kantoi ponteng sekolah semalam sebab tersua dengan cikgu disiplin kat mall.',
    verified_status: true,
    upvote_count: 153,
  },

  // Melaka Additions
  {
    id: 'mlk-03',
    word_name: 'Lahabau',
    primary_language: 'Malay',
    dialect_type: 'Melaka',
    state_origin: 'Melaka',
    standard_bm_equivalent: 'Gelaran mesra kawan rapat / Exclamation',
    english_equivalent: 'Dude (highly informal) / Sarcastic term of endearment',
    context_of_use: 'Endearment',
    explanation: 'A double-edged Melaka slang. It can be a heavy insult or a term of absolute camaraderie among close friends.',
    example_sentence: 'Apa khabar lahabau? Lama kian tak dengar cerita kau pi mana!',
    verified_status: true,
    upvote_count: 165,
  },
  {
    id: 'mlk-04',
    word_name: 'Gelemer',
    primary_language: 'Malay',
    dialect_type: 'Melaka',
    state_origin: 'Melaka',
    standard_bm_equivalent: 'Comot / Kotor berlendir',
    english_equivalent: 'Messy / Slimy or sticky dirt',
    context_of_use: 'Slang',
    explanation: 'Describes a messy state of stickiness, grease, or slime, often on children\'s hands after eating sweets.',
    example_sentence: 'Tangan budak kecik tu gelemer sangat pas makan aiskrim mangga Klebang.',
    verified_status: true,
    upvote_count: 88,
  },
  {
    id: 'mlk-05',
    word_name: 'Humban',
    primary_language: 'Malay',
    dialect_type: 'Melaka',
    state_origin: 'Melaka',
    standard_bm_equivalent: 'Baling kuat-kuat / Campak',
    english_equivalent: 'To fling with force / Throw away aggressively',
    context_of_use: 'Slang',
    explanation: 'Melaka word meaning to throw or fling an object with significant force.',
    example_sentence: 'Kau humban saja plastik sampah busuk tu masuk dalam raga besar luar.',
    verified_status: true,
    upvote_count: 110,
  },
  {
    id: 'mlk-06',
    word_name: 'Kobut',
    primary_language: 'Malay',
    dialect_type: 'Melaka',
    state_origin: 'Melaka',
    standard_bm_equivalent: 'Sangat berhabuk / Berdebu tebal',
    english_equivalent: 'Extremely dusty',
    context_of_use: 'Slang',
    explanation: 'Describes an area or furniture that is covered in a thick layer of dust or lint.',
    example_sentence: 'Bilik stor bawah tangga tu kobut betul, bersin-bersin aku dibuatnya.',
    verified_status: true,
    upvote_count: 94,
  }
];

// Base word pool for procedural accent generation
interface BaseWord {
  word: string;
  bm_eq: string;
  en_eq: string;
}

const COMMON_BASE_WORDS: BaseWord[] = [
  { word: "Makan", bm_eq: "Makan", en_eq: "to eat" },
  { word: "Minum", bm_eq: "Minum", en_eq: "to drink" },
  { word: "Tidur", bm_eq: "Tidur", en_eq: "to sleep" },
  { word: "Jalan", bm_eq: "Jalan", en_eq: "to walk" },
  { word: "Pergi", bm_eq: "Pergi", en_eq: "to go" },
  { word: "Sini", bm_eq: "Sini", en_eq: "here" },
  { word: "Sana", bm_eq: "Sana", en_eq: "there" },
  { word: "Siapa", bm_eq: "Siapa", en_eq: "who" },
  { word: "Mana", bm_eq: "Mana", en_eq: "where" },
  { word: "Apa", bm_eq: "Apa", en_eq: "what" },
  { word: "Kecil", bm_eq: "Kecil", en_eq: "small" },
  { word: "Besar", bm_eq: "Besar", en_eq: "big" },
  { word: "Panas", bm_eq: "Panas", en_eq: "hot" },
  { word: "Sejuk", bm_eq: "Sejuk", en_eq: "cold" },
  { word: "Lapar", bm_eq: "Lapar", en_eq: "hungry" },
  { word: "Kenyang", bm_eq: "Kenyang", en_eq: "full" },
  { word: "Cantik", bm_eq: "Cantik", en_eq: "beautiful" },
  { word: "Bising", bm_eq: "Bising", en_eq: "noisy" },
  { word: "Senyap", bm_eq: "Senyap", en_eq: "quiet" },
  { word: "Laju", bm_eq: "Laju", en_eq: "fast" },
  { word: "Lambat", bm_eq: "Lambat", en_eq: "slow" },
  { word: "Bosan", bm_eq: "Bosan", en_eq: "bored" },
  { word: "Gembira", bm_eq: "Gembira", en_eq: "happy" },
  { word: "Sedih", bm_eq: "Sedih", en_eq: "sad" },
  { word: "Takut", bm_eq: "Takut", en_eq: "scared" },
  { word: "Berani", bm_eq: "Berani", en_eq: "brave" },
  { word: "Mahal", bm_eq: "Mahal", en_eq: "expensive" },
  { word: "Murah", bm_eq: "Murah", en_eq: "cheap" },
  { word: "Banyak", bm_eq: "Banyak", en_eq: "many" },
  { word: "Sikit", bm_eq: "Sikit", en_eq: "a little" },
  { word: "Semua", bm_eq: "Semua", en_eq: "all" },
  { word: "Satu", bm_eq: "Satu", en_eq: "one" },
  { word: "Dua", bm_eq: "Dua", en_eq: "two" },
  { word: "Tiga", bm_eq: "Tiga", en_eq: "three" },
  { word: "Empat", bm_eq: "Empat", en_eq: "four" },
  { word: "Lima", bm_eq: "Lima", en_eq: "five" },
  { word: "Kucing", bm_eq: "Kucing", en_eq: "cat" },
  { word: "Burung", bm_eq: "Burung", en_eq: "bird" },
  { word: "Ikan", bm_eq: "Ikan", en_eq: "fish" },
  { word: "Air", bm_eq: "Air", en_eq: "water" },
  { word: "Nasi", bm_eq: "Nasi", en_eq: "rice" },
  { word: "Gula", bm_eq: "Gula", en_eq: "sugar" },
  { word: "Garam", bm_eq: "Garam", en_eq: "salt" },
  { word: "Pedas", bm_eq: "Pedas", en_eq: "spicy" },
  { word: "Manis", bm_eq: "Manis", en_eq: "sweet" },
  { word: "Masin", bm_eq: "Masin", en_eq: "salty" },
  { word: "Tawar", bm_eq: "Tawar", en_eq: "tasteless" },
  { word: "Masam", bm_eq: "Masam", en_eq: "sour" },
  { word: "Pahit", bm_eq: "Pahit", en_eq: "bitter" },
  { word: "Panjat", bm_eq: "Panjat", en_eq: "to climb" },
  { word: "Lompat", bm_eq: "Lompat", en_eq: "to jump" },
  { word: "Lari", bm_eq: "Lari", en_eq: "to run" },
  { word: "Baling", bm_eq: "Baling", en_eq: "to throw" },
  { word: "Sepak", bm_eq: "Sepak", en_eq: "to kick" },
  { word: "Pukul", bm_eq: "Pukul", en_eq: "to hit" },
  { word: "Tolak", bm_eq: "Tolak", en_eq: "to push" },
  { word: "Tarik", bm_eq: "Tarik", en_eq: "to pull" },
  { word: "Buka", bm_eq: "Buka", en_eq: "to open" },
  { word: "Tutup", bm_eq: "Tutup", en_eq: "to close" },
  { word: "Baharu", bm_eq: "Baharu", en_eq: "new" },
  { word: "Lama", bm_eq: "Lama", en_eq: "old (object)" },
  { word: "Tua", bm_eq: "Tua", en_eq: "old" },
  { word: "Muda", bm_eq: "Muda", en_eq: "young" },
  { word: "Kanan", bm_eq: "Kanan", en_eq: "right" },
  { word: "Kiri", bm_eq: "Kiri", en_eq: "left" },
  { word: "Atas", bm_eq: "Atas", en_eq: "above" },
  { word: "Bawah", bm_eq: "Bawah", en_eq: "below" },
  { word: "Dalam", bm_eq: "Dalam", en_eq: "inside" },
  { word: "Luar", bm_eq: "Luar", en_eq: "outside" },
  { word: "Basah", bm_eq: "Basah", en_eq: "wet" },
  { word: "Kering", bm_eq: "Kering", en_eq: "dry" },
  { word: "Keras", bm_eq: "Keras", en_eq: "hard" },
  { word: "Lembut", bm_eq: "Lembut", en_eq: "soft" },
  { word: "Berat", bm_eq: "Berat", en_eq: "heavy" },
  { word: "Ringan", bm_eq: "Ringan", en_eq: "light" },
  { word: "Lebat", bm_eq: "Lebat", en_eq: "heavy (rain)" },
  { word: "Gelap", bm_eq: "Gelap", en_eq: "dark" },
  { word: "Terang", bm_eq: "Terang", en_eq: "bright" },
  { word: "Rumah", bm_eq: "Rumah", en_eq: "house" },
  { word: "Kedai", bm_eq: "Kedai", en_eq: "shop" },
  { word: "Bandar", bm_eq: "Bandar", en_eq: "city" },
  { word: "Kampung", bm_eq: "Kampung", en_eq: "village" },
  { word: "Sungai", bm_eq: "Sungai", en_eq: "river" },
  { word: "Bukit", bm_eq: "Bukit", en_eq: "hill" },
  { word: "Hutan", bm_eq: "Hutan", en_eq: "forest" },
  { word: "Hujan", bm_eq: "Hujan", en_eq: "rain" },
  { word: "Angin", bm_eq: "Angin", en_eq: "wind" },
  { word: "Malam", bm_eq: "Malam", en_eq: "night" },
  { word: "Siang", bm_eq: "Siang", en_eq: "day" },
  { word: "Pagi", bm_eq: "Pagi", en_eq: "morning" },
  { word: "Petang", bm_eq: "Petang", en_eq: "evening" },
  { word: "Kawan", bm_eq: "Kawan", en_eq: "friend" },
  { word: "Musuh", bm_eq: "Musuh", en_eq: "enemy" },
  { word: "Budak", bm_eq: "Budak", en_eq: "kid" },
  { word: "Orang", bm_eq: "Orang", en_eq: "people" },
  { word: "Lelaki", bm_eq: "Lelaki", en_eq: "man" },
  { word: "Perempuan", bm_eq: "Perempuan", en_eq: "woman" },
  { word: "Ayah", bm_eq: "Ayah", en_eq: "father" },
  { word: "Emak", bm_eq: "Emak", en_eq: "mother" },
  { word: "Abang", bm_eq: "Abang", en_eq: "brother" },
  { word: "Kakak", bm_eq: "Kakak", en_eq: "sister" },
  { word: "Adik", bm_eq: "Adik", en_eq: "sibling" },
  { word: "Datuk", bm_eq: "Datuk", en_eq: "grandfather" },
  { word: "Nenek", bm_eq: "Nenek", en_eq: "grandmother" },
  { word: "Cikgu", bm_eq: "Cikgu", en_eq: "teacher" },
  { word: "Kerja", bm_eq: "Kerja", en_eq: "work" },
  { word: "Main", bm_eq: "Main", en_eq: "play" },
  { word: "Belajar", bm_eq: "Belajar", en_eq: "study" },
  { word: "Membaca", bm_eq: "Membaca", en_eq: "read" },
  { word: "Menulis", bm_eq: "Menulis", en_eq: "write" },
  { word: "Mendengar", bm_eq: "Mendengar", en_eq: "listen" },
  { word: "Melihat", bm_eq: "Melihat", en_eq: "see" },
  { word: "Bercakap", bm_eq: "Bercakap", en_eq: "speak" },
  { word: "Ketawa", bm_eq: "Ketawa", en_eq: "laugh" },
  { word: "Menangis", bm_eq: "Menangis", en_eq: "cry" },
  { word: "Marah", bm_eq: "Marah", en_eq: "angry" },
  { word: "Malu", bm_eq: "Malu", en_eq: "shy" },
  { word: "Sakit", bm_eq: "Sakit", en_eq: "sick" },
  { word: "Letih", bm_eq: "Letih", en_eq: "tired" },
  { word: "Kuat", bm_eq: "Kuat", en_eq: "strong" },
  { word: "Bersih", bm_eq: "Bersih", en_eq: "clean" },
  { word: "Kotor", bm_eq: "Kotor", en_eq: "dirty" },
  { word: "Wangi", bm_eq: "Wangi", en_eq: "fragrant" },
  { word: "Busuk", bm_eq: "Busuk", en_eq: "smelly" },
  { word: "Panjang", bm_eq: "Panjang", en_eq: "long" },
  { word: "Pendek", bm_eq: "Pendek", en_eq: "short (length)" },
  { word: "Tinggi", bm_eq: "Tinggi", en_eq: "tall" },
  { word: "Rendah", bm_eq: "Rendah", en_eq: "short (height)" },
  { word: "Dekat", bm_eq: "Dekat", en_eq: "near" },
  { word: "Jauh", bm_eq: "Jauh", en_eq: "far" },
  { word: "Betul", bm_eq: "Betul", en_eq: "correct" },
  { word: "Salah", bm_eq: "Salah", en_eq: "wrong" },
  { word: "Mudah", bm_eq: "Mudah", en_eq: "easy" },
  { word: "Susah", bm_eq: "Susah", en_eq: "difficult" },
  { word: "Penuh", bm_eq: "Penuh", en_eq: "full" },
  { word: "Kosong", bm_eq: "Kosong", en_eq: "empty" },
  { word: "Sapu", bm_eq: "Sapu", en_eq: "to sweep" },
  { word: "Basuh", bm_eq: "Basuh", en_eq: "to wash" },
  { word: "Masak", bm_eq: "Masak", en_eq: "to cook" },
  { word: "Potong", bm_eq: "Potong", en_eq: "to cut" },
  { word: "Tanam", bm_eq: "Tanam", en_eq: "to plant" },
  { word: "Cari", bm_eq: "Cari", en_eq: "to search" },
  { word: "Simpan", bm_eq: "Simpan", en_eq: "to keep" },
  { word: "Korek", bm_eq: "Korek", en_eq: "to dig" },
  { word: "Kutip", bm_eq: "Kutip", en_eq: "to collect" },
  { word: "Bakar", bm_eq: "Bakar", en_eq: "to burn" },
  { word: "Rebus", bm_eq: "Rebus", en_eq: "to boil" },
  { word: "Goreng", bm_eq: "Goreng", en_eq: "to fry" },
  { word: "Kukus", bm_eq: "Kukus", en_eq: "to steam" },
  { word: "Gunting", bm_eq: "Gunting", en_eq: "to cut / shear" },
  { word: "Pintu", bm_eq: "Pintu", en_eq: "door" },
  { word: "Tingkap", bm_eq: "Tingkap", en_eq: "window" },
  { word: "Kereta", bm_eq: "Kereta", en_eq: "car" },
  { word: "Lampu", bm_eq: "Lampu", en_eq: "light / lamp" },
  { word: "Buku", bm_eq: "Buku", en_eq: "book" },
  { word: "Pensel", bm_eq: "Pensel", en_eq: "pencil" },
  { word: "Meja", bm_eq: "Meja", en_eq: "table" },
  { word: "Kerusi", bm_eq: "Kerusi", en_eq: "chair" },
  { word: "Kasut", bm_eq: "Kasut", en_eq: "shoes" },
  { word: "Baju", bm_eq: "Baju", en_eq: "clothes" },
  { word: "Seluar", bm_eq: "Seluar", en_eq: "pants" },
  { word: "Topi", bm_eq: "Topi", en_eq: "hat" },
  { word: "Beg", bm_eq: "Beg", en_eq: "bag" },
  { word: "Duit", bm_eq: "Duit", en_eq: "money" },
  { word: "Jam", bm_eq: "Jam", en_eq: "watch / clock" },
  { word: "Cermin", bm_eq: "Cermin", en_eq: "mirror" },
  { word: "Sikat", bm_eq: "Sikat", en_eq: "comb" },
  { word: "Katil", bm_eq: "Katil", en_eq: "bed" },
  { word: "Bantal", bm_eq: "Bantal", en_eq: "pillow" },
  { word: "Selimut", bm_eq: "Selimut", en_eq: "blanket" },
  { word: "Kipas", bm_eq: "Kipas", en_eq: "fan" },
  { word: "Telefon", bm_eq: "Telefon", en_eq: "phone" },
  { word: "Pinggan", bm_eq: "Pinggan", en_eq: "plate" },
  { word: "Cawan", bm_eq: "Cawan", en_eq: "cup" },
  { word: "Sudu", bm_eq: "Sudu", en_eq: "spoon" },
  { word: "Garpu", bm_eq: "Garpu", en_eq: "fork" },
  { word: "Pisau", bm_eq: "Pisau", en_eq: "knife" },
  { word: "Kuali", bm_eq: "Kuali", en_eq: "wok" },
  { word: "Periuk", bm_eq: "Periuk", en_eq: "pot" }
];

function transformWord(base: BaseWord, accent: string): DialectEntry {
  const w = base.word;
  let lower = w.toLowerCase();
  let transformed = w;
  let state = "Kedah";
  let dialect = "Logat Utara";
  let explanation = "";
  let sample = "";
  let language: 'Malay' | 'Chinese' | 'English' | 'Tamil' = "Malay";

  switch (accent) {
    case 'utara':
      state = "Kedah";
      dialect = "Logat Utara";
      if (lower.endsWith('ar')) transformed = w.slice(0, -2) + 'aq';
      else if (lower.endsWith('ir')) transformed = w.slice(0, -2) + 'iaq';
      else if (lower.endsWith('ur')) transformed = w.slice(0, -2) + 'oq';
      else if (lower.endsWith('as')) transformed = w.slice(0, -2) + 'aih';
      else if (lower.endsWith('is')) transformed = w.slice(0, -2) + 'ih';
      else if (lower.endsWith('us')) transformed = w.slice(0, -2) + 'uih';
      else if (lower.endsWith('al')) transformed = w.slice(0, -2) + 'ai';
      else if (lower.endsWith('ul')) transformed = w.slice(0, -2) + 'oi';
      else if (lower.endsWith('a') && lower.length > 3) transformed = w + 'q';
      transformed = transformed.replace(/r/gi, 'gh');
      explanation = `Typical Northern variant showing terminal glottal stop and classic northern guttural 'gh' rolled pronunciation common in Kedah and Penang.`;
      sample = `Awat hang pi dok ${transformed} kat sana? Saja cari pasai betoi.`;
      break;

    case 'kelantan':
      state = "Kelantan";
      dialect = "Kelantanese";
      if (lower.endsWith('an') || lower.endsWith('am') || lower.endsWith('ang')) transformed = w.slice(0, -2) + 'e';
      else if (lower.endsWith('ar')) transformed = w.slice(0, -2) + 'o';
      else if (lower.endsWith('at') || lower.endsWith('as') || lower.endsWith('ap')) transformed = w.slice(0, -2) + 'ak';
      else if (lower.endsWith('it') || lower.endsWith('is') || lower.endsWith('ip')) transformed = w.slice(0, -2) + 'ik';
      else if (lower.endsWith('a')) transformed = w.slice(0, -1) + 'o';
      explanation = `Standard Kelantanese (Kecek Kelate) phonetic spelling representing the nasalised terminal vowel or glottal final stop typical of northeastern Peninsular dialects.`;
      sample = `Ambo ghaso sapa hati tengok demo dok ${transformed} kail semale.`;
      break;

    case 'terengganu':
      state = "Terengganu";
      dialect = "Terengganu";
      if (lower.endsWith('an') || lower.endsWith('am') || lower.endsWith('ang')) transformed = w.slice(0, -2) + 'ang';
      else if (lower.endsWith('at') || lower.endsWith('as') || lower.endsWith('ap')) transformed = w.slice(0, -2) + 'ak';
      else if (lower.endsWith('a')) transformed = w.slice(0, -1) + 'ang';
      explanation = `Phonetic coastal Terengganu (Logat Ganu) shift, injecting the heavily nasalised ending suffix and glottal check characteristic of beachside districts.`;
      sample = `Sedak sunggoh, kawan pakat ghama-ghama dok ${transformed} dekat pata petang semalang.`;
      break;

    case 'n9':
      state = "Negeri Sembilan";
      dialect = "Negeri Sembilan";
      if (lower.endsWith('a')) transformed = w.slice(0, -1) + 'o';
      else if (lower.endsWith('ar')) transformed = w.slice(0, -2) + 'o';
      else if (lower.endsWith('as')) transformed = w.slice(0, -2) + 'aih';
      transformed = transformed.replace(/r/gi, 'gh');
      explanation = `Phonetic representation in the Minangkabau-descended Negeri Sembilan dialect. Shows standard final vowel shift (-o) and rolled regional 'gh'.`;
      sample = `Den bebenor nyangko ekau nak ${transformed} kek ghoman ulu semalam.`;
      break;

    case 'sabah':
      state = "Sabah";
      dialect = "Sabahan";
      explanation = `Conversational Sabahan dialect pattern. It features conversational flow tones, bright vowel scales, and sentence expressions typical of East Malaysia.`;
      sample = `Bah, jangan kau ${transformed} melampau di sana ah. Sia panggil kawan nanti.`;
      break;

    case 'sarawak':
      state = "Sarawak";
      dialect = "Sarawakian";
      if (lower.endsWith('a')) transformed = w.slice(0, -1) + 'ak';
      explanation = `Sarawakian phonetic shift, common in local Kuching, Sibu and Miri conversational dialect expressions.`;
      sample = `Kamek nang sekda hal maok tangga kitak ${transformed} gilak ooo.`;
      break;

    case 'manglish':
      state = "Selangor";
      dialect = "Manglish";
      language = "English";
      explanation = `Vocal blend styling incorporating English colloquial frames with iconic Malaysian street slang attributes and sentence structures.`;
      sample = `Walao eh! Why you still ${w} so slow liao? Just chop-chop make it done can?`;
      break;

    case 'johor':
      state = "Johor";
      dialect = "Johor";
      if (lower.endsWith('a') && lower.length > 3) transformed = w.slice(0, -1) + 'e';
      explanation = `Classic Johorean (Southern) accent variant shifting the final terminal 'a' to a soft schwa 'e', typical of Johor Bahru and Muar districts.`;
      sample = `Budak Johor (JDT) memang sempoi, jom kita ${transformed} dekat Muar!`;
      break;

    case 'perlis':
      state = "Perlis";
      dialect = "Perlis";
      if (lower.endsWith('ar')) transformed = w.slice(0, -2) + 'aq';
      else if (lower.endsWith('ir')) transformed = w.slice(0, -2) + 'iaq';
      else if (lower.endsWith('ur')) transformed = w.slice(0, -2) + 'oq';
      else if (lower.endsWith('as')) transformed = w.slice(0, -2) + 'aih';
      else if (lower.endsWith('is')) transformed = w.slice(0, -2) + 'ih';
      else if (lower.endsWith('us')) transformed = w.slice(0, -2) + 'uih';
      else if (lower.endsWith('al')) transformed = w.slice(0, -2) + 'ai';
      else if (lower.endsWith('ul')) transformed = w.slice(0, -2) + 'oi';
      else if (lower.endsWith('a') && lower.length > 3) transformed = w + 'q';
      transformed = transformed.replace(/r/gi, 'gh');
      explanation = `Perlis northern border dialect shift, sharing northern characteristics like rolled 'gh' and glottal stops, with distinct border colloquialisms.`;
      sample = `Awat la hang kalut sangat nak ${transformed} lagu tu dekat Padang Besar?`;
      break;

    case 'pahang':
      state = "Pahang";
      dialect = "Pahang";
      if (lower.endsWith('a')) transformed = w.slice(0, -1) + 'ah';
      else if (lower.endsWith('ar')) transformed = w.slice(0, -2) + 'or';
      else if (lower.endsWith('al')) transformed = w.slice(0, -2) + 'aw';
      else if (lower.endsWith('an')) transformed = w.slice(0, -2) + 'ang';
      explanation = `Pahang river valley variant shifting terminal 'a' to 'ah' and 'ar' to 'or', commonly spoken along the Pahang River banks.`;
      sample = `Kome tengah dok syok ${transformed} kat Temerloh ke petang ni?`;
      break;

    case 'kl':
      state = "Kuala Lumpur";
      dialect = "Kuala Lumpur";
      if (lower.endsWith('a') && lower.length > 3) transformed = w.slice(0, -1) + 'e';
      explanation = `Kuala Lumpur urban colloquial tone, using the standard central vowel shift from 'a' to 'e' paired with fast-paced city slang.`;
      sample = `Lek ah beb, jom kita ${transformed} kat Bukit Bintang malam ni.`;
      break;

    case 'melaka':
      state = "Melaka";
      dialect = "Melaka";
      if (lower.endsWith('a')) transformed = w.slice(0, -1) + 'au';
      else if (lower.endsWith('ar')) transformed = w.slice(0, -2) + 'aw';
      explanation = `Sharp and expressive Melaka dialect variant. Pronounces terminal 'a' as 'au' with a quick, assertive conversational cadence.`;
      sample = `Hawau betul kau ni, pi ${transformed} sekarang lah dekat Klebang!`;
      break;
  }

  return {
    id: `gen-${accent}-${w.toLowerCase()}`,
    word_name: transformed,
    primary_language: language,
    dialect_type: dialect,
    state_origin: state,
    standard_bm_equivalent: base.bm_eq,
    english_equivalent: base.en_eq,
    context_of_use: (w.length % 2 === 0 ? 'Slang' : 'Formal') as any,
    explanation,
    example_sentence: sample,
    verified_status: true,
    upvote_count: Math.floor((w.charCodeAt(0) * 3) % 200) + 12
  };
}

function generateDynamicEntries(): DialectEntry[] {
  const list: DialectEntry[] = [];
  const accents = ['utara', 'kelantan', 'terengganu', 'n9', 'sabah', 'sarawak', 'manglish', 'johor', 'perlis', 'pahang', 'kl', 'melaka'];
  COMMON_BASE_WORDS.forEach((base) => {
    accents.forEach((acc) => {
      list.push(transformWord(base, acc));
    });
  });
  return list;
}

export const INITIAL_DIALECT_ENTRIES: DialectEntry[] = [
  ...STATIC_DIALECT_ENTRIES,
  ...generateDynamicEntries()
];

// 25 Quiz Questions with strict category distribution:
// Testing fine-grained local differences, historical roots, and grammatical nuances
export const DIALECT_IQ_QUIZ: QuizQuestion[] = [
  // Category: Malay Dialect (Melaka Addition)
  {
    id: 'q-ml-11',
    category: 'Malay Dialect',
    question: 'If a local in Melaka exclaims "Hawau betul budak tu!", what is the word "Hawau" functioning as in this context?',
    options: [
      'A formal title for historical Melaka nobility',
      'A localized greeting equivalent to "good morning"',
      'An exclamation of annoyance, surprise, or playful frustration',
      'A description of hot weather conditions'
    ],
    correctAnswer: 'An exclamation of annoyance, surprise, or playful frustration',
    explanation: '"Hawau" is a famous Melaka-specific slang word used widely to express surprise, irritation, or lighthearted frustration.'
  },
  // Category: Malay Dialect (Pahang Addition)
  {
    id: 'q-ml-12',
    category: 'Malay Dialect',
    question: 'In Pahang, if someone refers to "Kome" in the middle of a warm conversation, who are they referring to?',
    options: [
      'A specific type of local freshwater catfish',
      'We, us, or you all (plural pronoun)',
      'A foreign merchant or tourist',
      'The chief of the village'
    ],
    correctAnswer: 'We, us, or you all (plural pronoun)',
    explanation: '"Kome" is a signature pronoun in the Pahang dialect representing "we/us" or "you all", showing local camaraderie.'
  },
  // Category: Malay Dialect (1/10)
  {
    id: 'q-ml-01',
    category: 'Malay Dialect',
    question: 'In the Northern dialect ("Logat Utara"), if your grandmother calls you "Ketegaq", what is she accusing you of being?',
    options: [
      'Very lazy and sleepy',
      'Stubborn and stubborn-headed',
      'Extremely clever and smart',
      'Untidy and messy with your room'
    ],
    correctAnswer: 'Stubborn and stubborn-headed',
    explanation: '"Ketegaq" is the definitive Northern expression for hard-headedness ("degil") where a person refuses to budge or change.'
  },
  // Category: Malay Dialect (2/10)
  {
    id: 'q-ml-02',
    category: 'Malay Dialect',
    question: 'In Kelantan, if family members announce they are putting on a big "Bekwoh", what are they organizing?',
    options: [
      'An intense farming shift',
      'A massive fishing festival',
      'A grand community feast or wedding banquet',
      'A religious school study session'
    ],
    correctAnswer: 'A grand community feast or wedding banquet',
    explanation: 'Derived phonetically from the English phrase "Big Work" (referring to the massive undertaking of cooking for a whole village), "Bekwoh" means a wedding or community feast.'
  },
  // Category: Malay Dialect (3/10)
  {
    id: 'q-ml-03',
    category: 'Malay Dialect',
    question: 'In Negeri Sembilan, if your local friend says "Den bebenor nyangko ekau tak datang," what does "nyangko" mean?',
    options: [
      'Hoped/Prayed',
      'Expected/Assumed',
      'Hated/Disliked',
      'Invited/Called'
    ],
    correctAnswer: 'Expected/Assumed',
    explanation: '"Nyangko" is the Negeri Sembilan dialect pronunciation of "menyangka", meaning to assume, guess, or expect.'
  },
  // Category: Malay Dialect (4/10)
  {
    id: 'q-ml-04',
    category: 'Malay Dialect',
    question: 'When a Terengganu native calls you their "Gu", how do they view your relationship?',
    options: [
      'As a rival or opponent',
      'As an authority figure or teacher',
      'As a close companion or running buddy',
      'As a complete stranger'
    ],
    correctAnswer: 'As a close companion or running buddy',
    explanation: '"Gu" represents a partner or close friend, coming from the root word "regu" which means a pair or team.'
  },
  // Category: Malay Dialect (5/10)
  {
    id: 'q-ml-05',
    category: 'Malay Dialect',
    question: 'If you are caught behaving in a "Loqlaq" manner in Penang, what kind of manners are you displaying?',
    options: [
      'Extremely refined corporate manners',
      'Unruly, messy, or eccentric behavior',
      'Scared and timid silence',
      'Quiet, respectful greeting'
    ],
    correctAnswer: 'Unruly, messy, or eccentric behavior',
    explanation: '"Loqlaq" describes weird, clumsy, or unruly behavior that ignores social norms or neatness.'
  },
  // Category: Malay Dialect (6/10)
  {
    id: 'q-ml-06',
    category: 'Malay Dialect',
    question: 'In Perak and Kedah, what is the correct interpretation of the agricultural word "Keleboq"?',
    options: [
      'A traditional sweet glutinous bun',
      'Deep sticky paddy mud or wet silt',
      'The feeling of extreme embarrassment',
      'A brass teapot used in royal ceremonies'
    ],
    correctAnswer: 'Deep sticky paddy mud or wet silt',
    explanation: '"Keleboq" is regional slang specifically representing the muddy, sticky, heavy ground found in wet rice fields or waterlogged rural roads.'
  },
  // Category: Malay Dialect (7/10)
  {
    id: 'q-ml-07',
    category: 'Malay Dialect',
    question: 'In Kelantan, which action represents the verb "Tebeng" during stressful/tiring moments?',
    options: [
      'Buying heavy gold jewelry on credit',
      'Forcing oneself to carry out a task despite feeling unwell',
      'Throwing wood blocks at monkeys in orchards',
      'Painting the front gate of a house'
    ],
    correctAnswer: 'Forcing oneself to carry out a task despite feeling unwell',
    explanation: '"Tebeng" means to persist, push through, or make a massive voluntary effort to execute something when you have near zero strength or resources.'
  },
  // Category: Malay Dialect (8/10)
  {
    id: 'q-ml-08',
    category: 'Malay Dialect',
    question: 'In Terengganu, if someone asks you to "Kehek" the fish bones, what physical action are they telling you to do?',
    options: [
      'To wash the fish in river water',
      'To laugh in a hidden, high-pitched way',
      'To spit or cough out bones from your mouth',
      'To tie a catamaran securely to the jetty'
    ],
    correctAnswer: 'To spit or cough out bones from your mouth',
    explanation: '"Kehek" is onomatopoeic slang representing the action of expelling bones, unwanted seeds, or bitter food particles directly out from your mouth.'
  },
  // Category: Malay Dialect (9/10)
  {
    id: 'q-ml-09',
    category: 'Malay Dialect',
    question: 'In Negeri Sembilan, if a snake disappears into a fence by "Menselet", how did it move?',
    options: [
      'By making loud warning hisses',
      'By sneaking or squeezing silently through a narrow gap',
      'By falling upside-down from a tree branch',
      'By sliding backwards in spirals'
    ],
    correctAnswer: 'By sneaking or squeezing silently through a narrow gap',
    explanation: '"Menselet" refers to the stealthy, agile movement of sneaking or squeezing into deep, highly confined spatial gaps.'
  },
  // Category: Malay Dialect (10/10)
  {
    id: 'q-ml-10',
    category: 'Malay Dialect',
    question: 'If a Kedah parent calls their toddler "Cenonot", they are commenting on the child\'s what?',
    options: [
      'Annoying high-pitched crying sounds',
      'Incredibly tiny, pocket-sized physique',
      'Constant requests for sweet milk',
      'Unusual red colored birthday shirts'
    ],
    correctAnswer: 'Incredibly tiny, pocket-sized physique',
    explanation: '"Cenonot" is an endearing Northern term representing someone remarkably petite, compact, miniature, or tiny.'
  },

  // Category: Manglish (1/5)
  {
    id: 'q-mg-01',
    category: 'Manglish',
    question: 'What is the historical origin of the common Malaysian driving slang "Gostan" (to reverse a vehicle)?',
    options: [
      'A combination of German and Hokkien words',
      'The nautical English command "Go Astern"',
      'Named after a famous colonial officer, Ronald Gostan',
      'A direct typo on early 1950s license plates'
    ],
    correctAnswer: 'The nautical English command "Go Astern"',
    explanation: '"Gostan" originated from the maritime British phrase "Go astern," which meant backing up a steamship, adapted by local sailors and drivers over the generations.'
  },
  // Category: Manglish (2/5)
  {
    id: 'q-mg-02',
    category: 'Manglish',
    question: 'When a Malaysian colleague says "No choice lah, tonight I have to tapau work back home," what does "tapau" mean?',
    options: [
      'Forget completely',
      'Send via courier',
      'Takeaway, package, or carry back',
      'Discuss over coffee'
    ],
    correctAnswer: 'Takeaway, package, or carry back',
    explanation: 'Originally Cantonese "da bao" (pack food), "tapau" is used universally by Malaysians to mean packing food or bringing tasks home.'
  },
  // Category: Manglish (3/5)
  {
    id: 'q-mg-03',
    category: 'Manglish',
    question: 'In Malaysian office conversations, what does the sarcastic combined term "Abuden" signify?',
    options: [
      'An ancient dance originating from jungle camps',
      'A sarcastic rhetorical retort meaning "Duh, obviously!"',
      'A highly premium brand of expensive green tea',
      'A secret knot used by deep sea fishermen'
    ],
    correctAnswer: 'A sarcastic rhetorical retort meaning "Duh, obviously!"',
    explanation: '"Abuden" combines "Ah, but then?" or Hokkien tones to mock foolish, obvious questions where the state of affairs is fully apparent.'
  },
  // Category: Manglish (4/5)
  {
    id: 'q-mg-04',
    category: 'Manglish',
    question: 'If a Johor local accuses standard speakers of sound-testing in a heavy "Kantang" style, what are they making fun of?',
    options: [
      'Their lack of knowledge regarding local chili spices',
      'An over-accented, potato-like Westernized English speaking pattern',
      'An extreme speed of driving on narrow rural lanes',
      'An excessive fear of eating deep fried seafood dishes'
    ],
    correctAnswer: 'An over-accented, potato-like Westernized English speaking pattern',
    explanation: 'Derived from "kentang" (potato), "Kantang" describes someone who speaks English with an excessively Westernized, upper-crust, or "high-class" accent, often struggling with simple vernacular.'
  },
  // Category: Manglish (5/5)
  {
    id: 'q-mg-05',
    category: 'Manglish',
    question: 'What is the true translation meaning of the widespread street-camaraderie slang "Boskur"?',
    options: [
      'A heavy, greasy lubricant used on motorcycle chains',
      'A modern respect term meaning "My Bro" or "My Boss"',
      'A rare, nocturnal type of wild forest boar',
      'A small wooden stool to sit on while peeling logs'
    ],
    correctAnswer: 'A modern respect term meaning "My Bro" or "My Boss"',
    explanation: '"Boskur" is a creative blending of "Boss" and "Ku" (My), symbolizing a close mate, peer, buddy, or boss-level respect.'
  },

  // Category: Chinese-influenced Slang (1/5)
  {
    id: 'q-ch-01',
    category: 'Chinese-influenced Slang',
    question: 'If someone calls you "Kaypoh" in a coffee shop, what are they criticizing you for being?',
    options: [
      'A massive spender who pays for everyone',
      'An annoying nosey busybody interfering in other affairs',
      'A very slow, sluggish person',
      'A loud and chaotic laugher'
    ],
    correctAnswer: 'An annoying nosey busybody interfering in other affairs',
    explanation: '"Kaypoh" stems from Hokkien "ka-po" (家婆), referring to a busybody. It is widely used by all races to tell someone to stay out of their business!'
  },
  // Category: Chinese-influenced Slang (2/5)
  {
    id: 'q-ch-02',
    category: 'Chinese-influenced Slang',
    question: 'The term "Kiasi" is often used in the context of Malaysian competition. What does its literal Hokkien breakdown translate to?',
    options: [
      'Scared of dying',
      'Scared of ghosts',
      'Scared of losing money',
      'Scared of getting wet'
    ],
    correctAnswer: 'Scared of dying',
    explanation: '"Kiasi" (怕死) translates literally as "scared of dying", meaning being extremely cautious, risk-averse, or fearful of losing out.'
  },
  // Category: Chinese-influenced Slang (3/5)
  {
    id: 'q-ch-03',
    category: 'Chinese-influenced Slang',
    question: 'In Penang, what attitude does a "Kiasu" consumer manifest during promotional sales events?',
    options: [
      'Giving up their queue position to old grandmothers politely',
      'An intense competitiveness to win and a deep fear of losing out',
      'Expressing complete disregard and sleeping under trees',
      'Singing loud classical opera songs to scare competitors away'
    ],
    correctAnswer: 'An intense competitiveness to win and a deep fear of losing out',
    explanation: '"Kiasu" (怕输) translates literally to "scared of losing", describing FOMO, competitive hoarding, or rushing first to grab public coupons.'
  },
  // Category: Chinese-influenced Slang (4/5)
  {
    id: 'q-ch-04',
    category: 'Chinese-influenced Slang',
    question: 'When an employee maintains a strict "Bo-chup" stance during emergency division meetings, how are they acting?',
    options: [
      'Completely indifferent, careless, or nonchalant',
      'Feverishly typing meeting minutes with three hands',
      'Uncontrollably weeping out of sheer professional joy',
      'Handing out free herbal drinks to coworkers'
    ],
    correctAnswer: 'Completely indifferent, careless, or nonchalant',
    explanation: '"Bo-chup" indicates a careless, "couldn\'t care less" state of indifference, absolutely ignoring the critical gravity of affairs.'
  },
  // Category: Chinese-influenced Slang (5/5)
  {
    id: 'q-ch-05',
    category: 'Chinese-influenced Slang',
    question: 'If close Malaysian classmates suggest a quick detour to "Limteh", what are they proposing?',
    options: [
      'An hour of intense physical crossfit exercising',
      'To relax and socialize over cups of kopitiam tea or coffee',
      'To sweep dry soil off the school porch before rain',
      'A quiet nap inside air-conditioned libraries'
    ],
    correctAnswer: 'To relax and socialize over cups of kopitiam tea or coffee',
    explanation: 'Derived from Hokkien (喝茶) literally translate to "drink tea", "Limteh" acts as universal code for chatting and catching up over coffee.'
  },

  // Category: Wildcard (1/5)
  {
    id: 'q-wc-01',
    category: 'Wildcard',
    question: 'In Sabah, what is the single-syllable universal word ("Bah") NOT typically used for?',
    options: [
      'An invitation to depart (e.g., "Bah, mari kita pigi")',
      'An expression of firm agreement (e.g., "Bah, okay lah")',
      'Saying a cold, direct "No" to a server',
      'A conversational pause or filler'
    ],
    correctAnswer: 'Saying a cold, direct "No" to a server',
    explanation: '"Bah" is always constructive, inviting, or agreeing. You would never use "Bah" to deliver a cold, flat refusal. It is used for agreement or starting actions!'
  },
  // Category: Wildcard (2/5)
  {
    id: 'q-wc-02',
    category: 'Wildcard',
    question: 'In Sarawak, what is the core meaning of the common action verb "Polah"?',
    options: [
      'To swim in high water',
      'To make, prepare, or do an action',
      'To stand completely motionless under rain',
      'To purchase custom native accessories'
    ],
    correctAnswer: 'To make, prepare, or do an action',
    explanation: '"Polah" is the essential Sarawakian verb equivalent to standard "buat" or English "to do/make".'
  },
  // Category: Wildcard (3/5)
  {
    id: 'q-wc-03',
    category: 'Wildcard',
    question: 'If a Sarawakian native asks you, "Sia bo gerek kitak?" what are they curious about?',
    options: [
      'Whether you purchased your three-speed bicycle yet',
      'Whether you brought your romantic girlfriend or boyfriend',
      'The size of your luggage bag from Kuala Lumpur',
      'Your physical ability to swallow hot bird\'s eye chilies'
    ],
    correctAnswer: 'Whether you brought your romantic girlfriend or boyfriend',
    explanation: 'In Sarawak, "gerek" exclusively denotes a sweet romantic partner, girlfriend, or boyfriend (not a bicycle).'
  },
  // Category: Wildcard (4/5)
  {
    id: 'q-wc-04',
    category: 'Wildcard',
    question: 'In Sabahan cultural slang, what does the Kadazan-derived word "Sumandak" represent?',
    options: [
      'A beautiful, elegant young local woman',
      'A wooden boat carving used during spring festivals',
      'A sour wild mango harvested from deep forests',
      'A physical headache caused by extreme hot humidity'
    ],
    correctAnswer: 'A beautiful, elegant young local woman',
    explanation: '"Sumandak" represents ladies, female teenagers, or young women, indicating charm, grace, and cultural beauty.'
  },
  // Category: Wildcard (5/5)
  {
    id: 'q-wc-05',
    category: 'Wildcard',
    question: 'In Sabah, if a friend yells, "Limpar tu batu!" what physical maneuver are they instructing?',
    options: [
      'To clean the surface of the granite rock with a rag',
      'To vigorously fling or throw the stone across space',
      'To place the stone neatly near the front door',
      'To paint the stone with a red coat'
    ],
    correctAnswer: 'To vigorously fling or throw the stone across space',
    explanation: '"Limpar" is a highly distinctive Sabahan verb signifying to fling, chuck, hurl, or throw an object.'
  }
];

// Tourist survival phrases & Mamak ordering guide
export const SURVIVAL_PHRASES: SurvivalPhrase[] = [
  {
    id: 'srv-01',
    phrase: 'Teh O Ais Limau, kurang manis satu!',
    pronunciation: 'Tay-Oh-Ice-Lee-Mow, Koo-Rung-Mah-Nis-Sah-Too',
    english_meaning: 'One Iced Lemon Black Tea, less sweet please!',
    context: 'Mamak',
    tips: 'The absolute lifesaver drink in Malaysian heat. ordering "kurang manis" (less sweet) is highly recommended unless you want a sugar rush!'
  },
  {
    id: 'srv-02',
    phrase: 'Boss, tapau satu.',
    pronunciation: 'Boss, tah-pao sah-too',
    english_meaning: 'Boss, make it to-go/takeaway please.',
    context: 'Mamak',
    tips: 'Anyone running an eatery in Malaysia is affectionately called "Boss". Say this to get your meal packed.'
  },
  {
    id: 'srv-03',
    phrase: 'Berapa Boss? Ada QR Pay?',
    pronunciation: 'Buh-rah-pah Boss? Ah-dah Q-R Pay?',
    english_meaning: 'How much is it, Boss? Do you accept QR code payment?',
    context: 'Shopping',
    tips: 'Malaysia is incredibly cashless—almost every stall accepts "DuitNow QR". Just point to your phone and say this.'
  },
  {
    id: 'srv-04',
    phrase: 'Makan sini, Boss.',
    pronunciation: 'Mah-kan See-nee, Boss',
    english_meaning: 'Dine-in here, Boss.',
    context: 'Mamak',
    tips: 'Opposite of tapau. Tell the server this so they plate your roti canai on a real metal tray.'
  },
  {
    id: 'srv-05',
    phrase: 'Boss, roti canai garing satu, kuah banjir!',
    pronunciation: 'Boss, ro-tee chah-nye-gah-ring sah-too, koo-ah bahn-jeer',
    english_meaning: 'One crispy flatbread, flooded with curry sauces!',
    context: 'Mamak',
    tips: '“Kuah banjir” literally means "flooded gravy"—meaning they will pour dhal, fish curry, and sambal all over your flatbread.'
  }
];

// Seeded proposed edits for the pending crowdsourcing queue
export const INITIAL_PENDING_EDITS = [
  {
    id: 'edit-101',
    word_id: 'nord-01', // editing Ketegaq
    word_name: 'Ketegaq',
    dialect_type: 'Logat Utara',
    state_origin: 'Kedah',
    primary_language: 'Malay' as const,
    proposed_correction: {
      standard_bm_equivalent: 'Sangat keras kepala / tak dengar kata',
      english_equivalent: 'Extremely stubborn or headstrong',
      example_sentence: 'Hang ni ketegaq macam lori gandum, mak cakap tak mau dengar langsung!'
    },
    submitted_by: 'Mior_AlorSetar',
    timestamp: '2026-06-02T14:45:00Z',
    sah_votes: 8, // Needs 2 more to trigger verified addition
    voted_by_user: false,
  },
  {
    id: 'edit-102',
    word_name: 'Gostan',
    word_id: 'mng-01',
    dialect_type: 'Manglish',
    state_origin: 'Selangor',
    primary_language: 'English' as const,
    proposed_correction: {
      standard_bm_equivalent: 'Mengundurkan kenderaan / undur',
      english_equivalent: 'To reverse or drive in secondary reverse motion',
      example_sentence: 'Sini parking sempit, hang kena gostan lurus baru lepas.'
    },
    submitted_by: 'KlangBoy88',
    timestamp: '2026-06-03T01:30:00Z',
    sah_votes: 4, // Needs 6 more
    voted_by_user: false,
  },
  {
    id: 'edit-103',
    word_name: 'Kau-Kau / Kaw-Kaw', // Brand new entry proposal!
    dialect_type: 'Manglish',
    state_origin: 'Federal Territory',
    primary_language: 'Chinese' as const,
    proposed_correction: {
      standard_bm_equivalent: 'Sangat pekat / Sangat kuat / Maksimum',
      english_equivalent: 'Extremely thick, strong, or to the absolute limit',
      example_sentence: 'Today the rain was kaw-kaw heavy, my shoes all soaked!'
    },
    submitted_by: 'MamakLover',
    timestamp: '2026-06-03T08:12:00Z',
    sah_votes: 9, // Needs 1 more!
    voted_by_user: false,
  }
];

export const INITIAL_SPONSOR_ADS = [
  {
    id: 'sponsor-01',
    business_name: 'Nasi Kandar Banjir King',
    headline: 'Flooded with 5 types of curries until you cannot see the rice!',
    description: 'Craving authentic Penang Nasi Kandar? Taste the absolute gravity-defying flood of mixed dhal, fish, and mutton curries. Best enjoyed with a Teh Tarik Kaw-Kaw.',
    category: 'Food & Beverage' as const,
    state_origin: 'Penang',
    slang_element: 'Kuah Banjir (Flooded Gravy)',
    reaction_counts: { sah: 124, fuyoo: 98, gostan: 2 },
    is_approved: true
  },
  {
    id: 'sponsor-02',
    business_name: 'Gostan Car Reverse Parking Academy',
    headline: 'Struggling to park into tight urban slots? Back up like a Captain!',
    description: 'We teach the ancient art of "Go Astern" so you do not damage your tail lights. 100% money-back guarantee, valid if you do not hit any green dustbins.',
    category: 'Services' as const,
    state_origin: 'Selangor',
    slang_element: 'Gostan (Reverse Gear)',
    reaction_counts: { sah: 78, fuyoo: 54, gostan: 4 },
    is_approved: true
  },
  {
    id: 'sponsor-03',
    business_name: 'Roti Canai Terbang Kak Ros',
    headline: 'Roti canai rotating in the clouds, landing straight onto your plate!',
    description: 'Watch the flying dough navigate wind speeds of 15 knots before arriving at your table. Please wear the complimentary helmet provided at the counter.',
    category: 'Food & Beverage' as const,
    state_origin: 'Kuala Lumpur',
    slang_element: 'Roti Canai Garing (Crispy Flatbread)',
    reaction_counts: { sah: 212, fuyoo: 189, gostan: 1 },
    is_approved: true
  },
  {
    id: 'sponsor-04',
    business_name: 'Minyak Sapu Cap Penyu',
    headline: 'Feeling loqlaq or ketegaq today? Try Cap Penyu Turtle rub!',
    description: 'Perfect for long car journeys or studying rare northern slangs. Highly aromatic, made from mock sea breeze. Satisfaction confirmed by village folks!',
    category: 'Lifestyle' as const,
    state_origin: 'Terengganu',
    slang_element: 'Ketegaq (Stubborn)',
    reaction_counts: { sah: 45, fuyoo: 23, gostan: 0 },
    is_approved: true
  },
  {
    id: 'sponsor-05',
    business_name: 'Dusun Aramaitii Durian',
    headline: 'Fresh creaminess that makes you yell ARAMAITII!',
    description: 'Savor premium Musang King, D24, and Red Prawn durians directly from Sabah hills. Smells like heaven, tastes like pure gold. Brings everyone together!',
    category: 'Food & Beverage' as const,
    state_origin: 'Sabah',
    slang_element: 'Aramaitii (Cheers / Let\'s celebrate!)',
    reaction_counts: { sah: 167, fuyoo: 145, gostan: 3 },
    is_approved: true
  }
];

export const ALL_BADGES: Badge[] = [
  {
    id: 'penang_master',
    name: 'Anak Penang / Otai Penang',
    category: 'State',
    description: 'Unlocked by exploring Penang slangs and regional language entries.',
    requirement: 'Explore Penang state dialect entries',
    icon: '🍜'
  },
  {
    id: 'kedah_king',
    name: 'Kedah Royalty / Raja Kedah',
    category: 'State',
    description: 'Unlocked by exploring Kedah slangs and northern rice valley terminology.',
    requirement: 'Explore Kedah state dialect entries',
    icon: '🌾'
  },
  {
    id: 'kelantan_jati',
    name: 'True Kelantanese / Budak Kelate Jati',
    category: 'State',
    description: 'Unlocked by exploring Kelantanese slangs and East Coast vocabulary.',
    requirement: 'Explore Kelantan state dialect entries',
    icon: '👑'
  },
  {
    id: 'terengganu_specialist',
    name: 'Terengganu Specialist / Pakar Ganu',
    category: 'State',
    description: 'Unlocked by exploring Terengganu coastal slangs and turtle land accents.',
    requirement: 'Explore Terengganu state dialect entries',
    icon: '🐢'
  },
  {
    id: 'sabah_aramaitii',
    name: 'Sabah Aramaitii / Sumandak Sabah',
    category: 'State',
    description: 'Unlocked by exploring Sabah slangs under the shadow of Mt. Kinabalu.',
    requirement: 'Explore Sabah state dialect entries',
    icon: '⛰️'
  },
  {
    id: 'sarawak_guru',
    name: 'Sarawak Guru / Otai Sarawak',
    category: 'State',
    description: 'Unlocked by exploring Sarawak river slangs and Hornbill territory terms.',
    requirement: 'Explore Sarawak state dialect entries',
    icon: '🐦'
  },
  {
    id: 'negeri_9_legend',
    name: 'Negeri 9 Legend / Den Alih Kito',
    category: 'State',
    description: 'Unlocked by exploring Negeri Sembilan Minangkabau dialects.',
    requirement: 'Explore Negeri Sembilan state dialect entries',
    icon: '🐃'
  },
  {
    id: 'johor_champion',
    name: 'Johor Champion / Budak Johor',
    category: 'State',
    description: 'Unlocked by exploring Southern Johor slangs and Muar accents.',
    requirement: 'Explore Johor state dialect entries',
    icon: '🐅'
  },
  {
    id: 'kl_slicker',
    name: 'KL Slicker / Budak City KL',
    category: 'State',
    description: 'Unlocked by exploring Kuala Lumpur urban slangs and city lingo.',
    requirement: 'Explore Kuala Lumpur state dialect entries',
    icon: '🏢'
  },
  {
    id: 'perak_pioneer',
    name: 'Perak Pioneer / Orang Perak',
    category: 'State',
    description: 'Unlocked by exploring Perak tin valley slangs and royal dialects.',
    requirement: 'Explore Perak state dialect entries',
    icon: '🪙'
  },
  {
    id: 'melaka_nyonya',
    name: 'Melaka Nyonya / Baba Melaka',
    category: 'State',
    description: 'Unlocked by exploring Melaka historical slangs and Nyonya terms.',
    requirement: 'Explore Melaka state dialect entries',
    icon: '🎭'
  },
  {
    id: 'pahang_jungle',
    name: 'Pahang Guide / Otai Pahang',
    category: 'State',
    description: 'Unlocked by exploring Pahang rainforest slangs and river accents.',
    requirement: 'Explore Pahang state dialect entries',
    icon: '🌳'
  },
  {
    id: 'perlis_ranger',
    name: 'Perlis Ranger / Budak Perlis',
    category: 'State',
    description: 'Unlocked by exploring Perlis northern border slangs.',
    requirement: 'Explore Perlis state dialect entries',
    icon: '🥭'
  },
  {
    id: 'selangor_runner',
    name: 'Selangor Runner / Budak Selangor',
    category: 'State',
    description: 'Unlocked by exploring Selangor highway slangs and urban terms.',
    requirement: 'Explore Selangor state dialect entries',
    icon: '🏎️'
  },
  {
    id: 'penang_hokkien_boss',
    name: 'Hokkien Speaker / Kawan Penang Hokkien',
    category: 'State',
    description: 'Unlocked by exploring Chinese-influenced Penang Hokkien vocabulary.',
    requirement: 'Explore Chinese-influenced Hokkien entries',
    icon: '🥢'
  },
  {
    id: 'sabah_explorer',
    name: 'Sabah Explorer / Peminat Sabah',
    category: 'State',
    description: 'Unlocked by exploring unique East Malaysia Kadazandusun terms.',
    requirement: 'Explore East Malaysia dialects',
    icon: '🌴'
  },
  {
    id: 'sarawak_lang',
    name: 'Sarawakian Lang / Orang Sarawak',
    category: 'State',
    description: 'Unlocked by exploring unique Sarawak Iban and Malay terms.',
    requirement: 'Explore Sarawak dialects',
    icon: '🐱'
  },
  {
    id: 'malay_heritage',
    name: 'Malay Heritage / Warisan Melayu',
    category: 'State',
    description: 'Unlocked by identifying with native Malay native dialects.',
    requirement: 'Check Malay Heritage in profile settings',
    icon: '🛡️'
  },
  {
    id: 'chinese_influenced',
    name: 'Chinese-influenced Slang Guru',
    category: 'State',
    description: 'Unlocked by exploring Chinese-derived slangs like "Cincai" or "Kiasu".',
    requirement: 'Explore Chinese-derived slangs',
    icon: '🥠'
  },
  {
    id: 'tamil_influenced',
    name: 'Tamil-influenced Slang Guru',
    category: 'State',
    description: 'Unlocked by exploring Tamil-derived mamak slangs like "Dey" or "Kari".',
    requirement: 'Explore Tamil-derived slangs',
    icon: '🕌'
  },
  {
    id: 'score_tourist',
    name: 'Tourist Explorer / Pelancong',
    category: 'Score',
    description: 'Welcome to Malaysia! Unlocked by participating in the Dialect IQ Quiz.',
    requirement: 'Complete the Quiz with any score',
    icon: '🥤'
  },
  {
    id: 'score_city',
    name: 'Budak City Pro / City Kid',
    category: 'Score',
    description: 'Unlocked by getting a decent passing score in the Dialect IQ Quiz.',
    requirement: 'Score 40% or more in the IQ Quiz',
    icon: '🏢'
  },
  {
    id: 'score_jati',
    name: 'Anak Jati Supreme / Local Expert',
    category: 'Score',
    description: 'Unlocked by achieving high fluency ranks in the Dialect IQ Quiz.',
    requirement: 'Score 70% or more in the IQ Quiz',
    icon: '🇲🇾'
  },
  {
    id: 'score_legend',
    name: 'Legend Kampung / Dialect Master',
    category: 'Score',
    description: 'Flawless countryside knowledge. Unlocked by achieving maximum rank in the Quiz.',
    requirement: 'Score 90% or more in the IQ Quiz',
    icon: '👑'
  },
  {
    id: 'score_overlord',
    name: 'Dialect IQ Overlord / Raja IQ',
    category: 'Score',
    description: 'Absolute perfection! Unlocked by answering all Quiz questions correctly.',
    requirement: 'Score 100% in the IQ Quiz',
    icon: '🔮'
  },
  {
    id: 'score_speed',
    name: 'Quiz Speedrunner / Laju-Laju',
    category: 'Score',
    description: 'Unlocked by finishing the Dialect IQ Quiz in record rapid time.',
    requirement: 'Finish the IQ Quiz in less than 30 seconds',
    icon: '⚡'
  },
  {
    id: 'score_genius',
    name: 'Flawless Genius / Otak Geliga',
    category: 'Score',
    description: 'Unlocked by maintaining an uninterrupted winning streak during the Quiz.',
    requirement: 'Get a streak of 5 correct answers in a row',
    icon: '🧠'
  },
  {
    id: 'score_polyglot',
    name: 'Multi-Dialect Polyglot / Banyak Bahasa',
    category: 'Score',
    description: 'Unlocked by correctly answering slang questions spanning different states.',
    requirement: 'Answer questions across 3 different states correctly',
    icon: '🗣️'
  },
  {
    id: 'score_history',
    name: 'Local Historian / Sejarawan Dialek',
    category: 'Score',
    description: 'Unlocked by studying the historical origins of regional slangs.',
    requirement: 'View quiz question explanation cards 3 times',
    icon: '📚'
  },
  {
    id: 'score_scholar',
    name: 'Dialect Scholar / Cendekiawan',
    category: 'Score',
    description: 'Unlocked by persistent training and playing the IQ Quiz multiple times.',
    requirement: 'Play the Dialect IQ Quiz 3 times',
    icon: '🎓'
  },
  {
    id: 'social_netizen',
    name: 'Good Netizen / Netizen Prihatin',
    category: 'Social',
    description: 'Unlocked by rating the application (for registered Malay heritage users).',
    requirement: 'Submit App Rating under Malay Heritage profile',
    icon: '🌟'
  },
  {
    id: 'social_samaritan',
    name: 'Good Samaritan / Wira Penyayang',
    category: 'Social',
    description: 'Unlocked by rating the application (for registered general users).',
    requirement: 'Submit App Rating under General profile',
    icon: '❤️'
  },
  {
    id: 'social_challenger',
    name: 'Friendly Challenger / Pencabar Mesra',
    category: 'Social',
    description: 'Unlocked by challenging a friend to a Loghat challenge in post-game.',
    requirement: 'Click "Challenge a Friend" button post-quiz',
    icon: '⚔️'
  },
  {
    id: 'social_connector',
    name: 'Social Connector / Penghubung',
    category: 'Social',
    description: 'Unlocked by sharing quiz results to external messaging networks.',
    requirement: 'Share quiz scores to Telegram/Instagram/FB/X',
    icon: '📢'
  },
  {
    id: 'social_contributor',
    name: 'Slang Contributor / Penyumbang Slang',
    category: 'Social',
    description: 'Unlocked by submitting a slang entry proposal to the preservation queue.',
    requirement: 'Propose a slang to the crowdsourced queue',
    icon: '✍️'
  },
  {
    id: 'social_moderator',
    name: 'Wiki Moderator / Pengawal Wiki',
    category: 'Social',
    description: 'Unlocked by auditing pending slang edits in the crowdsource queue.',
    requirement: 'Cast a vote in the Verification Queue',
    icon: '⚖️'
  },
  {
    id: 'social_voter',
    name: 'Active Voter / Pengundi Aktif',
    category: 'Social',
    description: 'Unlocked by performing multiple votes to build slang consensus.',
    requirement: 'Cast 5 votes in the Verification Queue',
    icon: '🗳️'
  },
  {
    id: 'social_upvoter',
    name: 'Upvote Champion / Penyokong Tegap',
    category: 'Social',
    description: 'Unlocked by upvoting community slangs in the Dialect-Dex directory.',
    requirement: 'Upvote 5 slang entries in the dictionary',
    icon: '👍'
  },
  {
    id: 'social_talkative',
    name: 'Talkative Buddy / Kawan Sembang',
    category: 'Social',
    description: 'Unlocked by posting commentary in the community social feed.',
    requirement: 'Submit a comment under any social feed post',
    icon: '💬'
  },
  {
    id: 'social_poster',
    name: 'Social Feed Poster / Penulis Feed',
    category: 'Social',
    description: 'Unlocked by writing posts or sharing updates in the community feed.',
    requirement: 'Post a custom status update to the Social Feed',
    icon: '📝'
  },
  {
    id: 'social_liker',
    name: 'Active Liker / Penyuka Post',
    category: 'Social',
    description: 'Unlocked by supporting fellow preservers with likes on the social feed.',
    requirement: 'Like 5 posts in the Social Feed',
    icon: '❤️'
  },
  {
    id: 'social_bazar',
    name: 'Sapot Lokal Fan / Peminat Sapot Lokal',
    category: 'Social',
    description: 'Unlocked by interacting with local sponsor ads on the Sapot Lokal board.',
    requirement: 'Add or react to a sponsor ad on the Sapot Lokal board',
    icon: '🛍️'
  },
  {
    id: 'social_helper',
    name: 'Community Helper / Pembantu',
    category: 'Social',
    description: 'Unlocked by writing descriptive feedback reports to the development team.',
    requirement: 'Submit developer feedback under settings tab',
    icon: '✉️'
  },
  {
    id: 'social_backer',
    name: 'Ad Supporter / Penyokong Ad',
    category: 'Social',
    description: 'Unlocked by supporting the preservation platform with premium engagements.',
    requirement: 'Interact with ad banner components',
    icon: '📣'
  },
  {
    id: 'social_challenger_pro',
    name: 'Loghat Challenger Pro / Jaguh Cabar',
    category: 'Social',
    description: 'Unlocked by challenging multiple friends to regional dialect contests.',
    requirement: 'Perform 5 quiz challenge shares',
    icon: '🔥'
  },
  {
    id: 'referral_pioneer',
    name: 'Referral Pioneer / Perintis Rujukan',
    category: 'Social',
    description: 'Unlocked by inviting cultural preservers or redeeming a referral code.',
    requirement: 'Claim a referral code in the Settings tab',
    icon: '🤝'
  },
  {
    id: 'special_preserved',
    name: 'Deep Preservationist / Pemelihara Bahasa',
    category: 'Special',
    description: 'Unlocked by studying regional slang records extensively.',
    requirement: 'View 10 slang detail cards in Dialect-Dex',
    icon: '🗂️'
  },
  {
    id: 'special_batik',
    name: 'Authentic Batik-Coder / Batik Tech',
    category: 'Special',
    description: 'Unlocked by interacting with the interactive Malaysia Map.',
    requirement: 'Click 5 different states on the Dialect Map',
    icon: '🎨'
  },
  {
    id: 'special_survival',
    name: 'Mamak Regular / Kaki Mamak',
    category: 'Special',
    description: 'Unlocked by studying survival guides for Malaysian mamak shops.',
    requirement: 'Read Mamak Survival Guide phrases',
    icon: '☕'
  },
  {
    id: 'special_roti',
    name: 'Roti Terbang Catcher / Kaki Roti',
    category: 'Special',
    description: 'Unlocked by viewing food-related slangs like "Roti Canai Garing".',
    requirement: 'Interact with food-related slangs or ads',
    icon: '🥞'
  },
  {
    id: 'special_teh_tarik',
    name: 'Teh Tarik Master / Kawan Kaw-Kaw',
    category: 'Special',
    description: 'Unlocked by searching for concentrated tea or thick gravy slangs.',
    requirement: 'Find slang entries containing "Kaw-Kaw" or "Banjir"',
    icon: '☕'
  },
  {
    id: 'special_merdeka',
    name: 'Merdeka Spirit / Jiwa Merdeka',
    category: 'Special',
    description: 'Unlocked by exploring dialects across East and West Malaysia.',
    requirement: 'Explore slangs from both Peninsular and Borneo',
    icon: '🌺'
  },
  {
    id: 'ultra_legend',
    name: 'Loghat Legend / Juara Ulung 👑',
    category: 'Special',
    description: 'Unlocked by upgrading to Ultra Premium. Shows your ultimate support for local dialect preservation!',
    requirement: 'Purchase Ultra Premium (RM9.90)',
    icon: '👑'
  },
  {
    id: 'social_ultra',
    name: 'Ultra Premium Preserver ✨',
    category: 'Social',
    description: 'Unlocked by upgrading to Ultra Premium. Grants an exclusive gold gilded glow and status badge in the community feed.',
    requirement: 'Purchase Ultra Premium (RM9.90)',
    icon: '✨'
  }
];

