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

// ============================================================================
// PENANG SLANG & ACCENT LIBRARY (Penang Hokkien + Penang Malay / Logat Utara)
// A curated 100+ vocabulary set capturing the unique vernacular of Pulau Pinang.
// ============================================================================
const PENANG_DIALECT_ENTRIES: DialectEntry[] = [
  // ---------- PENANG HOKKIEN (Chinese-influenced street Hokkien) ----------
  { id: 'png-h-001', word_name: 'Lui', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Duit / Wang', english_equivalent: 'Money', context_of_use: 'Slang', explanation: 'The classic Penang Hokkien word for money, so iconic it has crossed over into everyday Penang Malay too.', example_sentence: 'Lu u lui bo? Pinjam wa sikit, esok wa pulang.', verified_status: true, upvote_count: 188 },
  { id: 'png-h-002', word_name: 'Pai-seh', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Malu / Segan', english_equivalent: 'Embarrassed / Shy / Sorry to trouble you', example_sentence: 'Aiyoh, pai-seh la makan banyak-banyak kat rumah lu.', context_of_use: 'Slang', explanation: 'Used when you feel embarrassed, shy, or apologetic for inconveniencing someone.', verified_status: true, upvote_count: 176 },
  { id: 'png-h-003', word_name: 'Cincai', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sebarang / Ikut suka', english_equivalent: 'Anyhow / Whatever / However you like', context_of_use: 'Slang', explanation: 'To do something casually, carelessly, or without fuss. A Penang and nationwide favourite.', example_sentence: 'Makan apa pun cincai la, wa tak kisah.', verified_status: true, upvote_count: 165 },
  { id: 'png-h-004', word_name: 'Tapau', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Bungkus (makanan)', english_equivalent: 'Takeaway / To pack food', context_of_use: 'Slang', explanation: 'To pack food to go. Now used by all Malaysians but rooted in Hokkien and Cantonese.', example_sentence: 'Wa tapau char koay teow dua bungkus, satu kurang pedas.', verified_status: true, upvote_count: 159 },
  { id: 'png-h-005', word_name: 'Kongsi', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Berkongsi / Bahagi', english_equivalent: 'To share', context_of_use: 'Slang', explanation: 'To share something. The same root word also names Penang heritage clan houses (kongsi).', example_sentence: 'Jom kongsi satu plate, wa dah kenyang sikit.', verified_status: true, upvote_count: 142 },
  { id: 'png-h-006', word_name: 'Kaypoh', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sibuk / Suka jaga tepi kain orang', english_equivalent: 'Busybody / Nosy', context_of_use: 'Slang', explanation: 'A person who loves minding other people business and gossiping.', example_sentence: 'Jangan kaypoh la lu, itu bukan hal lu punya.', verified_status: true, upvote_count: 138 },
  { id: 'png-h-007', word_name: 'Suay', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sial / Tak bernasib baik', english_equivalent: 'Unlucky / Jinxed', context_of_use: 'Slang', explanation: 'Describes a streak of bad luck or an unfortunate turn of events.', example_sentence: 'Suay betul hari ni, baru keluar terus kena hujan.', verified_status: true, upvote_count: 121 },
  { id: 'png-h-008', word_name: 'Sien', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Bosan / Jemu', english_equivalent: 'Bored / Fed up / Sian', context_of_use: 'Slang', explanation: 'A feeling of boredom, weariness, or being jaded with something repetitive.', example_sentence: 'Sien la dok rumah saja, jom kita pi Gurney.', verified_status: true, upvote_count: 144 },
  { id: 'png-h-009', word_name: 'Tauke', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Bos / Tuan punya kedai', english_equivalent: 'Boss / Shop owner', context_of_use: 'Slang', explanation: 'The boss or proprietor of a business. Female version is tauke-soh.', example_sentence: 'Tauke, bagi teh tarik satu, kurang manis.', verified_status: true, upvote_count: 133 },
  { id: 'png-h-010', word_name: 'Angmoh', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Orang putih / Mat saleh', english_equivalent: 'Caucasian / Westerner', context_of_use: 'Slang', explanation: 'Literally red-hair, a casual term for a Caucasian or Western person.', example_sentence: 'Banyak angmoh datang melancong kat Georgetown sekarang.', verified_status: true, upvote_count: 118 },
  { id: 'png-h-011', word_name: 'Samseng', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Samseng / Kaki gaduh', english_equivalent: 'Gangster / Thug', context_of_use: 'Slang', explanation: 'A gangster, hooligan, or troublemaker who likes to act tough.', example_sentence: 'Budak tu samseng sikit, baik lu jangan kacau dia.', verified_status: true, upvote_count: 109 },
  { id: 'png-h-012', word_name: 'Liao', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sudah / Dah', english_equivalent: 'Already (completion particle)', context_of_use: 'Slang', explanation: 'A sentence particle marking that something is already done or finished.', example_sentence: 'Wa makan liao, lu pi makan dulu.', verified_status: true, upvote_count: 126 },
  { id: 'png-h-013', word_name: 'Hamik', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Apa?', english_equivalent: 'What? / What is it?', context_of_use: 'Slang', explanation: 'The distinctly Penang Hokkien way of asking what, from ham-mik. A true Penang marker.', example_sentence: 'Hamik lu cakap tadi? Wa tak dengar betul.', verified_status: true, upvote_count: 151 },
  { id: 'png-h-014', word_name: 'Bojio', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Tak ajak / Tak panggil', english_equivalent: 'Did not invite me', context_of_use: 'Slang', explanation: 'A playful complaint that someone did something fun without inviting you.', example_sentence: 'Lu orang pi makan steamboat bojio, sedih wa.', verified_status: true, upvote_count: 147 },
  { id: 'png-h-015', word_name: 'Kiasu', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Takut kalah / Tamak nak menang', english_equivalent: 'Afraid to lose out', context_of_use: 'Slang', explanation: 'The mentality of being overly competitive and afraid of missing out or losing.', example_sentence: 'Kiasu betul, beratur dari pagi sebab nak barang free.', verified_status: true, upvote_count: 131 },
  { id: 'png-h-016', word_name: 'Kiasi', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Takut mati / Penakut', english_equivalent: 'Afraid to die / Overly cautious', context_of_use: 'Slang', explanation: 'Describes someone excessively scared or paranoid about safety.', example_sentence: 'Kiasi sangat, baru naik motor sikit dah menjerit.', verified_status: true, upvote_count: 104 },
  { id: 'png-h-017', word_name: 'Jialat', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Teruk / Parah', english_equivalent: 'Terrible / Dire / In big trouble', context_of_use: 'Slang', explanation: 'Used when a situation is bad, draining, or has gone seriously wrong.', example_sentence: 'Jialat la macam ni, esok exam tapi wa belum baca apa-apa.', verified_status: true, upvote_count: 137 },
  { id: 'png-h-018', word_name: 'Cham', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Susah / Celaka', english_equivalent: 'Terrible / Done for', context_of_use: 'Slang', explanation: 'An exclamation that things have gone wrong, similar to jialat but shorter.', example_sentence: 'Cham, wa lupa bawa dompet, macam mana nak bayar ni.', verified_status: true, upvote_count: 98 },
  { id: 'png-h-019', word_name: 'Steady', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Mantap / Boleh diharap', english_equivalent: 'Solid / Reliable / Cool', context_of_use: 'Slang', explanation: 'A term of approval meaning someone or something is dependable and impressive.', example_sentence: 'Steady la lu, settle semua kerja dalam satu hari.', verified_status: true, upvote_count: 112 },
  { id: 'png-h-020', word_name: 'Geng', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Hebat / Power', english_equivalent: 'Awesome / Impressive', context_of_use: 'Slang', explanation: 'Expresses admiration that something is powerful, skilful, or amazing.', example_sentence: 'Geng betul masakan mak lu, sedap tak ingat dunia.', verified_status: true, upvote_count: 119 },
  { id: 'png-h-021', word_name: 'Hamsap', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Gatal / Miang', english_equivalent: 'Lecherous / Dirty-minded', context_of_use: 'Insult', explanation: 'Describes a person with a lewd or perverted attitude.', example_sentence: 'Mata keranjang betul, hamsap sangat pakcik tu.', verified_status: true, upvote_count: 95 },
  { id: 'png-h-022', word_name: 'Lim peh', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Aku bapak kau (bangga)', english_equivalent: 'I / Yours truly (cocky)', context_of_use: 'Slang', explanation: 'A boastful first-person way of referring to oneself, literally your father.', example_sentence: 'Lim peh dah cakap awal-awal, lu tak nak dengar.', verified_status: true, upvote_count: 88 },
  { id: 'png-h-023', word_name: 'Wa', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Saya / Aku', english_equivalent: 'I / Me', context_of_use: 'Slang', explanation: 'The Hokkien first-person pronoun, used freely across Penang regardless of race.', example_sentence: 'Wa pi pasar dulu, lu tunggu kat rumah.', verified_status: true, upvote_count: 124 },
  { id: 'png-h-024', word_name: 'Lu', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Awak / Kau', english_equivalent: 'You', context_of_use: 'Slang', explanation: 'The Hokkien second-person pronoun, a staple of casual Penang speech.', example_sentence: 'Lu nak ikut tak? Kalau nak cepat sikit.', verified_status: true, upvote_count: 127 },
  { id: 'png-h-025', word_name: 'Cha bor', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Perempuan', english_equivalent: 'Woman / Girl', context_of_use: 'Slang', explanation: 'Hokkien term for a woman or girl, common in casual Penang banter.', example_sentence: 'Cha bor tu cantik, lu kenal ka?', verified_status: true, upvote_count: 101 },
  { id: 'png-h-026', word_name: 'Ta poh', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Lelaki', english_equivalent: 'Man / Boy', context_of_use: 'Slang', explanation: 'Hokkien term for a man or male, paired opposite to cha bor.', example_sentence: 'Ta poh ka cha bor anak lu yang baru lahir tu?', verified_status: true, upvote_count: 93 },
  { id: 'png-h-027', word_name: 'Gina', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Budak kecil', english_equivalent: 'Child / Kid', context_of_use: 'Slang', explanation: 'A small child, from the Hokkien gin-a.', example_sentence: 'Gina ni nakal betul, lari sana sini tak diam.', verified_status: true, upvote_count: 86 },
  { id: 'png-h-028', word_name: 'Sui', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Cantik / Lawa', english_equivalent: 'Pretty / Beautiful', context_of_use: 'Endearment', explanation: 'A compliment that someone or something looks beautiful or pretty.', example_sentence: 'Sui betul baju lu hari ni, beli mana?', verified_status: true, upvote_count: 134 },
  { id: 'png-h-029', word_name: 'Hou chiak', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sedap', english_equivalent: 'Delicious / Tasty', context_of_use: 'Slang', explanation: 'Literally good-eat, used to praise tasty food, a Penang food-paradise essential.', example_sentence: 'Hou chiak tak laksa kat sini? Wa rasa terbaik.', verified_status: true, upvote_count: 145 },
  { id: 'png-h-030', word_name: 'Bo eng', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sibuk / Tak lapang', english_equivalent: 'Busy / No free time', context_of_use: 'Slang', explanation: 'Means having no free time. The opposite, eng, means free or idle.', example_sentence: 'Wa bo eng la hari ni, banyak kerja kat ofis.', verified_status: true, upvote_count: 91 },
  { id: 'png-h-031', word_name: 'Eng', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Lapang / Free', english_equivalent: 'Free / Idle', context_of_use: 'Slang', explanation: 'To be free or have spare time on your hands.', example_sentence: 'Lu eng tak petang ni? Jom lim kopi.', verified_status: true, upvote_count: 84 },
  { id: 'png-h-032', word_name: 'Lim kopi', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Minum kopi', english_equivalent: 'To drink coffee / hang out', context_of_use: 'Slang', explanation: 'To drink coffee, but often a euphemism for sitting down and chatting at a kopitiam.', example_sentence: 'Jom lim kopi kat kedai mamak depan tu.', verified_status: true, upvote_count: 108 },
  { id: 'png-h-033', word_name: 'Chiak png', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Makan nasi', english_equivalent: 'To eat (a meal)', context_of_use: 'Slang', explanation: 'Literally eat rice, the everyday way to ask if someone has eaten.', example_sentence: 'Lu chiak png liao bo? Kalau belum jom makan.', verified_status: true, upvote_count: 96 },
  { id: 'png-h-034', word_name: 'Beh tahan', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Tak boleh tahan', english_equivalent: 'Cannot stand it', context_of_use: 'Slang', explanation: 'A half-Hokkien half-Malay phrase meaning you cannot tolerate something any longer.', example_sentence: 'Beh tahan la panas hari ni, macam dalam ketuhar.', verified_status: true, upvote_count: 113 },
  { id: 'png-h-035', word_name: 'Beh hiao', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Tak reti / Tak pandai', english_equivalent: 'Do not know how to', context_of_use: 'Slang', explanation: 'To be unable to do something or not know how. The opposite is e-hiao.', example_sentence: 'Wa beh hiao cakap omputih, lu tolong wa sikit.', verified_status: true, upvote_count: 89 },
  { id: 'png-h-036', word_name: 'E hiao', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Reti / Pandai', english_equivalent: 'Know how to / Able to', context_of_use: 'Slang', explanation: 'To know how to do something or be capable of it.', example_sentence: 'Lu e hiao masak char koay teow ka? Geng la.', verified_status: true, upvote_count: 82 },
  { id: 'png-h-037', word_name: 'Cau', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Lari / Cabut', english_equivalent: 'To run / leave quickly', context_of_use: 'Slang', explanation: 'To leave or scram, often in a hurry.', example_sentence: 'Dah lewat la, wa cau dulu, jumpa esok.', verified_status: true, upvote_count: 79 },
  { id: 'png-h-038', word_name: 'Phak', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Pukul / Belasah', english_equivalent: 'To hit / beat', context_of_use: 'Slang', explanation: 'To strike or hit, also used in phak-photo (take a photo) playfully.', example_sentence: 'Jangan main phak orang, nanti kena tangkap.', verified_status: true, upvote_count: 74 },
  { id: 'png-h-039', word_name: 'Angpau', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sampul duit merah', english_equivalent: 'Red money packet', context_of_use: 'Slang', explanation: 'The red packet of money given during festivals and weddings.', example_sentence: 'Tahun ni angpau besar tak? Wa harap la banyak.', verified_status: true, upvote_count: 117 },
  { id: 'png-h-040', word_name: 'Lokun', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Doktor', english_equivalent: 'Doctor', context_of_use: 'Slang', explanation: 'The Hokkien word for a doctor, still heard among older Penangites.', example_sentence: 'Lu pi jumpa lokun la kalau batuk tak baik-baik.', verified_status: true, upvote_count: 72 },
  { id: 'png-h-041', word_name: 'Char koay teow', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Kuey teow goreng', english_equivalent: 'Stir-fried flat noodles', context_of_use: 'Slang', explanation: 'Penang signature wok-fried flat rice noodles, best with cockles and prawns.', example_sentence: 'Char koay teow paling sedap kena guna kerang segar.', verified_status: true, upvote_count: 156 },
  { id: 'png-h-042', word_name: 'Koay teow th-ng', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Sup kuey teow', english_equivalent: 'Flat noodle soup', context_of_use: 'Slang', explanation: 'A clear, comforting flat-noodle soup, a Penang breakfast favourite.', example_sentence: 'Pagi-pagi sedap makan koay teow th-ng panas.', verified_status: true, upvote_count: 103 },
  { id: 'png-h-043', word_name: 'Lobak', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Lobak (makanan goreng)', english_equivalent: 'Five-spice meat rolls', context_of_use: 'Slang', explanation: 'A platter of fried five-spice pork rolls and fritters with dipping sauce.', example_sentence: 'Petang ni jom makan lobak kat lorong belakang.', verified_status: true, upvote_count: 87 },
  { id: 'png-h-044', word_name: 'Tambah', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Tambah (pinggan kedua)', english_equivalent: 'To add a second helping', context_of_use: 'Slang', explanation: 'To order an extra portion, often heard at hawker stalls in Penang.', example_sentence: 'Sedap sangat sampai wa tambah satu pinggan lagi.', verified_status: true, upvote_count: 76 },
  { id: 'png-h-045', word_name: 'Kongkang', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Lembap / Perlahan', english_equivalent: 'Sluggish / Slow-witted', context_of_use: 'Slang', explanation: 'Describes someone slow, dim, or unresponsive in action.', example_sentence: 'Awat lu kongkang sangat, dah lama wa suruh siapkan.', verified_status: true, upvote_count: 69 },
  { id: 'png-h-046', word_name: 'Sotong', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Bingung / Tak tentu arah', english_equivalent: 'Clueless / Blur (like a squid)', context_of_use: 'Slang', explanation: 'Literally squid, used playfully to call someone clueless or disoriented.', example_sentence: 'Jangan sotong la, ikut wa, tau jalan ka tak?', verified_status: true, upvote_count: 99 },
  { id: 'png-h-047', word_name: 'Kena', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Terkena / Dapat', english_equivalent: 'To get hit / be subjected to', context_of_use: 'Slang', explanation: 'To be on the receiving end of something, usually unfortunate.', example_sentence: 'Wa kena saman sebab park motor salah tempat.', verified_status: true, upvote_count: 81 },
  { id: 'png-h-048', word_name: 'Gostan', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Undur kereta', english_equivalent: 'To reverse (a vehicle)', context_of_use: 'Slang', explanation: 'To reverse, from the English go-astern, heavily used across Penang.', example_sentence: 'Gostan sikit, lori tak boleh lalu kalau lu park sini.', verified_status: true, upvote_count: 92 },
  { id: 'png-h-049', word_name: 'Buaya', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Kuat mengorat', english_equivalent: 'A flirt / playboy', context_of_use: 'Slang', explanation: 'Literally crocodile, used for a smooth-talking flirt or womaniser.', example_sentence: 'Buaya betul mamat tu, semua cha bor dia kacau.', verified_status: true, upvote_count: 78 },
  { id: 'png-h-050', word_name: 'Yum cha', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Minum-minum / Lepak', english_equivalent: 'To go for drinks / hang out', context_of_use: 'Slang', explanation: 'Literally drink tea, an invitation to gather and chat over drinks.', example_sentence: 'Malam ni yum cha tak? Lama tak jumpa geng.', verified_status: true, upvote_count: 105 },
  { id: 'png-h-051', word_name: 'Tahan', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Bertahan / Sabar', english_equivalent: 'To endure / withstand', context_of_use: 'Slang', explanation: 'To put up with or endure something difficult.', example_sentence: 'Tahan sikit la, sikit lagi sampai rumah.', verified_status: true, upvote_count: 71 },
  { id: 'png-h-052', word_name: 'Kasi', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Bagi / Beri', english_equivalent: 'To give / let', context_of_use: 'Slang', explanation: 'To give or to allow, blended into Penang Malay-Hokkien speech.', example_sentence: 'Kasi wa tengok sat, wa nak pilih satu.', verified_status: true, upvote_count: 83 },
  { id: 'png-h-053', word_name: 'Pulak', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Pula', english_equivalent: 'Again / on top of that', context_of_use: 'Slang', explanation: 'A particle adding surprise or emphasis, very common in Penang chatter.', example_sentence: 'Lu datang lambat pulak hari ni, apahal?', verified_status: true, upvote_count: 77 },
  { id: 'png-h-054', word_name: 'Aiyoh', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Alamak / Aduh', english_equivalent: 'Oh no / Oh dear', context_of_use: 'Slang', explanation: 'A versatile exclamation of surprise, dismay, or sympathy.', example_sentence: 'Aiyoh, macam mana boleh jadi macam ni?', verified_status: true, upvote_count: 114 },
  { id: 'png-h-055', word_name: 'Walao', primary_language: 'Chinese', dialect_type: 'Penang Hokkien', state_origin: 'Penang', standard_bm_equivalent: 'Wah / Hampeh', english_equivalent: 'Wow / Geez (mild exclamation)', context_of_use: 'Slang', explanation: 'An exclamation of disbelief or amazement, often stretched to walao-eh.', example_sentence: 'Walao, mahal betul harga durian tahun ni.', verified_status: true, upvote_count: 102 },

  // ---------- PENANG MALAY (Logat Utara / Loghat Pulau Pinang) ----------
  { id: 'png-m-001', word_name: 'Cek', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Saya', english_equivalent: 'I / Me', context_of_use: 'Slang', explanation: 'The soft, polite first-person pronoun characteristic of Penang Malay, gentler than aku.', example_sentence: 'Cek dok sini ja, hang pi dulu la.', verified_status: true, upvote_count: 143 },
  { id: 'png-m-002', word_name: 'Hang', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Awak / Kamu', english_equivalent: 'You', context_of_use: 'Slang', explanation: 'The northern second-person pronoun, iconic to Penang and Kedah speech.', example_sentence: 'Hang nak pi mana tu? Bawak cek sekali boleh?', verified_status: true, upvote_count: 152 },
  { id: 'png-m-003', word_name: 'Hampa', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Kamu semua / Korang', english_equivalent: 'You all', context_of_use: 'Slang', explanation: 'The plural you, addressing a group of people.', example_sentence: 'Hampa semua dah makan ka belum ni?', verified_status: true, upvote_count: 121 },
  { id: 'png-m-004', word_name: 'Depa', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Mereka', english_equivalent: 'They / Them', context_of_use: 'Slang', explanation: 'The northern word for they or them.', example_sentence: 'Depa dah balik kampung semalam, rumah kosong la.', verified_status: true, upvote_count: 110 },
  { id: 'png-m-005', word_name: 'Pi', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Pergi', english_equivalent: 'To go', context_of_use: 'Slang', explanation: 'A clipped form of pergi, used constantly in everyday Penang Malay.', example_sentence: 'Jom pi pasar malam Air Itam petang ni.', verified_status: true, upvote_count: 129 },
  { id: 'png-m-006', word_name: 'Mai', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Mari / Datang', english_equivalent: 'To come', context_of_use: 'Slang', explanation: 'To come, from mari, often paired as habaq mai (tell me).', example_sentence: 'Mai sini sat, cek nak tunjuk hang sesuatu.', verified_status: true, upvote_count: 118 },
  { id: 'png-m-007', word_name: 'Awat', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Kenapa / Mengapa', english_equivalent: 'Why', context_of_use: 'Slang', explanation: 'The northern way of asking why, a signature word of the dialect.', example_sentence: 'Awat hang muram ja hari ni? Ada masalah ka?', verified_status: true, upvote_count: 134 },
  { id: 'png-m-008', word_name: 'Habaq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Beritahu / Khabar', english_equivalent: 'To tell / inform', context_of_use: 'Slang', explanation: 'To tell or inform, from khabar. Habaq mai means tell me.', example_sentence: 'Habaq mai apa jadi semalam, cek tak tau apa-apa.', verified_status: true, upvote_count: 126 },
  { id: 'png-m-009', word_name: 'Pasai', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Pasal / Sebab', english_equivalent: 'Because / About', context_of_use: 'Slang', explanation: 'Means because of, or regarding something, from pasal.', example_sentence: 'Pasai hujan la cek tak datang semalam.', verified_status: true, upvote_count: 108 },
  { id: 'png-m-010', word_name: 'Dok', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Sedang / Duduk', english_equivalent: 'Doing / staying (continuous)', context_of_use: 'Slang', explanation: 'Marks an ongoing action (dok buat = is doing) or simply to stay/sit.', example_sentence: 'Cek dok tunggu hang dari tadi, mana hang pi?', verified_status: true, upvote_count: 113 },
  { id: 'png-m-011', word_name: 'Tang', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Kat / Di', english_equivalent: 'At / On (location)', context_of_use: 'Slang', explanation: 'Indicates a location, a short northern form of di or kat.', example_sentence: 'Letak barang tang meja tu dulu, nanti cek kemas.', verified_status: true, upvote_count: 88 },
  { id: 'png-m-012', word_name: 'Sat', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Sekejap', english_equivalent: 'A moment / a while', context_of_use: 'Slang', explanation: 'A short while, from sekejap. Satni or satgi means later.', example_sentence: 'Tunggu sat, cek ambik dompet kejap.', verified_status: true, upvote_count: 96 },
  { id: 'png-m-013', word_name: 'Satgi', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Nanti / Sekejap lagi', english_equivalent: 'Later / In a bit', context_of_use: 'Slang', explanation: 'Means later or in a short while, a contraction of sekejap lagi.', example_sentence: 'Satgi kita sambung, cek nak makan dulu.', verified_status: true, upvote_count: 90 },
  { id: 'png-m-014', word_name: 'Loyaq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Mengarut / Menyampah', english_equivalent: 'Nonsense / annoying talk', context_of_use: 'Slang', explanation: 'Describes nonsense talk or someone being annoyingly long-winded.', example_sentence: 'Dok loyaq ja keja hang, betui ka tak ni?', verified_status: true, upvote_count: 84 },
  { id: 'png-m-015', word_name: 'Selipaq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Selipar', english_equivalent: 'Slippers / sandals', context_of_use: 'Slang', explanation: 'The northern pronunciation of selipar with the trademark glottal ending.', example_sentence: 'Mana selipaq cek? Tadi letak depan pintu.', verified_status: true, upvote_count: 79 },
  { id: 'png-m-016', word_name: 'Cilaka', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Celaka / Sial', english_equivalent: 'Damn / blasted', context_of_use: 'Insult', explanation: 'An exclamation of frustration or a mild curse at bad luck.', example_sentence: 'Cilaka punya nyamuk, gigit cek sampai bengkak.', verified_status: true, upvote_count: 74 },
  { id: 'png-m-017', word_name: 'Hangin', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Marah / Geram', english_equivalent: 'Angry / fuming', context_of_use: 'Slang', explanation: 'Literally wind, used figuratively to mean someone is fuming with anger.', example_sentence: 'Hang jangan buat cek hangin la pagi-pagi ni.', verified_status: true, upvote_count: 92 },
  { id: 'png-m-018', word_name: 'Tokleh', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Tak boleh', english_equivalent: 'Cannot', context_of_use: 'Slang', explanation: 'A contraction of tak boleh, meaning cannot or not allowed.', example_sentence: 'Tokleh la macam ni, kena cari jalan lain.', verified_status: true, upvote_count: 86 },
  { id: 'png-m-019', word_name: 'Toksah', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Tak payah / Jangan', english_equivalent: 'No need / do not', context_of_use: 'Slang', explanation: 'Means do not bother or no need, from tak usah.', example_sentence: 'Toksah susah-susah masak, kita beli ja kat luar.', verified_status: true, upvote_count: 82 },
  { id: 'png-m-020', word_name: 'Noh', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Kan? / Betul tak?', english_equivalent: 'Right? / is it not?', context_of_use: 'Slang', explanation: 'A confirmation tag at the end of sentences, like the standard kan.', example_sentence: 'Sedap noh nasi kandar kedai tu?', verified_status: true, upvote_count: 95 },
  { id: 'png-m-021', word_name: 'Cer', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Cuba / Try', english_equivalent: 'Try / let me see', context_of_use: 'Slang', explanation: 'A prompt to try or show something, from cuba. Cer tengok = let me see.', example_sentence: 'Cer hang habaq, apa cek buat salah?', verified_status: true, upvote_count: 80 },
  { id: 'png-m-022', word_name: 'Berabuq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Berlambak / Banyak sangat', english_equivalent: 'Loads / a whole lot', context_of_use: 'Slang', explanation: 'Indicates a large, messy amount of something, literally dusty/plentiful.', example_sentence: 'Keja berabuq tang ofis, tak habis-habis.', verified_status: true, upvote_count: 76 },
  { id: 'png-m-023', word_name: 'Gabra', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Panik / Gelabah', english_equivalent: 'Flustered / panicky', context_of_use: 'Slang', explanation: 'To become flustered or panic-stricken in a tense moment.', example_sentence: 'Jangan gabra, ambik nafas, fikir elok-elok dulu.', verified_status: true, upvote_count: 83 },
  { id: 'png-m-024', word_name: 'Lansi', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Sombong / Berlagak', english_equivalent: 'Arrogant / cocky', context_of_use: 'Insult', explanation: 'Describes someone who is haughty, snobbish, or full of themselves.', example_sentence: 'Lansi betui mamat tu, baru ada kereta sikit dah berlagak.', verified_status: true, upvote_count: 100 },
  { id: 'png-m-025', word_name: 'Poyo', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Kelakar tak kena / Berlagak murah', english_equivalent: 'Corny / lame show-off', context_of_use: 'Slang', explanation: 'Describes someone tacky, corny, or trying too hard to look cool.', example_sentence: 'Poyo la gaya hang tu, biasa ja pun.', verified_status: true, upvote_count: 97 },
  { id: 'png-m-026', word_name: 'Selamba', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Buat tak tahu / Bersahaja', english_equivalent: 'Nonchalant / poker-faced', context_of_use: 'Slang', explanation: 'Acting unbothered or carefree, even when one perhaps should not be.', example_sentence: 'Dia selamba ja jawab walaupun salah besar.', verified_status: true, upvote_count: 85 },
  { id: 'png-m-027', word_name: 'Sembang', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Berbual / Borak', english_equivalent: 'To chat / chit-chat', context_of_use: 'Slang', explanation: 'To chat or have a casual conversation, also a friendly boast.', example_sentence: 'Jom sembang kat warung, lama tak update cerita.', verified_status: true, upvote_count: 104 },
  { id: 'png-m-028', word_name: 'Lepak', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Bersantai / Melepak', english_equivalent: 'To hang out / chill', context_of_use: 'Slang', explanation: 'To relax and hang out with no particular agenda.', example_sentence: 'Malam ni lepak kat Padang Kota tepi laut.', verified_status: true, upvote_count: 111 },
  { id: 'png-m-029', word_name: 'Lokek', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Kedekut / Bakhil', english_equivalent: 'Stingy / miserly', context_of_use: 'Insult', explanation: 'Describes a person who is reluctant to spend or share money.', example_sentence: 'Lokek betui hang, belanja air pun tak nak.', verified_status: true, upvote_count: 89 },
  { id: 'png-m-030', word_name: 'Cikai', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Murah / Tak berkualiti', english_equivalent: 'Cheapskate / low quality', context_of_use: 'Slang', explanation: 'Describes something cheap and shoddy, or a person who is a cheapskate.', example_sentence: 'Barang cikai ni cepat rosak, jangan beli.', verified_status: true, upvote_count: 73 },
  { id: 'png-m-031', word_name: 'Pekena', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Menikmati / Makan-minum', english_equivalent: 'To have / consume (a treat)', context_of_use: 'Slang', explanation: 'To enjoy consuming food or drink, often a leisurely treat.', example_sentence: 'Jom pekena teh tarik panas, sejuk ni.', verified_status: true, upvote_count: 78 },
  { id: 'png-m-032', word_name: 'Berlanja', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Belanja / Menjamu', english_equivalent: 'To treat someone', context_of_use: 'Slang', explanation: 'To pay for someone elses food or drinks as a treat.', example_sentence: 'Hari ni cek berlanja, hang makan apa pun boleh.', verified_status: true, upvote_count: 87 },
  { id: 'png-m-033', word_name: 'Tokey', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Tauke / Bos', english_equivalent: 'Boss / shopkeeper', context_of_use: 'Slang', explanation: 'The Malay rendering of tauke, the owner of a shop or business.', example_sentence: 'Tokey, kurang sikit boleh tak harga ni?', verified_status: true, upvote_count: 81 },
  { id: 'png-m-034', word_name: 'Kerel', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Marah / Hangin', english_equivalent: 'Irritated / annoyed', context_of_use: 'Slang', explanation: 'To be irritated or short-tempered about something.', example_sentence: 'Hang buat cek kerel la dengan perangai macam tu.', verified_status: true, upvote_count: 68 },
  { id: 'png-m-035', word_name: 'Lokun', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Doktor (pinjaman Hokkien)', english_equivalent: 'Doctor', context_of_use: 'Slang', explanation: 'A Hokkien loanword for doctor that also lives in Penang Malay speech.', example_sentence: 'Pi jumpa lokun la, demam dah tiga hari.', verified_status: true, upvote_count: 66 },
  { id: 'png-m-036', word_name: 'Tatang', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Junjung / Bawa elok-elok', english_equivalent: 'To carry carefully / pamper', context_of_use: 'Slang', explanation: 'To carry something carefully with both hands, or to pamper someone.', example_sentence: 'Anak tunggal, mak dia tatang macam minyak penuh.', verified_status: true, upvote_count: 64 },
  { id: 'png-m-037', word_name: 'Cethaq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Berselerak / Tumpah merata', english_equivalent: 'Splattered / scattered', context_of_use: 'Slang', explanation: 'When something splashes, scatters, or sprays around messily.', example_sentence: 'Kuah cethaq satu meja sebab budak main laju.', verified_status: true, upvote_count: 61 },
  { id: 'png-m-038', word_name: 'Cokia', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Terror / Power / Hebat', english_equivalent: 'Top-notch / impressive', context_of_use: 'Slang', explanation: 'A northern slang of approval meaning excellent or first-class.', example_sentence: 'Cokia betui hang main bola tadi, lima gol.', verified_status: true, upvote_count: 90 },
  { id: 'png-m-039', word_name: 'Polo', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Belasah / Pukul', english_equivalent: 'To thrash / beat up', context_of_use: 'Slang', explanation: 'To beat or thrash someone, also to demolish a task or food.', example_sentence: 'Lapaq sangat sampai cek polo dua pinggan nasi.', verified_status: true, upvote_count: 70 },
  { id: 'png-m-040', word_name: 'Maghi', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Mari', english_equivalent: 'Come (here)', context_of_use: 'Slang', explanation: 'A northern variant of mari, with the trademark guttural gh.', example_sentence: 'Maghi sini, cek nak cakap sikit dengan hang.', verified_status: true, upvote_count: 75 },
  { id: 'png-m-041', word_name: 'Lengoq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Lenguh / Penat sendi', english_equivalent: 'Aching / stiff (joints)', context_of_use: 'Slang', explanation: 'The feeling of stiff, aching muscles or joints after exertion.', example_sentence: 'Lengoq badan cek lepas angkat barang seharian.', verified_status: true, upvote_count: 62 },
  { id: 'png-m-042', word_name: 'Cabuq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Comot / Kotor', english_equivalent: 'Grubby / dirty', context_of_use: 'Slang', explanation: 'Describes a grubby, soiled, or untidy appearance.', example_sentence: 'Muka hang cabuq, pi basuh dulu sebelum makan.', verified_status: true, upvote_count: 59 },
  { id: 'png-m-043', word_name: 'Tergedik', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Gatal / Tak senang duduk', english_equivalent: 'Restless / attention-seeking', context_of_use: 'Slang', explanation: 'Describes someone fidgety or craving attention in an over-eager way.', example_sentence: 'Tergedik betui budak ni, dok diam tak boleh ka?', verified_status: true, upvote_count: 67 },
  { id: 'png-m-044', word_name: 'Loghat', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Loghat / Dialek', english_equivalent: 'Dialect / accent', context_of_use: 'Formal', explanation: 'The word for a regional dialect or accent, the very heart of this app.', example_sentence: 'Loghat utara memang sedap didengar, ada rentak dia.', verified_status: true, upvote_count: 88 },
  { id: 'png-m-045', word_name: 'Lawa', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Cantik / Kemas', english_equivalent: 'Pretty / smart-looking', context_of_use: 'Endearment', explanation: 'A compliment that someone looks pretty or well put together.', example_sentence: 'Lawa hang berbaju kurung hari raya tu.', verified_status: true, upvote_count: 93 },
  { id: 'png-m-046', word_name: 'Beghteh', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Berhenti', english_equivalent: 'To stop', context_of_use: 'Slang', explanation: 'A northern pronunciation of berhenti with the rolled gh sound.', example_sentence: 'Beghteh kejap kat kedai depan, cek nak beli air.', verified_status: true, upvote_count: 60 },
  { id: 'png-m-047', word_name: 'Cangkriah', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Riuh / Bising', english_equivalent: 'Rowdy / noisy commotion', context_of_use: 'Slang', explanation: 'A loud, rowdy commotion or hubbub of chatter.', example_sentence: 'Cangkriah betui budak-budak ni main kat luar.', verified_status: true, upvote_count: 57 },
  { id: 'png-m-048', word_name: 'Pasaq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Pasar', english_equivalent: 'Market', context_of_use: 'Slang', explanation: 'The northern pronunciation of pasar with the glottal stop ending.', example_sentence: 'Pagi tadi cek pi pasaq beli ikan segar.', verified_status: true, upvote_count: 65 },
  { id: 'png-m-049', word_name: 'Ghoyak', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Cakap / Beritahu', english_equivalent: 'To say / tell', context_of_use: 'Slang', explanation: 'A northern word for to say or tell, similar to habaq.', example_sentence: 'Ghoyak kat cek apa hang nak, jangan segan.', verified_status: true, upvote_count: 71 },
  { id: 'png-m-050', word_name: 'Cethaih', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Selesai / Habis', english_equivalent: 'Done / settled', context_of_use: 'Slang', explanation: 'Indicates a task is finished, settled, or cleared up.', example_sentence: 'Dah cethaih semua keja, bolehlah cek balik.', verified_status: true, upvote_count: 63 },
  { id: 'png-m-051', word_name: 'Tepiaq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Tampar / Penampar', english_equivalent: 'A slap', context_of_use: 'Slang', explanation: 'A slap with an open hand, used as a mock-threat among friends.', example_sentence: 'Nanti cek tepiaq baru hang tau, jangan kacau.', verified_status: true, upvote_count: 58 },
  { id: 'png-m-052', word_name: 'Loklaq', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Lurus bendul / Mudah kena tipu', english_equivalent: 'Naive / easily fooled', context_of_use: 'Slang', explanation: 'Describes someone gullible or simple who is easily taken advantage of.', example_sentence: 'Jangan loklaq sangat, fikir dulu sebelum bagi duit.', verified_status: true, upvote_count: 69 },
  { id: 'png-m-053', word_name: 'Tokmik', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Tak ada apa / Bukan apa', english_equivalent: 'Nothing much / it is nothing', context_of_use: 'Slang', explanation: 'A dismissive phrase meaning it is nothing or no big deal.', example_sentence: 'Tokmik la, cek ok ja, hang jangan risau.', verified_status: true, upvote_count: 55 },
  { id: 'png-m-054', word_name: 'Beghani', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Berani', english_equivalent: 'Brave / daring', context_of_use: 'Slang', explanation: 'The northern pronunciation of berani with the trademark rolled gh.', example_sentence: 'Beghani hang lawan cek main Dialect IQ Quiz?', verified_status: true, upvote_count: 72 },
  { id: 'png-m-055', word_name: 'Hampagas', primary_language: 'Malay', dialect_type: 'Logat Utara', state_origin: 'Penang', standard_bm_equivalent: 'Tergesa-gesa / Laju sangat', english_equivalent: 'Rushing / in a frenzy', context_of_use: 'Slang', explanation: 'To do something in a hurried, frantic manner without care.', example_sentence: 'Jangan hampagas sangat, nanti tertinggal barang.', verified_status: true, upvote_count: 54 },
];

// ============================================================================
// PERAK SLANG & ACCENT LIBRARY (Logat Perak + Ipoh Cantonese-influenced street talk)
// A 100+ vocabulary set for the Silver State — central Perak Malay plus Kinta Valley Chinese.
// ============================================================================
const PERAK_DIALECT_ENTRIES: DialectEntry[] = [
  // ---------- PERAK MALAY (Logat Perak — Perak Tengah / Hilir) ----------
  { id: 'prk-m-001', word_name: 'Teh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Awak / Kamu', english_equivalent: 'You', context_of_use: 'Slang', explanation: 'The signature Perak second-person pronoun, soft and friendly — a true marker of Logat Perak.', example_sentence: 'Teh nak pi mana tu? Jom ikut sekali.', verified_status: true, upvote_count: 167 },
  { id: 'prk-m-002', word_name: 'Mende', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Benda / Apa', english_equivalent: 'Thing / what', context_of_use: 'Slang', explanation: 'Means thing or what, from benda, with the classic Perak final-e shift.', example_sentence: 'Mende teh dok buat tu? Nampak serius betui.', verified_status: true, upvote_count: 152 },
  { id: 'prk-m-003', word_name: 'Mengkali', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Mungkin / Barangkali', english_equivalent: 'Maybe / perhaps', context_of_use: 'Slang', explanation: 'Used to express possibility or uncertainty, a beloved Perak filler word.', example_sentence: 'Mengkali dia tak datang la, dah lewat sangat ni.', verified_status: true, upvote_count: 141 },
  { id: 'prk-m-004', word_name: 'Lengoh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Lenguh / Penat sendi', english_equivalent: 'Aching / sore', context_of_use: 'Slang', explanation: 'The feeling of stiff, aching muscles after hard work or a long day.', example_sentence: 'Lengoh badan aku lepas tolong angkat barang sepanjang hari.', verified_status: true, upvote_count: 118 },
  { id: 'prk-m-005', word_name: 'Lawe', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Cantik / Lawa', english_equivalent: 'Pretty / good-looking', context_of_use: 'Endearment', explanation: 'A compliment meaning pretty, with the Perak terminal a-to-e shift from lawa.', example_sentence: 'Lawe betui baju kurung teh hari ni.', verified_status: true, upvote_count: 124 },
  { id: 'prk-m-006', word_name: 'Kome', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Kamu / Awak semua', english_equivalent: 'You / you all', context_of_use: 'Slang', explanation: 'A regional pronoun for you, shared along the Perak-Pahang interior belt.', example_sentence: 'Kome orang nak makan kat mana petang ni?', verified_status: true, upvote_count: 109 },
  { id: 'prk-m-007', word_name: 'Sangkut', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tersangkut / Sibuk', english_equivalent: 'Stuck / tied up', context_of_use: 'Slang', explanation: 'To be held up or tied up with something so you cannot leave.', example_sentence: 'Aku sangkut sikit kat ofis, teh pi dulu la.', verified_status: true, upvote_count: 86 },
  { id: 'prk-m-008', word_name: 'Cedok', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sauk / Ambil dengan senduk', english_equivalent: 'To scoop / ladle', context_of_use: 'Slang', explanation: 'To scoop food or water using a ladle or container.', example_sentence: 'Tolong cedok kan kuah tu sikit dalam mangkuk.', verified_status: true, upvote_count: 74 },
  { id: 'prk-m-009', word_name: 'Seleghet', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Berselerak / Tak kemas', english_equivalent: 'Messy / scattered', context_of_use: 'Slang', explanation: 'Describes a cluttered, untidy space or situation.', example_sentence: 'Bilik teh ni seleghet betui, kemas la sikit.', verified_status: true, upvote_count: 69 },
  { id: 'prk-m-010', word_name: 'Tokmo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tak mahu', english_equivalent: 'Do not want', context_of_use: 'Slang', explanation: 'A contraction of tak mahu, said quickly in Perak speech.', example_sentence: 'Aku tokmo makan dah, kenyang sangat ni.', verified_status: true, upvote_count: 81 },
  { id: 'prk-m-011', word_name: 'Ralit', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Leka / Khusyuk', english_equivalent: 'Engrossed / absorbed', context_of_use: 'Slang', explanation: 'To be so absorbed in something that you lose track of time.', example_sentence: 'Ralit sangat main game sampai lupa nak makan.', verified_status: true, upvote_count: 78 },
  { id: 'prk-m-012', word_name: 'Begho', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bergurau / Main-main', english_equivalent: 'To joke around', context_of_use: 'Slang', explanation: 'To joke, tease, or fool around with friends.', example_sentence: 'Jangan begho sangat, nanti orang ingat betui pulak.', verified_status: true, upvote_count: 64 },
  { id: 'prk-m-013', word_name: 'Loghat', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Loghat / Dialek', english_equivalent: 'Dialect / accent', context_of_use: 'Formal', explanation: 'The regional accent or dialect — the very thing Perak folk are proud of.', example_sentence: 'Loghat Perak ni lembut, sedap didengar.', verified_status: true, upvote_count: 88 },
  { id: 'prk-m-014', word_name: 'Ce', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Cuba / Try', english_equivalent: 'Try / go on', context_of_use: 'Slang', explanation: 'A prompt to try or attempt something, clipped from cuba.', example_sentence: 'Ce teh teka, mende dalam kotak ni?', verified_status: true, upvote_count: 71 },
  { id: 'prk-m-015', word_name: 'Ngumpo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Berkumpul / Beramai-ramai', english_equivalent: 'To gather / hang out', context_of_use: 'Slang', explanation: 'To gather together in a group, often for a meal or chat.', example_sentence: 'Jom ngumpo kat warung Pak Mat malam ni.', verified_status: true, upvote_count: 66 },
  { id: 'prk-m-016', word_name: 'Sayo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Saya', english_equivalent: 'I / me', context_of_use: 'Slang', explanation: 'A Perak rendering of saya, with the soft terminal vowel.', example_sentence: 'Sayo orang Teluk Intan, teh dari mana?', verified_status: true, upvote_count: 73 },
  { id: 'prk-m-017', word_name: 'Aok', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Ya / Betul', english_equivalent: 'Yes / yeah', context_of_use: 'Slang', explanation: 'A casual yes or agreement, common across Perak conversation.', example_sentence: 'Aok la, betui cakap teh tu.', verified_status: true, upvote_count: 62 },
  { id: 'prk-m-018', word_name: 'Memban', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Kawan / Geng', english_equivalent: 'Friend / buddy', context_of_use: 'Slang', explanation: 'A friend or member of your circle, from member.', example_sentence: 'Memban aku semua dah sampai, tinggal teh ja.', verified_status: true, upvote_count: 79 },
  { id: 'prk-m-019', word_name: 'Lokun', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Doktor', english_equivalent: 'Doctor', context_of_use: 'Slang', explanation: 'An old loanword for doctor, still heard among older Perakians.', example_sentence: 'Pi jumpa lokun la, batuk teh tak baik-baik.', verified_status: true, upvote_count: 58 },
  { id: 'prk-m-020', word_name: 'Sekete', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sekejap', english_equivalent: 'A moment / a while', context_of_use: 'Slang', explanation: 'A short while, from sekejap with the Perak ending.', example_sentence: 'Tunggu sekete, aku ambik dompet kejap.', verified_status: true, upvote_count: 67 },
  { id: 'prk-m-021', word_name: 'Bedebah', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Celaka / Sial', english_equivalent: 'Confounded / blasted', context_of_use: 'Insult', explanation: 'A mild curse of frustration or annoyance at someone or something.', example_sentence: 'Bedebah punya kucing, makan ikan atas meja.', verified_status: true, upvote_count: 60 },
  { id: 'prk-m-022', word_name: 'Ralat', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sibuk / Kelam-kabut', english_equivalent: 'Hectic / in a fluster', context_of_use: 'Slang', explanation: 'Describes a busy, flustered, or chaotic state of affairs.', example_sentence: 'Ralat betui pagi tadi, semua orang nak guna bilik air.', verified_status: true, upvote_count: 55 },
  { id: 'prk-m-023', word_name: 'Cokia', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Power / Terror', english_equivalent: 'Top-notch / excellent', context_of_use: 'Slang', explanation: 'A term of approval meaning excellent or first-class.', example_sentence: 'Cokia la teh main bola tadi, tiga gol.', verified_status: true, upvote_count: 84 },
  { id: 'prk-m-024', word_name: 'Maghi', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Mari / Datang', english_equivalent: 'Come (here)', context_of_use: 'Slang', explanation: 'A variant of mari, heard in upper Perak near the Kedah border.', example_sentence: 'Maghi sini sekejap, aku nak tunjuk teh sesuatu.', verified_status: true, upvote_count: 70 },
  { id: 'prk-m-025', word_name: 'Pinggang', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tepi / Sebelah', english_equivalent: 'Side / edge', context_of_use: 'Slang', explanation: 'Refers to the side or edge of a place, e.g. roadside.', example_sentence: 'Letak motor kat pinggang jalan tu dulu.', verified_status: true, upvote_count: 52 },
  { id: 'prk-m-026', word_name: 'Gegemok', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Gemuk sikit / Berisi', english_equivalent: 'Chubby / plump', context_of_use: 'Endearment', explanation: 'An affectionate way to describe someone slightly chubby.', example_sentence: 'Dah gegemok sikit budak ni, sihat la nampak.', verified_status: true, upvote_count: 57 },
  { id: 'prk-m-027', word_name: 'Mendepo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Mengada-ngada', english_equivalent: 'Acting up / fussy', context_of_use: 'Slang', explanation: 'Describes someone being fussy, dramatic, or attention-seeking.', example_sentence: 'Jangan mendepo sangat, makan ja apa yang ada.', verified_status: true, upvote_count: 49 },
  { id: 'prk-m-028', word_name: 'Lokek', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Kedekut / Bakhil', english_equivalent: 'Stingy / miserly', context_of_use: 'Insult', explanation: 'A person reluctant to spend or share money.', example_sentence: 'Lokek betui teh, belanja air pun tak nak.', verified_status: true, upvote_count: 63 },
  { id: 'prk-m-029', word_name: 'Senyung', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Senyum simpul', english_equivalent: 'A shy little smile', context_of_use: 'Endearment', explanation: 'A small, shy, or knowing smile.', example_sentence: 'Dia senyung ja bila nama dia disebut.', verified_status: true, upvote_count: 47 },
  { id: 'prk-m-030', word_name: 'Lopak', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Lopak air / Lompang', english_equivalent: 'Puddle / pothole', context_of_use: 'Slang', explanation: 'A puddle or water-filled hole in the road.', example_sentence: 'Hati-hati, banyak lopak kat jalan ni lepas hujan.', verified_status: true, upvote_count: 44 },
  { id: 'prk-m-031', word_name: 'Semonggok', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bertimbun / Banyak sangat', english_equivalent: 'A heap / loads', context_of_use: 'Slang', explanation: 'A large heap or pile of something.', example_sentence: 'Kerja aku semonggok lagi, tak habis-habis.', verified_status: true, upvote_count: 53 },
  { id: 'prk-m-032', word_name: 'Tepedaya', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tertipu / Kena perdaya', english_equivalent: 'Tricked / fooled', context_of_use: 'Slang', explanation: 'To be deceived or taken in by a trick.', example_sentence: 'Aku tepedaya beli barang murah yang rosak tu.', verified_status: true, upvote_count: 48 },
  { id: 'prk-m-033', word_name: 'Gobang', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Duit syiling / Sen', english_equivalent: 'Small coins / cents', context_of_use: 'Slang', explanation: 'Loose change or small coins, an old Perak term.', example_sentence: 'Ada gobang tak? Nak bayar parking kejap.', verified_status: true, upvote_count: 41 },
  { id: 'prk-m-034', word_name: 'Beghonggeng', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Berkeliaran / Merayau', english_equivalent: 'To roam / wander about', context_of_use: 'Slang', explanation: 'To wander or roam around aimlessly.', example_sentence: 'Dari pagi teh beghonggeng ja, tak balik rumah.', verified_status: true, upvote_count: 39 },
  { id: 'prk-m-035', word_name: 'Hapo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Apa', english_equivalent: 'What', context_of_use: 'Slang', explanation: 'A casual what, used in quick Perak exchanges.', example_sentence: 'Hapo teh cakap tadi? Tak dengar betui.', verified_status: true, upvote_count: 56 },
  { id: 'prk-m-036', word_name: 'Demo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Kamu (jamak)', english_equivalent: 'You all', context_of_use: 'Slang', explanation: 'You in plural, used in northern Perak districts.', example_sentence: 'Demo semua dah makan ka belum ni?', verified_status: true, upvote_count: 50 },
  { id: 'prk-m-037', word_name: 'Kobaq', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Khabar / Berita', english_equivalent: 'News / word', context_of_use: 'Slang', explanation: 'News or word about something, from khabar.', example_sentence: 'Ada kobaq tak pasal kenduri minggu depan?', verified_status: true, upvote_count: 45 },
  { id: 'prk-m-038', word_name: 'Tergegau', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Terkejut / Tergamam', english_equivalent: 'Startled / dazed', context_of_use: 'Slang', explanation: 'To be startled awake or caught off guard.', example_sentence: 'Aku tergegau dengar bunyi kuat tengah malam.', verified_status: true, upvote_count: 42 },
  { id: 'prk-m-039', word_name: 'Pekena', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Menikmati makan-minum', english_equivalent: 'To have / enjoy (food)', context_of_use: 'Slang', explanation: 'To enjoy consuming food or drink at leisure.', example_sentence: 'Jom pekena teh tarik kat mamak sebelah.', verified_status: true, upvote_count: 61 },
  { id: 'prk-m-040', word_name: 'Tokleh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tak boleh', english_equivalent: 'Cannot', context_of_use: 'Slang', explanation: 'A contraction of tak boleh, meaning cannot or not allowed.', example_sentence: 'Tokleh la macam ni, kena cari jalan lain.', verified_status: true, upvote_count: 38 },
  { id: 'prk-m-041', word_name: 'Geghek', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Basikal', english_equivalent: 'Bicycle', context_of_use: 'Slang', explanation: 'A bicycle, from the old word gerek/grek.', example_sentence: 'Budak-budak main geghek kat padang petang tadi.', verified_status: true, upvote_count: 46 },
  { id: 'prk-m-042', word_name: 'Lekoh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Selekoh / Selekoh jalan', english_equivalent: 'A bend / corner', context_of_use: 'Slang', explanation: 'A bend or curve in the road.', example_sentence: 'Lepas lekoh tu belok kiri, sampai la rumah aku.', verified_status: true, upvote_count: 40 },
  { id: 'prk-m-043', word_name: 'Sepoi', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sempoi / Bersahaja', english_equivalent: 'Easygoing / chill', context_of_use: 'Slang', explanation: 'Describes someone relaxed, down-to-earth, and easygoing.', example_sentence: 'Bos aku sepoi ja orangnya, senang nak berbincang.', verified_status: true, upvote_count: 59 },
  { id: 'prk-m-044', word_name: 'Tunggang', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Naik motor / Memandu motor', english_equivalent: 'To ride (a motorbike)', context_of_use: 'Slang', explanation: 'To ride a motorbike, a everyday Perak word.', example_sentence: 'Aku tunggang motor pi kerja tiap-tiap hari.', verified_status: true, upvote_count: 43 },
  { id: 'prk-m-045', word_name: 'Selese', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Selesai / Habis', english_equivalent: 'Done / finished', context_of_use: 'Slang', explanation: 'Indicates a task is finished or settled.', example_sentence: 'Dah selese semua kerja, bolehlah balik.', verified_status: true, upvote_count: 51 },
  { id: 'prk-m-046', word_name: 'Beghombong', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Berkumpulan / Beramai', english_equivalent: 'In a crowd / group', context_of_use: 'Slang', explanation: 'Moving or doing things together in a big group.', example_sentence: 'Depa datang beghombong satu kampung ke kenduri tu.', verified_status: true, upvote_count: 37 },
  { id: 'prk-m-047', word_name: 'Leceh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Menyusahkan / Merepek', english_equivalent: 'Troublesome / a hassle', context_of_use: 'Slang', explanation: 'Something fiddly, troublesome, or a hassle to deal with.', example_sentence: 'Leceh betui borang ni, banyak sangat nak isi.', verified_status: true, upvote_count: 54 },
  { id: 'prk-m-048', word_name: 'Ghembat', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sambar / Ambil cepat', english_equivalent: 'To grab / snatch up', context_of_use: 'Slang', explanation: 'To grab or snap something up quickly, also to demolish food.', example_sentence: 'Lapar sangat sampai aku ghembat dua pinggan nasi.', verified_status: true, upvote_count: 48 },
  { id: 'prk-m-049', word_name: 'Sentiase', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sentiasa / Selalu', english_equivalent: 'Always', context_of_use: 'Slang', explanation: 'Means always, with the Perak final-e softening.', example_sentence: 'Dia sentiase tolong orang, baik hati betui.', verified_status: true, upvote_count: 35 },
  { id: 'prk-m-050', word_name: 'Tumben', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tiba-tiba / Pelik hari ni', english_equivalent: 'Unusually / what is the occasion', context_of_use: 'Slang', explanation: 'Said when someone does something out of the ordinary.', example_sentence: 'Tumben teh bangun awal hari ni, ada hal ka?', verified_status: true, upvote_count: 50 },
  { id: 'prk-m-051', word_name: 'Geli-geleman', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Seram sejuk', english_equivalent: 'Creeped out / squeamish', context_of_use: 'Slang', explanation: 'The squeamish, creepy-crawly feeling of disgust or unease.', example_sentence: 'Geli-geleman aku tengok ulat kat daun tu.', verified_status: true, upvote_count: 33 },
  { id: 'prk-m-052', word_name: 'Ngeteh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Minum teh / Lepak kedai', english_equivalent: 'To have tea / hang out', context_of_use: 'Slang', explanation: 'To go for tea, usually meaning a relaxed chat at a kopitiam.', example_sentence: 'Petang ni jom ngeteh kat kedai sebelah masjid.', verified_status: true, upvote_count: 47 },
  { id: 'prk-m-053', word_name: 'Caghi', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Cari', english_equivalent: 'To look for / search', context_of_use: 'Slang', explanation: 'To search for something, with the rolled Perak gh.', example_sentence: 'Tolong caghi kunci aku kejap, hilang entah ke mana.', verified_status: true, upvote_count: 41 },
  { id: 'prk-m-054', word_name: 'Ponteng', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Ponteng / Lari kelas', english_equivalent: 'To skip (class/work)', context_of_use: 'Slang', explanation: 'To play truant or skip a class or duty.', example_sentence: 'Jangan ponteng sekolah, nanti kena marah cikgu.', verified_status: true, upvote_count: 44 },
  { id: 'prk-m-055', word_name: 'Sedekoh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sedekah / Beri', english_equivalent: 'To give in charity', context_of_use: 'Formal', explanation: 'To give charity or alms, with the Perak guttural ending.', example_sentence: 'Mak selalu sedekoh nasi kat surau tiap Jumaat.', verified_status: true, upvote_count: 36 },
  { id: 'prk-m-056', word_name: 'Tergebar', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Panik / Gelabah', english_equivalent: 'Flustered / panicky', context_of_use: 'Slang', explanation: 'To panic or become flustered in a tense moment.', example_sentence: 'Jangan tergebar, ambik nafas, fikir elok-elok.', verified_status: true, upvote_count: 39 },
  { id: 'prk-m-057', word_name: 'Lengit', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Lekit / Melekit', english_equivalent: 'Sticky', context_of_use: 'Slang', explanation: 'Describes a sticky or tacky texture or surface.', example_sentence: 'Tangan aku lengit lepas makan gula-gula getah.', verified_status: true, upvote_count: 32 },
  { id: 'prk-m-058', word_name: 'Cabo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Comot / Kotor', english_equivalent: 'Grubby / smudged', context_of_use: 'Slang', explanation: 'Describes a grubby or smudged appearance.', example_sentence: 'Muka budak ni cabo, pi basuh dulu.', verified_status: true, upvote_count: 30 },
  { id: 'prk-m-059', word_name: 'Tetiba', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tiba-tiba', english_equivalent: 'Suddenly / out of nowhere', context_of_use: 'Slang', explanation: 'Used when something happens unexpectedly.', example_sentence: 'Tetiba dia muncul kat pintu, terkejut aku.', verified_status: true, upvote_count: 49 },
  { id: 'prk-m-060', word_name: 'Mengular', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Buang masa / Curi tulang', english_equivalent: 'To slack off / goof around', context_of_use: 'Slang', explanation: 'To slack off or avoid work, literally to snake around.', example_sentence: 'Jangan mengular masa kerja, nanti kena tangkap bos.', verified_status: true, upvote_count: 52 },
  { id: 'prk-m-061', word_name: 'Hengat', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Ingat / Sangka', english_equivalent: 'To think / remember', context_of_use: 'Slang', explanation: 'To think, suppose, or remember, from ingat.', example_sentence: 'Aku hengat teh dah balik kampung dah.', verified_status: true, upvote_count: 34 },
  { id: 'prk-m-062', word_name: 'Beghat', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Berat', english_equivalent: 'Heavy', context_of_use: 'Slang', explanation: 'Heavy, with the trademark Perak rolled gh sound.', example_sentence: 'Beghat betui beg ni, apa teh isi dalam?', verified_status: true, upvote_count: 31 },
  { id: 'prk-m-063', word_name: 'Tokse', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tak payah / Jangan', english_equivalent: 'No need / do not bother', context_of_use: 'Slang', explanation: 'Means no need, from tak usah, said quickly.', example_sentence: 'Tokse susah-susah, kita beli ja kat luar.', verified_status: true, upvote_count: 45 },
  { id: 'prk-m-064', word_name: 'Sekoq', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Seekor / Seorang', english_equivalent: 'One (creature/person)', context_of_use: 'Slang', explanation: 'A counting word for one creature, with the Perak glottal ending.', example_sentence: 'Ada sekoq kucing dok tidoq atas kereta aku.', verified_status: true, upvote_count: 28 },
  { id: 'prk-m-065', word_name: 'Ghohani', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Berani', english_equivalent: 'Brave', context_of_use: 'Slang', explanation: 'Brave or daring, in the upper-Perak rolled pronunciation.', example_sentence: 'Ghohani teh lawan aku main Dialect IQ Perak?', verified_status: true, upvote_count: 40 },
  { id: 'prk-m-066', word_name: 'Senereh', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bersepah / Berselerak', english_equivalent: 'Strewn about / messy', context_of_use: 'Slang', explanation: 'Things scattered or strewn carelessly around.', example_sentence: 'Mainan budak senereh satu rumah, penat nak kemas.', verified_status: true, upvote_count: 29 },
  { id: 'prk-m-067', word_name: 'Tatang', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Junjung / Manjakan', english_equivalent: 'To carry carefully / pamper', context_of_use: 'Slang', explanation: 'To carry carefully with both hands, or to pamper someone dearly.', example_sentence: 'Anak tunggal, mak tatang macam minyak penuh.', verified_status: true, upvote_count: 33 },
  { id: 'prk-m-068', word_name: 'Cangkriah', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Riuh / Bising', english_equivalent: 'Rowdy / noisy', context_of_use: 'Slang', explanation: 'A loud, rowdy commotion of chatter or play.', example_sentence: 'Cangkriah betui budak-budak main kat luar tu.', verified_status: true, upvote_count: 27 },
  { id: 'prk-m-069', word_name: 'Lengkang', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Lapang / Lega', english_equivalent: 'Spacious / clear', context_of_use: 'Slang', explanation: 'Open, spacious, or freed up.', example_sentence: 'Lengkang sikit jalan ni lepas pukul lapan malam.', verified_status: true, upvote_count: 26 },
  { id: 'prk-m-070', word_name: 'Bedegil', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Degil / Keras kepala', english_equivalent: 'Stubborn', context_of_use: 'Insult', explanation: 'Describes someone obstinate who refuses to listen.', example_sentence: 'Bedegil betui budak ni, suruh diam tak nak dengar.', verified_status: true, upvote_count: 38 },
  { id: 'prk-m-071', word_name: 'Sayang', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sayang / Rugi', english_equivalent: 'What a waste / pity', context_of_use: 'Slang', explanation: 'Used to express that something is a pity or a waste.', example_sentence: 'Sayang betui makanan terbuang macam ni.', verified_status: true, upvote_count: 35 },
  { id: 'prk-m-072', word_name: 'Tergencat', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Terhenti / Terbantut', english_equivalent: 'Stalled / held up', context_of_use: 'Slang', explanation: 'When progress on something is stalled or interrupted.', example_sentence: 'Projek tu tergencat sebab kurang dana.', verified_status: true, upvote_count: 24 },
  { id: 'prk-m-073', word_name: 'Ngolo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Memujuk / Mengayat', english_equivalent: 'To coax / sweet-talk', context_of_use: 'Slang', explanation: 'To coax, persuade, or sweet-talk someone.', example_sentence: 'Kena ngolo sikit baru budak ni nak makan ubat.', verified_status: true, upvote_count: 30 },
  { id: 'prk-m-074', word_name: 'Selambe', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Selamba / Bersahaja', english_equivalent: 'Nonchalant / poker-faced', context_of_use: 'Slang', explanation: 'Acting unbothered or carefree even when perhaps one should not be.', example_sentence: 'Dia selambe ja jawab walaupun salah besar.', verified_status: true, upvote_count: 42 },
  { id: 'prk-m-075', word_name: 'Bingit', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bising mengganggu / Sakit telinga', english_equivalent: 'Irritatingly noisy', context_of_use: 'Slang', explanation: 'A noise so loud or shrill it grates on the ears.', example_sentence: 'Bingit telinga aku dengar dia menjerit-jerit.', verified_status: true, upvote_count: 25 },
  { id: 'prk-m-076', word_name: 'Tongkang', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bersepah teruk', english_equivalent: 'Total mess (like a wrecked barge)', context_of_use: 'Slang', explanation: 'From tongkang pecah — a place in total disarray.', example_sentence: 'Bilik teh macam tongkang pecah, kemas la sikit.', verified_status: true, upvote_count: 31 },
  { id: 'prk-m-077', word_name: 'Ulo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Hulu / Pedalaman', english_equivalent: 'Upriver / the interior', context_of_use: 'Slang', explanation: 'The upriver or interior part of a district, e.g. Hulu Perak.', example_sentence: 'Rumah nenek aku kat ulo, jauh sikit dari pekan.', verified_status: true, upvote_count: 23 },
  { id: 'prk-m-078', word_name: 'Gomo', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Belasah / Serang', english_equivalent: 'Go for it / attack', context_of_use: 'Slang', explanation: 'A rallying cry meaning go all out or attack, from gomo (let us go).', example_sentence: 'Gomo teh, jangan takut, jawab ja soalan tu!', verified_status: true, upvote_count: 46 },
  { id: 'prk-m-079', word_name: 'Cengkadak', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Mengkarung / Belalang', english_equivalent: 'Mantis / grasshopper', context_of_use: 'Slang', explanation: 'A praying mantis or grasshopper, local fauna term.', example_sentence: 'Ada cengkadak hinggap kat tingkap dapur tadi.', verified_status: true, upvote_count: 22 },
  { id: 'prk-m-080', word_name: 'Tepoq', primary_language: 'Malay', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Tampar', english_equivalent: 'A slap', context_of_use: 'Slang', explanation: 'A slap with an open hand, used as a mock-threat among friends.', example_sentence: 'Nanti aku tepoq baru teh tau, jangan kacau.', verified_status: true, upvote_count: 28 },
  // ---------- IPOH / KINTA VALLEY (Cantonese-influenced street talk) ----------
  { id: 'prk-c-001', word_name: 'Leng zai', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Lelaki kacak', english_equivalent: 'Handsome guy', context_of_use: 'Endearment', explanation: 'Ipoh is famed for leng zai (handsome guys) and leng lui (pretty girls).', example_sentence: 'Ipoh memang ramai leng zai dengan leng lui kan.', verified_status: true, upvote_count: 96 },
  { id: 'prk-c-002', word_name: 'Leng lui', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Perempuan cantik', english_equivalent: 'Pretty girl', context_of_use: 'Endearment', explanation: 'A pretty girl — a Cantonese phrase synonymous with Ipoh.', example_sentence: 'Leng lui tu order kopi putih, famous kat Ipoh.', verified_status: true, upvote_count: 91 },
  { id: 'prk-c-003', word_name: 'Yam cha', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Minum-minum / Lepak', english_equivalent: 'To go for drinks / hang out', context_of_use: 'Slang', explanation: 'Literally drink tea, an invitation to gather over drinks at a kopitiam.', example_sentence: 'Malam ni yam cha tak kat old town Ipoh?', verified_status: true, upvote_count: 88 },
  { id: 'prk-c-004', word_name: 'Tapau', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bungkus makanan', english_equivalent: 'Takeaway', context_of_use: 'Slang', explanation: 'To pack food to go, used by everyone in the Kinta Valley.', example_sentence: 'Tapau dua bungkus nasi ayam Ipoh, bawak balik.', verified_status: true, upvote_count: 84 },
  { id: 'prk-c-005', word_name: 'Sai lou', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Adik lelaki / Geng bawahan', english_equivalent: 'Little brother / sidekick', context_of_use: 'Slang', explanation: 'A younger brother figure or a loyal sidekick.', example_sentence: 'Itu sai lou dia, ikut ke mana-mana.', verified_status: true, upvote_count: 72 },
  { id: 'prk-c-006', word_name: 'Tai kor', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Abang besar / Ketua', english_equivalent: 'Big brother / boss', context_of_use: 'Slang', explanation: 'The big brother or leader of a group.', example_sentence: 'Dia tai kor kat sini, semua orang dengar cakap dia.', verified_status: true, upvote_count: 70 },
  { id: 'prk-c-007', word_name: 'Sap sap sui', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Perkara kecil / Senang', english_equivalent: 'Easy / no big deal', context_of_use: 'Slang', explanation: 'Something trivial and easy, a piece of cake.', example_sentence: 'Soalan tu sap sap sui ja, senang nak jawab.', verified_status: true, upvote_count: 75 },
  { id: 'prk-c-008', word_name: 'Pai kia', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Budak jahat / Samseng', english_equivalent: 'Bad boy / hooligan', context_of_use: 'Insult', explanation: 'A troublemaker or street hooligan.', example_sentence: 'Jangan kawan dengan pai kia tu, nanti susah.', verified_status: true, upvote_count: 64 },
  { id: 'prk-c-009', word_name: 'Yau yau', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sombong / Berlagak', english_equivalent: 'Arrogant / showing off', context_of_use: 'Insult', explanation: 'Describes someone cocky or showing off.', example_sentence: 'Yau yau betui dia lepas menang sikit.', verified_status: true, upvote_count: 58 },
  { id: 'prk-c-010', word_name: 'Kongsi', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Berkongsi / Bahagi', english_equivalent: 'To share', context_of_use: 'Slang', explanation: 'To share something, a Hokkien-rooted word common in Perak too.', example_sentence: 'Jom kongsi satu plate, aku dah kenyang sikit.', verified_status: true, upvote_count: 67 },
  { id: 'prk-c-011', word_name: 'Cincai', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sebarang / Ikut suka', english_equivalent: 'Anyhow / whatever', context_of_use: 'Slang', explanation: 'To do something casually or without fuss.', example_sentence: 'Makan apa pun cincai la, aku tak kisah.', verified_status: true, upvote_count: 69 },
  { id: 'prk-c-012', word_name: 'Pai seh', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Malu / Segan', english_equivalent: 'Embarrassed / shy', context_of_use: 'Slang', explanation: 'Used when you feel embarrassed or apologetic for troubling someone.', example_sentence: 'Pai seh la makan banyak-banyak kat rumah teh.', verified_status: true, upvote_count: 73 },
  { id: 'prk-c-013', word_name: 'Wun tan', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Wantan (makanan)', english_equivalent: 'Wonton noodles', context_of_use: 'Slang', explanation: 'Ipoh is renowned for its wun tan mee (wonton noodles).', example_sentence: 'Sedap wun tan mee kedai tu, mesti beratur.', verified_status: true, upvote_count: 62 },
  { id: 'prk-c-014', word_name: 'Fan', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Nasi / Makan', english_equivalent: 'Rice / a meal', context_of_use: 'Slang', explanation: 'Rice or a meal in Cantonese, heard around Kinta Valley kopitiams.', example_sentence: 'Sudah makan fan ka belum? Jom pi makan sama-sama.', verified_status: true, upvote_count: 55 },
  { id: 'prk-c-015', word_name: 'Steady', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Mantap / Boleh harap', english_equivalent: 'Solid / reliable', context_of_use: 'Slang', explanation: 'A term of approval that someone is dependable and impressive.', example_sentence: 'Steady la teh, settle semua dalam satu hari.', verified_status: true, upvote_count: 60 },
  { id: 'prk-c-016', word_name: 'Lui', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Duit', english_equivalent: 'Money', context_of_use: 'Slang', explanation: 'Money, a Hokkien loanword used widely across Perak.', example_sentence: 'Ada lui tak? Pinjam aku sikit, esok aku pulang.', verified_status: true, upvote_count: 71 },
  { id: 'prk-c-017', word_name: 'Heng', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bertuah / Nasib baik', english_equivalent: 'Lucky', context_of_use: 'Slang', explanation: 'To be lucky or fortunate, from Hokkien.', example_sentence: 'Heng betui hari ni, jumpa parking depan kedai.', verified_status: true, upvote_count: 53 },
  { id: 'prk-c-018', word_name: 'Suay', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Sial / Tak bernasib', english_equivalent: 'Unlucky', context_of_use: 'Slang', explanation: 'A streak of bad luck or an unfortunate turn.', example_sentence: 'Suay betui, baru keluar terus kena hujan.', verified_status: true, upvote_count: 50 },
  { id: 'prk-c-019', word_name: 'Lokun', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Doktor', english_equivalent: 'Doctor', context_of_use: 'Slang', explanation: 'The Hokkien word for doctor, shared into Perak speech.', example_sentence: 'Pi jumpa lokun la, demam dah tiga hari.', verified_status: true, upvote_count: 44 },
  { id: 'prk-c-020', word_name: 'Tauke', primary_language: 'Chinese', dialect_type: 'Perak', state_origin: 'Perak', standard_bm_equivalent: 'Bos / Tuan kedai', english_equivalent: 'Boss / shop owner', context_of_use: 'Slang', explanation: 'The boss or proprietor of a business.', example_sentence: 'Tauke, bagi kopi o satu, kurang manis.', verified_status: true, upvote_count: 57 },
];

// ============================================================================
// LABUAN SLANG & ACCENT LIBRARY (Bahasa Labuan — Brunei/Kedayan/Sabah Malay blend)
// A 60+ vocabulary set for the Federal Territory pearl island off Borneo.
// ============================================================================
const LABUAN_DIALECT_ENTRIES: DialectEntry[] = [
  { id: 'lbn-001', word_name: 'Bah', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Partikel penegas (ya/okay)', english_equivalent: 'Particle (okay / right)', context_of_use: 'Slang', explanation: 'The all-purpose Bornean particle for agreement, emphasis, or closure — heard constantly in Labuan.', example_sentence: 'Jom pi pasar bah, lawas suda ani.', verified_status: true, upvote_count: 158 },
  { id: 'lbn-002', word_name: 'Damit', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Kecil', english_equivalent: 'Small / little', context_of_use: 'Slang', explanation: 'Means small, a core Brunei-Malay word used throughout Labuan.', example_sentence: 'Bagi yang damit saja, inda larat makan banyak.', verified_status: true, upvote_count: 142 },
  { id: 'lbn-003', word_name: 'Siok', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Seronok / Best', english_equivalent: 'Fun / enjoyable', context_of_use: 'Slang', explanation: 'Describes something fun, enjoyable, or satisfying.', example_sentence: 'Siok betul melepak tepi pantai Labuan petang-petang.', verified_status: true, upvote_count: 136 },
  { id: 'lbn-004', word_name: 'Inda', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Tidak / Tak', english_equivalent: 'No / not', context_of_use: 'Slang', explanation: 'The Brunei-Malay word for no or not, standard in Labuan speech.', example_sentence: 'Aku inda tau pasal tu, tanya orang lain bah.', verified_status: true, upvote_count: 128 },
  { id: 'lbn-005', word_name: 'Karang', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Nanti / Sekejap lagi', english_equivalent: 'Later / in a while', context_of_use: 'Slang', explanation: 'Means later or in a bit, a very common Labuan time word.', example_sentence: 'Karang kita sambung, aku nak makan dulu.', verified_status: true, upvote_count: 114 },
  { id: 'lbn-006', word_name: 'Ani', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Ini', english_equivalent: 'This', context_of_use: 'Slang', explanation: 'This, from Brunei Malay, placed after the noun as in barang ani.', example_sentence: 'Barang ani berapa harga bah?', verified_status: true, upvote_count: 108 },
  { id: 'lbn-007', word_name: 'Atu', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Itu', english_equivalent: 'That', context_of_use: 'Slang', explanation: 'That, the Brunei-Malay counterpart to ani (this).', example_sentence: 'Yang atu lagi cantik, ambil yang atu saja.', verified_status: true, upvote_count: 101 },
  { id: 'lbn-008', word_name: 'Kitani', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Kita (semua)', english_equivalent: 'We / us (inclusive)', context_of_use: 'Slang', explanation: 'The inclusive we/us, a hallmark of Brunei-Labuan Malay.', example_sentence: 'Kitani pi sama-sama bah, lagi siok rame-rame.', verified_status: true, upvote_count: 119 },
  { id: 'lbn-009', word_name: 'Awda', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Awak / Anda', english_equivalent: 'You (polite)', context_of_use: 'Slang', explanation: 'A polite you, contracted from awang-dayang, used in Labuan and Brunei.', example_sentence: 'Awda dari mana ni, baru pindah ka?', verified_status: true, upvote_count: 95 },
  { id: 'lbn-010', word_name: 'Berabis', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Sangat / Habis-habisan', english_equivalent: 'Extremely / very', context_of_use: 'Slang', explanation: 'An intensifier meaning extremely or to the max.', example_sentence: 'Panas berabis hari ani, macam dalam ketuhar.', verified_status: true, upvote_count: 112 },
  { id: 'lbn-011', word_name: 'Andang', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Memang', english_equivalent: 'Indeed / of course', context_of_use: 'Slang', explanation: 'Means indeed or of course, from Brunei Malay.', example_sentence: 'Andang siok bah makanan kat sini, terkenal.', verified_status: true, upvote_count: 88 },
  { id: 'lbn-012', word_name: 'Bida', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Hodoh / Tak cantik', english_equivalent: 'Ugly', context_of_use: 'Insult', explanation: 'Describes something ugly or unsightly, Brunei-Malay rooted.', example_sentence: 'Bida betul warna baju ani, tukar yang lain bah.', verified_status: true, upvote_count: 76 },
  { id: 'lbn-013', word_name: 'Meliat', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Tengok / Lihat', english_equivalent: 'To look / see', context_of_use: 'Slang', explanation: 'To look or watch, a Brunei-Malay verb common in Labuan.', example_sentence: 'Jom meliat bola kat kedai mamak karang.', verified_status: true, upvote_count: 81 },
  { id: 'lbn-014', word_name: 'Tarus', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Terus / Lurus', english_equivalent: 'Straight / directly', context_of_use: 'Slang', explanation: 'To go straight ahead or to do something directly.', example_sentence: 'Jalan tarus saja, jangan belok, sampai la jambatan.', verified_status: true, upvote_count: 70 },
  { id: 'lbn-015', word_name: 'Kabat', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Tutup', english_equivalent: 'To close / shut', context_of_use: 'Slang', explanation: 'To close or shut something like a door or window.', example_sentence: 'Kabat pintu tu bah, masuk nyamuk karang.', verified_status: true, upvote_count: 66 },
  { id: 'lbn-016', word_name: 'Kaling', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Tengok-tengok / Pusing', english_equivalent: 'To look around / turn', context_of_use: 'Slang', explanation: 'To turn the head and look around.', example_sentence: 'Kaling sikit ke belakang, ada orang panggil teh.', verified_status: true, upvote_count: 54 },
  { id: 'lbn-017', word_name: 'Limpas', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Lalu / Lepas', english_equivalent: 'To pass by', context_of_use: 'Slang', explanation: 'To pass by or go past a place.', example_sentence: 'Tadi aku limpas rumah teh, tapi inda nampak orang.', verified_status: true, upvote_count: 58 },
  { id: 'lbn-018', word_name: 'Saru', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Keliru / Tak jelas', english_equivalent: 'Confusing / unclear', context_of_use: 'Slang', explanation: 'When something is confusing or hard to make out.', example_sentence: 'Saru betul muka kembar tu, susah nak kenal.', verified_status: true, upvote_count: 49 },
  { id: 'lbn-019', word_name: 'Karaja', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Kerja / Buat', english_equivalent: 'Work / to do', context_of_use: 'Slang', explanation: 'Work or the act of doing something, Brunei-Malay form of kerja.', example_sentence: 'Apa karaja teh hari ani, sibuk ka?', verified_status: true, upvote_count: 62 },
  { id: 'lbn-020', word_name: 'Tani', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Kita orang', english_equivalent: 'We / us', context_of_use: 'Slang', explanation: 'A short form of kitani, meaning we or us.', example_sentence: 'Tani makan dulu bah, lapar sudah ani.', verified_status: true, upvote_count: 55 },
  { id: 'lbn-021', word_name: 'Garang', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Hebat / Power', english_equivalent: 'Awesome / fierce', context_of_use: 'Slang', explanation: 'Beyond fierce — used to mean impressive or awesome in Labuan slang.', example_sentence: 'Garang betul teh main game tadi, menang terus.', verified_status: true, upvote_count: 60 },
  { id: 'lbn-022', word_name: 'Pengalu', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Peniaga / Penjaja', english_equivalent: 'Trader / hawker', context_of_use: 'Slang', explanation: 'A trader or hawker, fitting for duty-free Labuan markets.', example_sentence: 'Ramai pengalu jual barang murah kat pasar Labuan.', verified_status: true, upvote_count: 41 },
  { id: 'lbn-023', word_name: 'Kemarin', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Semalam / Hari sebelum', english_equivalent: 'Yesterday / the other day', context_of_use: 'Slang', explanation: 'Refers to yesterday or a recent past day.', example_sentence: 'Kemarin aku jumpa awda kat kedai, ingat lagi?', verified_status: true, upvote_count: 44 },
  { id: 'lbn-024', word_name: 'Talampau', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Terlampau / Melampau', english_equivalent: 'Too much / over the top', context_of_use: 'Slang', explanation: 'Means excessive or over the top.', example_sentence: 'Talampau pedas sambal ani, inda larat aku makan.', verified_status: true, upvote_count: 47 },
  { id: 'lbn-025', word_name: 'Sigup', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Rokok', english_equivalent: 'Cigarette', context_of_use: 'Slang', explanation: 'A cigarette, an old Borneo Malay word still used in Labuan.', example_sentence: 'Inda payah hisap sigup, jaga kesihatan bah.', verified_status: true, upvote_count: 38 },
  { id: 'lbn-026', word_name: 'Ampai', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Sidai / Gantung', english_equivalent: 'To hang out (laundry)', context_of_use: 'Slang', explanation: 'To hang out laundry to dry.', example_sentence: 'Tolong ampai kain tu, hari panas elok kering.', verified_status: true, upvote_count: 34 },
  { id: 'lbn-027', word_name: 'Lakas', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Cepat / Lekas', english_equivalent: 'Quick / hurry', context_of_use: 'Slang', explanation: 'To be quick or to hurry up.', example_sentence: 'Lakas sikit bah, karang kita terlambat feri.', verified_status: true, upvote_count: 52 },
  { id: 'lbn-028', word_name: 'Bisai', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Cantik / Kemas', english_equivalent: 'Pretty / smart-looking', context_of_use: 'Endearment', explanation: 'A compliment meaning pretty or well-groomed, from Borneo Malay.', example_sentence: 'Bisai betul awda berbaju kurung hari ani.', verified_status: true, upvote_count: 57 },
  { id: 'lbn-029', word_name: 'Pucat', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Takut / Pucat lesi', english_equivalent: 'Scared stiff / pale', context_of_use: 'Slang', explanation: 'To turn pale from fear or shock.', example_sentence: 'Pucat muka dia bila nampak ular tu.', verified_status: true, upvote_count: 33 },
  { id: 'lbn-030', word_name: 'Karbit', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Cepat marah / Panas baran', english_equivalent: 'Short-tempered', context_of_use: 'Insult', explanation: 'Describes someone who flares up quickly, like carbide igniting.', example_sentence: 'Jangan kacau dia, karbit orangnya, cepat naik angin.', verified_status: true, upvote_count: 36 },
  { id: 'lbn-031', word_name: 'Tumbuk', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Tumbuk / Belasah', english_equivalent: 'To punch', context_of_use: 'Slang', explanation: 'To punch or strike, used as a mock-threat among friends.', example_sentence: 'Nanti aku tumbuk baru tau, jangan buat hal.', verified_status: true, upvote_count: 31 },
  { id: 'lbn-032', word_name: 'Sakai', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Kekampungan / Tak up-to-date', english_equivalent: 'Unsophisticated / clueless', context_of_use: 'Insult', explanation: 'Playfully describes someone behind the times or clueless.', example_sentence: 'Jangan sakai bah, itu pun inda tau guna.', verified_status: true, upvote_count: 40 },
  { id: 'lbn-033', word_name: 'Membari', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Membuatkan / Menyebabkan', english_equivalent: 'To make (one feel)', context_of_use: 'Slang', explanation: 'To cause a feeling, as in membari malu (makes one embarrassed).', example_sentence: 'Membari malu betul perangai dia tadi.', verified_status: true, upvote_count: 45 },
  { id: 'lbn-034', word_name: 'Tagar', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Berkarat', english_equivalent: 'Rusty', context_of_use: 'Slang', explanation: 'Describes metal that has gone rusty.', example_sentence: 'Basikal tu sudah tagar, lama inda dipakai.', verified_status: true, upvote_count: 27 },
  { id: 'lbn-035', word_name: 'Kemada', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Macam / Seperti', english_equivalent: 'Like / as if', context_of_use: 'Slang', explanation: 'Used for comparison, like or as if, from Brunei Malay.', example_sentence: 'Mukanya kemada inda puas hati.', verified_status: true, upvote_count: 35 },
  { id: 'lbn-036', word_name: 'Sukar', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Hampir / Hampir-hampir', english_equivalent: 'Almost / nearly', context_of_use: 'Slang', explanation: 'Used to mean almost or nearly in local Labuan speech.', example_sentence: 'Sukar saja aku terlupa bawa dompet tadi.', verified_status: true, upvote_count: 29 },
  { id: 'lbn-037', word_name: 'Begagas', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Tergesa-gesa', english_equivalent: 'In a rush / hasty', context_of_use: 'Slang', explanation: 'To do something hurriedly without care.', example_sentence: 'Jangan begagas, karang tertinggal barang pulak.', verified_status: true, upvote_count: 32 },
  { id: 'lbn-038', word_name: 'Kalat', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Kotor / Bersepah', english_equivalent: 'Dirty / messy', context_of_use: 'Slang', explanation: 'Describes a dirty or messy state.', example_sentence: 'Kalat betul dapur ani, kemas dulu bah.', verified_status: true, upvote_count: 30 },
  { id: 'lbn-039', word_name: 'Macam ani', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Macam ini / Begini', english_equivalent: 'Like this', context_of_use: 'Slang', explanation: 'Means like this, combining macam with the Brunei ani.', example_sentence: 'Buat macam ani saja, senang lagi.', verified_status: true, upvote_count: 37 },
  { id: 'lbn-040', word_name: 'Macam atu', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Macam itu / Begitu', english_equivalent: 'Like that', context_of_use: 'Slang', explanation: 'Means like that, the counterpart of macam ani.', example_sentence: 'Owh, macam atu rupanya, baru aku faham.', verified_status: true, upvote_count: 34 },
  { id: 'lbn-041', word_name: 'Tagal', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Sebab / Kerana', english_equivalent: 'Because', context_of_use: 'Slang', explanation: 'Means because, common in Sabah and Labuan speech.', example_sentence: 'Aku lambat tagal hujan lebat tadi.', verified_status: true, upvote_count: 42 },
  { id: 'lbn-042', word_name: 'Buleh', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Boleh', english_equivalent: 'Can / able to', context_of_use: 'Slang', explanation: 'The Borneo pronunciation of boleh (can).', example_sentence: 'Buleh tolong aku angkat barang ani sikit?', verified_status: true, upvote_count: 39 },
  { id: 'lbn-043', word_name: 'Gia', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Begitu / Macam tu (penegas)', english_equivalent: 'So / like that (emphasis)', context_of_use: 'Slang', explanation: 'An emphatic particle meaning so or like that.', example_sentence: 'Mahal gia harga ikan ani sekarang.', verified_status: true, upvote_count: 26 },
  { id: 'lbn-044', word_name: 'Awu', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Ya / Betul', english_equivalent: 'Yes', context_of_use: 'Slang', explanation: 'The Brunei-Malay yes, said softly in Labuan.', example_sentence: 'Awu bah, betul cakap awda tu.', verified_status: true, upvote_count: 48 },
  { id: 'lbn-045', word_name: 'Kuyu', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Lesu / Lemau', english_equivalent: 'Listless / sluggish', context_of_use: 'Slang', explanation: 'Feeling listless, drained, or under the weather.', example_sentence: 'Kuyu aku hari ani, inda cukup tidur.', verified_status: true, upvote_count: 28 },
  { id: 'lbn-046', word_name: 'Cakah', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Terkangkang / Terbuka luas', english_equivalent: 'Wide open / sprawled', context_of_use: 'Slang', explanation: 'Describes something sprawled or spread wide open.', example_sentence: 'Jangan duduk cakah-cakah, sopan sikit bah.', verified_status: true, upvote_count: 24 },
  { id: 'lbn-047', word_name: 'Pinjam', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Pinjam', english_equivalent: 'To borrow', context_of_use: 'Slang', explanation: 'To borrow something, said with the soft Labuan lilt.', example_sentence: 'Buleh pinjam cas teh sekejap? Bateri aku abis.', verified_status: true, upvote_count: 25 },
  { id: 'lbn-048', word_name: 'Berabuk', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Berhabuk', english_equivalent: 'Dusty', context_of_use: 'Slang', explanation: 'Covered in dust from being left unused.', example_sentence: 'Barang dalam stor tu berabuk sudah, lama inda usik.', verified_status: true, upvote_count: 23 },
  { id: 'lbn-049', word_name: 'Sandi', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Dari / Daripada', english_equivalent: 'From', context_of_use: 'Slang', explanation: 'Means from, a Brunei-Malay preposition used in Labuan.', example_sentence: 'Aku baru balik sandi Kota Kinabalu naik feri.', verified_status: true, upvote_count: 30 },
  { id: 'lbn-050', word_name: 'Bigos', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Sibuk hal orang / Kepoh', english_equivalent: 'Nosy / busybody', context_of_use: 'Insult', explanation: 'Describes a nosy person who minds others business.', example_sentence: 'Jangan bigos bah, itu bukan hal awda.', verified_status: true, upvote_count: 43 },
  { id: 'lbn-051', word_name: 'Tarabai', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Terbiar / Tak terurus', english_equivalent: 'Neglected / left untended', context_of_use: 'Slang', explanation: 'Something left neglected or untended.', example_sentence: 'Kebun tu tarabai sudah, rumput tinggi-tinggi.', verified_status: true, upvote_count: 22 },
  { id: 'lbn-052', word_name: 'Gostan', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Undur kenderaan', english_equivalent: 'To reverse (a vehicle)', context_of_use: 'Slang', explanation: 'To reverse, from go-astern, used island-wide.', example_sentence: 'Gostan sikit bah, lori inda buleh lalu.', verified_status: true, upvote_count: 35 },
  { id: 'lbn-053', word_name: 'Kacang', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Senang / Mudah', english_equivalent: 'Easy / a breeze', context_of_use: 'Slang', explanation: 'Slang for something very easy, like kacang putih.', example_sentence: 'Soalan kuiz tu kacang saja, senang menang.', verified_status: true, upvote_count: 38 },
  { id: 'lbn-054', word_name: 'Nyaman', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Sedap', english_equivalent: 'Delicious', context_of_use: 'Slang', explanation: 'Means delicious or tasty, shared across Borneo.', example_sentence: 'Nyaman betul ikan bakar tepi pantai Labuan ani.', verified_status: true, upvote_count: 56 },
  { id: 'lbn-055', word_name: 'Bah kau', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Yelah tu / Suka hati kau', english_equivalent: 'Sure, whatever you say', context_of_use: 'Slang', explanation: 'A playful, slightly teasing way to half-agree with someone.', example_sentence: 'Bah kau, ikut suka teh la kalau macam tu.', verified_status: true, upvote_count: 47 },
  { id: 'lbn-056', word_name: 'Cakit', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Sakit', english_equivalent: 'Sick / hurts', context_of_use: 'Slang', explanation: 'The local pronunciation of sakit (sick or painful).', example_sentence: 'Cakit perut aku lepas makan pedas tadi.', verified_status: true, upvote_count: 26 },
  { id: 'lbn-057', word_name: 'Galat', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Silap / Salah', english_equivalent: 'Mistaken / wrong', context_of_use: 'Slang', explanation: 'A mistake or error in judgment.', example_sentence: 'Galat aku ingat hari ani cuti, rupanya kerja.', verified_status: true, upvote_count: 21 },
  { id: 'lbn-058', word_name: 'Kamarisan', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Kelmarin dulu / Hari lepas', english_equivalent: 'The day before yesterday', context_of_use: 'Slang', explanation: 'Refers to a couple of days ago.', example_sentence: 'Kamarisan kita jumpa kat jeti, ingat lagi?', verified_status: true, upvote_count: 19 },
  { id: 'lbn-059', word_name: 'Mengalih', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Penat / Letih', english_equivalent: 'Tired / weary', context_of_use: 'Slang', explanation: 'To be tired or weary, a Borneo Malay term.', example_sentence: 'Mengalih sudah aku, kerja sampai petang.', verified_status: true, upvote_count: 28 },
  { id: 'lbn-060', word_name: 'Sajuk', primary_language: 'Malay', dialect_type: 'Labuan', state_origin: 'Labuan', standard_bm_equivalent: 'Sejuk', english_equivalent: 'Cold / cool', context_of_use: 'Slang', explanation: 'The Borneo pronunciation of sejuk (cold).', example_sentence: 'Sajuk angin malam tepi laut, bawa jaket bah.', verified_status: true, upvote_count: 24 },
];

export const INITIAL_DIALECT_ENTRIES: DialectEntry[] = [
  ...STATIC_DIALECT_ENTRIES,
  ...PENANG_DIALECT_ENTRIES,
  ...PERAK_DIALECT_ENTRIES,
  ...LABUAN_DIALECT_ENTRIES,
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

